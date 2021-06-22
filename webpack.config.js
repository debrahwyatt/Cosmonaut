
//import path
const path = require('path');

//Main function
module.exports = {
	mode: 'development',

	//Find the source js file
	entry: './src/index.js',

	//output the bundled js file
	output:{
		//the path to the bundle
		path: path.resolve(__dirname, 'build'),

		//The bundeled filename
		filename: "index.js"	
	},

	//The development server source map
	devtool: 'inline-source-map',

	//development server folder to run
	devServer: {
	contentBase: './build',
	},
	module: {
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					// options:{
					// 	presets: ['@babel/preset-env']
					// }
				}
			},
			{
      	test: /\.css$/,
      	use: ['style-loader', 'css-loader']
    	}
    ]
	}
};