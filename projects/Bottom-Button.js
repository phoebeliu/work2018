define(['text!./templates/next-and-back.html', 'underscore'],
    function (templateStr, _) {
        'use strict';
        return ['$compile','$state', function ($compile,$state) {
            return {
                restrict: 'EA',
                template: templateStr,
                transclude: true,
                scope: {
                    /*whether or not a popup view*/
                    popUp:'=',
                    /*pass the save func from popup view*/
                    popSaveFn:'&',
                    /*sync the save func params from popup view*/
                    popSaveParam:'=',
                    /*pass the save button disabled variable from popup view*/
                    popSaveDisabled:'=',
                    /*pass the save button ng-if variable from popup view*/
                    popSaveIf:'=',
                    /*pass the next func from main view*/
                    nextFn:'&',
                    /*pass the next button disabled variable from main view*/
                    nextDisabled:'=',
                    /*pass the next button name */
                    nextButton:'=',
                    /*pass the next button ng-if variable from main view*/
                    nextIf:'=',
                    /*pass the back func from main view*/
                    backFn:'&',
                    /*pass the back button disabled variable from main view*/
                    backDisabled:'=',
                    /*pass the back button ng-if variable from main view*/
                    backIf:'=',
                    /*pass the custom type from main view*/
                    custom:'=',
                    /*pass the custom param from main view*/
                    customParam:'=',
                    /*pass the custom function from main view*/
                    customFn:'&',
                    /*pass the ISSUE CHANGE function from pay issue view*/
                    issuechangeFn:'&',
                    /*pass the PAY AND ISSUE function from pay issue view*/
                    payissueFn:'&',
                    /*pass the PAY AND ISSUE button disabled variable from pay issue view*/
                    payissueDisabled:'=',
                    /*pass the SAVE function from pay issue view*/
                    saveFn:'&',
                    /*pass the SAVE button disabled variable from pay issue view*/
                    saveDisabled:'=',
                    /*pass the isIssuableQuote function from quote summary view*/
                    isIssuableQuote:'=',
                    /*pass the continue to product function from quote summary view*/
                    nextproductFn:'&',
                    /*pass the Make Issuable function from quote summary view*/
                    issuablequoteFn:'&',
                    /*pass the next lob name from quote summary view*/
                    nextlob:'='




                },

                controller: ['$scope', '$translate', '$filter', '$q', '$timeout', function ($scope, $translate, $filter, $q, $timeout) {
                    //set default value
                    $scope.popUp = typeof $scope.popUp !== 'undefined' ? $scope.popUp : false;
                    $scope.popSaveDisabled = typeof $scope.popSaveDisabled !== 'undefined' ? $scope.popSaveDisabled : false;
                    $scope.popSaveIf = typeof $scope.popSaveIf !== 'undefined' ? $scope.popSaveIf : true;
                    $scope.nextButton = typeof $scope.nextButton !== 'undefined' ? $scope.nextButton : 'Next';
                    $scope.nextDisabled = typeof $scope.nextDisabled !== 'undefined' ? $scope.nextDisabled : false;
                    $scope.backDisabled = typeof $scope.backDisabled !== 'undefined' ? $scope.backDisabled : false;
                    $scope.backIf = typeof $scope.backIf !== 'undefined' ? $scope.backIf : true;
                    $scope.nextIf = typeof $scope.nextIf !== 'undefined' ? $scope.nextIf : true;
                    $scope.custom = typeof $scope.custom !== 'undefined' ? $scope.custom : false;
                    $scope.payissueDisabled = typeof $scope.payissueDisabled !== 'undefined' ? $scope.payissueDisabled : false;
                    $scope.saveDisabled = typeof $scope.saveDisabled !== 'undefined' ? $scope.saveDisabled : false;

                    $scope.savePopUp =function(){
                        $scope.popSaveFn();
                    };
                    $scope.nextMain =function(){
                        $scope.nextFn();
                    };
                    $scope.backMain =function(){
                        $scope.backFn();
                    };
                    var socialFloat = document.querySelector('.fix-button-bottom');
                    var footer = document.querySelector('.global-footer');
                    var topHeight;

                    function checkOffset() {
                        function getRectTop(el){
                            var rect = el.getBoundingClientRect();
                            return rect.top;
                        }
                        socialFloat = document.querySelector('.fix-button-bottom');
                        footer = document.querySelector('.global-footer');
                        if((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10){
                            ///socialFloat.style.position = 'absolute';
                            //socialFloat.classList.add("static-status");
                            socialFloat.style.bottom='75px';//height 65px
                            // topHeight=(getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight;
                            // socialFloat.style.top = topHeight;
                            // console.log(topHeight);
                            // console.log((getRectTop(footer) + document.body.scrollTop) - 10);
                        }

                        if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)){
                            //socialFloat.classList.remove("static-status");
                            //socialFloat.style.top='auto';
                            socialFloat.removeAttribute("style");
                            // socialFloat.style.position = 'fixed'; // restore when you scroll up
                        }


                        //socialFloat.innerHTML = document.body.scrollTop + window.innerHeight;
                    }

                    document.addEventListener("scroll", function(){
                       if(document.querySelector('.fix-button-bottom') && document.querySelector('.global-footer')){
                            checkOffset();
                        }
                    });
                    function detectmob() {
                        if(window.innerWidth >= 768) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }],
                link: function(scope, element, attrs, ngModelCtrl) {

                }
            };
        }];
    }
);
