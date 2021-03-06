/// <reference path='../../../../app.d.ts' />
/// <amd-dependency path='css!./goal-page.css' />
/// <amd-dependency path='text!components/directives/base-pages/goal-page/goal-page.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.goalPage';
export var directiveName = 'opGoalPage';
export var templateText = window.require('text!components/directives/base-pages/goal-page/goal-page.html');

export interface IScope extends ng.IScope {
    goalPage: GoalPage;
    buttonLabel: string;
}

/**
 * GoalPage class for the directive
 */
export class GoalPage {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
    }
}

/**
 * GoalPage-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-goal-page some-attribute="AString">
 *     </op-goal-page>
 * </div>
 *
 * ```
 */
export class GoalPageDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    transclude = true;
    scope = {
        buttonLabel: '@'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.goalPage = <GoalPage>
        this.$injector.instantiate(GoalPage, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(GoalPageDirective);
    }]);