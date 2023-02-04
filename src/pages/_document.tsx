import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}