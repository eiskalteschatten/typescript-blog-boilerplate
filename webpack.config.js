module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    admin: './src/frontend/admin/index.ts',
    blog: './src/frontend/blog/index.ts',
  },
  output: {
    filename: '[name].[ext]',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'sass-loader',
        ],
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        configFile: 'tsconfig.frontend.json',
      },
    ],
  },
};
