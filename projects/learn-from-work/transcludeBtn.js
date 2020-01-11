
define(['a.html', 'underscore'],
    function (templateStr, _) {
        'use strict';
        return ['$compile','$state', function ($compile,$state) {
            return {
                restrict: 'EA',
                template: templateStr,
                transclude: true,
                scope: {
                    
                    /*pass the remove func from remove-icon button {Function}*/
                    removeFn:'&',
                    /*pass the remove-icon button ng-if variable from main view {Boolean}*/
                
                    replace:'='
                },

                controller: ['$scope', function ($scope) {
                    
                }],
                link: function(scope, element, attrs, ngModelCtrl, transclude) {
                

                    if(scope.isReadOnly && scope.replace){
                        transclude(scope.$parent, function(clone, scope) {
                            // element.prepend(clone);
                            // element.replace();
                            element.find('.remove-icon').parent('.btn-icon-button').remove();
                            element.find('.edit-icon').addClass('mig-icon-eye-icon').removeClass('edit-icon');
                        });
                        scope.$evalAsync(function () {
                            // with ng-if has been added to DOM,
                            element.find('.remove-icon').parent('.btn-icon-button').remove();
                            element.find('.edit-icon').addClass('mig-icon-eye-icon').removeClass('edit-icon');
                        });
                    }
                }
            };
        }];
    }
);
