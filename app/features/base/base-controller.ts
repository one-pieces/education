/// <reference path='../../app.d.ts' />

import config = require('config');
import listeningComprehensionData = require('../../static/data/listening-comprehension-data');
import models = require('../../components/models');
import pageData = require('../../static/data/page-data');
import sketchQuestionData = require('../../static/data/sketch-question-data');
import videoComprehensionData = require('../../static/data/video-comprehension-data');

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
    sketchQuestionData = sketchQuestionData;
    videoComprehensionScore = 0;
    videoComprehensionTotleScore = 0;
    videoComprehensionData = videoComprehensionData;
    listeningComprehensionScore = 0;
    listeningComprehensionTotleScore = 0;
    listeningComprehensionData = videoComprehensionData;
    pageData = pageData;
    currentUser: models.user.IUser;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.base = this;
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });

        this.sketchQuestionScoreCounter();
        this.videoComprehensionScoreCounter();
    }
    sketchQuestionScoreCounter() {
        this.sketchQuestionData.forEach(sketchQuestion => {
            this.sketchQuestionTotleScore += sketchQuestion.score;
        });

        this.$scope.$on('sketch-question', (event: any, message: any) => {
            if (message.result) {
                this.sketchQuestionScore += this.sketchQuestionData[message.id].score;
            }
        });  
    }
    videoComprehensionScoreCounter() {
        this.videoComprehensionData.forEach(videoComprehension => {
            videoComprehension.problems.forEach(problem => {
                this.videoComprehensionTotleScore += problem.score;
            });
        });

        this.$scope.$on('video-comprehension', (event: any, message: any) => {
            if (message.result) {
                this.videoComprehensionScore += 
                    this.videoComprehensionData[message.id].problems[message.problemIndex].score;
            }
        });  
    }
}

export class Controller extends BaseController {}