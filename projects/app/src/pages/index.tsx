import { serviceSideProps } from '@fastgpt/web/common/system/nextjs';
import React, { useEffect } from 'react';
import Loading from '@fastgpt/web/components/common/MyLoading';
import { useRouter } from 'next/router';
import { postLogin, isclogin } from '@/web/support/user/api';

const index = () => {
  const router = useRouter();
  function getQueryParams(name: string, url: string = window.location.href) {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(
          /\+/g,
          '%20'
        )
      ) || null
    );
  }
  useEffect(() => {
    let iscToken = getQueryParams('#access_token');
    if (iscToken) {
      isclogin(iscToken).then((res: any) => {
        console.log(res, 999);
        sessionStorage.setItem('info', res.data);
        router.push('/app/home');
      });
      // postLogin({
      //   username: 'guoyuqing',
      //   password: '123456'
      // }).then((res) => {
      //   console.log(999);
      //   router.push('/app/list');
      // });
    } else {
      window.location.href =
        'https://iscsso.cctcltd.com:22022/isc_sso/oauth2.0/authorize?response_type=token&client_id=9761295426&redirect_uri=http://10.88.121.83:3000/?&state=cctc';
      // window.location.href = "https://iscsso.cctcltd.com:22022/isc_sso/oauth2.0/authorize?response_type=token&client_id=9761295426&redirect_uri=http://localhost:3000/?&state=cctc";
    }
  }, [router]);
  return <Loading></Loading>;
};

export async function getServerSideProps(content: any) {
  return {
    props: {
      ...(await serviceSideProps(content))
    }
  };
}
export default index;
