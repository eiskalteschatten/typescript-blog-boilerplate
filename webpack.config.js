const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    shared: { import: './assets/scripts/shared.ts', filename: 'shared.js' },
    // bootstrap: { import: './assets/scripts/bootstrap.ts', filename: 'bootstrap.js' },
    admin: { import: './assets/scripts/admin/index.ts', filename: 'admin/scripts.js' },
    blog: { import: './assets/scripts/blog/index.ts', filename: 'blog/scripts.js' },
    webComponents: { import: './assets/webComponents/index.ts', filename: 'webComponents.js' },

  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/dist',
    clean: process.env.NODE_ENV !== 'development',
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
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
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
