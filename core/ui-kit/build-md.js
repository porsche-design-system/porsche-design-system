const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');

let renderer;
function convertMarkdownToHTML(data) {
  if (!renderer) {

    renderer = new marked.Renderer();
    const linkRenderer = renderer.link;

    renderer.link = (href, title, text) => {
      const html = linkRenderer.call(renderer, href, title, text);
      if (href.startsWith('http')) {
        return html.replace(/^<a /, '<a target="_blank" ');
      }

      return html;
    };

    marked.setOptions({
      breaks: true
    });
  }

  return marked(data, {renderer});
}

const getFilesInDirectory = (dir, suffix, files = []) => {
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const path = dir.replace(/\/$/, '') + '/' + file;

      if (fs.statSync(path).isDirectory()) {
        getFilesInDirectory(path, suffix, files);
      } else if (path.endsWith(suffix)) {
        files.push(path);
      }
    }
  }

  return files;
};

const copyAssets = (pathDocsAssets, pathSymlinkDocsAssets) => {
  if (!fs.existsSync(pathSymlinkDocsAssets)) fs.mkdirSync(pathSymlinkDocsAssets);

  fs.copySync(pathDocsAssets, pathSymlinkDocsAssets);
};

const createDocs = (pathMarkdownFiles, pathConvertedMarkdownFiles) => {
  if (!fs.existsSync(pathConvertedMarkdownFiles)) fs.mkdirSync(pathConvertedMarkdownFiles);

  const files = getFilesInDirectory(pathMarkdownFiles, '.md');
  for (const file of files) {
    const filename = path.basename(file, '.md');
    const data = fs.readFileSync(file).toString();
    const html = convertMarkdownToHTML(data);

    fs.writeFileSync(`${pathConvertedMarkdownFiles}/${filename}.hbs`, `<div class="sg-markdown">\r\n${html}\r\n</div>`);
  }
};

const sourceDocs = './docs';
const sourceDocsAssets = './docs/assets';
const targetDocs = './patternlab/source/_patterns/docs';
const targetDocsAssets = './patternlab/source/images/porsche-ui-kit-docs/';
createDocs(sourceDocs, targetDocs);
copyAssets(sourceDocsAssets, targetDocsAssets);

const sourceLegalNotice = './legal-notice';
const targetLegalNotice = './patternlab/source/_patterns/legal-notice';
createDocs(sourceLegalNotice, targetLegalNotice);
