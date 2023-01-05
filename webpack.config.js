module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    adminAsync: './src/frontend/admin/async.ts',
    adminImportant: './src/frontend/admin/important.ts',
    async: './src/frontend/blog/async.ts',
    important: './src/frontend/blog/important.ts',
    shared: './src/styles/shared.scss',
  },
  output: {
    filename: 'scripts/[name].js',
    path: __dirname + '/public/dist',
    clean: true,
  },
  module: {
    rules: [
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
