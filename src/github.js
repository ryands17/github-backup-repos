import { Octokit } from '@octokit/rest';
import { uploadToS3 } from './helpers.js';

const owner = 'ryands17';

export async function downloadRepos({ auth, bucket }) {
  const octokit = new Octokit({
    auth,
  });

  for await (let res of octokit.paginate.iterator(
    octokit.repos.listForAuthenticatedUser,
    {
      visibility: 'all',
      affiliation: 'owner',
      per_page: 20,
    },
  )) {
    const repositoryNames = res.data.map((repo) => repo.name);
    await Promise.all(
      repositoryNames.map(async (name) => {
        const repo = await octokit.repos.downloadTarballArchive({
          repo: name,
          owner,
        });

        console.log(`Downloaded ${name}, now uploading to S3`);
        return uploadToS3({
          name,
          data: repo.data,
          Bucket: bucket,
        });
      }),
    );
  }

  return true;
}
