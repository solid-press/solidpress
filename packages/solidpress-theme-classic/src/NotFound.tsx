import Layout from '@theme/Layout';

import type {JSX} from 'solid-js';

export default function NotFound(): JSX.Element {
  return (
    <>
      <Layout>
        <main class="sp-main">
          <h1>Page Not Found</h1>
          <p>The page that you are looking for does not exist</p>
          <p>
            Please contact the owner of the site that linked you to the original
            URL and let them know their link is broken.
          </p>
        </main>
      </Layout>
    </>
  );
}
