angularjs transclusion scope access

    <div class="fails">
        <div fails="hello1">
             <h1>{{ name }}</h1>
        </div>
        <div fails="hello2">
             <h1>{{ name }}</h1>
        </div>
    </div>
    <div class="works1">
        <div works1="hello1">
             <h1>{{ name }}</h1>
        </div>
        <div works1="hello2">
             <h1>{{ name }}</h1>
        </div>
    </div>
    <div class="works2">
        <div works2="hello1">
             <h1>{{ name }}</h1>
        </div>
        <div works2="hello2">
             <h1>{{ name }}</h1>
        </div>
    </div>

    angular.module('test', []).directive('fails', function () {
        return {
            replace: true,
            transclude: true,
            template: '<div class="outer"><div class="inner" ng-transclude></div></div>',
            link: function (scope, el, attrs) {
                scope.name = attrs.fails;
            }
        };
    }).directive('works1', function () {
        return {
            replace: true,
            transclude: true,
            template: '<div class="outer"><div class="inner"></div></div>',
            compile: function (tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    scope = scope.$new();
                    scope.name = attrs.works1;
                    transclude(scope, function (clone) {
                        element.find('div').append(clone);
                    });
                };
            }
        };
    }).directive('works2', function () {
        return {
            replace: true,
            transclude: true,
            template: '<div class="outer"><div class="inner"></div></div>',
            controller: function($element, $attrs, $transclude) {
                $transclude(function(clone, scope) {
                    scope.name = $attrs.works2;
                    $element.find('div').append(clone);
                });
            }
        };
    });

However isolated scope creates a new problem: if a transcluded DOM is a child of the widget isolated scope then it will not be able to bind to anything. For this reason the transcluded scope is a child of the original scope, before the widget created an isolated scope for its local variables. This makes the transcluded and widget isolated scope siblings.

I've run into something similar and there are 2 ways (that I know of) to access the transcluded scope directly.

The first is to create the scope yourself inside a compile function and then pass it to the transclude linking function along with a clone linking function:

    function compileFn(tElement, tAttrs, transclude) {
        return linkFn;
        function linkFn(scope, element, attrs) {
            scope = scope.$new();
            scope.name = attrs.works1;
            transclude(scope, function(clone) {
                element.find('div').append(clone);
            });
        };
    }

The second is to create a controller and inject the $transclude service which is pre-bound to a new scope. Your clone linking function will receive the new scope as its 2nd parameter:

    function Controller($element, $attrs, $transclude) {
        $transclude(function(clone, scope) {
            scope.name = $attrs.works2;
            $element.find('div').append(clone);
        });
    }

In both cases you'll have to provide a clone linking function to do the transclusion yourself instead of using ngTransclude.

See http://jsfiddle.net/dbinit/wQC7G/6/ for examples of both.
