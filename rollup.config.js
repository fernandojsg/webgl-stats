import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  plugins: [resolve({
    customResolveOptions: 'node_modules'
  })],
	// sourceMap: true,
	output: [
		{
			format: 'umd',
			name: 'WEBGLSTATS',
			file: 'dist/webgl-stats.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'dist/webgl-stats.module.js',
			indent: '\t'
    },
		{
			format: 'cjs',
			file: 'dist/webgl-stats.cjs.js',
			indent: '\t'
		}    
	]
};