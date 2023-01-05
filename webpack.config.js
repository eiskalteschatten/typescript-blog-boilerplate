module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    adminAsync: { import: './assets/scripts/admin/async.ts', filename: 'scripts/admin/async.js' },
    adminImportant: { import: './assets/scripts/admin/important.ts', filename: 'scripts/admin/important.js' },
    blogAsync: { import: './assets/scripts/blog/async.ts', filename: 'scripts/async.js' },
    blogImportant: { import: './assets/scripts/blog/important.ts', filename: 'scripts/important.js' },
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
