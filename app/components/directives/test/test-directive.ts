/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./test.css' />
/// <amd-dependency path='text!components/directives/test/test.html' />
import angular = require('angular');

'use strict';

export var moduleName = 'cftvc.components.diretcives.test';
export var directiveName = 'opTest';
export var templateText = window.require('text!components/directives/test/test.html');

export interface IScope extends ng.IScope {
    test: Test;
    someAttribute: string;
}

/**
 * Test class for the directive
 */
export class Test {
    static $inject = ['scope'];
    
    someValue: string;

    constructor(private scope: IScope) {
        this.someValue = 'test-directive';
    }
}

/**
 * Test-Directive
 * A example for create a directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-test some-attribute="AString">
 *     </op-test>
 * </div>
 *
 * ```
 */
export class TestDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        someAttribute: '@?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.test = <Test>
            this.$injector.instantiate(Test, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(TestDirective);
    }]);