const core = require("@actions/core");
const { Octokit } = require("@octokit/action");
const octokit = new Octokit();

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// most @actions toolkit packages have async methods
async function run() {
  try {
    // See https://docs.github.com/en/rest/reference/actions#artifacts
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/artifacts",
      {
        owner,
        repo,
      }
    );
    console.log(`artifacts for repo: ${repo}: `, data.artifacts);

    core.setOutput("artifacts", data.artifacts);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
