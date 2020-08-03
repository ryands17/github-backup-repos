const { Octokit } = require('@octokit/rest')
const { uploadToS3 } = require('./helpers')

const owner = 'ryands17'

exports.downloadRepos = async ({ auth, bucket }) => {
  const octokit = new Octokit({
    auth,
  })

  for await (let res of octokit.paginate.iterator(
    octokit.repos.listForAuthenticatedUser,
    {
      visibility: 'all',
      affiliation: 'owner',
      per_page: 20,
    }
  )) {
    const repositoryNames = res.data.map(repo => repo.name)
    await Promise.all(
      repositoryNames.map(async name => {
        const repo = await octokit.repos.downloadArchive({
          archive_format: 'tarball',
          repo: name,
          owner,
        })
        return uploadToS3({
          name,
          data: repo.data,
          Bucket: bucket,
        })
      })
    )
  }

  return true
}
