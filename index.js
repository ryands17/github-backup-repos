module.exports.backup = async event => {
  console.log('cron ran successfully at', new Date().toISOString())
  return {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    // event,
  }
}
