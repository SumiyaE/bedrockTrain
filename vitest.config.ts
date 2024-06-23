import 'vitest/config';
import {defineConfig} from 'vite';

export default defineConfig({
  test: {
    globals: true, // describeやtest, it, expectなどをimport無しで使えるようにする
    pool: 'forks', // Needed for bundling NodeJSFunction during tests
    environment: 'node', include: ['./test/**/*.(test|spec).ts'], // 元のjestの設定が`test/`以下のファイルを参照する設定だったので合わせている
  },
});