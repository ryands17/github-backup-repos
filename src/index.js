const { getParameters } = require('./helpers')
const { downloadRepos } = require('./github')

module.exports.backup = async _event => {
  const [auth, bucket] = await getParameters()
  await downloadRepos({ auth, bucket })
  console.log('cron ran successfully at', new Date().toDateString())
  return {
    message: 'Backup successful!',
  }
}
