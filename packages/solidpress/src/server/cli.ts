import c from 'picocolors';
import minimist from 'minimist';
import {SOLIDPRESS_VERSION} from '@solidpress/utils';
import {createServer} from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argv: any = minimist(process.argv.slice(2));

export default async (): Promise<void> => {
  console.log(c.cyan(`solidpress v${SOLIDPRESS_VERSION}`));

  const [command] = argv._;
  const root = argv._[command ? 1 : 0];
  if (root) {
    argv.root = root;
  }

  if (!command || command === 'dev') {
    const createDevServer = async () => {
      const server = await createServer(
        root,
        argv,
        // async () => {
        //   await server.close()
        //   await createDevServer()
        // }
      );
      await server.listen();
      console.log();
      server.printUrls();
    };
    createDevServer().catch((err) => {
      console.error(c.red(`failed to start server. error:\n`), err);
      process.exit(1);
    });
    // } else if (command === 'build') {
    //   build(root, argv).catch((err) => {
    //     console.error(c.red(`build error:\n`), err)
    //     process.exit(1)
    //   })
    // } else if (command === 'serve') {
    //   serve(argv).catch((err) => {
    //     console.error(c.red(`failed to start server. error:\n`), err)
    //     process.exit(1)
    //   })
  } else {
    console.log(c.red(`unknown command "${command}".`));
    process.exit(1);
  }
};
