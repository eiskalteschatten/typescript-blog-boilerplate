module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    shared: { import: './assets/scripts/shared.ts', filename: 'scripts/shared.js' },
    bootstrap: { import: './assets/scripts/bootstrap.ts', filename: 'scripts/bootstrap.js' },
    admin: { import: './assets/scripts/admin/scripts.ts', filename: 'scripts/admin/scripts.js' },
    blog: { import: './assets/scripts/blog/scripts.ts', filename: 'scripts/scripts.js' },
  },
  output: {
    filename: 'scripts/[name].js',
    path: __dirname + '/public/dist',
    clean: process.env.NODE_ENV !== 'development',
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
