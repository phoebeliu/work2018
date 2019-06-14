# 5 Tips to Write Better Conditionals in JavaScript

<https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript>

When working with JavaScript, we deal a lot with conditionals, here are the 5 tips for you to write better / cleaner conditionals.

## [1. Use Array.includes for Multiple Criteria](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-1-use-array-includes-for-multiple-criteria)

Let's take a look at the example below:

### Table of Contents

- [1. Use Array.includes for Multiple Criteria](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-1-use-array-includes-for-multiple-criteria)
- [2. Less Nesting, Return Early](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-2-less-nesting-return-early)
- [3. Use Default Function Parameters and Destructuring](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-3-use-default-function-parameters-and-destructuring)
- [4. Favor Map / Object Literal than Switch Statement](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-4-favor-map-object-literal-than-switch-statement)
- [5. Use Array.every & Array.some for All / Partial Criteria](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-5-use-array-every-array-some-for-all-partial-criteria)
- [Summary](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-summary)

```javascript
// condition
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
```

At first glance, the above example looks good. However, what if we get more red fruits, say `cherry` and `cranberries`? Are we going to extend the statement with more `||` ?

We can rewrite the conditional above by using `Array.includes` [(Array.includes)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

```javascript
function test(fruit) {
  // extract conditions to array
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```

We extract the `red fruits` (conditions) to an array. By doing this, the code looks tidier.

## [2. Less Nesting, Return Early](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-2-less-nesting-return-early)

Let's expand the previous example to include two more conditions:

- if no fruit provided, throw error
- accept and print the fruit quantity if exceed 10.

```javascript
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // condition 1: fruit must has value
  if (fruit) {
    // condition 2: must be red
    if (redFruits.includes(fruit)) {
      console.log('red');

      // condition 3: must be big quantity
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

// test results
test(null); // error: No fruits
test('apple'); // print: red
test('apple', 20); // print: red, big quantity
```

Look at the code above, we have:

- 1 if/else statement that filter out invalid condition
- 3 levels of nested if statement (condition 1, 2 & 3)

A general rule I personally follow is **return early when invalid conditions** found.

```javascript
/_ return early when invalid conditions found _/

function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // condition 1: throw error early
  if (!fruit) throw new Error('No fruit!');

  // condition 2: must be red
  if (redFruits.includes(fruit)) {
    console.log('red');

    // condition 3: must be big quantity
    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}
```

By doing this, we have one less level of nested statement. This coding style is good especially when you have long if statement (imagine you need to scroll to the very bottom to know there is an else statement, not cool).

We can further reduce the nesting if, by inverting the conditions & return early. Look at condition 2 below to see how we do it:

```javascript
/_ return early when invalid conditions found _/

function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early
  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red

  console.log('red');

  // condition 3: must be big quantity
  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

By inverting the conditions of condition 2, our code is now free of a nested statement. This technique is useful when we have long logic to go and we want to stop further process when a condition is not fulfilled.

However, that's no **hard rule** for doing this. Ask yourself, is this version (without nesting) better / more readable than the previous one (condition 2 with nested)?

For me, I would just leave it as the previous version (condition 2 with nested). It is because:

- the code is short and straight forward, it is clearer with nested if
- inverting condition may incur more thinking process (increase cognitive load)

Therefore, always **aims for Less Nesting and Return Early but don't overdo it**. There is an article & StackOverflow discussion that talks further on this topic if you interested:

- [Avoid Else, Return Early](http://blog.timoxley.com/post/47041269194/avoid-else-return-early) by Tim Oxley
- [StackOverflow discussion](https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement) on if/else coding style

## [3. Use Default Function Parameters and Destructuring](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-3-use-default-function-parameters-and-destructuring)

I guess the code below might look familiar to you, we always need to check for `null` / `undefined` value and assign default value when working with JavaScript:

```javascript
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1; // if quantity not provided, default to one

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

In fact, we can eliminate the variable `q` by assigning default function parameters.

```javascript
function test(fruit, quantity = 1) { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

Much easier & intuitive isn't it? Please note that each parameter can has it own [default function parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters). For example, we can assign default value to `fruit` too: `function test(fruit = 'unknown', quantity = 1)`.

What if our `fruit` is an object? Can we assign default parameter?

```javascript
function test(fruit) { 
  // printing fruit name if value provided
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

Look at the example above, we want to print the fruit name if it's available or we will print unknown. We can avoid the conditional `fruit && fruit.name` checking with default function parameter & destructing.

```javascript
// destructing - get name property only
// assign default empty object {}
function test({name} = {}) {
  console.log (name || 'unknown');
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

Since we only need property `name` from fruit, we can destructure the parameter using `{name}`, then we can use `name` as variable in our code instead of `fruit.name`.

We also assign empty object `{}` as default value. If we do not do so, you will get error when executing the line `test(undefined)` - `Cannot destructure property name of 'undefined' or 'null'.` because there is no `name` property in undefined.

If you don't mind using 3rd party libraries, there are a few ways to cut down null checking:

- use [Lodash get](https://lodash.com/docs/4.17.10#get) function
- use Facebook open source's [idx](https://github.com/facebookincubator/idx) library (with Babeljs)

Here is an example of using Lodash:

```javascript
// Include lodash library, you will get _
function test(fruit) {
  console.log(__.get(fruit, 'name', 'unknown'); // get property name, if not available, assign default value 'unknown'
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

You may run the demo code [here](http://jsbin.com/bopovajiye/edit?js,console). Besides, if you are a fan of Functional Programming (FP), you may opt to use [Lodash fp](https://github.com/lodash/lodash/wiki/FP-Guide), the functional version of Lodash (method changed to `get` or `getOr`).

## [4. Favor Map / Object Literal than Switch Statement](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-4-favor-map-object-literal-than-switch-statement)

Let's look at the example below, we want to print fruits based on color:

```javascript
function test(color) {
  // use switch case to find fruits in color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

//test results
test(null); // []
test('yellow'); // ['banana', 'pineapple']
```

The above code seems nothing wrong, but I find it quite verbose. The same result can be achieve with object literal with cleaner syntax:

```javascript
// use object literal to find fruits in color
  const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };

function test(color) {
  return fruitColor[color] || [];
}
```

Alternatively, you may use [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) to achieve the same result:

```javascript
// use Map to find fruits in color
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}
```

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is the object type available since ES2015, allow you to store key value pair.

*Should we ban the usage of switch statement?* Do not limit yourself to that. Personally, I use object literal whenever possible, but I wouldn't set hard rule to block that, use whichever make sense for your scenario.

Todd Motto has an article that dig deeper on switch statement vs object literal, you may read [here](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/).

### TL;DR; Refactor the syntax

For the example above, we can actually refactor our code to achieve the same result with `Array.filter` .

```javascript
 const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
];

function test(color) {
  // use Array filter to find fruits in color

  return fruits.filter(f => f.color == color);
}
```

There's always more than 1 way to achieve the same result. We have shown 4 with the same example. Coding is fun!

## [5. Use Array.every & Array.some for All / Partial Criteria](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-5-use-array-every-array-some-for-all-partial-criteria)

This last tip is more about utilizing new (but not so new) Javascript Array function to reduce the lines of code. Look at the code below, we want to check if all fruits are in red color:

```javascript
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}
```

The code is so long! We can reduce the number of lines with `Array.every`:

```javascript
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
```

Much cleaner now right? In a similar way, if we want to test if any of the fruit is red, we can use `Array.some` to achieve it in one line.

```javascript
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
```

## [Summary](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-summary)

Let's produce more readable code together. I hope you learn something new in this article.

That's all. Happy coding!