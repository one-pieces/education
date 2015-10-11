/// <reference path='./app.d.ts' />

import $ = require('jquery');
import angular = require('angular');
import routes = require('./routes');

'use strict';

var moduleName = 'cftvc';

var app = angular.module(moduleName, [routes.moduleName]);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 
    function($urlRouterProvider: ng.ui.IUrlRouterProvider, 
        $stateProvider: ng.ui.IStateProvider, 
        $locationProvider: ng.ILocationProvider) {
        $urlRouterProvider
            .when('/', '/cftvc/home')
            .otherwise('/cftvc/home');

        $locationProvider.html5Mode(true);
    }]);

export function init() {   
    $(document).ready(() => {
        angular.bootstrap(document.documentElement, [moduleName], {strictDi: true});
    });
}