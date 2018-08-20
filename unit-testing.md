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