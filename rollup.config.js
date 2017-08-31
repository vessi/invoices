// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

export default {
  input: `server/${process.env.entry}.js`,
  output: {
    file: `dist/${process.env.entry}.js`,
    format: 'cjs'
  },
  external: [ 'express', 'body-parser', 'http', 'sequelize', 'pluralize', 'path', 'morgan' ],
  plugins: [
    json(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ]
};
