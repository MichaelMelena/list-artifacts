# MichaelMelena/list-artifacts@v1

returns list of artifacts for repository

## Inputs & Outputs

This action requires that you specify github acess token to the callers repository to **GITHUB_TOKEN** input

You can do so easily by accesing [automaticly created token](https://docs.github.com/en/actions/security-guides/automatic-token-authentication) stored in secrets which contains said token `${{ secrets.GITHUB_TOKEN}}` or from github context `${{ github.token }}`

## Example:


### Inputs:

| parameter  | required |       default       | description |
| :--------- | :------: | :-----------------: | :---------- |
| GITHUB_TOKEN    |   :x:    | ${{ github.token }} | you can specify you own token            |
| repository |   :x:    | ${{ github.token }} | you can specify different repository in format `owner/repositry` for example `MichaelMelena/list-artifacts` for this repository          |

\* *just make sure your token matches your repository. Othervise you will be trying to open someone elses house with wrong key*

-----

### Outputs:

list of artifacts in `JSON` format.

```json
[
  {
    "id": 11,
    "node_id": "MDg6QXJ0aWZhY3QxMQ==",
    "name": "Rails",
    "size_in_bytes": 556,
    "url": "https://api.github.com/repos/octo-org/octo-docs/actions/artifacts/11",
    "archive_download_url": "https://api.github.com/repos/octo-org/octo-docs/actions/artifacts/11/zip",
    "expired": false,
    "created_at": "2020-01-10T14:59:22Z",
    "expires_at": "2020-03-21T14:59:22Z",
    "updated_at": "2020-02-21T14:59:22Z"
  },
  {
    "id": 13,
    "node_id": "MDg6QXJ0aWZhY3QxMw==",
    "name": "",
    "size_in_bytes": 453,
    "url": "https://api.github.com/repos/octo-org/octo-docs/actions/artifacts/13",
    "archive_download_url": "https://api.github.com/repos/octo-org/octo-docs/actions/artifacts/13/zip",
    "expired": false,
    "created_at": "2020-01-10T14:59:22Z",
    "expires_at": "2020-03-21T14:59:22Z",
    "updated_at": "2020-02-21T14:59:22Z"
  }
]
```
----

## Template
simple workflow which uses this action to retrieve list of artifacts and prints it to console

```yml
name: My workflow
on: [workflow_dispatch]
jobs:
  first-job:
    runs-on: ubuntu-latest
    steps:
    - id: result 
      uses: MichaelMelena/list-artifacts@v1
    - run: echo '${{ steps.result.outputs.artifacts }}'
```
