/*globals define, jQuery, module, require */
/*jslint vars:true */

/**
 * @license angular-bootstrap-datetimepicker  version: 0.3.12
 * (c) 2013-2014 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        2013-Jul-8
 */

/**
 *    requirement need this one looklike jquery's date dropdown list 
 *    so I update some code from Dale "Ducky" Lotts's version 
 *    @author        Phoebe liu
 *    @since        2017-Nov-2
 */

(function (factory) {
    'use strict';
    /* istanbul ignore if */
    if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
      define(['angular', 'moment'], factory); // AMD
      /* istanbul ignore next */
    } else if (typeof exports === 'object') {
      module.exports = factory(require('angular'), require('moment')); // CommonJS
    } else {
      factory(window.angular, window.moment); // Browser global
    }
  }(function (angular, moment) {
    'use strict';
    angular.module('ui.bootstrap.datetimepicker', [])
      .constant('dateTimePickerConfig', {
        dropdownSelector: null,
        minuteStep: 5,
        minView: 'minute',
        startView: 'day'
      })
      .directive('datetimepicker', ['$log', 'dateTimePickerConfig', function datetimepickerDirective($log, defaultConfig) {
  
        function DateObject() {
  
          var tempDate = new Date();
          var localOffset = tempDate.getTimezoneOffset() * 60000;
          this.utcDateValue = tempDate.getTime();
          this.selectable = true;
  
          this.localDateValue = function () {
            return this.utcDateValue + localOffset;
          };
  
          var validProperties = ['utcDateValue', 'localDateValue', 'display', 'active', 'current', 'selectable', 'past', 'future', 'migDisabledDate'];
  
          for (var prop in arguments[0]) {
            /* istanbul ignore else */
            //noinspection JSUnfilteredForInLoop
            if (validProperties.indexOf(prop) >= 0) {
              //noinspection JSUnfilteredForInLoop
              this[prop] = arguments[0][prop];
            }
          }
        }
  
        var validateConfiguration = function validateConfiguration(configuration) {
          var validOptions = ['startView', 'minView', 'minuteStep', 'dropdownSelector'];
  
          for (var prop in configuration) {
            //noinspection JSUnfilteredForInLoop
            if (validOptions.indexOf(prop) < 0) {
              throw ('invalid option: ' + prop);
            }
          }
  
          // Order of the elements in the validViews array is significant.
          var validViews = ['minute', 'hour', 'day', 'month', 'year'];
  
          if (validViews.indexOf(configuration.startView) < 0) {
            throw ('invalid startView value: ' + configuration.startView);
          }
  
          if (validViews.indexOf(configuration.minView) < 0) {
            throw ('invalid minView value: ' + configuration.minView);
          }
  
          if (validViews.indexOf(configuration.minView) > validViews.indexOf(configuration.startView)) {
            throw ('startView must be greater than minView');
          }
  
          if (!angular.isNumber(configuration.minuteStep)) {
            throw ('minuteStep must be numeric');
          }
          if (configuration.minuteStep <= 0 || configuration.minuteStep >= 60) {
            throw ('minuteStep must be greater than zero and less than 60');
          }
          if (configuration.dropdownSelector !== null && !angular.isString(configuration.dropdownSelector)) {
            throw ('dropdownSelector must be a string');
          }
  
          /* istanbul ignore next */
          if (configuration.dropdownSelector !== null && ((typeof jQuery === 'undefined') || (typeof jQuery().dropdown !== 'function'))) {
            $log.error('Please DO NOT specify the dropdownSelector option unless you are using jQuery AND Bootstrap.js. ' +
            'Please include jQuery AND Bootstrap.js, or write code to close the dropdown in the on-set-time callback. \n\n' +
            'The dropdownSelector configuration option is being removed because it will not function properly.');
            delete configuration.dropdownSelector;
          }
        };
  
        return {
          restrict: 'E',
          require: 'ngModel',
          template: '<div class="datetimepicker table-responsive">' +
          '<table class="table table-striped  {{ data.currentView }}-view">' +
          '   <thead>' +
          '       <tr>' +
          '           <th class="left" data-ng-click="changeView(data.currentView, data.leftDate, $event)" data-ng-show="data.leftDate.selectable" data-ng-class="{disabled: data.dataDisplayMonth == constData.beforeMonth && data.dataDisplayYear == constData.beforeYear}"><i class="glyphicon fa fa-play-circle fa-flip-horizontal"/></th>' +
  
          '           <th class="switch" colspan="5" data-ng-show="data.previousViewDate.selectable" data-ng-if="data.currentView == \'day\'">' +
          '               <select name="select" data-ng-change="changeViewMonth(constData.monthViewNew, data.monthDates.dates, data.dataDisplayMonth)" ng-model="data.dataDisplayMonth"><option data-ng-repeat="dateObject in data.monthDates.dates" ng-value="{{dateObject.display}}" data-ng-class="{active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" label="{{dateObject.display}}">{{ dateObject.display }}</option>'+
          '               </select>' +
          '               <select name="select" data-ng-change="changeViewYear(constData.yearViewNew)" ng-model="data.dataDisplayYear"><option data-ng-repeat="dateObject in displayYearSet.dates" ng-value="{{dateObject.display}}" data-ng-class="{active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" label="{{dateObject.display}}" data-ng-hide="dateObject.future || dateObject.past">{{ dateObject.display }}</option>'+
          '               </select></th>' +
          '           <th class="right" data-ng-click="changeView(data.currentView, data.rightDate, $event)" data-ng-show="data.rightDate.selectable" data-ng-class="{disabled: data.dataDisplayMonth == constData.afterMonth && data.dataDisplayYear == constData.afterYear}"><i class="glyphicon fa fa-play-circle"/></th>' +
          '       </tr>' +
          '       <tr>' +
          '           <th class="dow" data-ng-repeat="day in data.dayNames" >{{ day }}</th>' +
          '       </tr>' +
          '   </thead>' +
          '   <tbody>' +
          '       <tr data-ng-if="data.currentView !== \'day\'" >' +
          '           <td colspan="7" >' +
          '              <span    class="{{ data.currentView }}" ' +
          '                       data-ng-repeat="dateObject in data.dates"  ' +
          '                       data-ng-class="{active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" ' +
          '                       data-ng-click="changeView(data.nextView, dateObject, $event)">{{ dateObject.display }}</span> ' +
          '           </td>' +
          '       </tr>' +
          '       <tr data-ng-if="data.currentView === \'day\'" data-ng-repeat="week in data.weeks">' +
          '           <td data-ng-repeat="dateObject in week.dates" ' +
          '               data-ng-click="changeView(data.nextView, dateObject, $event)"' +
          '               class="day" ' +
          '               data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable || dateObject.migDisabledDate}" ><b data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable || dateObject.migDisabledDate}" >{{ dateObject.display }}</b></td>' +
          '       </tr>' +
          '   </tbody>' +
          '</table></div>',
          scope: {
            onSetTime: '&',
            beforeRender: '&'
          },
          replace: true,
          link: function link(scope, element, attrs, ngModelController) {
  
            var directiveConfig = {};
  
            if (attrs.datetimepickerConfig) {
              directiveConfig = scope.$parent.$eval(attrs.datetimepickerConfig);
            }
  
            var configuration = {};
  
            angular.extend(configuration, defaultConfig, directiveConfig);
  
            validateConfiguration(configuration);
  
            var startOfDecade = function startOfDecade(unixDate) {
              var startYear = (parseInt(moment.utc(unixDate).year() / 10, 10) * 10);
              return moment.utc(unixDate).year(startYear).startOf('year');
            };
            var startOfDecadeDropdown = function startOfDecadeDropdown() {
              var unixDate = -2208988800000; //1900 for custom
              var startYear = (parseInt(moment.utc(unixDate).year() / 10, 10) * 10);
              return moment.utc(unixDate).year(startYear).startOf('year');
            };
  
            var dataFactory = {
              year: function year(unixDate) {
                var selectedDate = moment.utc(unixDate).startOf('year');
                // View starts one year before the decade starts and ends one year after the decade ends
                // i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
                // Truncate the last digit from the current year and subtract 1 to get the start of the decade
                // var startDecade = (parseInt(selectedDate.year() / 10, 10) * 10);
                // var startDate = moment.utc(startOfDecade(unixDate)).subtract(1, 'year').startOf('year');
                var startDateDropdown = moment.utc(startOfDecadeDropdown()).subtract(1, 'year').startOf('year');
                var activeYear = ngModelController.$modelValue ? moment(ngModelController.$modelValue).year() : 0;
  
                var result = {
                  'currentView': 'year',
                  'nextView': configuration.minView === 'year' ? 'setTime' : 'day',
                  'previousViewDate': new DateObject({
                    utcDateValue: null,
                    display: 'YEAR'
                  }),
                  'leftDate': new DateObject({utcDateValue: moment.utc(startDateDropdown).subtract(9, 'year').valueOf()}),
                  'rightDate': new DateObject({utcDateValue: moment.utc(startDateDropdown).add(11, 'year').valueOf()}),
                  'dates': []
                };
  
                for (var i = 0; i < 202; i += 1) {
                  var yearMoment = moment.utc(startDateDropdown).add(i, 'years');
                  var dateValue = {
                    'utcDateValue': yearMoment.valueOf(),
                    'display': yearMoment.format('YYYY'),
                    'past': yearMoment.year() < 1900,
                    'future': yearMoment.year() > 2100,
                    'active': yearMoment.year() === activeYear
                  };
                  result.dates.push(new DateObject(dateValue));
                }
                result.dates.shift();//ie option can not display:none
                return result;
              },
  
              month: function month(unixDate) {
                var startDate = moment.utc(unixDate).startOf('year');
                var previousViewDate = startOfDecade(unixDate);
                var activeDate = ngModelController.$modelValue ? moment(ngModelController.$modelValue).format('YYYY-MMM') : 0;
  
                var result = {
                  'previousView': 'day',
                  'currentView': 'month',
                  'nextView': configuration.minView === 'month' ? 'setTime' : 'day',
                  'previousViewDate': new DateObject({
                    utcDateValue: previousViewDate.valueOf(),
                    display: 'MONTH'
                  }),
                  'leftDate': new DateObject({utcDateValue: moment.utc(startDate).subtract(1, 'year').valueOf()}),
                  'rightDate': new DateObject({utcDateValue: moment.utc(startDate).add(1, 'year').valueOf()}),
                  'dates': []
                };
  
                for (var i = 0; i < 12; i += 1) {
                  var monthMoment = moment.utc(startDate).add(i, 'months');
                  var dateValue = {
                    'utcDateValue': monthMoment.valueOf(),
                    'display': monthMoment.format('MMM'),
                    'active': monthMoment.format('YYYY-MMM') === activeDate
                  };
  
                  result.dates.push(new DateObject(dateValue));
                }
  
                return result;
              },
  
              day: function day(unixDate) {
                var selectedDate = moment.utc(unixDate);
                var startOfMonth = moment.utc(selectedDate).startOf('month');
                var previousViewDate = moment.utc(selectedDate).startOf('year');
                var endOfMonth = moment.utc(selectedDate).endOf('month');
  
                var startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');
  
                var activeDate = ngModelController.$modelValue ? moment(ngModelController.$modelValue).format('YYYY-MMM-DD') : '';
                var currentFormat = moment().format('YYYY-MMM-DD');
  
                var result = {
                  'previousView': 'month',
                  'currentView': 'day',
                  'nextView': configuration.minView === 'day' ? 'setTime' : 'hour',
                  'displayYear': startOfMonth.format('YYYY'),
                  'displayMonth': startOfMonth.format('MMM'),
                  'calculateMonth': startOfMonth.format('MM'),
                  'previousViewDate': new DateObject({
                    utcDateValue: previousViewDate.valueOf(),
                    display: startOfMonth.format('YYYY-MMM')
                  }),
                  'leftDate': new DateObject({utcDateValue: moment.utc(startOfMonth).subtract(1, 'months').valueOf()}),
                  'rightDate': new DateObject({utcDateValue: moment.utc(startOfMonth).add(1, 'months').valueOf()}),
                  'dayNames': [],
                  'weeks': []
                };
  
  
                for (var dayNumber = 0; dayNumber < 7; dayNumber += 1) {
                  result.dayNames.push(moment.utc().weekday(dayNumber).format('dd'));
                }
  
                for (var i = 0; i < 6; i += 1) {
                  var week = {dates: []};
                  for (var j = 0; j < 7; j += 1) {
                    var dayMoment = moment.utc(startDate).add((i * 7) + j, 'days');
                    var dateValue = {
                      'utcDateValue': dayMoment.valueOf(),
                      'display': dayMoment.format('D'),
                      'active': dayMoment.format('YYYY-MMM-DD') === activeDate,
                      'current': ((activeDate == "") && (dayMoment.format('YYYY-MMM-DD') === currentFormat)),
                      'past': dayMoment.isBefore(startOfMonth),
                      'future': dayMoment.isAfter(endOfMonth),
                      'migDisabledDate': moment(dayMoment.format('YYYY-MM-DD')).isBefore('1900-01-01') || moment(dayMoment.format('YYYY-MM-DD')).isAfter('2100-12-31')
                    };
                    week.dates.push(new DateObject(dateValue));
                  }
                  result.weeks.push(week);
                }
  
                return result;
              },
  
              hour: function hour(unixDate) {
                var selectedDate = moment.utc(unixDate).startOf('day');
                var previousViewDate = moment.utc(selectedDate).startOf('month');
  
                var activeFormat = ngModelController.$modelValue ? moment(ngModelController.$modelValue).format('YYYY-MM-DD H') : '';
  
                var result = {
                  'previousView': 'day',
                  'currentView': 'hour',
                  'nextView': configuration.minView === 'hour' ? 'setTime' : 'minute',
                  'previousViewDate': new DateObject({
                    utcDateValue: previousViewDate.valueOf(),
                    display: selectedDate.format('ll')
                  }),
                  'leftDate': new DateObject({utcDateValue: moment.utc(selectedDate).subtract(1, 'days').valueOf()}),
                  'rightDate': new DateObject({utcDateValue: moment.utc(selectedDate).add(1, 'days').valueOf()}),
                  'dates': []
                };
  
                for (var i = 0; i < 24; i += 1) {
                  var hourMoment = moment.utc(selectedDate).add(i, 'hours');
                  var dateValue = {
                    'utcDateValue': hourMoment.valueOf(),
                    'display': hourMoment.format('LT'),
                    'active': hourMoment.format('YYYY-MM-DD H') === activeFormat
                  };
  
                  result.dates.push(new DateObject(dateValue));
                }
  
                return result;
              },
  
              minute: function minute(unixDate) {
                var selectedDate = moment.utc(unixDate).startOf('hour');
                var previousViewDate = moment.utc(selectedDate).startOf('day');
                var activeFormat = ngModelController.$modelValue ? moment(ngModelController.$modelValue).format('YYYY-MM-DD H:mm') : '';
  
                var result = {
                  'previousView': 'hour',
                  'currentView': 'minute',
                  'nextView': 'setTime',
                  'previousViewDate': new DateObject({
                    utcDateValue: previousViewDate.valueOf(),
                    display: selectedDate.format('lll')
                  }),
                  'leftDate': new DateObject({utcDateValue: moment.utc(selectedDate).subtract(1, 'hours').valueOf()}),
                  'rightDate': new DateObject({utcDateValue: moment.utc(selectedDate).add(1, 'hours').valueOf()}),
                  'dates': []
                };
  
                var limit = 60 / configuration.minuteStep;
  
                for (var i = 0; i < limit; i += 1) {
                  var hourMoment = moment.utc(selectedDate).add(i * configuration.minuteStep, 'minute');
                  var dateValue = {
                    'utcDateValue': hourMoment.valueOf(),
                    'display': hourMoment.format('LT'),
                    'active': hourMoment.format('YYYY-MM-DD H:mm') === activeFormat
                  };
  
                  result.dates.push(new DateObject(dateValue));
                }
  
                return result;
              },
  
              setTime: function setTime(unixDate) {
                var tempDate = new Date(unixDate);
                var newDate = new Date(tempDate.getTime() + (tempDate.getTimezoneOffset() * 60000));
  
                var oldDate = ngModelController.$modelValue;
                ngModelController.$setViewValue(newDate);
  
                if (configuration.dropdownSelector) {
                  jQuery(configuration.dropdownSelector).dropdown('toggle');
                }
  
                scope.onSetTime({newDate: newDate, oldDate: oldDate});
  
                return dataFactory[configuration.startView](unixDate);
              }
            };
  
            var getUTCTime = function getUTCTime(modelValue) {
              var tempDate = (modelValue ? moment(modelValue).toDate() : new Date());
              return tempDate.getTime() - (tempDate.getTimezoneOffset() * 60000);
            };
            scope.constData = {};
            scope.constData.yearViewNew = 'day';
            scope.constData.monthViewNew = 'day';
            scope.constData.beforeMonth = 'Jan';
            scope.constData.beforeYear = '1900';
            scope.constData.afterMonth = 'Dec';
            scope.constData.afterYear = '2100';
            scope.changeView = function changeView(viewName, dateObject, event) {
              if (event) {
                event.stopPropagation();
                event.preventDefault();
              }
              if (viewName && (dateObject.utcDateValue > -Infinity) && dateObject.selectable && dataFactory[viewName]) {
                var result = dataFactory[viewName](dateObject.utcDateValue);
                result.monthDates = dataFactory['month'](dateObject.utcDateValue);
                if(angular.isUndefined(scope.displayYearSet)){
                    scope.displayYearSet = dataFactory['year'](dateObject.utcDateValue);
                }
                var weekDates = [];
                if (result.weeks) {
                  for (var i = 0; i < result.weeks.length; i += 1) {
                    var week = result.weeks[i];
                    for (var j = 0; j < week.dates.length; j += 1) {
                      var weekDate = week.dates[j];
                      weekDates.push(weekDate);
                    }
                  }
                }
  
                scope.beforeRender({
                  $view: result.currentView,
                  $dates: result.dates || weekDates,
                  $leftDate: result.leftDate,
                  $upDate: result.previousViewDate,
                  $rightDate: result.rightDate
                });
                scope.data = result;
                scope.data.dataDisplayYear = result.displayYear;
                scope.data.dataDisplayMonth = result.displayMonth;
                scope.selectedMonthSet = result.calculateMonth;
              }
            };
            scope.changeViewMonth = function changeView(viewName, dateObject, displayDateValue) {
              var dateObjectNew = {};
              for (var i = 0, len = dateObject.length; i < len; i++) {
                if (dateObject[i].display == displayDateValue) {
                  dateObjectNew = dateObject[i];
                  break;
                }
              }
              if (viewName && (dateObjectNew.utcDateValue > -Infinity) && dateObjectNew.selectable && dataFactory[viewName]) {
                var result = dataFactory[viewName](dateObjectNew.utcDateValue);
                result.monthDates = dataFactory['month'](dateObjectNew.utcDateValue);
                var weekDates = [];
                if (result.weeks) {
                    for (var i = 0; i < result.weeks.length; i += 1) {
                        var week = result.weeks[i];
                        for (var j = 0; j < week.dates.length; j += 1) {
                            var weekDate = week.dates[j];
                            weekDates.push(weekDate);
                        }
                    }
                }
  
                scope.beforeRender({
                    $view: result.currentView,
                    $dates: result.dates || weekDates,
                    $leftDate: result.leftDate,
                    $upDate: result.previousViewDate,
                    $rightDate: result.rightDate
                });
                scope.data = result;
                scope.data.dataDisplayYear = result.displayYear;
                scope.data.dataDisplayMonth = result.displayMonth;
                scope.selectedMonthSet = result.calculateMonth;
              }
            };
            scope.changeViewYear = function changeView(viewName) {
              var dateObjectNew = {};
              dateObjectNew.utcDateValue = moment.utc(scope.data.dataDisplayYear+"-"+scope.selectedMonthSet+"-01").valueOf();
              if (viewName && (dateObjectNew.utcDateValue > -Infinity)  && dataFactory[viewName]) {
                var result = dataFactory[viewName](dateObjectNew.utcDateValue);
                result.monthDates = dataFactory['month'](dateObjectNew.utcDateValue);
                var weekDates = [];
                if (result.weeks) {
                    for (var i = 0; i < result.weeks.length; i += 1) {
                        var week = result.weeks[i];
                        for (var j = 0; j < week.dates.length; j += 1) {
                            var weekDate = week.dates[j];
                            weekDates.push(weekDate);
                        }
                    }
                }
                scope.beforeRender({
                    $view: result.currentView,
                    $dates: result.dates || weekDates,
                    $leftDate: result.leftDate,
                    $upDate: result.previousViewDate,
                    $rightDate: result.rightDate
                });
                scope.data = result;
                scope.data.dataDisplayYear = result.displayYear;
                scope.data.dataDisplayMonth = result.displayMonth;
              };
            };
  
  
              ngModelController.$render = function $render() {
              scope.changeView(configuration.startView, new DateObject({utcDateValue: getUTCTime(ngModelController.$viewValue)}));
            };
          }
        };
      }]);
  }));
  