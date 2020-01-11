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
                    if(_.isFunction($scope.popSaveDisabled)){
                        $scope.$watch($scope.popSaveDisabled, function(value){
                            $scope.popSaveDisabledValue = value;
                        });
                    }else{
                        $scope.popSaveDisabledValue = $scope.popSaveDisabled;
                    }

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

                    function checkOffset() {
                        function getRectTop(el){
                            var rect = el.getBoundingClientRect();
                            return rect.top;
                        }
                        socialFloat = document.querySelector('.fix-button-bottom');
                        footer = document.querySelector('.global-footer');
                        if((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10){
                            //socialFloat.classList.add("static-status");
                            socialFloat.style.bottom='75px';//height 65px
                        }

                        if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)){
                            //socialFloat.classList.remove("static-status");
                            socialFloat.removeAttribute("style");
                        }

                    }
                    //THE BELOW FUNCTION IS FOR STICKY NAV
//                     function checkOffset() {
                        
//                         AAA = document.querySelector('#AAA');
//                         if (window.pageYOffset > AAA.offsetTop) {
//                             AAA.classList.add("fixed");
//                         } else {
//                             AAA.classList.remove("fixed");
//                         }
//                         // if((getRectTop(AAA) + document.body.scrollTop) + AAA.offsetHeight >= (document.body.scrollTop) - 10){
//                         //     AAA.classList.add("fixed");
//                         // }
//                         //
//                         // if(document.body.scrollTop + window.innerHeight > (getRectTop(Header) + document.body.scrollTop)){
//                         //     AAA.classList.remove("fixed");
//                         // }

//                     }

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
                link: function(scope, element, attrs, ngModelCtrl, transclude) {
                    transclude(scope.$parent, function(clone, scope) {
                        //element.append(clone);
                        element.prepend(clone);
                        //element.replace();
                    });
                }
            };
        }];
    }
);
