# [What is the difference between & vs @ and = in angularJS](https://stackoverflow.com/questions/14908133/what-is-the-difference-between-vs-and-in-angularjs)



`@` allows a value defined on the directive attribute to be passed to the directive's isolate scope. The value could be a simple string value (`myattr="hello"`) or it could be an AngularJS interpolated string with embedded expressions (`myattr="my_{{helloText}}"`). Think of it as "one-way" communication from the parent scope into the child directive. John Lindquist has a series of short screencasts explaining each of these. Screencast on @ is here: https://egghead.io/lessons/angularjs-isolate-scope-attribute-binding

`&` allows the directive's isolate scope to pass values into the parent scope for evaluation in the expression defined in the attribute. Note that the directive attribute is implicitly an expression and does not use double curly brace expression syntax. This one is tougher to explain in text. Screencast on & is here: https://egghead.io/lessons/angularjs-isolate-scope-expression-binding

`=` sets up a two-way binding expression between the directive's isolate scope and the parent scope. Changes in the child scope are propagated to the parent and vice-versa. Think of = as a combination of @ and &. Screencast on = is here: https://egghead.io/lessons/angularjs-isolate-scope-two-way-binding

And finally here is a screencast that shows all three used together in a single view: https://egghead.io/lessons/angularjs-isolate-scope-review

# `@`: one-way binding

`@` simply passes the property from `parentScope` to `isolatedScope`. It is called `one-way binding`, which means you cannot modify the value of `parentScope` properties. If you are familiar with JavaScript inheritance, you can understand these two scenarios easily:

- If the binding property is a primitive type, like `interpolatedProp` in the example: you can modify `interpolatedProp`, but `parentProp1` would not be changed. However, if you change the value of `parentProp1`, `interpolatedProp` will be overwritten with the new value (when angular $digest).

- If the binding property is some object, like `parentObj`: since the one passed to `isolatedScope` is a reference, modifying the value will trigger this error:

  `TypeError: Cannot assign to read only property 'x' of {"x":1,"y":2}`

# `=`: two-way binding

`=` is called `two-way binding`, which means any modification in `childScope` will also update the value in `parentScope`, and vice versa. This rule works for both primitives and objects. If you change the binding type of `parentObj` to be `=`, you will find that you can modify the value of `parentObj.x`. A typical example is [`ngModel`](https://docs.angularjs.org/api/ng/directive/ngModel).

# `&`: function binding

`&` allows the directive to call some `parentScope` function and pass in some value from the directive. For example, check [JSFiddle: & in directive scope](https://jsfiddle.net/6jwhcemb/2/).

Define a clickable template in the directive like: