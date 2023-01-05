import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  themeConfig: {
    name: 'jad-quick',
  },
  alias: {
    utils: path.resolve(__dirname, 'utils'),
  },
});
