/// <reference path='../../../app.d.ts' />

import angular = require('angular');
import config = require('config');
import draggingService = require('components/services/dragging-service');

'use strict';

export var moduleName = config.appName + '.components.directive.flowchart';
export var directiveName = 'flowChart';
export var templateText = window.require('text!components/directives/flowchart/flowchart_template.html');
export interface IScope extends ng.IScope {
    flowChart: FlowChart;
    someAttribute: string;
}

/**
 * GoalPage class for the directive
 */
export class FlowChart {
    static $inject = [ 'scope', 'element', 'attrs',  draggingService.serviceName];
    constructor(private $scope: IScope,
                private element: JQuery,
                private attrs: ng.IAttributes,
                private draggingService: draggingService.Service,
                private document: any,
                private jQuery: any
    ){
        var controller = this;

        //
        // Reference to the document and jQuery, can be overridden for testting.
        //
        this.document = document;

        //
        // Wrap jQuery so it can easily be  mocked for testing.
        //
        this.jQuery = function (element) {
            return $(element);
        };

        //
        // Init data-model variables.
        //
        $scope.draggingConnection = false;
        $scope.connectorSize = 10;
        $scope.dragSelecting = false;


        //
        // Reference to the connection, connector or node that the mouse is currently over.
        //
        $scope.mouseOverConnector = null;
        $scope.mouseOverConnection = null;
        $scope.mouseOverNode = null;

        //
        // The class for connections and connectors.
        //
        this.connectionClass = 'connection';
        this.connectorClass = 'connector';
        this.nodeClass = 'node';
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
    template = templateText;
    constructor(private $injector: ng.auto.IInjectorService) {}
    restrict = 'E';
    scope = {
        chart: "=chart"
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.mouseCapture = <MouseCapture>
            this.$injector.instantiate(MouseCapture, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [mouseCaptureService.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(MouseCaptureDirective);
    }]);