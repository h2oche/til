const webpack = require('webpack');

module.exports = {
	entry: [
		'./src/index.js',
		'webpack-dev-server/client?http://localhost:8080'
	],
	output: {
		path: './bin',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		contentBase: './bin'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: function() {
				warnings: false
			},
			output: function() {
				comments: false
			}
		})
	]
}