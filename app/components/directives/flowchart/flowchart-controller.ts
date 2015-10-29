/// <reference path='../../../app.d.ts' />
import angular = require('angular');
import config = require('config');
import svgutil = require('../../../utils/svg-class');
import draggingService = require('../../../components/services/dragging-service');
import flowchart = require('../../../components/view-models/flowchart/flowchart-viewmodel');

export interface IScope extends ng.IScope {
    flowChart?: FlowChartController;
    draggingConnection: any;
    connectorSize: any;
    dragSelecting: any;
    mouseOverConnector: any;
    mouseOverConnection: any;
    mouseOverNode: any;
    mouseMove: any;
    mouseDown: any;
    nodeMouseDown: any;
    connectionMouseDown: any;
    connectorMouseDown: any;
    chart: any;
    dragSelectionStartPoint: any;
    dragSelectionRect: any;
    dragPoint1: any;
    dragPoint2: any;
    dragTangent1: any;
    dragTangent2: any;


}

export var controllerName = config.appName + '.components.directives.flowchart.controller';


/**
 * Controller for the base page
 */
export class FlowChartController {
    static $inject = [ '$scope',
        draggingService.serviceName,
        '$element'];


    document: any;
    searchUp: Function;
    hitTest: Function;
    checkForHit: Function;
    translateCoordinates: Function;

    constructor(private $scope: IScope,
                private dragging:draggingService.Service,
                private $element:JQuery,private connectionClass: string,
                private nodeClass: string, private connectorClass: string) {
        $scope.flowChart = this;


        //
        // Reference to the document and jQuery, can be overridden for testting.
        //
        this.document = document;


        //
        // Init data-model variables.
        //
        $scope.draggingConnection = false;
        $scope.connectorSize = 10;
        $scope.dragSelecting = false;
        /* Can use this to test the drag selection rect.
         $scope.dragSelectionRect = {
         x: 0,
         y: 0,
         width: 0,
         height: 0,
         };
         */

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

        //
        // Search up the HTML element tree for an element the requested class.
        //
        this.searchUp = function (element: any, parentClass: string) {

            //
            // Reached the root.
            //
            if (element == null || element.length == 0) {
                return null;
            }

            //
            // Check if the element has the class that identifies it as a connector.
            //
            if (svgutil.hasClassSVG(element, parentClass)) {
                //
                // Found the connector element.
                //
                return element;
            }

            //
            // Recursively search parent elements.
            //
            return this.searchUp(element.parent(), parentClass);
        };

        //
        // Hit test and retreive node and connector that was hit at the specified coordinates.
        //
        this.hitTest = function (clientX: any, clientY: any) {

            //
            // Retreive the element the mouse is currently over.
            //
            return this.document.elementFromPoint(clientX, clientY);
        };

        //
        // Hit test and retreive node and connector that was hit at the specified coordinates.
        //
        this.checkForHit = function (mouseOverElement: any, whichClass: any) {

            //
            // Find the parent element, if any, that is a connector.
            //
            var hoverElement = this.searchUp(this.$element(mouseOverElement), whichClass);
            if (!hoverElement) {
                return null;
            }

            return hoverElement.scope();
        };

        //
        // Translate the coordinates so they are relative to the svg element.
        //
        this.translateCoordinates = function(x: any, y: any, evt: any) {
            var svg_elem =  this.$element.get(0);
            var matrix = svg_elem.getScreenCTM();
            var point = svg_elem.createSVGPoint();
            point.x = x - evt.view.pageXOffset;
            point.y = y - evt.view.pageYOffset;
            return point.matrixTransform(matrix.inverse());
        };

        //
        // Called on mouse down in the chart.
        //
        $scope.mouseDown = (evt: any)=> {

            $scope.chart.deselectAll();

            this.dragging.startDrag(evt, {

                //
                // Commence dragging... setup variables to display the drag selection rect.
                //
                dragStarted: function (x: any, y: any) {
                    $scope.dragSelecting = true;
                    var startPoint = $scope.flowChart.translateCoordinates(x, y, evt);
                    $scope.dragSelectionStartPoint = startPoint;
                    $scope.dragSelectionRect = {
                        x: startPoint.x,
                        y: startPoint.y,
                        width: 0,
                        height: 0,
                    };
                },

                //
                // Update the drag selection rect while dragging continues.
                //
                dragging: function (x: any, y: any) {
                    var startPoint = $scope.dragSelectionStartPoint;
                    var curPoint = $scope.flowChart.translateCoordinates(x, y, evt);

                    $scope.dragSelectionRect = {
                        x: curPoint.x > startPoint.x ? startPoint.x : curPoint.x,
                        y: curPoint.y > startPoint.y ? startPoint.y : curPoint.y,
                        width: curPoint.x > startPoint.x ? curPoint.x - startPoint.x : startPoint.x - curPoint.x,
                        height: curPoint.y > startPoint.y ? curPoint.y - startPoint.y : startPoint.y - curPoint.y,
                    };
                },

                //
                // Dragging has ended... select all that are within the drag selection rect.
                //
                dragEnded: function () {
                    $scope.dragSelecting = false;
                    $scope.chart.applySelectionRect($scope.dragSelectionRect);
                    delete $scope.dragSelectionStartPoint;
                    delete $scope.dragSelectionRect;
                },
            });
        };

        //
        // Called for each mouse move on the svg element.
        //
        $scope.mouseMove = function (evt: any) {

            //
            // Clear out all cached mouse over elements.
            //
            $scope.mouseOverConnection = null;
            $scope.mouseOverConnector = null;
            $scope.mouseOverNode = null;

            var mouseOverElement = $scope.flowChart.hitTest(evt.clientX, evt.clientY);
            if (mouseOverElement == null) {
                // Mouse isn't over anything, just clear all.
                return;
            }

            if (!$scope.draggingConnection) { // Only allow 'connection mouse over' when not dragging out a connection.

                // Figure out if the mouse is over a connection.
                var scope = $scope.flowChart.checkForHit(mouseOverElement, $scope.flowChart.connectionClass);
                $scope.mouseOverConnection = (scope && scope.connection) ? scope.connection : null;
                if ($scope.mouseOverConnection) {
                    // Don't attempt to mouse over anything else.
                    return;
                }
            }

            // Figure out if the mouse is over a connector.
            var scope = $scope.flowChart.checkForHit(mouseOverElement, $scope.flowChart.connectorClass);
            $scope.mouseOverConnector = (scope && scope.connector) ? scope.connector : null;
            if ($scope.mouseOverConnector) {
                // Don't attempt to mouse over anything else.
                return;
            }

            // Figure out if the mouse is over a node.
            var scope = $scope.flowChart.checkForHit(mouseOverElement, $scope.flowChart.nodeClass);
            $scope.mouseOverNode = (scope && scope.node) ? scope.node : null;
        };

        //
        // Handle mousedown on a node.
        //
        $scope.nodeMouseDown = (evt: any, node: any) => {

            var chart: any = $scope.chart;
            var lastMouseCoords: any;

            this.dragging.startDrag(evt, {

                //
                // Node dragging has commenced.
                //
                dragStarted: function (x: any, y: any) {

                    lastMouseCoords = $scope.flowChart.translateCoordinates(x, y, evt);

                    //
                    // If nothing is selected when dragging starts,
                    // at least select the node we are dragging.
                    //
                    if (!node.selected()) {
                        chart.deselectAll();
                        node.select();
                    }
                },

                //
                // Dragging selected nodes... update their x,y coordinates.
                //
                dragging: function (x: any, y: any) {

                    var curCoords = $scope.flowChart.translateCoordinates(x, y, evt);
                    var deltaX = curCoords.x - lastMouseCoords.x;
                    var deltaY = curCoords.y - lastMouseCoords.y;

                    chart.updateSelectedNodesLocation(deltaX, deltaY);

                    lastMouseCoords = curCoords;
                },

                //
                // The node wasn't dragged... it was clicked.
                //
                clicked: function () {
                    chart.handleNodeClicked(node, evt.ctrlKey);
                },

            });
        };

        //
        // Handle mousedown on a connection.
        //
        $scope.connectionMouseDown = function (evt: any, connection: any) {
            var chart = $scope.chart;
            chart.handleConnectionMouseDown(connection, evt.ctrlKey);

            // Don't let the chart handle the mouse down.
            evt.stopPropagation();
            evt.preventDefault();
        };

        //
        // Handle mousedown on an input connector.
        //
        $scope.connectorMouseDown = function (evt:any , node: any, connector: any, connectorIndex: any, isInputConnector: any) {

            //
            // Initiate dragging out of a connection.
            //
            this.dragging.startDrag(evt, {

                //
                // Called when the mouse has moved greater than the threshold distance
                // and dragging has commenced.
                //
                dragStarted: function (x: any, y: any) {

                    var curCoords = $scope.flowChart.translateCoordinates(x, y, evt);

                    $scope.draggingConnection = true;
                    $scope.dragPoint1 = flowchart.computeConnectorPos(node, connectorIndex, isInputConnector);
                    $scope.dragPoint2 = {
                        x: curCoords.x,
                        y: curCoords.y
                    };
                    $scope.dragTangent1 = flowchart.computeConnectionSourceTangent($scope.dragPoint1, $scope.dragPoint2);
                    $scope.dragTangent2 = flowchart.computeConnectionDestTangent($scope.dragPoint1, $scope.dragPoint2);
                },

                //
                // Called on mousemove while dragging out a connection.
                //
                dragging: function (x: any, y: any, evt: any) {
                    var startCoords = $scope.flowChart.translateCoordinates(x, y, evt);
                    $scope.dragPoint1 = flowchart.computeConnectorPos(node, connectorIndex, isInputConnector);
                    $scope.dragPoint2 = {
                        x: startCoords.x,
                        y: startCoords.y
                    };
                    $scope.dragTangent1 = flowchart.computeConnectionSourceTangent($scope.dragPoint1, $scope.dragPoint2);
                    $scope.dragTangent2 = flowchart.computeConnectionDestTangent($scope.dragPoint1, $scope.dragPoint2);
                },

                //
                // Clean up when dragging has finished.
                //
                dragEnded: function () {

                    if ($scope.mouseOverConnector &&
                        $scope.mouseOverConnector !== connector) {

                        //
                        // Dragging has ended...
                        // The mouse is over a valid connector...
                        // Create a new connection.
                        //
                        $scope.chart.createNewConnection(connector, $scope.mouseOverConnector);
                    }

                    $scope.draggingConnection = false;
                    delete $scope.dragPoint1;
                    delete $scope.dragTangent1;
                    delete $scope.dragPoint2;
                    delete $scope.dragTangent2;
                },

            });
        };

    }
}

export class Controller extends FlowChartController {}