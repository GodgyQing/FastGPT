// App.js
import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button } from '@chakra-ui/react';
import AppListContextProvider, { AppListContext } from '@/pageComponents/app/list/context';
import { serviceSideProps } from '@fastgpt/web/common/system/nextjs';

const Apps = () => {
  return (
    <ChakraProvider>
      <Box textAlign="center" mt={10}>
        <Heading as="h1" size="xl" mb={4}>
          欢迎来到我的页面
        </Heading>
        <Text fontSize="lg" mb={6}>
          这是一个使用 Chakra UI 构建的简单页面。
        </Text>
        <Button colorScheme="blue" size="lg">
          点击我
        </Button>
      </Box>
    </ChakraProvider>
  );
};

function ContextRender() {
  return (
    <AppListContextProvider>
      <Apps />
    </AppListContextProvider>
  );
}

export default ContextRender;

export async function getServerSideProps(content: any) {
  return {
    props: {
      ...(await serviceSideProps(content, ['app', 'user']))
    }
  };
}
