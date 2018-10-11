# Switching from Gulp to webpack

https://www.valentinog.com/blog/from-gulp-to-webpack-4-tutorial/

copy from https://www.valentinog.com/blog/from-gulp-to-webpack-4-tutorial/

## Switching from Gulp to Webpack: configuring the project

To start, create a new directory to hold the project’s files:

1. mkdir from-gulp-to-webpack

Also, create some directories for the source assets:

1. cd from-gulp-to-webpack
2. mkdir -p src/{img,_scss}

and initialize package.jsonby running:

1. npm init -y

Next up install webpack and webpack-cli:

1. npm i webpack webpack-cli --save-dev

To use webpack within our NPM scripts add two scripts inside package.json:

1. "scripts": {
2.   "build": "webpack --mode production",
3.   "watch": "webpack --watch --mode development"
4. }

and we’re good to go!

**NOTE**: the *build* script builds the assets in a single shot. To continuously re-compile the assets on file saving run the *watch* script instead

## Switching from Gulp to Webpack: generating an HTML file from a template, minimizing the markup

First, **webpack is not like Gulp**. It was born aiming specifically at Javascript.

That means webpack doesn’t know how to handle other files than js.

That’s where **loaders** comes in to play.

Think of webpack loaders as of “transformers”.

To correctly **process HTML** files, Webpacks needs two additional components: **html-webpack-plugin** and **html-loader**.

Add them to the project with:

1. npm i html-webpack-plugin html-loader --save-dev

Now create a new file named webpack.config.js and add a base configuration:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ]
};
```

Most important things to know about the Webpack configuration file are:

1. **entry**: (optional) it’s our main Javascript file where all of the application’s code gets imported
2. **output**: (optional) it’s the resulting Javascript file, bundled by Webpack
3. **module and rules**: it’s the place where you configure the loaders
4. **plugins**: it’s the place where you configure which plugins Webpack will use

With this in place we are ready to generate our first HTML file. But first we need a template as a starting point.

Create ./scr/index.html:

