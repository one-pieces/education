/// <reference path='./app.d.ts' />
/// <amd-dependency path='ui.router' />

import angular = require('angular');
import home = require("./features/home/home");

'use strict';

export var moduleName = 'cftvc.routes';

angular.module(moduleName, ['ui.router', home.moduleName])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('cftvc', {
                url: '/cftvc/home',
                template: home.template,
                controller: home.controllerName
            });
    }]);