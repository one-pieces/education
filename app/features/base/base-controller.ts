/// <reference path='../../app.d.ts' />
import config = require('config');
import models = require('../../components/models');
import pageData = require('../../static/page-data');
import drawLineData = require('../../static/draw-line-data');
'use strict';

export interface IScope extends ng.IScope {
    base?: BaseController;
}

export var controllerName = config.appName + '.base.controller';

/**
 * Controller for the base page
 */
export class BaseController {
    static $inject = [ '$scope',
                       models.user.serviceName ];

    pageData = pageData;
    drawLineData = drawLineData;
    currentUser: models.user.IUser;
    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.base = this;
        console.log(this.drawLineData);
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });
    }
}

export class Controller extends BaseController {}