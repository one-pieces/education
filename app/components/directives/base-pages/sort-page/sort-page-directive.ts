/// <reference path='../../../../app.d.ts' />
/// <amd-dependency path='ngDD' />
/// <amd-dependency path='css!./parent-page.css' />
/// <amd-dependency path='css!./sort-page.css' />
/// <amd-dependency path='text!components/directives/base-pages/sort-page/sort-page.html' />
import angular = require('angular');
import config = require('config');

// 'use strict';

export var moduleName = config.appName + '.components.directives.basePages.sortPage';
export var directiveName = 'opSortPage';
export var templateText = window.require('text!components/directives/base-pages/sort-page/sort-page.html');

export interface IScope extends ng.IScope {
    sortPage: SortPage;
    someAttribute: string;
    data: any;

}

/**
 * SketchVideo class for the directive
 */
export class SortPage {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
    }
}

/**
 * SketchVideo-Directive
 *
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-sort-page some-attribute="AString">
 *     </op-sort-page>
 * </div>
 *
 * ```
 */
export class SortPageDirective implements ng.IDirective {
    static $inject = ['$injector'];

    constructor(private $injector: ng.auto.IInjectorService) {
    }

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: "="

    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.sortPage = <SortPage>
            this.$injector.instantiate(SortPage, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, ['laneolson.ui.dragdrop'])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(SortPageDirective);
    }]);