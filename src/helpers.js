const AWS = require('aws-sdk')
const SSM = new AWS.SSM()
const S3 = new AWS.S3()

exports.getParameters = async () => {
  const { Parameters } = await SSM.getParametersByPath({
    Path: '/gh-backup',
    WithDecryption: true,
  }).promise()

  return [
    Parameters.find(param => param.Name === '/gh-backup/auth').Value,
    Parameters.find(param => param.Name === '/gh-backup/bucket').Value,
  ]
}

exports.uploadToS3 = ({ name, data, Bucket }) => {
  return S3.upload({
    Bucket,
    Key: `${name}.tar.gz`,
    Body: Buffer.from(data),
    StorageClass: 'ONEZONE_IA',
  }).promise()
}
