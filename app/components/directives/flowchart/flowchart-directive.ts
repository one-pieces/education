/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='text!components/directives/flowchart/flowchart_template.html' />
import angular = require('angular');
import config = require('config');
import flowChartController = require('../../../components/directives/flowchart/flowchart-controller');

'use strict';

export var moduleName = config.appName + '.components.directive.flowchart';
export var directiveName = 'flowChart';
export var templateText = window.require('text!components/directives/flowchart/flowchart_template.html');
export interface IScope extends ng.IScope {
    chart: any;
    someAttribute: string;
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
export class FlowChartDirective implements ng.IDirective {
    template = templateText;
    replace = true;
    restrict = 'E';
    scope = {
        chart: '=chart'
    }
    controller = flowChartController.Controller;
    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
    }
}

angular.module(moduleName, [])
    .controller(flowChartController.controllerName, flowChartController.Controller)
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(FlowChartDirective);
    }]);