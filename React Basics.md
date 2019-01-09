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

