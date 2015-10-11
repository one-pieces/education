/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./example.css' />
/// <amd-dependency path='text!components/directives/example/example.html' />
import angular = require('angular');

'use strict';

export var moduleName = 'cftvc.components.diretcives.Example';
export var directiveName = 'opExample';
export var templateText = window.require('text!components/directives/example/example.html');

export interface IScope extends ng.IScope {
    example: Example;
    someAttribute: string;
}

/**
 * Example class for the directive
 */
export class Example {
    static $inject = ['scope'];
    
    someValue: string;

    constructor(private scope: IScope) {
        this.someValue = 'example-directive';
    }
}

/**
 * Example-Directive
 * A example for create a directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-example some-attribute="AString">
 *     </op-example>
 * </div>
 *
 * ```
 */
export class ExampleDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        someAttribute: '@?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.example = <Example>
        this.$injector.instantiate(Example, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ExampleDirective);
    }]);