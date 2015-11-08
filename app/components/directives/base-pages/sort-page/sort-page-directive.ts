/// <reference path='../../../../app.d.ts' />
/// <amd-dependency path='css!./goal-page.css' />
/// <amd-dependency path='text!components/directives/base-pages/sort-page/sort-page.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.sortPage';
export var directiveName = 'opSortPage';
export var templateText = window.require('text!components/directives/base-pages/sort-page/sort-page.html');

export interface IScope extends ng.IScope {
    sortPage: SortPage;
    buttonLabel: string;
}

/**
 * GoalPage class for the directive
 */
export class SortPage {
    static $inject = ['scope'];
    constructor(private $scope: IScope) {
        $scope.images = [{'thumb': '1.png'},{'thumb': '2.png'},{'thumb': '3.png'},{'thumb': '4.png'}];
        $scope.list1 = [];
        angular.forEach($scope.images, function(val, key) {
            $scope.list1.push({});
        });
        $scope.list2 = [
            { 'title': 'KnockoutJS', 'drag': true },
            { 'title': 'EmberJS', 'drag': true },
            { 'title': 'BackboneJS', 'drag': true },
            { 'title': 'AngularJS', 'drag': true }
        ];
        $scope.startCallback = function(event, ui, title) {
            console.log('You started draggin: ' + title.title);
            $scope.draggedTitle = title.title;
        };
        $scope.stopCallback = function(event, ui) {
            console.log('Why did you stop draggin me?');
        };
        $scope.dragCallback = function(event, ui) {
            console.log('hey, look I`m flying');
        };
        $scope.dropCallback = function(event, ui) {
            console.log('hey, you dumped me :-(' , $scope.draggedTitle);
        };

        $scope.reset = function() {
            $scope.list2 = [
                { 'title': 'KnockoutJS', 'drag': true },
                { 'title': 'EmberJS', 'drag': true },
                { 'title': 'BackboneJS', 'drag': true },
                { 'title': 'AngularJS', 'drag': true }
            ];
            $scope.list1 = [{},{},{},{}];
            $scope.overCallback = function(event, ui) {
                console.log('Look, I`m over you');
            };

            $scope.outCallback = function(event, ui) {
                console.log('I`m not, hehe');
            };
        }
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
export class SortPageDirective implements ng.IDirective {
    static $inject = ['$injector'];

    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    transclude = true;
    scope = {
        buttonLabel: '@'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.sortPage = <SortPage>
            this.$injector.instantiate(SortPage, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(SortPageDirective);
    }]);