import * as dotenv from 'dotenv';
import * as path from 'path';
import { Octokit } from '@octokit/core';

// https://docs.github.com/en/rest/actions/workflow-runs#delete-a-workflow-run

const PAGE_SIZE = 30;

const fetchWorkflowRunIds = async (
  octokit: Octokit,
  page: number
): Promise<{ totalCount: number; workflowRunIds: number[] }> => {
  // https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-repository
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/runs{?actor,branch,event,status,per_page,page,created,exclude_pull_requests,check_suite_id,head_sha}',
    {
      owner: 'porsche-design-system',
      repo: 'porsche-design-system',
      per_page: PAGE_SIZE,
      page: page,
      created: '<2021-01-01', // before this date
    }
  );

  return { totalCount: data.total_count, workflowRunIds: data.workflow_runs.map((x) => x.id) };
};

const fetchAllWorkflowRunIds = async (octokit: Octokit): Promise<number[]> => {
  let results = [];

  let currentPage = 1;
  let totalPages = 5;
  while (currentPage <= totalPages) {
    console.log(`fetchWorkflowRunIds (${currentPage}/${totalPages})`);
    const result = await fetchWorkflowRunIds(octokit, currentPage);
    results = [...results, ...result.workflowRunIds];
    console.log(`results: ${results.length}/${result.totalCount}`);

    totalPages = Math.ceil(result.totalCount / PAGE_SIZE);
    currentPage++;
  }

  return results;
};

const clearGitHubActionLogs = async () => {
  const config = dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
  const { GITHUB_PERSONAL_ACCESS_TOKEN } = config.parsed;

  if (!GITHUB_PERSONAL_ACCESS_TOKEN) {
    throw new Error('GITHUB_PERSONAL_ACCESS_TOKEN is missing. Please add it to your `.env` file.');
  }

  const octokit = new Octokit({
    auth: GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const result = await fetchAllWorkflowRunIds(octokit);
  console.log('total:', result);
};

(async () => {
  await clearGitHubActionLogs();
})();
