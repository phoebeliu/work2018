/**
 * Created by T163706 on 8/12/2016.
 */
define(['text!./templates/line-validation-result.html','../util/LineValidationUtil','underscore'],
    function (templateStr,LineValidationUtil,_) {
        'use strict';

        return [function () {
            return {
                restrict: 'A',
                template: templateStr,
                scope: {
                },
                controller: ['$scope','$state', '$filter', '$window', function ($scope,$state,$filter,$window) {
                    /**
                     * we use validations to refactor the old validation result variable and it would be compatible with old properties
                     * @type {Object}
                     */
                    $scope.validations = new Object();
                    $scope.screenObj={};
                    $scope.screenObj.toggleValidationResults= true;
                    
                    /**
                     * UI fixed
                     */
                    var lineValidationDiv,epiHeader;
                    $scope.checkOffset =function () {
                        lineValidationDiv = document.querySelector('#lineValidationDiv');
                        epiHeader = document.querySelector('.header-padding');
                        //var scope = angular.element($("#lineValidationDiv")).scope();


                        if (window.pageYOffset > lineValidationDiv.offsetTop) {
                            lineValidationDiv.classList.add("fixed");
                            $scope.screenObj.toggleValidationResults=false;
                            $scope.$apply();
                            // scope.$apply(function(){
                            //     scope.screenObj.toggleValidationResults=false;
                            // });
                        } else {
                            lineValidationDiv.classList.remove("fixed");
                            $scope.screenObj.toggleValidationResults=true;
                            $scope.$apply();
                            //or simply $scope.$digest();
                            //https://stackoverflow.com/questions/14878761/bind-class-toggle-to-window-scroll-event
                            // scope.$apply(function(){
                            //     scope.screenObj.toggleValidationResults=true;
                            // });
                        }
                    };
                    // document.addEventListener("scroll", function(){
                    //     if(document.querySelector('#lineValidationDiv')){
                    //         checkOffset();
                    //     }
                    // });
                    $window.onscroll = function(){
                        if(document.querySelector('#lineValidationDiv')){
                            $scope.checkOffset();
                        }
                    };
                    // $scope.$on("focus-field", function(event, field) {
                    //     console.log("focus-field");
                    //     console.log(field);
                    //     //$scope.name = name;
                    // });
                    var destroyHandler = $rootScope.$on("focus-field", function(event, field) {
                        if($scope.isErrorField(field[0].id) >= 0){
                            $scope.showingErrorIndex = $scope.isErrorField(field[0].id);
                            $scope.screenObj.toggleValidationResults =false;
                        }
                    });

                    $scope.isErrorField = function(field){
                        return _.every($scope.validations,function(validation,index){
                            if(validation && validation.fieldId === field){
                                return index;
                            }
                        });
                    };
                     $scope.$on('$destroy', destroyHandler);
                    
                }]
            }
        }]

    })


//in another directive 
link: function (scope, element, attrs, ctrls) {
    element.on('focusin', function() {
        scope.focused = true;
        console.log('1');
        //scope.$emit("focus-field", element);
        //$rootScope.$emit("focus-field", element);
        if(scope.showError){
            scope.$root.$emit("focus-field", element);
        }
        // scope.$apply();
        //element.addClass('control-group-focused');
    });
    element.on('focusout', function(){
        scope.focused = false;
        // scope.$apply();
        //element.removeClass('control-group-focused');
    });
}


