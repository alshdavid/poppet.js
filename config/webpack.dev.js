module.exports = {
    devtool: 'eval-source-map',
    resolve: {
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
    entry: ['./polyfills.js', './src/index.js'],
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" ,
                query: {
                    presets: ['env'],
                    plugins: [
                        'transform-object-rest-spread', 
                        'transform-class-properties',
                        ['transform-react-jsx', { pragma:'h' }]
                    ]
                }
            },
            {
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')({
									browsers: ['last 3 version']
								})
							]
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}
        ]
    }
}
