const core = require("@actions/core");
const wait = require("./wait");
const { Octokit } = require("@octokit/action");
const octokit = new Octokit();

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput("milliseconds");
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug(new Date().toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info(new Date().toTimeString());

    // See https://docs.github.com/en/rest/reference/actions#artifacts
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/artifacts",
      {
        owner,
        repo,
      }
    );
    console.log(`artifacts for repo: ${repo}: `, data.artifacts);

    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
