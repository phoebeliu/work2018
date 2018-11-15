# angular compile nodes performance

https://medium.com/angular-performance/angular-performance-tips-3b9e5afc9a09

GL Performance Analysis

GL coverage part performance problem caused may in two part. One is tab switchover and another is tab content.

\1. Tab switchover

Under the GL coverage part there are seven tabs. When user click tab name the content below will switchover.

The tech key point here is using ng-if to switch content, so every tab will just render their own page.

We try to change different way and result as below:

1).use ng-include

When change every tab content inject in parent page by ng-include, the time will take two multiple times longer than ng-if because it need extra time for inject template into page and render.

2).use ui-view

When change every tab content render by ui-view, the time will take two multiple times longer than ng-if because it need extra time for find the template and inject into page and render.

Result:

So after research and test we think we should use ng-if tech to do the tab switchover. Because it only take roughly 4 to 5 seconds finish switchover but ng-include and ui-view will take about 20 seconds.

\2. Tab content

# Angular performance tips

Optimise compilation what’s compile mean in angular? The compilation is a process of walking the DOM tree and matching DOM elements to directives.

**TIP# 1: =>**

Set the debugInfoEnabled to false with $compileProvider and speed up your angularjs app load time Why? AngularJS attaches information about scopes to DOM nodes, and adds CSS classes to data-bound elements. Ref:https://docs.angularjs.org/guide/production

**TIP# 2: =>**

Split your code between compile and link in custom directives Why? Angular runs the compile function at loading, but only once. the link function will run each time the directive is inserted to the DOM.

**TIP# 3: =>**

Prefer using ng-if/switch directive instead of ng-show/hide Why? The ng-if directive removes or recreates a portion of the DOM. which means that the content won’t be compiled until it visible.

Optimise the digest cycle

**TIP# 4: =>**

Reduce the number of digests cycles with ng-model-options Why? By default, angular triggers the digest cycle every time the value changes. Example:https://docs.angularjs.org/api/ng/directive/ngModelOptions

**TIP# 5: =>**

When make sense, use $digest instead of $apply Why? $apply calls digest from the rootScope which may not be necessary

**TIP# 6: =>**

Prefer DOM manipulation in custom directives when not related to model Why? the built-in DOM manipulation directives adds watchers to the scope

**TIP# 7: =>**

Reduce the number of watchers with ng-bind and oneTimeBinding feature => ng-bind is about twice as fast as expression bind (i.e.{{}}). This is true even with one time bind or bind once enabled (i.e.{{::}}). Why? angular invoke all the watchers that registered on the scope on each digest Ref: <https://ng-perf.com/tag/ng-perf/> Optimise ng-repeat

**TIP# 8: =>**

Always use ‘track by’ in ngRepeat to maximise performance Why? ng-repeat destroy an recreate DOM nodes when the data is refreshing Ref: improving-ng-repeat-performance-with-track-by/ Example: <http://jsfiddle.net/gowthaman149/vqpxwzwp/1/>

**TIP# 9: =>** 

Use ng-hide when filtering the repeated items Why? ng-repeat removes DOM nodes from your HTML and recreate them on filtering

**TIP# 10: =>**

Use ng-if to link DOM elements on demand Why? ng-if removes nodes from the DOM so the list will render faster Going to production

**TIP# 11: =>**

Decorate AngularJS $exceptionHandler with your own logic Why? uncaught exceptions in angular expressions is delegated to this service Ref: <https://docs.angularjs.org/api/ng/service/$exceptionHandler>

**TIP# 12: =>**

Always use $log service for you debug logs Why? you can switch the $log service debug method off on production Ref: <https://docs.angularjs.org/api/ng/service/$log>

**TIP# 13: =>**

*Bootstrap in strictDi mode Why? even if you use automated tools to guarantee implicit strict-di mode will backup you by throwing exceptions Ref:https://docs.angularjs.org/guide/production and strictDi*