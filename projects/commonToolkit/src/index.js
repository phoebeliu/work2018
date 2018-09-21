angular.module('common-toolkit', [
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'ui.router',
    'ui.select',
    'ui.bootstrap',
  ])
  .constant('appConfiguration', window.APP_CONFIG)
  
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/index");
  
    $stateProvider.state('home', {
      url: '/home',
      views: {
        "main": {
          controller: 'AppCtrl',
          templateUrl: '/home.html'
        }
      },
      data: {
        pageTitle: 'Home'
      }
    });
    $stateProvider.state('index', {
      url: '/index',
      views: {
        "main": {
          controller: 'AppCtrl',
          templateUrl: '/main.html'
        }
      },
      data: {
        pageTitle: 'index'
      }
    });
    $stateProvider.state('account', {
      url: '/account',
      views: {
        "main": {
          controller: 'AppCtrl',
          templateUrl: '/account.html'
        }
      },
      data: {
        pageTitle: 'account'
      }
    });
    $stateProvider.state('policyInfo', {
      url: '/policyInfo',
      views: {
        "main": {
          controller: 'LineCtrl',
          templateUrl: '/policyInfo.html'
        }
      },
      data: {
        pageTitle: 'policyInfo'
      }
    });
  
    // $stateProvider.state('search', {
    //   url: '/search',
    //   views: {
    //     "main": {
    //       controller: 'SearchController',
    //       templateUrl: 'src/search.tpl.html'
    //     }
    //   },
    //   data: {
    //     pageTitle: 'Search'
    //   }
    // });
  
    // $stateProvider.state('report', {
    //   url: '/report',
    //   views: {
    //     "main": {
    //       controller: 'ReportController',
    //       templateUrl: 'src/report.tpl.html'
    //     }
    //   },
    //   data: {
    //     pageTitle: 'Report'
    //   }
    // });
  
    //$urlRouterProvider.otherwise('/search');
  }) 
  .controller('AppCtrl', function($scope, $state) {
    $scope.dropDownData = {};
    $scope.dropDownData.roles = [{
        id: 1,
        text: 'ADMIN'
    }, {
        id: 2,
        text: 'HR'
    }];
    $scope.cleanData = function(object){
        angular.forEach(object, function(value, key) {
            // object[key] = value;
            if(_.isNull(value)){
              delete object[key];
            }
            if(_.isUndefined(value)){
              delete object[key];
            }
            if(value == ''){
              delete object[key];
            }
        });
    };
    $scope.setRole = function(user,roleForm){
        var updateUser = [];
        updateUser.push(user);
        console.log(updateUser);
        EapplicationApi.setRole(updateUser).then(function(data) {
        })
        .catch(function() {  
        })
        .finally(function() {
          // $scope.$broadcast('loaddata', false);
        });
    };
    $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
    $scope.multipleDemo = {};
    $scope.multipleDemo.colors = ['Blue','Red'];
    $scope.multipleDemo.people = "";
    $('[data-toggle="tooltip"]').tooltip();
    // $scope.trustAsHtml = function(value) {
    //   return $sce.trustAsHtml(value);
    // };
    // $scope.appendToBodyDemo = {
    //   remainingToggleTime: 0,
    //   present: true,
    //   startToggleTimer: function() {
    //     var scope = $scope.appendToBodyDemo;
    //     var promise = $interval(function() {
    //       if (scope.remainingTime < 1000) {
    //         $interval.cancel(promise);
    //         scope.present = !scope.present;
    //         scope.remainingTime = 0;
    //       } else {
    //         scope.remainingTime -= 1000;
    //       }
    //     }, 1000);
    //     scope.remainingTime = 3000;
    //   }
    // };
  })
  .controller('LineCtrl', function($scope, $state) {
    $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
    $scope.multipleDemo = {};
    $scope.multipleDemo.colors = ['Blue','Red'];
    $scope.multipleDemo.people = "";
    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks:false
    };
    $scope.popup2 = {
      opened: false
    };
    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };
    // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
  })
//   .controller('ReportController', function($scope, $state, $filter, EapplicationApi) {
//     console.log($state);
//     function formDate(input){
//         var output = '';
//         output = $filter("date")(input, "yyyy");
//         output += $filter("date")(input, "MM");
//         output += $filter("date")(input, "dd");
//         return output;
//     }
//     $scope.reportDateStart ='';
//     $scope.reportDateEnd ='';
//     var reportdatas ={};
//     $scope.error = '';
//     $scope.showError = false;
  
//     function errorShow(error){
//       $scope.error = error;
//       $scope.showError = true;
//       $timeout(function() {
//         $scope.showError = false;
//       }, 1000);
//     }
//     $scope.getReport= function(report,reportFormm){
//       var checkForm = true;
//       if (report.reportDateStart > report.reportDateEnd) {
//           errorShow('The [Interviewed Date From] is wrong , please check.');
//           checkForm = false;
//       } 
//       if (_.isEmpty(report)) {
//           checkForm = false;
//       } 
//       if(angular.isUndefined(report.reportDateEnd)){
//           report.reportDateEnd = new Date();
//         }
  
//       reportdatas = angular.copy(report);
    
//       $scope.reportDateStart = formDate(report.reportDateStart);
//       reportdatas.reportDateStart = $scope.reportDateStart;
  
//       $scope.reportDateEnd = formDate(report.reportDateEnd);
//       reportdatas.reportDateEnd = $scope.reportDateEnd;
//       if (checkForm) {
//           // getSearchResults(searchConditions,1);
//         console.log(reportdatas);
//         EapplicationApi.downloadReport(reportdatas).then(function(data) {
//             var url = URL.createObjectURL(new Blob([data]));
//             var a = document.createElement('a');
//             a.href = url;
//             a.download = 'Report-InterviewHours' + $scope.reportDateStart + '-' + $scope.reportDateEnd;
//             a.target = '_blank';
//             a.click();
//         })
//         .catch(function() {  
//         })
//         .finally(function() {
//           // $scope.$broadcast('loaddata', false);
//         });
//       }
//     };
  
//   })
//   .controller('SearchController', function($scope, EapplicationApi, $http, $filter, $timeout, $uibModal) {
//     $scope.dropDownData.candidateStates = [{
//         id: 1,
//         text: 'Offer'
//     }, {
//         id: 2,
//         text: 'Move to next round'
//     }, {
//         id: 3,
//         text: 'Keep file'
//     }, {
//         id: 4,
//         text: 'Reject'
//     }, {
//         id: 5,
//         text: 'Unkown'
//     }];
//     $scope.dropDownData.englishTests = [{
//         id: 1,
//         text: 'A+'
//     }, {
//         id: 2,
//         text: 'A'
//     }, {
//         id: 3,
//         text: 'A-'
//     }, {
//         id: 4,
//         text: 'B+'
//     }, {
//         id: 5,
//         text: 'B'
//     }, {
//         id: 6,
//         text: 'B-'
//     }, {
//         id: 7,
//         text: 'C+'
//     }, {
//         id: 8,
//         text: 'C'
//     }, {
//         id: 9,
//         text: 'C-'
//     }, {
//         id: 10,
//         text: 'D'
//     }, {
//         id: 11,
//         text: 'E'
//     }, {
//         id: 12,
//         text: 'F'
//     }];
//     $scope.show =false;
    
//     $scope.conditions ={};
  
//     $scope.pagination = {
//       maxSize: 5,
//       bigTotalItems: 50,
//       bigCurrentPage: 1,
//       maxSize: 21,
//       count: 8
//     };
//     $scope.count = 8;
    
//     function getAll(bigCurrentPage){
//       $scope.getSearch = false;
//       $scope.$broadcast('loaddata', true);
//       $scope.pagination.bigCurrentPage = bigCurrentPage;
//       $scope.getAllParams = {
//         page: bigCurrentPage,
//         count: $scope.count
//       };
//       EapplicationApi.getAll($scope.getAllParams).then(function(data) {
//           $scope.show =true;
//           $scope.searchResults =data.data;
//           $scope.pagination.bigTotalItems =data.totalCount;
//           angular.forEach($scope.searchResults, function(item) {
//             item.selected = false;
//             if(item.hrResult == 0){
//               item.hrResult = null;
//             }
//           });
//           console.log($scope.searchResults);
//       })
//       .catch(function() {
        
//       })
//       .finally(function() {
//         $scope.$broadcast('loaddata', false);
//       });
//     }
  
//     $scope.pageChanged = function(conditions,bigCurrentPage) {
//         $scope.selectData.selectAll = false;
//         $scope.selectAll();
//         $scope.pagination.bigCurrentPage = bigCurrentPage;
//         if(!$scope.getSearch){
//             getAll(bigCurrentPage);
//         }else{
//             getSearchResults(conditions,bigCurrentPage)
//         }
//     };
//     function getSearchResults(conditions,bigCurrentPage) {
//       $scope.pagination.bigCurrentPage = bigCurrentPage;
//       $scope.getSearch = true;
//       $scope.$broadcast('loaddata', true);
//       $scope.searchParams = {
//         page: bigCurrentPage,
//         count: $scope.count
//       };
//       var formData = JSON.stringify(angular.copy(conditions));
//       console.log(formData);
//       EapplicationApi.getSearchResults(formData, $scope.searchParams).then(function(data) {
//           $scope.show =true;
//           $scope.searchResults =data.data.data;
//           $scope.pagination.bigTotalItems =data.data.totalCount;
//           angular.forEach($scope.searchResults, function(item) {
//             item.selected = false;
//             if(item.hrResult == 0){
//               item.hrResult = null;
//             }
//           });
//           console.log($scope.searchResults);
//       })
//       .catch(function() {
        
//       })
//       .finally(function() {
//         $scope.$broadcast('loaddata', false);
//       });
//     }
    
//     function formDate(input){
//         var output = '';
//         output = $filter("date")(input, "yyyy");
//         output += $filter("date")(input, "MM");
//         output += $filter("date")(input, "dd");
//         return output;
//     }
//     $scope.interviewDateStart ='';
//     $scope.interviewDateEnd ='';
//     var searchConditions ={};
//     $scope.error = '';
//     $scope.showError = false;
  
//     function errorShow(error){
//       $scope.error = error;
//       $scope.showError = true;
//       $timeout(function() {
//         $scope.showError = false;
//       }, 1000);
//     }
  
  
//     $scope.viewDetail = function(item) {
//       $scope.viewItem =item;
//       var modalInstance = $uibModal.open({
//         template: '<confirm-modal></confirm-modal>',
//         scope: $scope
//       }).result.then(function(data) {
//       });
//     };
//     $scope.updateConfirm = function(item,value){
//       if (item) {
//         $scope.updateAll = false;
//         $scope.updateItem = item;
//         $scope.updateValue = value;
//         var modalInstance = $uibModal.open({
//           template: '<update-modal></update-modal>',
//           scope: $scope
//         }).result.then(function(data) {
  
//         });
//       } else {
//         $scope.updateAll = true;
//         var modalInstance = $uibModal.open({
//           template: '<update-modal></update-modal>',
//           scope: $scope
//         }).result.then(function(data) {
  
//         });
//       }
//     };
//     var excelAllName ='候选人信息';
//     $scope.downloadAll = function(type,conditions) {
//       var checkForm = true;
//       if (conditions.interviewDateStart > conditions.interviewDateEnd) {
//           errorShow('The [Interview Start Date] is wrong , please check.');
//           checkForm = false;
//       } 
//       if (_.isEmpty(conditions)) {
//           // NotificationService.error('please type something.');
//           errorShow('Please type something.');
//           checkForm = false;
//       } 
  
//       downloadConditions = angular.copy(conditions);
//       if (conditions.interviewDateStart) {
//         $scope.interviewDateStart = formDate(conditions.interviewDateStart);
//         downloadConditions.interviewDateStart = $scope.interviewDateStart;
//       }
//       if (conditions.interviewDateEnd) {
//         $scope.interviewDateEnd = formDate(conditions.interviewDateEnd);
//         downloadConditions.interviewDateEnd = $scope.interviewDateEnd;
//       }
//       if (checkForm) {
//         $scope.$broadcast('loaddata', true);
//         var searchData = {};
//         searchData.downloadType = type;
//         searchData.newComplexSearch = downloadConditions;
//         console.log(searchData);
//         EapplicationApi.downloadAllDocument(searchData).then(function(result) {
//             var url = URL.createObjectURL(new Blob([result]));
//             var a = document.createElement('a');
//             a.href = url;
//             a.download = excelAllName+'.xls';
//             a.target = '_blank';
//             a.click();
//         })
//         .catch(function() {
          
//         })
//         .finally(function() {
//           $scope.$broadcast('loaddata', false);
//         });
//       }   
//     };
  
//     $scope.submit= function(conditions,searchForm){
//       var checkForm = true;
//       if (conditions.interviewDateStart > conditions.interviewDateEnd) {
//           errorShow('The [Interview Start Date] is wrong , please check.');
//           checkForm = false;
//       } 
//       if (_.isEmpty(conditions)) {
//           checkForm = false;
//           getAll(1);
//       } 
  
//       searchConditions = angular.copy(conditions);
//       if (conditions.interviewDateStart) {
//         $scope.interviewDateStart = formDate(conditions.interviewDateStart);
//         searchConditions.interviewDateStart = $scope.interviewDateStart;
//       }
//       if (conditions.interviewDateEnd) {
//         $scope.interviewDateEnd = formDate(conditions.interviewDateEnd);
//         searchConditions.interviewDateEnd = $scope.interviewDateEnd;
//       }
//       if (checkForm) {
//           $scope.pagination.bigCurrentPage = 1;
//           getSearchResults(searchConditions,1);
//       }
//     };
//     $scope.selectData ={};
//     $scope.selectData.selectAll = false;
//     $scope.selectAll = function() {
//       angular.forEach($scope.searchResults, function(item) {
//         item.selected = $scope.selectData.selectAll;
//       });
//     };
  
    
//     $scope.save = function(item) {
//       if (item) {
//         $scope.$broadcast('loaddata', true);
//         var updateOne = [];
//         var objectOne ={};
//         if(angular.isUndefined(item.hrResult)){
//           item.hrResult = null;
//         }
//         if(angular.isUndefined(item.englishTest)){
//           item.englishTest = null;
//         }
//         objectOne.candidateId = item.candidateId;
//         objectOne.hrResult = item.hrResult;
//         objectOne.englishTest = item.englishTest;
//         updateOne.push(objectOne);
//         console.log(updateOne);
//         EapplicationApi.updateResults(updateOne).then(function(data) {
//         })
//         .catch(function() {  
//         })
//         .finally(function() {
//           $scope.$broadcast('loaddata', false);
//         });
//       } else {
//         var updateData = [];
//         $scope.$broadcast('loaddata', true);
//         angular.forEach($scope.searchResults, function(item) {
//           var objectData ={};
//           if(angular.isUndefined(item.hrResult)){
//             item.hrResult = null;
//           }
//           if(angular.isUndefined(item.englishTest)){
//             item.englishTest = null;
//           }
//           objectData.candidateId = item.candidateId;
//           objectData.hrResult = item.hrResult;
//           objectData.englishTest = item.englishTest;
//           updateData.push(objectData);
//         });
//         console.log(updateData);
//         EapplicationApi.updateResults(updateData).then(function(data) {
//         })
//         .catch(function() {     
//         })
//         .finally(function() {
//           $scope.$broadcast('loaddata', false);
//         });
//       }
//     };
//     var pdfName ='候选人信息表_';
//     var excelName ='候选人信息_';
//     $scope.download = function(type,item,cname,ename) {
//       $scope.$broadcast('loaddata', true);
//       if (item) {
//         var singleItem = {};
//         singleItem.type = type;
//         singleItem.data = [{"candidateId": item}];
//         console.log(singleItem);
//         personName = cname ? cname : ename;
//         if (type == 'excel') {
//           var fileName = excelName + personName +'.xls';
//         } else {
//           var fileName = pdfName + personName +'.pdf';
//         }
//         EapplicationApi.downloadDocument(singleItem).then(function(result) {
//             var url = URL.createObjectURL(new Blob([result]));
//             var a = document.createElement('a');
//             a.href = url;
//             a.download = fileName;
//             a.target = '_blank';
//             a.click();         
//         })
//         .catch(function() {       
//         })
//         .finally(function() {
//           $scope.$broadcast('loaddata', false);
//         });
//       } else {
//         if (type == 'excel') {
//           var selectExcelData = {};
//           selectExcelData.type = 'excel';
//           var selectExcels = [];
//           var selectedone = 0,
//               pname = '';
//           angular.forEach($scope.searchResults, function(key) {
//             var selectExcel = {};
//             if (key.selected) {
//               selectExcel.candidateId = key.candidateId;
//               selectExcels.push(selectExcel);
//               selectedone ++;
//               pname = key.chineseName ? key.chineseName : key.englishName;
//             }
//           });
//           selectExcelData.data = selectExcels;
//           console.log(selectExcelData);
  
//           if (selectedone > 1) {
//             var fileName = excelName +'All';
//           } else {
//             var fileName = excelName + pname;
//           }
//           console.log(fileName);
//           EapplicationApi.downloadDocument(selectExcelData).then(function(result) {
//               var url = URL.createObjectURL(new Blob([result]));
//               var a = document.createElement('a');
//               a.href = url;
//               a.download = fileName +'.xls';
//               a.target = '_blank';
//               a.click();      
//           })
//           .catch(function() {    
//           })
//           .finally(function() {
//             $scope.$broadcast('loaddata', false);
//           });
  
//         } else {
//           angular.forEach($scope.searchResults, function(item) {
//             var selectItemsData = {};
//             selectItemsData.type = type;
//             var selectItems = [];
//             var selectItem = {};
//             var personName = '';
//             if (item.selected) {
//               selectItem.candidateId = item.candidateId;
//               selectItems.push(selectItem);
            
//               selectItemsData.data = selectItems;
//               personName = item.chineseName ? item.chineseName : item.englishName;
//               console.log(selectItemsData);
//               console.log(pdfName + personName);
//               EapplicationApi.downloadDocument(selectItemsData).then(function(result) {
//                   var url = URL.createObjectURL(new Blob([result]));
//                   var a = document.createElement('a');
//                   a.href = url;
//                   a.download = pdfName + personName +'.pdf';
//                   a.target = '_blank';
//                   a.click(); 
//               })
//               .catch(function() {
//               })
//               .finally(function() {
//                 $scope.$broadcast('loaddata', false);
//               });
//             }
//           });
//         }     
//       }
//     };
  
    
  
//     $scope.reject = function() {
//       $scope.$broadcast('loaddata', true);
//       angular.forEach($scope.searchResults, function(item) {
//         if (item.selected) {
//           item.hrResult = 4;
//         }
//       });
//       $scope.$broadcast('loaddata', false);
//       $scope.updateConfirm();
//     };
  
//     $scope.offer = function() {
//       $scope.$broadcast('loaddata', true);
//       angular.forEach($scope.searchResults, function(item) {
//         if (item.selected) {
//           item.hrResult = 1;
//         }
//       });
//       $scope.$broadcast('loaddata', false);
//       $scope.updateConfirm();
//     };
//   });
  
  