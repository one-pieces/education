/// <reference path='../../app.d.ts' />

import config = require('config');
import exampleService = require("../../components/services/example/example-service");
import models = require('../../components/models');
'use strict';

export interface IScope extends ng.IScope {
    home?: HomeController;
}

export var controllerName = config.appName + '.home.controller';

/**
 * Controller for the home page
 */
export class HomeController {
    static $inject = [ '$scope', 
                       exampleService.serviceName,
                       models.user.serviceName ];

    title = config.appName;
    test = 'test';
    currentUser: models.user.IUser;

    constructor(private $scope: IScope,
                private exampleService: exampleService.Service,
                private UserModel: models.user.IUserStatic) {
        $scope.home = this;
        this.test = exampleService.exampleFunc();
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });
    }
}

export class Controller extends HomeController {}