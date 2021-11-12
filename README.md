# MichaelMelena/list-artifacts@v1

returns list of artifacts in repository

## Inputs & Outputs

this action by default uses the repository from which it was called. You can provide your own token in order to access other repositories than the one which triggered the workflow. 

Default token is [automaticly created token](https://docs.github.com/en/actions/security-guides/automatic-token-authentication) and stored in secrets and can be acces via secrets `${{ secrets.GITHUB_TOKEN}}` or from github context `${{ github.token }}`.


### Inputs:

| parameter  | required |       default       | description |
| :--------- | :------: | :-----------------: | :---------- |
| GITHUB_TOKEN    |   :x:    | ${{ github.token }} | you can specify you own token. Just make sure the token has permissions to API  `GET /repos/{owner}/{repo}/actions/artifacts`. As of right now when you create Personal access token (PAT) you have to enable workflow permission |
| repository |   :x:    | ${{ github.token }} | you can specify different repository in format `owner/repositry` for example `MichaelMelena/list-artifacts` for this repository

\* *make sure your token matches your repository*

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


## Starter template
Simple workflow which uses this action to retrieve list of artifacts and prints it to console

```yml
name: Starter get artifacts
on: [workflow_dispatch]
jobs:
  get-artifacts:
    runs-on: ubuntu-latest
    steps:
    - id: result 
      uses: MichaelMelena/list-artifacts@v1
    - run: echo '${{ steps.result.outputs.artifacts }}'
```

## Advanced template

This template specifies which toke should be used and which repository should be schaned for artifacts 

this template asumes you have create secret named `MY_PAT_TOKEN` which contains GitHub `PAT` token with access to target repository

you have to replace `owner/his-repository` with valid repository to which you or the PAT token have access.

```yml
name: Advance get artifacts
on: [workflow_dispatch]
jobs:
  get-artifacts:
    runs-on: ubuntu-latest
    steps:
    - id: result
      uses: MichaelMelena/list-artifacts@v1
      with:
        GITHUB_TOKEN: ${{secrest.MY_PAT_TOKEN}}
        respository: owner/his-repository
```