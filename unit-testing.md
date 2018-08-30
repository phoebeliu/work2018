# [JavaScript Unit Testing](https://teamtreehouse.com/library/javascript-unit-testing)

behavior driven development(BDD)

tests : describe the expected behavior of our application.

Since unit tests focus on small, meaningful chunks of functionality, good unit tests are easy to understand.



#### Resources

- [Mocha](https://mochajs.org/)

#### Benefits of automated testing

- Results displayed in an informative way
- Test files are separate from real code
- Output is easy to read and understand
- Guarantees code works as expected
- Instantly see if anything has broken when making changes

#### Video review

**Unit tests**
You run unit tests constantly during the development process to ensure that everything is working, every time you make a change.

**Integration tests**
You use integration tests when you add new code to pre-existing code, to make sure that not only do all of the pieces work individually as expected, but also that they run together correctly without breaking.

**End-to-end testing**
Run your application from start to finish for all the user stories you can think of. This ensures that the program is ready to go live, and that the special details of deployment do not mess up the code you carefully tested on your local machine with unit tests and integration tests. You conduct end-to-end tests occasionally, maybe only a few times during a product’s life-cycle, as they are very time consuming and expensive.

#### Resources

- [Integration Test Examples](http://zeroturnaround.com/rebellabs/the-correct-way-to-use-integration-tests-in-your-build-process/)
- [Mocha Test Suites](https://mochajs.org/#dynamically-generating-tests)

#### Video review

- Behavior Driven Development is like creating a plan before you write your program
- Start by describing how the program should work, then write code until it works the way you expect it to work
- If your tests are good, you can be confident that your functions really do what they’re supposed to do

#### Red > Green > Refactor

1. Write the tests, even though at first they’ll fail
2. Fix the function in the first way that comes to mind, just to get your tests passing
3. Go back and refactor the function for improvements, repeating the cycle until you’re ready to move on

#### Using Chai

- [Chai Installation Documentation](http://chaijs.com/guide/installation/)
- [Chai Assertion Styles](http://chaijs.com/guide/styles/)

#### Resources

- [Using Title Case](http://grammar-monster.com/lessons/capital_letters_title_case.htm)

#### Recommended reading

- [Steven Anderson Blog: Writing Great Unit Tests](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/)



#### Video review

- To have Mocha and Chai in your project, type `npm install --save-dev mocha chai`
- The `--save-dev` flag means that these tools are just for development

#### Resources

- [Chai BDD API Documentation](http://chaijs.com/api/bdd/)
- [`.not`](http://chaijs.com/api/bdd/#method_not)
- [`.empty`](http://chaijs.com/api/bdd/#method_empty)
- [`.deep`](http://chaijs.com/api/bdd/#method_deep)

#### Video review

- Chai's `.empty` method checks for empty objects, arrays, or strings
- `.empty` makes it easy to write expectations without worrying about how the real code will work
- You call arrays that look the same “deeply equal”, because their “deep” internal values are equal
- The `.deep` method allows you to make deep equality comparisons
- We might have to adjust our functions as we go
- It’s ok to throw away code that was working, even if you spent time writing tests for it already; it's one of the biggest benefits of having unit tests
- Our unit tests will tell us exactly what breaks, and how, as we rebuild parts of our code

#### Resources

- [Mocha Hooks](https://mochajs.org/#hooks)
- [DRY: Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

#### Video review

- Mocha provides useful functions to help us set up conditions for our tests, like creating test objects and simulating the conditions inside our app
- The "setup" phase is the part of our tests where we set up conditions for testing
- Mocha splits the setup process into two blocks: the stuff we set up **before** the entire series of tests, and the stuff we set up **before each** individual test
- Mocha provides the hooks `before()`, `after()`, `beforeEach()`, and `afterEach()` to set up preconditions and clean up after your tests
- `beforeEach()` works like before, only it will run the function before each spec, instead of just once at the start of the suite

#### Video review

- Mocha provides a "teardown" phase to remove unwanted variables
- If your tests change your development environment, like creating a pretend database, or start up a local server, you can use the teardown block to set your system back to where it started
- Mocha's `after()` and `afterEach()` hooks work exactly like `before()` and `beforeEach()`, expect that they happen *after*
- If you find yourself depending heavily on the teardown phase, you should double-check that you’re testing the right kind of function

#### Resources

- [Chai Assertion Library: `throw`](http://chaijs.com/api/bdd/#method_throw)

#### Video review

- An edge case is a radical situation your function might end up in, but it isn’t how your function would normally work
- Edge cases occur at an extreme (maximum or minimum) operating parameter
- Predicting edge cases can be challenging
- Spend a little time thinking about the edge cases that are most likely to come up

#### Challenge review

- The way `computerFire` is written is not testable; the only tests we can write for it are trivial and uninformative
- Refactor the two "computer" functions I’ve written so that they’re more testable
- Try to rewrite the set of functions so that we can still generate random locations
- You might need to move the code generating random numbers into their own functions in order to isolate the problem

#### Resources

- [Mocha Reporters](https://mochajs.org/#reporters)
- [Using Markdown](https://daringfireball.net/projects/markdown/basics)

#### Video review

- A good use of the `--reporter` flag is when you only want to see test failures
- To show only the failing test errors, you can use `mocha --reporter min`
- `mocha --reporter markdown` will print the same test report we’re used to, but using markdown formatting
- You can add a `--reporter` flag to your `package.json` -- file in your “test” command -- so that `npm test` will always use that reporter

#### Resources

- [Pending tests in Mocha](https://mochajs.org/#pending-tests)

#### Video review

- To mark a test as “pending”, do not add a function as a second argument
- You can also mark tests as "pending" by typing an `x` in front of the pending block, like `xdescribe()` or `xit()`
- Adding an `x` in front of the `describe()` block marks all of the specs inside as "pending"

#### Video review

- You can write custom `mocha --watch` commands whenever you plan on working on one particular file a lot
- You can also save a general `--watch` command in your `package.json` to run your tests all the time

**For example:**

```
"scripts":  {
  "test": "mocha",
  "test:watch": "mocha --watch ./test ./"
 }
```

The first argument describes the tests you want to run: all the tests in the `./test` directory. The second argument describes the files you want to watch for changes: all the files in the current directory `./`. You must include a `.` at the start of your file path, or Mocha will get confused on which files you’re looking for.

#### Resources

- [When and Why to use Mocks and Stubs](http://sinonjs.org/docs/) by Sinon
- [Sinon.js](http://sinonjs.org/)

#### Video review

- It’s sometimes helpful to pretend that you know how certain functions work in order to get started -- you can take this idea even further with mocks and stubs
- Using stubs lets you test logic that depends on important decisions about your code, without having to actually make them yet
- A test spec can use a "stub" version of a function to get all the values it needs for testing your logic, no matter how the real function is actually implemented

#### Resources

- [Testing asynchronous code with Mocha](https://mochajs.org/#asynchronous-code)

#### Video review

- Mocha allows us to say that a test spec or test suite is "asynchronous"
- Passing an argument to the internal function of a `describe()` or `it()` block will tell Mocha to wait on running our expectations until we specifically say so
- Passing the `done` argument to our test spec tells Mocha that it’s supposed to wait for our instructions before checking our expectations.
- Mocha will wait for `done()` to fire before checking the expectations