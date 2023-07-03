import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body className="min-h-screen bg-lightbeige dark:bg-blackbean text-blackbean dark:text-desertsand">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
