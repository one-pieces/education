/// <reference path='../../app.d.ts' />

import exampleService = require("../../components/services/example/example-service");
'use strict';

export interface IScope extends ng.IScope {
    home?: HomeController;
}

export var controllerName = 'cftvc.home.controller';

/**
 * Controller for the home page
 */
export class HomeController {
    static $inject = ['$scope', exampleService.serviceName];

    title = 'cftvc';
    test = 'test';

    constructor(private $scope: IScope,
        private exampleService: exampleService.Service) {
        $scope.home = this;
        this.test = exampleService.exampleFunc();
    }
}

export class Controller extends HomeController {}