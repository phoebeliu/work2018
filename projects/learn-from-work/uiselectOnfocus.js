/** ui select ngfocus
 * directive
 */

define(['underscore'], function (_) {
    'use strict';

    return ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            require: 'uiSelect',
            restrict: 'A',
            link: function(scope, el, attrs, uiSelect) {
                uiSelect.triggerOnFocus = $parse(attrs.triggerOnFocus);
                //var autoopen = true;

                angular.element(uiSelect.focusser || uiSelect.focusInput).on('focus', function() {
                    // if (autoopen) {
                    //     uiSelect.activate();
                    // }
                    uiSelect.triggerOnFocus(scope);
                });

                // // Disable the auto open when this select element has been activated.
                // scope.$on('uis:activate', function() {
                //     autoopen = false;
                // });
                //
                // // Re-enable the auto open after the select element has been closed
                // scope.$on('uis:close', function() {
                //     autoopen = false;
                //     $timeout(function() {
                //         autoopen = true;
                //     }, 250);
                // });
            }
        };
    }];
});