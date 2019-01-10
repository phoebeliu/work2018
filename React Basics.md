### [React Basics](https://teamtreehouse.com/library/react-basics-2)

####  Resources

- [reactjs.org](https://reactjs.org/)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

#### Recommended courses

- [Object-Oriented JavaScript](https://teamtreehouse.com/library/objectoriented-javascript-2)
- [JavaScript Array Iteration Methods](https://teamtreehouse.com/library/javascript-array-iteration-methods)
- [Getting Started With ES2015](https://teamtreehouse.com/library/getting-started-with-es2015-2)



## Running a simple local HTTP server

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server

1.Install Python

2.Open your command prompt (Windows)/ terminal (macOS/ Linux). To check Python is installed, enter the following command:

```bash
python -V
```

3.This should return a version number. If this is OK, navigate to the directory that your example is inside, using the `cd` command.

4.Enter the command to start up the server in that directory:

```
# If Python version returned above is 3.X
python3 -m http.server
# If Python version returned above is 2.X
python -m SimpleHTTPServer
```

By default, this will run the contents of the directory on a local web server, on port 8000. You can go to this server by going to the URL `localhost:8000` in your web browser. Here you'll see the contents of the directory listed — click the HTML file you want to run.

**Note**: If you already have something running on port 8000, you can choose another port by running the server command followed by an alternative port number, e.g. `python3 -m http.server 7800` (Python 3.x) or `python -m SimpleHTTPServer 7800` (Python 2.x). You can then access your content at `localhost:7800`.



https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel

JSX is an extension to the JavaScript language that uses a markup-like syntax to create React elements. Most React developers write their UI using JSX because it resembles writing HTML.

#### babel-standalone

```
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

#### Resources

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [Babel REPL](https://babeljs.io/repl)
- [JSX Represents Objects](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects)

The CDN-based approach is not useful in a production environment as soon as you start using JSX. The Babel script is ~800KB in size, which for most use cases, is too large of a download to be practical. In addition, there's the overhead in the browser of transpiling JSX into JavaScript.

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel" src="./app.js"></script>
```

A component is a piece of UI that you can reuse. Just like you're able to reuse code in JavaScript with functions, a component lets you reuse code that renders a part of your UI. Being able to split your UI code into independent, reusable pieces, and think about each piece in isolation is one the most embraced features of React.

Creating a React component is a two step process.

First you define the component as either a JavaScript function or class.

Then, you use and display the component with a JSX tag.

> React components are required to begin with an upper case letter.

#### Resources

- [Functional and Class Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)
- [Why use parenthesis on JavaScript return statements?](http://jamesknelson.com/javascript-return-parenthesis/)

While it isn’t required, the [React docs](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) recommend wrapping multiple lines of JSX in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi).

*It’s not clear to me why you need the parens and can’t just do return React.createElement. I tried that and it fails but I can’t see why. Isn’ttypeof x === typeof (x) in JavaScript?*

And while it is true that `typeof x === typeof (x)`, the same doesn’t always hold for `return`. Why?



There are two things about JavaScript’s `return` which are a little unintuitive:

1. A `return` statement followed by unreachable code is perfectly valid

   ```js
   function doSomething() {
       return
   
       // Valid, but will never be called
       doSomethingElse()
   }
   ```

2. JavaScript will automatically insert a semicolon at the first possible opportunity on a line after a `return` statement

——>报警了，竟然还有这种骚操作，服

```js
// JavaScript inserts a semicolon after the `return` statement! 
return; 

  React.createElement('li', {className: 'Contact'},
    React.createElement('h2', {className: 'Contact-name'}, this.props.name)
  )
```

http://jamesknelson.com/javascript-return-parenthesis/

大神膜拜一下