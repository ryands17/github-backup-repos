import { getParameters } from './helpers.js';
import { downloadRepos } from './github.js';

export async function backup() {
  console.log('Starting function');

  const [auth, bucket] = await getParameters();
  console.log('Fetched parameters');

  console.log('Downloading repos');
  await downloadRepos({ auth, bucket });
  console.log('cron ran successfully at', new Date().toDateString());

  return { message: 'Backup successful!' };
}
