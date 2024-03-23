import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const SSM = new SSMClient();
const S3 = new S3Client();

const path = '/gh-backup';

export async function getParameters() {
  const { Parameters } = await SSM.send(
    new GetParametersByPathCommand({
      Path: path,
      WithDecryption: true,
    }),
  );

  return [
    Parameters.find((param) => param.Name === `${path}/auth`).Value,
    Parameters.find((param) => param.Name === `${path}/bucket`).Value,
  ];
}

export function uploadToS3({ name, data, Bucket }) {
  return S3.send(
    new PutObjectCommand({
      Bucket,
      Key: `${name}.tar.gz`,
      Body: Buffer.from(data),
      StorageClass: 'ONEZONE_IA',
    }),
  );
}
