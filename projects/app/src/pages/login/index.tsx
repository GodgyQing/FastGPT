import { useEffect } from 'react';
import { ChakraProvider, Center, Spinner } from '@chakra-ui/react';
import { serviceSideProps } from '@fastgpt/web/common/system/nextjs';

const randomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join('');
};

const Login = () => {
  useEffect(() => {
    const redirectUrl =
      'https://isc-test.cctcltd.com:22022/isc_sso/oauth2.0/authorize?response_type=token&client_id=122801&redirect_uri=http://localhost:3000/?&state=' +
      randomString(32);
    window.location.href = redirectUrl;
  }, []);

  return (
    <ChakraProvider>
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    </ChakraProvider>
  );
};

export async function getServerSideProps(content: any) {
  return {
    props: {
      ...(await serviceSideProps(content, ['app', 'user']))
    }
  };
}

export default Login;
