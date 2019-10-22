/** want to have ui select ngblur function
 * so do the decorator for uisOpenClose
 */

define(['underscore'], function (_) {
    'use strict';

    return ['$delegate', '$parse', '$timeout', function ($delegate, $parse, $timeout) {

        $delegate[0].link = function (scope, element, attrs, $select) {
            $select.onOpenCloseCallback = $parse(attrs.uisOpenClose);

            scope.$watch('$select.open', function (isOpen, previousState) {
                if (isOpen !== previousState) {
                    if(isOpen == false){
                        $timeout(function () {
                            console.log('ng-blur');
                            $select.onOpenCloseCallback(scope);
                        });
                    }
                }
            });
        };
        //REPLACE compile function
        $delegate[0].compile = function() {
            return $delegate[0].link;
        };

        // return the $delegate
        return $delegate;
    }];
});