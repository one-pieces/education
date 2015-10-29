/// <reference path='../../../../app.d.ts' />
/// <amd-dependency path='css!./score-page.css' />
/// <amd-dependency path='text!components/directives/base-pages/score-page/score-page.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.scorePage';
export var directiveName = 'opScorePage';
export var templateText = window.require('text!components/directives/base-pages/score-page/score-page.html');

export interface IScope extends ng.IScope {
    scorePage: ScorePage;
    label: string;
    score: string;
}

/**
 * ScorePage class for the directive
 */
export class ScorePage {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
        console.log(scope.label);
    }
}

/**
 * ScorePage-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-score-page score="score">
 *     </op-score-page>
 * </div>
 *
 * ```
 */
export class ScorePageDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        label: '@',
        score: '@'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.scorePage = <ScorePage>
        this.$injector.instantiate(ScorePage, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ScorePageDirective);
    }]);