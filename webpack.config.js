module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    adminAsync: './src/frontend/admin/async.ts',
    adminImportant: './src/frontend/admin/important.ts',
    async: './src/frontend/blog/async.ts',
    important: './src/frontend/blog/important.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/assets/scripts',
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
        options: {
          configFile: 'tsconfig.frontend.json',
        },
      },
    ],
  },
};
