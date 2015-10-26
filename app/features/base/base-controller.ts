/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');
import pageData = require('../../static/data/page-data');
import sketchQuestionData = require('../../static/data/sketch-question-data');

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

    sketchQuestionScore = 0;
    sketchQuestionTotleScore = 0;
    pageData = pageData;
    sketchQuestionData = sketchQuestionData;
    currentUser: models.user.IUser;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.base = this;
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });

        this.sketchQuestionData.forEach(sketchQuestion => {
            this.sketchQuestionTotleScore += sketchQuestion.score;
        });

            $scope.$on('sketch-question', (event: any, message: any) => {
            if (message.result) {
                this.sketchQuestionScore += this.sketchQuestionData[message.id].score;
            }
        });
    }
}

export class Controller extends BaseController {}