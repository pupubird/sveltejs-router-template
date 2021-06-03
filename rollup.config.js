import svelte from "rollup-plugin-svelte";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import path from "path";
import { generateSW } from "rollup-plugin-workbox";
import postcss from "rollup-plugin-postcss";
import livereload from "rollup-plugin-livereload";
import del from "rollup-plugin-delete";

const production = !process.env.ROLLUP_WATCH;
const pwa = !process.env.DISABLE_PWA && production;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn(
				"npm",
				["run", "start", "--", "--dev"],
				{
					stdio: ["ignore", "inherit", "inherit"],
					shell: true,
				}
			);

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		},
	};
}

export default {
	input: "src/main.js",
	output: production
		? {
				name: "app",
				format: "esm",
				sourcemap: false,
				dir: "public/build",
		  }
		: {
				name: "app",
				format: "iife",
				sourcemap: true,
				dir: "public/build",
		  },
	inlineDynamicImports: !production,
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

		// Watch file changes
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("public"),

		replace({
			"process.env.NODE_ENV": JSON.stringify(
				production ? "production" : "development"
			),
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// ALias
		alias({
			entries: [
				{
					find: "@",
					replacement: path.resolve(__dirname, "src/"),
				},
			],
		}),

		// Workbox
		pwa &&
			generateSW({
				swDest: "public/sw.js",
				globDirectory: "public/",
				globPatterns: ["**/*.{html,json,js,css}"],
				skipWaiting: true,
				clientsClaim: true,
				sourcemap: false,
				runtimeCaching: [
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "images",
							expiration: {
								maxEntries: 10,
							},
						},
					},
				],
			}),
		// Clean up chunk files
		del({ targets: "public/build/*", hook: "buildEnd" }),
	],

	watch: {
		clearScreen: false,
	},
};
