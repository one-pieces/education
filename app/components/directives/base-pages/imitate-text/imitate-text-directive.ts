/// <re f eren c e path='../../../../app.d.ts' />
/// <amd-dependency path='css!./imitate-text.css' />
/// <amd-dependency path='text!components/directives/base-pages/imitate-text/imitate-text.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.imitateText';
export var directiveName = 'opImitateText';
export var templateText = window.require('text!components/directives/base-pages/imitate-text/imitate-text.html');

export interface IScope extends ng.IScope {
    imitateText: ImitateText;
    data: any;
}

/**
 * ImitateText class for the directive
 */
export class ImitateText {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
        console.log(scope.data);
    }
}

/**
 * ImitateText-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-imitate-text some-attribute="AString">
 *     </op-imitate-text>
 * </div>
 *
 * ```
 */
export class ImitateTextDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '='
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.imitateText = <ImitateText>
        this.$injector.instantiate(ImitateText, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ImitateTextDirective);
    }]);