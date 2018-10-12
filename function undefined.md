# function declaration

## Function declaration hoisting

Function a(){}

Var a = function(){}

$scope.a = function(){}

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#Function_declaration_hoisting

Function declarations in JavaScript are hoisted to the top of the enclosing function or global scope. You can use the function before you declared it:

```javascript
hoisted(); // logs "foo"

function hoisted() {
  console.log('foo');
}
```

Note that [`function expressions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) are not hoisted:

```javascript
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function() {
   console.log('bar');
};
```

https://stackoverflow.com/questions/7609276/javascript-function-order-why-does-it-matter

**tl;dr** If you're not calling anything until everything loads, you should be fine. 

------

Edit: For an overview which also covers some ES6 declarations (`let`, `const`): <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Scope_Cheatsheet>

This weird behavior depends on

1. How you define the functions and
2. When you call them.

Here's some examples.

```js
bar(); //This won't throw an error
function bar() {}

foo(); //This will throw an error
var foo = function() {}

----

bar();
function bar() {
    foo(); //This will throw an error
}
var foo = function() {}

----

bar();
function bar() {
    foo(); //This _won't_ throw an error
}
function foo() {}

---

function bar() {
    foo(); //no error
}
var foo = function() {}
bar();
```

This is because of something called **hoisting**!

There are two ways to define functions: Function *declaration* and function *expression*. The difference is annoying and minute, so let's just say this slightly wrong thing: If you're writing it like `function name() {}`, it's a **declaration**, and when you write it like `var name = function() {}`(or an anonymous function assigned to a return, things like that), it's a function **expression**.

### First, let's look at how variables are handled:

```js
var foo = 42;

//the interpreter turns it into this:
var foo;
foo = 42;
```

### Now, how function *declarations* are handled:

```js
var foo = 42;
function bar() {}

//turns into
var foo; //Insanity! It's now at the top
function bar() {}
foo = 42;
```

The `var` statements "throws" the *creation* of `foo` to the very top, but doesn't assign the value to it yet. The function declaration comes next in line, and finally a value is assigned to `foo`.

### And what about this?

```js
bar();
var foo = 42;
function bar() {}
//=>
var foo;
function bar() {}
bar();
foo = 42;
```

Only the *declaration* of `foo` is moved to the top. The assignment comes only after the call to `bar`is made, where it was before all the hoisting occurred.

### And finally, for conciseness:

```js
bar();
function bar() {}
//turns to
function bar() {}
bar();
```

### Now, what about function *expressions*?

```js
var foo = function() {}
foo();
//=>
var foo;
foo = function() {}
foo();
```

Just like regular variables, first `foo` is *declared* at the highest point of the scope, then it is assigned a value.

### Let's see why the second example throws an error.

```js
bar();
function bar() {
    foo();
}
var foo = function() {}
//=>
var foo;
function bar() {
    foo();
}
bar();
foo = function() {}
```

As we've seen before, only the creating of `foo` is hoisted, the assignment comes where it appeared in the "original" (un-hoisted) code. When `bar` is called, it is before `foo` is assigned a value, so `foo === undefined`. Now in the function-body of `bar`, it's as if you're doing `undefined()`, which throws an error.