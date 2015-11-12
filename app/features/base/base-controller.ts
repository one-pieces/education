/// <reference path='../../app.d.ts' />

import config = require('config');
import imitateChoiceData = require('../../static/data/imitate-choice-data');
import imitateTextData = require('../../static/data/imitate-text-data');
import listeningComprehensionData = require('../../static/data/listening-comprehension-data');
import models = require('../../components/models');
import pageData = require('../../static/data/page-data');
import sortData = require('../../static/data/sort-data');
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
    static $inject = [  '$scope',
                        models.user.serviceName ];

    imitateChoiceData = imitateChoiceData;
    imitateChoiceScoreData: any;
    imitateTextData = imitateTextData;
    sketchQuestionData = sketchQuestionData;
    sketchQuestionScoreData: any;
    videoComprehensionData = videoComprehensionData;
    videoComprehensionScoreData: any;
    listeningComprehensionData = listeningComprehensionData;
    listeningComprehensionScoreData: any;
    sortScoreData: any;
    pageData = pageData;
    sortData = sortData;
    currentUser: models.user.IUser;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.base = this;
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);

        });

        this.sketchQuestionScoreData = {
            partScore: {
                label: 'Score',
                result: {
                    score: '0',
                    totleScore: '0'
                }
            }
        }

        this.videoComprehensionScoreData = {
            partScore: {
                label: 'Score for brief comprehension',
                result: {
                    score: '0',
                    totleScore: '0'
                }
            }
        }

        this.listeningComprehensionScoreData = {
            partScore: {
                label: 'Score for listening comprehension',
                result: {
                    score: '0',
                    totleScore: '0'
                }
            }
        }

        this.imitateChoiceScoreData = {
            partScore: {
                label: 'Score for multiple choice',
                result: {
                    score: '0',
                    totleScore: '0'
                }
            }
        }

        this.sortScoreData = {
            partScore: {
                label: 'Score for sort choice',
                result: {
                    score: '0',
                    totleScore: '0'
                }
            }
        }

        this.sketchQuestionScoreCounter();
        this.videoComprehensionScoreCounter();
        this.listeningComprehensionScoreCounter();
        this.imitateChoiceScoreCounter();
    }
    sketchQuestionScoreCounter() {
        var sketchQuestionTotleScore = 0;
        var sketchQuestionScore = 0;
        this.sketchQuestionData.forEach(sketchQuestion => {
            sketchQuestionTotleScore += sketchQuestion.score;
        });
        this.sketchQuestionScoreData.partScore.result.totleScore = sketchQuestionTotleScore.toString();

        this.$scope.$on('sketch-question', (event: any, message: any) => {
            if (message.result) {
                sketchQuestionScore += this.sketchQuestionData[message.id].score;
                this.sketchQuestionScoreData.partScore.result.score = sketchQuestionScore.toString();
            }
        });  
    }
    videoComprehensionScoreCounter() {
        var videoComprehensionTotleScore = 0;
        var videoComprehensionScore = 0;
        this.videoComprehensionData.forEach(videoComprehension => {
            videoComprehension.problems.forEach(problem => {
                videoComprehensionTotleScore += problem.score;
            });
        });
        this.videoComprehensionScoreData.partScore.result.totleScore = videoComprehensionTotleScore.toString();

        this.$scope.$on('video-comprehension', (event: any, message: any) => {
            if (message.result) {
                videoComprehensionScore += 
                    this.videoComprehensionData[message.id].problems[message.problemIndex].score;
                this.videoComprehensionScoreData.partScore.result.score = videoComprehensionScore.toString();
            }
        });  
    }
    listeningComprehensionScoreCounter() {
        var listeningComprehensionTotleScore = 0;
        var listeningComprehensionScore = 0;
        this.listeningComprehensionData.forEach(listeningComprehension => {
            listeningComprehension.problems.forEach( problem => {
                listeningComprehensionTotleScore += problem.score;
            });
        });
        this.listeningComprehensionScoreData.partScore.result.totleScore = listeningComprehensionTotleScore.toString();

        this.$scope.$on('listening-comprehension', (event: any, message: any) => {
            if (message.result) {
                listeningComprehensionScore +=
                    this.listeningComprehensionData[message.id].problems[message.problemIndex].score;
                this.listeningComprehensionScoreData.partScore.result.score = listeningComprehensionScore.toString();
            }
        });  
    }
    imitateChoiceScoreCounter() {
        var imitateChoiceTotleScore = 0;
        var imitateChoiceScore = 0;
        this.imitateChoiceData.forEach(imitateChoice => {
            imitateChoice.problems.forEach( problem => {
                imitateChoiceTotleScore += problem.score;
            });
        });
        this.imitateChoiceScoreData.partScore.result.totleScore = imitateChoiceTotleScore.toString();

        this.$scope.$on('imitate-choice', (event: any, message: any) => {
            if (message.result) {
                imitateChoiceScore +=
                    this.imitateChoiceData[message.id].problems[message.problemIndex].score;
                this.imitateChoiceScoreData.partScore.result.score = imitateChoiceScore.toString();
            }
        });  
    }

    sortScoreCounter() {
        var sortTotleScore = 0;
        var sortChoiceScore = 0;
        this.sortData.forEach(sort => {
            sort.answers.forEach( answer => {
                sortChoiceScore += answer.score;
            });
        });
        this.sortData.partScore.result.totleScore = sortChoiceScore.toString();

        this.$scope.$on('score', (event: any, message: any) => {
            if (message.result) {
                sortChoiceScore +=
                    this.sortData[message.id].problems[message.problemIndex].score;
                this.imitateChoiceScoreData.partScore.result.score = imitateChoiceScore.toString();
            }
        });
    }
}

export class Controller extends BaseController  {}