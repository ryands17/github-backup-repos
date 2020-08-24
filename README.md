# GH Repo backup

### Just a test project created to test the GitHub API SDK

- This makes use of the [Oktokit](https://octokit.github.io/rest.js/v18) Library, with the [Serverless](https://www.serverless.com/) framework for running a scheduled Lambda function

- Also some setup is predefined in this project
  - You would need to add these two variables to the [SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).
    - /gh-backup/auth => GitHub [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
    - /gh-backup/bucket => Bucket name to backup the repos to

The rest of the parameters are configured in [serverless.yml](./serverless.yml) for easy editing

**_Note_**: I have stored the variables with encryption in the Parameter Store, which is why the KMS Decrypt permission is required. If you're not doing the same, then that rule can be safely omitted.
