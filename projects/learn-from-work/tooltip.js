//the service just sort the data make them easyer for directive to replace
//data structure below
// "tooltip.radioButton":{
//     "dataSet": {
//         "tooltipHead": "blablabla",
//         "pdfLinks": [{
//             "name": "A",
//             "link": "/SSS/AAA.pdf"
//         }, {
//             "name": "B",
//             "link": "/SSS/BBB.pdf"
//         }],
//         "moreInfo": [{
//             "text": "See the <tt-link>LALALA</tt-link> for more information.",
//             "link": "2.pdf"
//         }]
//     }
// },
define(['tooltip.html', 'underscore'],
    function (templateStr, _) {
        'use strict';
        var toolTipId = 0;
        return [function () {
            return {
                restrict: 'A',
                template: templateStr,
                transclude: true,
                scope: {
                    uniqueID:'@Tooltip',
                    information:'@information',
                    needshowtooltip:'@needshowtooltip'
                },
                controller: ['$scope', '$translate','ToolTipService', function ($scope, $translate,ToolTipService) {
                    $scope.visible = false;
                    $scope.toggleVisibility = function () {
                        $scope.visible = !$scope.visible;
                    };
                    $scope.show={};
                    $scope.show.visible = false;
                    $scope.manageVisibility = function (close) {
                       $scope.show.visible = close;
                        if(document.getElementsByClassName('tooltip--container-warpper active').length > 0){
                            document.getElementsByClassName('tooltip--container-warpper active')[0].classList.remove('active');
                        }
                        document.getElementById($scope.toolTipId).classList.add('active');
                    };
                    document.onclick = function (evt){
                        var target = evt.target;
                        if(document.getElementsByClassName('tooltip--container') && target.className !== ('tooltip--container' && 'tooltip--button') && document.getElementsByClassName('tooltip--container-warpper active')[0] ){
                            document.getElementsByClassName('tooltip--container-warpper active')[0].classList.remove('active');
                        }
                    };

                    if($scope.uniqueID) {
                        $translate($scope.uniqueID, {}).then(function (translation) {
                            //console.log('**return translation', translation);
                            if (translation == $scope.uniqueID) {
                                $scope.validTooltip = false;
                            }
                            else {
                                //console.log('***translation was translated', $scope.uniqueID, translation);
                                $scope.text = translation;
                                $scope.validTooltip = true;
                            }
                        });
                    }

                    if($scope.information) {
                        var data = ToolTipService.getToolTipData();
                        if(data==null){// get tool tip failed
                            return;
                        }
                        $scope.info = data[$scope.information];
                        if(!$scope.info)
                            return; // not find the tip

                        $scope.info = $scope.info.dataSet;
                        
                        // if not the same display level don't display it
                        if($scope.displayLevel!= undefined && $scope.info.displayLevel === undefined) {
                            return;
                        }
                        if($scope.displayLevel!= undefined && $scope.info.displayLevel != undefined){
                            if($scope.displayLevel != $scope.info.displayLevel){
                                return;
                            }
                        }
                        $scope.validTooltip = true;
                        if($scope.info.moreInfo){
                            $scope.info.moreInfo.translate = '';
                            _.each($scope.info.moreInfo,function(element, index, list){
                                var alink = "<a href='{{link}}' title='Download this file' class='download-pdf' target='_blank'>";
                                var newalink = alink.replace('{{link}}', element.link);
                                var finallink = element.text.replace('<tt-link>', newalink).replace('</tt-link>', '</a>');
                                $scope.info.moreInfo.translate += finallink;
                            })
                        }
                    };
                }],
                link: function(scope, iElement, iAttrs) {
                    scope.toolTipId = 'toolTip' + toolTipId++;
                }
            };
        }];
    }
);
