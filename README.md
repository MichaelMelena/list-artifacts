# MichaelMelena/list-artifacts@v1 

returns list of artifacts for callers repository

## Inputs & Outputs
This action requires that you specify github acess token to the callers repository to **GITHUB_TOKEN** input

You can do so easily by accesing [automaticly created token](https://docs.github.com/en/actions/security-guides/automatic-token-authentication) stored in secrets  which contains said token `${{ secrets.GITHUB_TOKEN}}` or from github context `${{ github.token }}`

```yml
name: 'get list artifacts'
description: 'gets all artifacts for the current repository'
inputs:
  GITHUB_TOKEN:  
    description: 'github access token for callers repository'
    required: true
outputs:
  artifacts: # output will be available to future steps
    description: 'list of artifacts'
runs:
  using: 'node12'
  main: 'dist/index.js'
```



## Example:
This workflow uses this action and then acesses the output value named artifacts and displays it with echo

```yml
name: My workflow
on: [workflow_dispatch]
jobs:
  first-job:
    runs-on: ubuntu-latest
    steps:
    - id: result 
      uses: MichaelMelena/list-artifacts@v1
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN}}
    - run: echo '${{ steps.result.outputs.artifacts }}'
```