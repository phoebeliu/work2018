# !!undefined



# ngDisabled

(https://code.angularjs.org/1.4.5/docs/api/ng)

This directive sets the `disabled` attribute on the element if the [expression](https://code.angularjs.org/1.4.5/docs/guide/expression) inside `ngDisabled` evaluates to truthy.

`so if "ng-disabled=undefined" it will not disabled`

>
>
>Because in angular expression undefined will be false
>
>

## Angular Expressions vs. JavaScript Expressions

Angular expressions are like JavaScript expressions with the following differences:

- **Context:** JavaScript expressions are evaluated against the global `window`. In Angular, expressions are evaluated against a [`scope`](https://code.angularjs.org/1.4.5/docs/api/ng/type/$rootScope.Scope) object.
- **Forgiving:** In JavaScript, trying to evaluate undefined properties generates `ReferenceError` or `TypeError`. In Angular, expression evaluation is forgiving to `undefined` and `null`.
- **No Control Flow Statements:** You cannot use the following in an Angular expression: conditionals, loops, or exceptions.
- **No Function Declarations:** You cannot declare functions in an Angular expression, even inside `ng-init` directive.
- **No RegExp Creation With Literal Notation:** You cannot create regular expressions in an Angular expression.
- **No Comma And Void Operators:** You cannot use `,` or `void` in an Angular expression.
- **Filters:** You can use [filters](https://code.angularjs.org/1.4.5/docs/guide/filter) within expressions to format data before displaying it.

If you want to run more complex JavaScript code, you should make it a controller method and call the method from your view. If you want to `eval()` an Angular expression yourself, use the [`$eval()`](https://code.angularjs.org/1.4.5/docs/api/ng/type/$rootScope.Scope#$eval) method.

```js
!undefined  
true
!!undefined
false

undefined == true
false//---->very  interesting
undefined == false
false

!!0
false
!!1
true

!!true
true
!!false
false

!!'true'
true
!!'false'//--->string will always be true
true
!'false'
false
```

