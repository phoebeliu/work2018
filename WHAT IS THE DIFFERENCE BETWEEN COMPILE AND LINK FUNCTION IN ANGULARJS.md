# WHAT IS THE DIFFERENCE BETWEEN COMPILE AND LINK FUNCTION IN ANGULARJS ?

#### http://www.pro-tekconsulting.com/blog/what-is-the-difference-between-compile-and-link-function-in-angularjs/

#### What is the difference between compile and link function in angularjs ?

In compile phase the angular parser starts parsing the DOM and whenever the parser encounters a directive it creates a function. These functions are termed as template or compiled functions. In this phase we do not have access to the $scope data. In the link phase the data i.e. ($scope) is attached to the template function and executed to get the final HTML output.

Compile – It works on template. It’s like adding a class element in to the DOM (i.e., manipulation of tElement = template element), hence manipulations that apply to all DOM clones of the template associated with the directive.

Link – It works on instances. Usually used for registering DOM listeners (i.e., $watch expressions on the instance scope) as well as instance DOM manipulation. (i.e., manipulation of iElement = individual instance element).



https://odetocode.com/blogs/scott/archive/2014/05/28/compile-pre-and-post-linking-in-angularjs.aspx

# Compile, Pre, and Post Linking in AngularJS

```html
<div ng-repeat="i in [0,1,2]">
    <simple>
        <div>Inner content</div>
    </simple>
</div>
```

Notice the directive appears once inside an *ng-repeat* and will need to render three times. The directive also contains some inner content.

What we want to focus on is how and when the various directive functions execute, as well as the arguments to the compile and linking functions.

To see what happens we’ll use the following shell of a directive definition.

```js
app.directive("simple", function(){
   return {
     restrict: "EA",
     transclude:true,
     template:"<div>{{label}}<div ng-transclude></div></div>",
 
     compile: function(element, attributes){
 
         return {
             pre: function(scope, element, attributes, controller, transcludeFn){
 
             },
             post: function(scope, element, attributes, controller, transcludeFn){
 
             }
         }
     },
     controller: function($scope){
 
     }
   };
});
```

### Compile Executes Once

The first function to execute in the *simple* directive during view rendering will be the *compile* function. The *compile* function will receive the *simple* element as a jqLite reference.

Notice how Angular has already added the directive template, but has not performed any transclusion or setup the data binding.

At this point it is safe for the code inside the *compile* function to manipulate the element, however it is not a place where you want the code to wire up event handlers. The element passed to compile in this scenario will be an element that the framework clones three times because we are working inside an *ngRepeat*. It will be the clones of this element the framework places into the DOM, and these clones are not available until the linking functions start to run. The idea behind the compilation step is to allow for one time DOM manipulation before the cloning – a performance optimization.

This compile function in the sample above returns an object with the pre and post linking functions. However, many times we don’t need to hook into the compilation phase, so we can have a *link* function instead of a *compile* function.

```js
app.directive("simple", function(){
    return {
       //... 
        link: function(scope, element, attributes){
 
        },
        controller: function($scope, $element){
 
        }
    };
});
```

A *link* function will behave like the post-link function described below.

### Loop Three Times

Since the *ngRepeat* requires three copies of *simple*, we will now execute the following functions once for each instance. The order is *controller*, *pre*, then *post*.

### Controller Function Executes

The first function to execute for each instance is the *controller* function. It is here where the code can initialize a scope object as any good controller function will do.

Note the controller can also take an $element argument and receive a reference to the *simple* element clone that will appear in the DOM.

The element will look just like the element in the previous picture because the framework hasn’t performed the transclusion or setup data binding, but it is the element that will live in the DOM, unlike the element reference in compile.

However, we try to keep controllers from referencing elements directly. You generally want to limit direct element interaction to the post link function.

### Pre-link Executes

By the time we reach the pre-link function (the function attached to the *pre* property of the object returned from compile), we’ll have both a scope initialized by the *controller* function, and a reference to a real element that will appear in the DOM.

However, we **still** don’t have transcluded content and the template isn’t linked to the scope because the bindings aren’t setup.

The pre link function is only useful in a couple special scenarios, which is why you can return a function from *compile* instead of an object and the function will be considered by the framework as the post link function.

### Post-link Executes

Post link is the last function to execute. Now the transclusion is complete, the template is linked to a scope, and the view will update with data bound values after the next digest cycle .

In post-link it is safe to manipulate the DOM, attach event handlers, inspect child elements, and setup observations on attributes and watches on the scope.

