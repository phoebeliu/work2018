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
                    
                }]
            }
        }]

    })


