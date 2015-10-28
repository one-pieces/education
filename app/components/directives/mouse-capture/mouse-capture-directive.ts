/// <reference path='../../../app.d.ts' />

import angular = require('angular');
import config = require('config');
import mouseCaptureService = require('components/services/mouse-capture-service');

'use strict';

export var moduleName = config.appName + '.components.directive.mouseCapture';
export var directiveName = 'mouseCapture';

export interface IScope extends ng.IScope {
    mouseCapture: MouseCapture;
    someAttribute: string;
}

/**
 * GoalPage class for the directive
 */
export class MouseCapture {
    static $inject = [ 'scope', 'element', 'attrs',  mouseCaptureService.serviceName];

    constructor(private scope: IScope,
                private element: JQuery,
                private attrs: ng.IAttributes,
                private mouseCaptureService: mouseCaptureService.Service
    ){
        mouseCaptureService.registerElement(element);
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
 *     <mouse-capture some-attribute="AString">
 *     </mouse-capture>
 * </div>
 *
 * ```
 */
export class MouseCaptureDirective implements ng.IDirective {
    static $inject = [ '$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}
    restrict = 'E';
    scope = {};

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.mouseCapture = <MouseCapture>
        this.$injector.instantiate(MouseCapture, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [mouseCaptureService.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(MouseCaptureDirective);
    }]);