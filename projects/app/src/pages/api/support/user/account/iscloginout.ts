import type { NextApiRequest, NextApiResponse } from 'next';
import { NextAPI } from '@/service/middleware/entry';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log(req.body);
  return;
  //const { iscUserId } = req.body;
  const apiUrl = `https://isc-test.cctcltd.com:22022/isc_sso/logout?iscUserId=${1}&redirect_uri=http://localhost:3000`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default NextAPI(handler);
