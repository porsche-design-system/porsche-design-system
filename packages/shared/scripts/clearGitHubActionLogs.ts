import * as dotenv from 'dotenv';
import * as path from 'path';
import { Octokit } from '@octokit/core';

const config = dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const { GITHUB_PERSONAL_ACCESS_TOKEN } = config.parsed;

if (!GITHUB_PERSONAL_ACCESS_TOKEN) {
  throw new Error('GITHUB_PERSONAL_ACCESS_TOKEN is missing. Please add it to your `.env` file.');
}

const octokit = new Octokit({
  auth: GITHUB_PERSONAL_ACCESS_TOKEN,
});

const PAGE_SIZE = 50; // default is 30, max is 100
const OWNER_AND_REPO: { owner: string; repo: string } = {
  owner: 'porsche-design-system',
  repo: 'porsche-design-system',
};

const fetchWorkflowRunIds = async (page: number): Promise<{ totalCount: number; workflowRunIds: number[] }> => {
  // https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-repository
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/runs{?actor,branch,event,status,per_page,page,created,exclude_pull_requests,check_suite_id,head_sha}',
    {
      ...OWNER_AND_REPO,
      per_page: PAGE_SIZE,
      page: page,
      created: '<2021-07-01', // before this date
    }
  );

  return { totalCount: data.total_count, workflowRunIds: data.workflow_runs.map((x) => x.id) };
};

const fetchAllWorkflowRunIds = async (): Promise<number[]> => {
  let results = [];

  let currentPage = 1;
  let totalPages = 5;
  while (currentPage <= totalPages) {
    console.log(`fetchWorkflowRunIds (${currentPage}/${totalPages})`);
    const result = await fetchWorkflowRunIds(currentPage);
    results = [...results, ...result.workflowRunIds];
    console.log(`results: ${results.length}/${result.totalCount}`);

    totalPages = Math.ceil(result.totalCount / PAGE_SIZE);
    currentPage++;
  }

  return results;
};

const deleteWorkflowRun = async (runId: number): Promise<void> => {
  // https://docs.github.com/en/rest/actions/workflow-runs#delete-a-workflow-run
  try {
    await octokit.request('DELETE /repos/{owner}/{repo}/actions/runs/{run_id}', {
      ...OWNER_AND_REPO,
      run_id: runId,
    });
  } catch (e) {
    console.log(`${e.status}: ${e.request.method} ${e.request.url}`);
  }
};

const clearGitHubActionLogs = async () => {
  const workflowRunIds = await fetchAllWorkflowRunIds();
  const { length: total } = workflowRunIds;

  for (let i = 0; i < total; i++) {
    console.log(`deleteWorkflowRun: ${workflowRunIds[i]} (${i + 1}/${total})`);
    await deleteWorkflowRun(workflowRunIds[i]);
  }
};

(async () => {
  await clearGitHubActionLogs();
})();
