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
////in the popup modal

define([],
    function () {
        'use strict';

        return [function () {
            return {
                restrict: 'A',
                template: templateStr,
                scope: {
                    //blablabla
                },
                controller: ['$scope','$state', '$filter', 'WizardService', 'DirtyFlagFactory', 'NavBarUtil', '$window', '$rootScope', function ($scope,$state,$filter,WizardService,DirtyFlagFactory,NavBarUtil,$window,$rootScope) {

                    $scope.validations = new Object();
                    $scope.screenObj={};
                    $scope.screenObj.toggleValidationResults= true;
                   


                    /**
                     * Current there is front-end field issue for the error link of current screen
                     * @param validation
                     */
                    $scope.jumpToIssue = function(validation){
                        var currentStepName = $state.current.name;
                        var currentNewLineValidationDom = document.querySelector('#popupValidationDiv .new-line-validation');
                        if(validation){
                            if(validation.level == "field"){
                                var fieldElement = $('#' + validation.fieldId);
                                if(fieldElement){
                                    var fieldPosition = fieldElement.offset()?fieldElement.offset().top : 0;
                                    //var position = $('#'+targetId).offset().top;
                                    var position2 = $('#'+$scope.popupId+' .modal-header').offset().top;
                                    fieldPosition = fieldPosition-position2;
                                    if(currentNewLineValidationDom && !currentNewLineValidationDom.classList.contains('fixed')){
                                        fieldPosition = fieldPosition - currentNewLineValidationDom.offsetHeight - 44 - 20;
                                        console.log(currentNewLineValidationDom.offsetHeight);
                                    }else {
                                        fieldPosition = fieldPosition  - 44 - 5;//error fix bar height 44px
                                    }
                                    if(!NavBarUtil.isLocalHost()){
                                        console.log("The host is not local!");
                                        fieldPosition = fieldPosition - 60 - 5;//header height 60px
                                    }
                                    fieldElement.find('textarea,input[type]:not([type=search]):not([type=url]):not([type=hidden])').focus();
                                    //angular.element('html, body').animate({ scrollTop: fieldPosition }, 'slow');
                                    console.log(validation.fieldId+'         '+fieldPosition);
                                    $('#' + $scope.popupId).animate({ scrollTop: fieldPosition }, 'slow');
                                    $scope.screenObj.toggleValidationResults=false;
                                }
                            }
                        }

                    };
                    /**
                     * UI fixed
                     */
                    $scope.screenObj.showingErrorIndex = 0;
                    var lineValidationDiv,modalWindow;
                    $scope.checkOffset =function () {
                        lineValidationDiv = document.querySelector('#popupValidationDiv .new-line-validation');
                        modalWindow = document.querySelector('#' + $scope.popupId);

                        if (modalWindow.scrollTop > document.querySelector('#popupValidationDiv').offsetTop) {
                            lineValidationDiv.classList.add("fixed");
                            lineValidationDiv.style.top = 0;
                            $scope.screenObj.toggleValidationResults=false;
                            $scope.$apply();
                        } else {
                            lineValidationDiv.classList.remove("fixed");
                            $scope.screenObj.toggleValidationResults=true;
                            $scope.$apply();
                        }
                    };
                    document.querySelector('#' + $scope.popupId).onscroll = function(){
                        if(document.querySelector('#popupValidationDiv .new-line-validation')){
                            $scope.checkOffset();
                        }
                    };
                    var destroyHandler = $rootScope.$on("focus-field", function(event, field) {
                        $scope.isErrorField(field[0].id);
                    });

                    $scope.isErrorField = function(field){
                        _.each($scope.validations,function(validation,index){
                            if(validation && validation.fieldId === field){
                                $scope.screenObj.showingErrorIndex = index;
                                $scope.screenObj.toggleValidationResults =false;
                            }
                        });
                    };

                    $scope.$on('$destroy', destroyHandler);


                   
                }]
            }
        }]

    })




