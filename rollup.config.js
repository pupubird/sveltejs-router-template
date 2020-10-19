import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import alias from "@rollup/plugin-alias";
import path from "path";
import { generateSW } from 'rollup-plugin-workbox'

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: {
		name: 'app',
		format: 'iife',
		sourcemap: false,
		dir: 'public/build',
	},
	inlineDynamicImports: true,
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		replace({
			'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// ALias
		alias({
			entries: [

				{
					find: "@",
					replacement: path.resolve(__dirname, "src/")
				},
			]
		}),

		// Workbox
		generateSW({
			swDest: 'public/sw.js',
			globDirectory: 'public/',
			globPatterns: [
				'**/*.{html,json,js,css}',
			],
			skipWaiting: true,
			clientsClaim: true,
			sourcemap: false,
			runtimeCaching: [{
				urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'images',
					expiration: {
						maxEntries: 10,
					},
				},
			}],
		})
	],


	watch: {
		clearScreen: false
	}
};
