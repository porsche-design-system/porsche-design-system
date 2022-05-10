import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

/**
 * Enter the full URL for your Frontify GraphQL Instance
 * Format: https://<domain>/graphql
 *
 * Important, no slash at the end, https must be set as protocol
 */
const GRAPHQL_ENDPOINT = 'https://porsche-brand.frontify.com/graphql';

/**
 * Bearer Token, MUST have scopes basic:read and basic:write
 */
const BEARER_TOKEN = process.env.FRONTIFY_TOKEN || 'REPLACE_LOCAL_TOKEN';

/**
 * Library (or Workspace Project) to upload Assets into.
 * This can be found using GraphQL and query for all the Libraries you have in a given brand.
 * See: https://frontify.github.io/public-api-explorer/#/brands
 * Adopt the query to search for a given library
 *
 * Format: ey
 */
const LIBRARY_OR_WORKSPACE_ID = 'eyJpZGVudGlmaWVyIjo0NTYsInR5cGUiOiJwcm9qZWN0In0=';

type GraphQLConfiguration = {
  endpoint: string;
  bearerToken: string;
};

const config: GraphQLConfiguration = {
  endpoint: GRAPHQL_ENDPOINT,
  bearerToken: BEARER_TOKEN,
};

/**
 * Chunk size for uploading given in bytes
 * Set by default to 250 Mb
 */
const CHUNK_SIZE_IN_BYTES = 250 * 1024 * 1024;

async function graphQl<R extends object>(config: GraphQLConfiguration, query: string, variables?: object): Promise<R> {
  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.bearerToken}`,
      'content-type': 'application/json',
      'X-frontify-beta': 'enabled',
      'x-frontify-development-flags':
        'BRAND_LEVEL_SEARCH, PROJECT_BROWSE, PUBLIC_API_ASSET_COMMENTS, PUBLIC_API_GUIDELINES',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await response.json()) as { data: R; errors?: Error[] };

  if (json.errors) {
    const messageParts = ['Query failed with following errors:', ...json.errors.map((error) => ` - ${error.message}`)];
    throw Error(messageParts.join('\n'));
  }

  return json.data;
}

async function initUpload(
  config: GraphQLConfiguration,
  filenameWithExtension: string,
  fileSize: number,
  chunkSize: number = CHUNK_SIZE_IN_BYTES
): Promise<{ id: string; urls: string[] }> {
  const { uploadFile } = await graphQl<{ uploadFile: { id: string; urls: string[] } }>(
    config,
    `mutation ($input: UploadFileInput!) {
        uploadFile(input: $input) {
            id
            urls
        }
    }`,
    { input: { filename: filenameWithExtension, size: fileSize, chunkSize } }
  );

  return uploadFile;
}

async function uploadBinaryFile(filePath: string, urls: string[]): Promise<void> {
  const readFileStream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE_IN_BYTES });
  // const { size } = fs.statSync(filePath);
  // const totalChunks = Math.ceil(size / CHUNK_SIZE_IN_BYTES);

  for await (const data of readFileStream) {
    const url = urls.shift();
    await fetch(url!, {
      method: 'PUT',
      headers: {
        'content-type': 'binary',
      },
      body: data,
    });
  }
}

async function createAsset(
  config: GraphQLConfiguration,
  // https://developer.frontify.com/d/XFPCrGNrXQQM/graphql-api#/deep-dive/upload-file-create-asset/3-use-the-file
  input: {
    projectId: string;
    fileId: string;
    title: string;
    externalId?: string;
    description?: string;
    tags?: { [key: string]: string }[];
    directory?: string;
  }
): Promise<string> {
  const {
    createAsset: {
      job: { assetId },
    },
  } = await graphQl<{ createAsset: { job: { assetId: string } } }>(
    config,
    `mutation ($input: CreateAssetInput!) {
        createAsset(input: $input) {
            job {
                assetId
            }
        }
    }`,
    { input }
  );

  return assetId;
}

type Asset = {
  id: string;
  externalId: string;
  createdAt: Date;
  modifiedAt: Date;
};

type QueryResult = {
  total: number;
  items: Asset[];
};

async function getAssetsByExternalId(libraryId: string, externalId: string): Promise<QueryResult> {
  const {
    library: { assets },
  } = await graphQl<{ library: { assets: QueryResult } }>(
    config,
    `query ($libraryId: ID!, $externalId: ID!) {
        library(id: $libraryId) {
            assets(query: { externalId: $externalId }) {
                total
                items {
                    id
                    externalId
                    createdAt
                    modifiedAt
                    tags {value}
                }
            }
        }
    }`,
    { libraryId, externalId }
  );

  return assets;
}

async function getAssetsByTitle(libraryId: string, title: string): Promise<QueryResult> {
  const {
    library: { assets },
  } = await graphQl<{ library: { assets: QueryResult } }>(
    config,
    `query ($libraryId: ID!, $title: String!) {
        library(id: $libraryId) {
            assets(query: { search: $title }) {
                total
                items {
                    id
                    externalId
                    createdAt
                    modifiedAt
                    tags {value}
                }
            }
        }
    }`,
    { libraryId, title }
  );

  return assets;
}

async function deleteAsset(assetId: string): Promise<any> {
  return await graphQl(
    config,
    `mutation ($input: DeleteAssetInput!) {
        deleteAsset(input: $input) {
            asset {
                id
            }
        }
    }`,
    { input: { id: assetId } }
  );
}

async function uploadFile(filePath: string): Promise<{ skipped: boolean }> {
  const fileName = path.basename(filePath);
  const [title] = fileName.split('.');
  const { size: fileSizeInBytes } = fs.statSync(filePath);

  const assetsByExternalId = await getAssetsByExternalId(LIBRARY_OR_WORKSPACE_ID, fileName);
  const assetAlreadyExists = assetsByExternalId.total === 1;

  if (assetAlreadyExists) {
    return { skipped: true };
  } else {
    // TODO: delete or replace (via replaceAsset operation)?
    // search by title in case content based hash changed
    // const assetsByTitle = await getAssetsByTitle(LIBRARY_OR_WORKSPACE_ID, title);
    // if (assetsByTitle.total) {
    //   const deleteAssetResults = await Promise.all(assetsByTitle.items.map((item) => deleteAsset(item.id)));
    //   console.log('Deleted icons:', deleteAssetResults.length);
    // }

    const { id: fileId, urls } = await initUpload(config, fileName, fileSizeInBytes);
    await uploadBinaryFile(filePath, urls);

    const assetId = await createAsset(config, {
      projectId: LIBRARY_OR_WORKSPACE_ID,
      fileId,
      title,
      externalId: fileName,
    });

    console.log('Uploaded:', fileName);
    return { skipped: false };
  }
}

(async function () {
  const iconsDistFolder = path.resolve(__dirname, '../cdn/icons');
  const icons = globby.sync(iconsDistFolder + '/*.svg');
  console.log('Icons total:   ', icons.length);

  const result = await Promise.all(icons.map(uploadFile));
  const amountSkippedIcons = result.filter((x) => x.skipped).length;
  const amountUploadedIcons = result.length - amountSkippedIcons;

  console.log('Icons skipped: ', amountSkippedIcons);
  console.log('Icons uploaded:', amountUploadedIcons);
})();
