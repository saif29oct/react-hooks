import fs from 'fs';
import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';

// Read package.json synchronously
const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfig: 'tsconfig.json',
        }),
        terser(),
    ],
};
