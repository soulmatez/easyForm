import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json';

export default {
    input: 'index.js',
    output: [
        {
            file: './dist/easyform-umd.js',
            format: 'umd',
            name: 'easyform',
            globals: {
                vue: 'Vue',
            },
        },{
            file: './dist/easyform-es.js',
            format: 'es',
            globals: {
                vue: 'Vue',
            },
        },{
            file: './dist/easyform-cjs.js',
            format: 'cjs',
            globals: {
                vue: 'Vue',
            },
    }],
    plugins: [
        vue(),
        json(),
        babel({
            presets: [['@babel/preset-env', {
                targets: {
                browsers: ['ie 11'],
                },
            }]],
        }), // {exclude: 'node_modules/**'}
        nodeResolve(),
        postcss({
            plugins: [autoprefixer()]
        }),
        commonjs({
            include: /node_modules/
        }),
        terser()
    ],
    external: ['vue', 'dayjs', 'uview-ui']
}