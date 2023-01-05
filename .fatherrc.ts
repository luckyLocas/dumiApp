import * as path from 'path';

export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  esm: {
    output: 'dist',
  },
  alias: {
    utils: path.resolve(__dirname, 'utils'),
  },
};
