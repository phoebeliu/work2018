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

Create ./scr/index.html:

alongside with a dummy Javascript file, ./scr/index.js:

1. console.log(`I've been required by Webpack`);

Now run your first build with:

1. npm run build

and right after Webpack finishes, check out the **dist** directory.

You should see the **resulting HTML file**, **minimized**. Also, if you open said file inside the browser you’ll see the expected output:

The message “I’ve been required by Webpack” should appear inside the console.

With Webpack there’s no need to include your Javascript inside the HTML file: the bundle will be automatically injected inside  <script></script>.

## Switching from Gulp to webpack: optimizing images

**Optimizing images** is paramount in modern web development. You don’t want to serve a 250KB image over a mobile connection.

You should already know about gulp-imagemin which is the image optimization module for Gulp.

Things are a bit different in webpack and to optimize images you have to make use of two loaders: [img-loader](https://www.npmjs.com/package/img-loader) and [url-loader](https://webpack.js.org/loaders/url-loader/).

To start, pull the dependencies inside your project:

1. npm i img-loader url-loader file-loader --save-dev

The **img-loader** is the actual loader responsible for optimizing images. But the **url-loader** comes first inside the chain. It’s configured so any image below a specified limit will become a **Base64 URL**.

Loading images as a Base64 URL has its own benefits: the browser does not have to load the image externally. While this is great it has some limits: you shouldn’t load bigger images as Base64 URL.

Anyway, you may wonder why I installed **file-loader**. Well, it is a fallback. If the image size is above the configured limit Webpack will load the image straight away.

Enough talking.

To test things out add two images to the previous HTML template. You can download some PNG from the internet and save them inside ./src/img/respectively as big-image.png and small-image.png:

Then let’s update the webpack configuration by adding the loaders:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
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



Run the build again with:

1. npm run build

and two things will happen:

1. the bigger image will be optimized
2. the smaller one will be inlined inside the HTML as a Base64 URL

## Switching from Gulp to webpack: compiling SASS to CSS, adding vendor prefixes to CSS

I don’t know whether some developer is writing plain CSS right now or not. But as for me writing **SASS** is the norm.

Does anybody write pure CSS out there?

Long story short a SASS file can’t be directly interpreted by browsers so you have to transform it to common CSS. Also, you may want to add vendor prefixes to ensure that (almost) all the browsers will understand your CSS.

That means in plain english:

1. take the SASS file and compile it to CSS
2. take the CSS and add vendor prefixes

With Gulp I had to resort to some kind of magic to make things work in sequence.

With webpack it’s a matter of adding some loaders.

Yet you have to extract the CSS to a file because webpack won’t do that by default.

This is a bit weird at first but I promise you’ll get used to it.

Let’s pull in the dependencies with:

1. npm i css-loader sass-loader postcss-loader node-sass mini-css-extract-plugin --save-dev

Also, the webpack configuration needs some changes:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
```



Now create a SASS file inside ./src/_scss/main.scss:

Import the style in ./src/index.js:

1. console.log(`I've been required by Webpack`);
2. import style from "./_scss/main.scss";

Create a file named postcss.config.js inside ./src/_scss/:

```js
module.exports = {
  plugins: [require("autoprefixer")]
};
```



finally open up package.json and configure the browsers list:

`"browserslist": ["last 2 versions"]`

Now run the build again with:

1. `npm i -D autoprefixer`//otherwise throw error

2. ```
   npm install file-loader --save-dev
   ```

3. https://chriscourses.com/blog/loading-fonts-webpack

4. >此处绝望，fontawesome 的path一直报错
   >
   >ERROR in ./src/scss/main.scss (./node_modules/css-loader!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/scss/main.scss)
   >    Module not found: Error: Can't resolve './webfonts/fa-solid-900.svg' in '/Users/pliu089/Documents/personal/work-info/projects/gulp-to-webpack/src/scss'
   >     @ ./src/scss/main.scss (./node_modules/css-loader!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/scss/main.scss) 7:68959-68997
   >
   >找不到原因，有点心累。

   

5. npm run build

and you’ll see that:

1. the SASS file gets compiled to CSS
2. the vendor prefixes gets added to the CSS

Also there’s no need to include the CSS inside the HTML file: it’s automagically injected inside a <link></link>tag.

Open up index.html inside your browser and fire up the console: you’ll see how the CSS works out of the box:

![Switching from Gulp to Webpack: compiling SASS to CSS, producing the minified version, adding vendor prefixes to CSS](https://www.valentinog.com/blog/wp-content/uploads/2017/10/webpack-vendor-prefixes-postcss.png)

So far, so good.

## Switching from Gulp to webpack: transpiling Javascript with Babel

![Switching from Gulp to Webpack: transpiling Javascript with Babel](https://www.valentinog.com/blog/wp-content/uploads/2017/10/from-gulp-to-webpack-babel.png)

First time I heard about “**transpiling**” I thought it was a joke. It is not.

Transpiling is the act of taking some **modern Javascript** syntax to make it understandable by older browsers.

In other words if you fancy using ES6 and friends you must first compile your code with **Babel**.

Take this example:

1. (() => {
2.   const IAmES6 = `I must be transpiled by Babel`;
3.   console.log(IAmES6);
4. })();

It won’t run everywhere. And that’s when Babel comes in to play. It can convert the above code into something meaningful for every browser.

[**webpack can transpile** our code with Babel](https://www.valentinog.com/blog/webpack-4-tutorial/#webpack_4_transpiling_Javascript_ES6_with_Babel). But it needs some loaders.

You can find the instruction for transpiling ES6 with Babel [here](https://www.valentinog.com/blog/webpack-4-tutorial/#webpack_4_transpiling_Javascript_ES6_with_Babel).

## Switching from Gulp to Webpack: watching files and re-compiling on save

We already have a mechanism for watching files and re-compiling on save. It’s the *watch* script inside package.json:

1. "scripts": {
2.   "build": "webpack --mode production",
3.   "watch": "webpack --watch --mode development"
4. }

This is fine but we can do it better. With the [webpack Dev Server](https://webpack.js.org/configuration/dev-server/).

So what the webpack Dev Server does exactly?

It takes only 3 lines of configuration to have a development server up and running. Once configured, you’ll run a npm script and Webpack will launch your application/website inside a browser.

To set up Webpack Dev Server install the package with:

1. npm i webpack-dev-server --save-dev

Open up package.json , add the *start* script (you can also get rid of the watch script):

1. "scripts": {
2.   "start": "webpack-dev-server --open --mode development",
3.   "build": "webpack --mode production"
4. }

save and close the file.

Now, by running

1. npm start

webpack Dev Server will launch your application inside the browser.

Also, every time you save a file after a modification Webpack Dev Server will **automagically refresh** the browser’s window.

It is fantastic, isn’t it?

## What now? Should you switch all your projects from Gulp to Webpack?

Are you comfortable with Gulp? Stick with it.

Do you need a modern module bundler? Do you need code splitting?

Give [webpack a try](https://www.valentinog.com/blog/webpack-4-tutorial/). You won’t regret it.

As for me, a Webpack configuration [like this one](https://github.com/valentinogagliardi/www.valentinog.com/blob/master/webpack.config.js) is better than writing [Javascript for Gulp](https://github.com/valentinogagliardi/www.valentinog.com/blob/aeaf3de09753f5b66ef5611f0b0e14aa1868a02d/gulpfile.js).

At the end of the day it’s a matter of personal preferences. As almost everything within the Javascript realm. I don’t want to persuade you.

Be aware that React, VueJS, and a lot of other projects use webpack as the default module bundler. Laravel made the switch from Gulp to Webpack too. **Ignoring Webpack won’t be an option** if you want to stay ahead.

## Switching from Gulp to Webpack: resources for learning Webpack

![Switching from Gulp to Webpack: resources for learning Webpack](https://www.valentinog.com/blog/wp-content/uploads/2017/10/webpack-logo-on-white-bg.png)

The webpack ecosystem is **huge**. It is almost impossible to cover everything inside a single article. As soon as you finish up reading, go check the following resources:

[Webpack documentation](https://webpack.github.io/)

[Webpack Academy by Sean Larkin](https://webpack.academy/)

[Webpack for Everyone by Jeffrey Way](https://laracasts.com/series/webpack-for-everyone)

Thanks for reading!

