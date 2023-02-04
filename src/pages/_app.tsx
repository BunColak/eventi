import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Box, Container, MantineProvider, Paper } from '@mantine/core';

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Box bg='gray.1' mih='100vh'>
          <Container size='sm' py='lg'>
            <Paper shadow='md' p='xl' radius='lg'>
              <Component {...pageProps} />
            </Paper>
          </Container>
        </Box>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
