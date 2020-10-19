import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import alias from "@rollup/plugin-alias";
import path from "path";
import { generateSW } from 'rollup-plugin-workbox'
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss'

const production = !process.env.ROLLUP_WATCH;
const pwa = !process.env.DISABLE_PWA && production;

export default {
	input: 'src/main.js',
	output: {
		name: 'app',
		format: 'esm',
		sourcemap: false,
		dir: 'public/build',
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
		}),


		postcss({
			extract: true,
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
		pwa && generateSW({
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
		}),

		//Added cleaner to clean the chunk files on changes
		cleaner({
			targets: [
				'public/build/'
			]
		}),
	],


	watch: {
		clearScreen: false
	}
};
