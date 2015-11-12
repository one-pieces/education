/// <reference path='../../../../app.d.ts' />
/// <amd-dependency path='css!./sort-page.css' />
/// <amd-dependency path='text!components/directives/base-pages/sort-page/sort-page.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.sortPage';
export var directiveName = 'opSortPage';
export var templateText = window.require('text!components/directives/base-pages/sort-page/sort-page.html');

export interface IScope extends ng.IScope {
    sortPage: SortPage;
    data: any;
}

/**
 * GoalPage class for the directive
 */
export class SortPage {
    static $inject = ['scope'];
    isChecked: boolean = false;
    constructor(private $scope: IScope) {

        $scope.list1 = [{},{},{},{}];
        var listTemp = [];
        angular.copy($scope.data.src, listTemp);
        $scope.list2 = listTemp;

        $scope.startCallback = function(event, ui, title) {
            $scope.$emit('slide',
                { event: event });
            console.log('You started draggin: ' + title.title);
            $scope.draggedTitle = title.title;
        };
        $scope.stopCallback = function(event, ui) {
            console.log('Why did you stop draggin me?');
        };
        $scope.dragCallback = function(event, ui) {
            $scope.$emit('slide',
                { event: event });
            console.log('hey, look I`m flying');
        };
        $scope.dropCallback = function(event, ui) {
            console.log($scope.data.src);
            console.log('hey, you dumped me :-(' , $scope.draggedTitle);
        };


        $scope.overCallback = function(event, ui) {
            console.log('Look, I`m over you');
        };

        $scope.outCallback = function(event, ui) {
            console.log('I`m not, hehe');
        };

    }
    reset() {
        var listTemp = [];
        angular.copy(this.$scope.data.src, listTemp);
        this.$scope.list2 = listTemp;
        this.$scope.list1 = [{},{},{},{}];
    }

    submit() {
        this.isChecked = true;
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
        data: '='
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