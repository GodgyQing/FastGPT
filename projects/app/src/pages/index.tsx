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
    if (router.asPath.indexOf('access_token=') !== -1) {
      isclogin(iscToken);
      // postLogin({
      //   username: 'guoyuqing',
      //   password: '123456'
      // }).then((res) => {
      //   console.log(999);
      //   router.push('/app/list');
      // });
    } else {
      window.location.href = `https://isc-test.cctcltd.com:22022/isc_sso/oauth2.0/authorize?response_type=token&client_id=122801&redirect_uri=http://localhost:3000/?&state=" + this.randomString(32)`;
    }
    router.push('/app/home');
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
