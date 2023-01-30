import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

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
        babel({
            presets: [['@babel/preset-env', {
                targets: {
                browsers: ['ie 11'],
                },
            }]],
        }), // {exclude: 'node_modules/**'}
        nodeResolve(),
        postcss(),
        commonjs({
            include: /node_modules/
        }),
        terser()
    ],
    // external: ['vue', 'dayjs']
}