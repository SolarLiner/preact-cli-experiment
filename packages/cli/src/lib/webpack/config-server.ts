import path from "path";

import Config from "webpack-chain";
import configBase from "./config-base";
import { WebpackEnvironmentBuild } from "./types";

export default function configServer(env: WebpackEnvironmentBuild) {
	return serverConfiguration(configBase(env), env);
}

function serverConfiguration(config: Config, env: WebpackEnvironmentBuild) {
	return config
		.entry("ssr-bundle")
		.add(env.source("index"))
		.end()
		.output.merge({
			publicPath: "/",
			filename: "ssr-bundle.js",
			path: path.resolve(env.dest, "ssr-build"),
			chunkFilename: "[name].chunk.[chunkhash:5].js",
			libraryTarget: "commonjs2"
		})
		.end()
		.externals({ preact: "preact" })
		.target("node")
		.resolveLoader.alias.set("async", path.resolve(__dirname, "./dummy-loader"))
		.end()
		.end();
}
