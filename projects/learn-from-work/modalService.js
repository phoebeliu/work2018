define([
    'underscore',
    'message-view.html',
    'progress-view.html',
    'angularBootstrap'
], function (underscore, messageView, progressView) {
    'use strict';


    var _showMessage = function ($modal, title, message, description, actionObj, iconClass, templateStr, showCancel, options, cancelBtnLabel) {
        var opts = {
            template: templateStr,
            backdrop: 'static',
            controller: 'ModalController',
            resolve: {
                model: function () {
                    return {
                        title: title,
                        message: message,
                        description: description,
                        showCancelBtn: showCancel,
                        keyboard: 'false',
                        iconClass: iconClass,
                        cancelBtnLabel: cancelBtnLabel,
                        action: actionObj
                    };
                }
            }
        };
        if (options) {
            angular.extend(opts, options);
        }

        return $modal.open(opts);
    };


    return ['$modal', '$filter', '$q', '$location', '$anchorScroll', function ($modal, $filter, $q, $location, $anchorScroll) {
        return {
            scrollToFirstError: function (form) {
                //move to the first error field
                if(form.messages && form.messages[0] && form.messages[0].fieldId){
                    var fieldElement = $('#' + form.messages[0].fieldId);
                    if(fieldElement){
                        $location.hash(form.messages[0].fieldId);
                        $anchorScroll();
                    }
                }
            },

            showInfo: function (title, message, description, actionLabel, actionBtnClass) {
                var actionProperties = {
                    label: actionLabel,
                    btnClass: actionBtnClass,
                    backdrop: 'static'
                };

                return _showMessage($filter, $modal, title, message, description, actionProperties, 'messageInformationIcon', messageTemplate);
            },

            showConfirm: function (title, message, description, actionLabel, actionBtnClass, cancelLabel) {
                var actionProperties = {
                    label: actionLabel,
                    btnClass: actionBtnClass
                };
                cancelLabel = cancelLabel;
                var opts = {
                    keyboard: false
                };
                return _showMessage($filter, $modal, title, message, description, actionProperties, 'messageQuestionIcon', messageTemplate, true, opts, cancelLabel);
            },

            showWarning: function (title, message, description, actionLabel, actionBtnClass, cancelLabel) {
                var actionProperties = {
                    label: actionLabel,
                    btnClass: actionBtnClass
                };
                var opts = {
                    keyboard: false
                };
                cancelLabel = cancelLabel;
                return _showMessage($filter, $modal, title, message, description, actionProperties, 'messageWarningIcon', messageTemplate, true, opts, cancelLabel);
            },

            showError: function (title, message, description, actionLabel, actionBtnClass) {
                var actionProperties = {
                    label: actionLabel,
                    btnClass: actionBtnClass
                };
                return _showMessage($filter, $modal, title, message, description, actionProperties, 'messageErrorIcon', messageTemplate);
            },

            showSuccess: function (title, message, description, actionLabel, actionBtnClass) {
                var actionProperties = {
                    label: actionLabel,
                    btnClass: actionBtnClass
                };
                return _showMessage($filter, $modal, title, message, description, actionProperties, 'messageSuccessIcon', messageTemplate);
            },

            showProgressDialog: function (title, hidePromise) {

                var msgBox = new $modal.open({
                    template: progressView,
                    keyboard: false,
                    backdrop: 'static',
                    controller: 'ModalController',
                    resolve: {
                        model: function () {
                            return {
                                title: title
                            };
                        }
                    }
                });

                //To resolve lack of mask layer when calling this function in popup page
                var msgBox2 = new $modal.open({
                    template: progressView,
                    keyboard: false,
                    backdrop: 'static',
                    controller: 'ModalController',
                    resolve: {
                        model: function () {
                            return {
                                title: title
                            };
                        }
                    }
                });

                $q.when(hidePromise, function (response) {
                    msgBox.close();
                    msgBox2.close();
                    return response;
                }, function (error) {
                    msgBox.close();
                    msgBox2.close();
                    return error;
                });

                return msgBox;
            },

            showTwoPromiseProgressDialog: function (title, hidePromise1, hidePromise2) {

                var msgBox = new $modal.open({
                    template: progressView,
                    keyboard: false,
                    backdrop: 'static',
                    controller: 'ModalController',
                    resolve: {
                        model: function () {
                            return {
                                title: title
                            };
                        }
                    }
                });

                var prom1Returned = false;
                var prom2Returned = false;

                $q.when(hidePromise1, function () {
                    prom1Returned = true;
                    if (prom2Returned === true) {
                        msgBox.close();
                    }

                }, function (error) {
                    console.error(error);
                    msgBox.close();
                    return $q.reject([error]);
                });

                $q.when(hidePromise2, function () {
                    prom2Returned = true;
                    if (prom1Returned === true) {
                        msgBox.close();
                    }

                }, function (error) {
                    console.error(error);
                    msgBox.close();
                    return $q.reject([error]);
                });
            },

            /**
             * Shows a simple dialog composed of external template and controller components. It allows user to create
             * new dialog using just a simple functions and not a separate "controller" instance (which is anyway
             * just a same collection of functions). Not recommended for a complex scenarios (use separate controller
             * instead).
             *
             * @param template data rendering template.
             * @param data simple scope data. This map is copied to scope "as-is". Useful to provide initial (or data)
             * model values, some basic (non-scope) functions.
             * @param scopeFunctions functions to bind to a scope. This map should have only a functions as it's values.
             * Each that function should receive a $scope argument as it's first value. This functions are bound
             * (partially applied) to a context. Result of that partial application is bound to the scope using
             * original function's key.
             * <p> Example. If we have a pair 'someFunction' : function($scope, a, b, c) {}, resulting scope will have
             * a function 'someFunction': function(a, b, c) {};
             * @param initializer optional function to invoke on the scope. This function may install watches,
             * binding, etc...
             */
            'showSimpleDialog': function (template, data, scopeFunctions, initializer) {
                $modal.open({
                    template: template,
                    backdrop: true,
                    controller: ['$scope', function ($scope) {
                        var key;
                        if (data) {
                            for (key in data) {
                                if (data.hasOwnProperty(key)) {
                                    $scope[key] = data[key];
                                }
                            }
                        }

                        if (scopeFunctions) {
                            for (key in scopeFunctions) {
                                if (scopeFunctions.hasOwnProperty(key)) {
                                    $scope[key] = underscore.partial(scopeFunctions[key], $scope);
                                }
                            }
                        }

                        if (initializer) {
                            initializer($scope);
                        }
                    }]
                });
            }

        };
    }];
});
