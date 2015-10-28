/// <reference path='../../../app.d.ts' />
'use strict';
class ConnectorViewModel {
    data: any;
    name: any;
    constructor(connectorDataModel: any, private x: any, private y: any, private parentNode: any) {
        this.data = connectorDataModel;
        this.name = function () {
            return this.data.name;
        }

        //
        // X coordinate of the connector.
        //
        this.x = () => {
            return x;
        };

        //
        // Y coordinate of the connector.
        //
        this.y = () => {
            return y;
        };

        //
        // The parent node that the connector is attached to.
        //
        this.parentNode = () => {
            return parentNode;
        };
    }
};

class NodeViewModel{
    data: any;
    inputConnectors: any;
    outputConnectors: any;
    _selected: boolean;
    name: Function;
    x: Function;
    y: Function;
    width: Function;
    height: Function;
    select: Function;
    deselect: Function;
    toggleSelected: Function;
    selected: Function;
    _addConnector: Function;
    addInputConnector: Function;
    addOutputConnector: Function;
    constructor(nodeDataModel: any){
    this.data = nodeDataModel;

    // set the default width value of the node
    if (!this.data.width || this.data.width < 0) {
        this.data.width = flowchart.defaultNodeWidth;
    }
    if (!this.data.height || this.data.height < 0) {
        this.data.height = flowchart.defaultNodeHeight;
    }
    this.inputConnectors = flowchart.createConnectorsViewModel(this.data.inputConnectors, 0, this);
    this.outputConnectors = flowchart.createConnectorsViewModel(this.data.outputConnectors, this.data.height, this);

    // Set to true when the node is selected.
    this._selected = false;

    //
    // Name of the node.
    //
    this.name = function () {
        return this.data.name || "";
    };

    //
    // X coordinate of the node.
    //
    this.x = function () {
        return this.data.x;
    };

    //
    // Y coordinate of the node.
    //
    this.y = function () {
        return this.data.y;
    };

    //
    // Width of the node.
    //
    this.width = function () {
        var numConnectors =
            Math.max(
                this.inputConnectors.length,
                this.outputConnectors.length);
        return flowchart.computeConnectorX(numConnectors);
    };

    //
    // Height of the node.
    //
    this.height = function () {
        return this.data.height;
    };

    //
    // Select the node.
    //
    this.select = function () {
        this._selected = true;
    };

    //
    // Deselect the node.
    //
    this.deselect = function () {
        this._selected = false;
    };

    //
    // Toggle the selection state of the node.
    //
    this.toggleSelected = function () {
        this._selected = !this._selected;
    };

    //
    // Returns true if the node is selected.
    //
    this.selected = function () {
        return this._selected;
    };

    //
    // Internal function to add a connector.
    this._addConnector = function (connectorDataModel: any, x: any, connectorsDataModel: any, connectorsViewModel: any) {
        var connectorViewModel: any =
           new ConnectorViewModel(connectorDataModel, x,
                flowchart.computeConnectorY(connectorsViewModel.length), this);

        connectorsDataModel.push(connectorDataModel);

        // Add to node's view model.
        connectorsViewModel.push(connectorViewModel);
    };

    //
    // Add an input connector to the node.
    //
    this.addInputConnector = function (connectorDataModel: any) {

        if (!this.data.inputConnectors) {
            this.data.inputConnectors = [];
        }
        this._addConnector(connectorDataModel, 0, this.data.inputConnectors, this.inputConnectors);
    };

    //
    // Add an ouput connector to the node.
    //
    this.addOutputConnector = function (connectorDataModel: any) {

        if (!this.data.outputConnectors) {
            this.data.outputConnectors = [];
        }
        this._addConnector(connectorDataModel, this.data.width, this.data.outputConnectors, this.outputConnectors);
    };
}};

class ConnectionViewModel {
    data: any;
    source: any;
    dest: any;
    _selected: boolean;
    name: Function;
    sourceCoordX: Function;
    sourceCoordY: Function;
    sourceCoord: Function;
    sourceTangentX: Function;
    sourceTangentY: Function;
    destCoordX: Function;
    destCoordY: Function;
    destCoord: Function;
    destTangentX: Function;
    destTangentY: Function;
    middleX: Function;
    middleY: Function;
    select: Function;
    deselect: Function;
    toggleSelected: Function;
    selected: Function;
constructor(connectionDataModel: any, sourceConnector: any, destConnector: any) {
    this.data = connectionDataModel;
    this.source = sourceConnector;
    this.dest = destConnector;

    // Set to true when the connection is selected.
    this._selected = false;

    this.name = function() {
        return this.data.name || "";
    };

    this.sourceCoordX = function () {
        return this.source.parentNode().x() + this.source.x();
    };

    this.sourceCoordY = function () {
        return this.source.parentNode().y() + this.source.y();
    };

    this.sourceCoord = function () {
        return {
            x: this.sourceCoordX(),
            y: this.sourceCoordY()
        };
    };

    this.sourceTangentX = function () {
        return flowchart.computeConnectionSourceTangentX(this.sourceCoord(), this.destCoord());
    };

    this.sourceTangentY = function () {
        return flowchart.computeConnectionSourceTangentY(this.sourceCoord(), this.destCoord());
    };

    this.destCoordX = function () {
        return this.dest.parentNode().x() + this.dest.x();
    };

    this.destCoordY = function () {
        return this.dest.parentNode().y() + this.dest.y();
    };

    this.destCoord = function () {
        return {
            x: this.destCoordX(),
            y: this.destCoordY()
        };
    };

    this.destTangentX = function () {
        return flowchart.computeConnectionDestTangentX(this.sourceCoord(), this.destCoord());
    };

    this.destTangentY = function () {
        return flowchart.computeConnectionDestTangentY(this.sourceCoord(), this.destCoord());
    };

    this.middleX = function(scale: any) {
        if(typeof(scale)=="undefined")
            scale = 0.5;
        return this.sourceCoordX()*(1-scale)+this.destCoordX()*scale;
    };

    this.middleY = function(scale: any) {
        if(typeof(scale)=="undefined")
            scale = 0.5;
        return this.sourceCoordY()*(1-scale)+this.destCoordY()*scale;
    };


    //
    // Select the connection.
    //
    this.select = function () {
        this._selected = true;
    };

    //
    // Deselect the connection.
    //
    this.deselect = function () {
        this._selected = false;
    };

    //
    // Toggle the selection state of the connection.
    //
    this.toggleSelected = function () {
        this._selected = !this._selected;
    };

    //
    // Returns true if the connection is selected.
    //
    this.selected = function () {
        return this._selected;
    };
}}
var flowchart = {
    defaultNodeWidth: 125,
    defaultNodeHeight: 86,
    nodeNameHeight: 40,
    nodeNameWidth: 125,
    connectorHeight: 35,
    connectorWidth: 125,
    computeConnectorY: (connectorIndex: number) => {
        return flowchart.nodeNameHeight + (connectorIndex * flowchart.connectorHeight);
    },
    computeConnectorX: (connectorIndex: number) => {
        return flowchart.nodeNameWidth + (connectorIndex * flowchart.connectorWidth);
    },
    computeConnectorPos: (node: any, connectorIndex: any, inputConnector: any) => {
        return {
            x: node.x() + flowchart.computeConnectorX(connectorIndex),
            y: node.y() + (inputConnector ? 0 : node.height() ? node.height() : flowchart.defaultNodeHeight)
        };
    },

    createConnectorsViewModel: (connectorDataModels: any, y: any, parentNode: any) => {
        var viewModels: any = [];

        if (connectorDataModels) {
            for (var i = 0; i < connectorDataModels.length; ++i) {
                var connectorViewModel: any =
                    new ConnectorViewModel(connectorDataModels[i], flowchart.computeConnectorX(i), y, parentNode);
                viewModels.push(connectorViewModel);
            }
        }

        return viewModels;
    },

    createNodesViewModel: (nodesDataModel: any) => {
        var nodesViewModel: any = [];

        if (nodesDataModel) {
            for (var i = 0; i < nodesDataModel.length; ++i) {
                nodesViewModel.push(new NodeViewModel(nodesDataModel[i]));
            }
        }

        return nodesViewModel;
    },

    computeConnectionTangentOffset: (pt1: any, pt2: any) => {
        return (pt2.x - pt1.x) / 2;
    },
    computeConnectionSourceTangentX: (pt1: any, pt2: any) => {
        return pt1.x + flowchart.computeConnectionTangentOffset(pt1, pt2);
    },
    computeConnectionSourceTangentY: (pt1: any, pt2: any) => {
        return pt1.y;
    },
    computeConnectionSourceTangent: (pt1: any, pt2: any) => {
        return {
            x: flowchart.computeConnectionSourceTangentX(pt1, pt2),
            y: flowchart.computeConnectionSourceTangentY(pt1, pt2)
        };
    },
    computeConnectionDestTangentX: (pt1: any, pt2: any) => {
        return pt2.x - flowchart.computeConnectionTangentOffset(pt1, pt2);
    },
    computeConnectionDestTangentY: (pt1: any, pt2: any) => {
        return pt2.y;
    },

    computeConnectionDestTangent: (pt1: any, pt2: any) => {
        return {
            x: flowchart.computeConnectionDestTangentX(pt1, pt2),
            y: flowchart.computeConnectionDestTangentY(pt1, pt2)
        };
    },
    ChartViewModel: function(chartDataModel: any) {
        this.findNode = function (nodeID: any) {

            for (var i = 0; i < this.nodes.length; ++i) {
                var node = this.nodes[i];
                if (node.data.id == nodeID) {
                    return node;
                }
            }

            throw new Error("Failed to find node " + nodeID);
        };

        //
        // Find a specific input connector within the chart.
        //
        this.findInputConnector = function (nodeID: any, connectorIndex: any) {

            var node = this.findNode(nodeID);

            if (!node.inputConnectors || node.inputConnectors.length <= connectorIndex) {
                throw new Error("Node " + nodeID + " has invalid input connectors.");
            }

            return node.inputConnectors[connectorIndex];
        };

        //
        // Find a specific output connector within the chart.
        //
        this.findOutputConnector = function (nodeID: any, connectorIndex: any) {

            var node = this.findNode(nodeID);

            if (!node.outputConnectors || node.outputConnectors.length <= connectorIndex) {
                throw new Error("Node " + nodeID + " has invalid output connectors.");
            }

            return node.outputConnectors[connectorIndex];
        };

        //
        // Create a view model for connection from the data model.
        //
        this._createConnectionViewModel = function(connectionDataModel: any) {

            var sourceConnector = this.findOutputConnector(connectionDataModel.source.nodeID, connectionDataModel.source.connectorIndex);
            var destConnector = this.findInputConnector(connectionDataModel.dest.nodeID, connectionDataModel.dest.connectorIndex);
            return new ConnectionViewModel(connectionDataModel, sourceConnector, destConnector);
        };

        //
        // Wrap the connections data-model in a view-model.
        //
        this._createConnectionsViewModel = function (connectionsDataModel: any) {

            var connectionsViewModel: any = [];

            if (connectionsDataModel) {
                for (var i = 0; i < connectionsDataModel.length; ++i) {
                    connectionsViewModel.push(this._createConnectionViewModel(connectionsDataModel[i]));
                }
            }
            return connectionsViewModel;
        };

        // Reference to the underlying data.
        this.data = chartDataModel;

        // Create a view-model for nodes.
        this.nodes = flowchart.createNodesViewModel(this.data.nodes);

        // Create a view-model for connections.
        this.connections = this._createConnectionsViewModel(this.data.connections);

        //
        // Create a view model for a new connection.
        //
        this.createNewConnection = function (startConnector: any, endConnector: any) {
            var connectionsDataModel = this.data.connections;
            if (!connectionsDataModel) {
                connectionsDataModel = this.data.connections = [];
            }

            var connectionsViewModel = this.connections;
            if (!connectionsViewModel) {
                connectionsViewModel = this.connections = [];
            }

            var startNode = startConnector.parentNode();
            var startConnectorIndex = startNode.outputConnectors.indexOf(startConnector);
            var startConnectorType = 'output';
            if (startConnectorIndex == -1) {
                startConnectorIndex = startNode.inputConnectors.indexOf(startConnector);
                startConnectorType = 'input';
                if (startConnectorIndex == -1) {
                    throw new Error("Failed to find source connector within either inputConnectors or outputConnectors of source node.");
                }
            }

            var endNode = endConnector.parentNode();
            var endConnectorIndex = endNode.inputConnectors.indexOf(endConnector);
            var endConnectorType = 'input';
            if (endConnectorIndex == -1) {
                endConnectorIndex = endNode.outputConnectors.indexOf(endConnector);
                endConnectorType = 'output';
                if (endConnectorIndex == -1) {
                    throw new Error("Failed to find dest connector within inputConnectors or outputConnectors of dest node.");
                }
            }

            if (startConnectorType == endConnectorType) {
                throw new Error("Failed to create connection. Only output to input connections are allowed.")
            };

            if (startNode == endNode) {
                throw new Error("Failed to create connection. Cannot link a node with itself.")
            };
            var tmpConnectionsDataModel: any = [];
            var tmpConnectionsViewModel: any = [];
            for (var cnt = 0; cnt < connectionsDataModel.length; cnt++) {
                if( connectionsDataModel[cnt].source.nodeID != startNode.data.id &&
                    connectionsDataModel[cnt].source.nodeID != endNode.data.id &&
                    connectionsDataModel[cnt].dest.nodeID != endNode.data.id &&
                    connectionsDataModel[cnt].dest.nodeID != startNode.data.id) {
                    tmpConnectionsDataModel.push(connectionsDataModel[cnt]);
                }
            }

            for (var cnt = 0; cnt < connectionsViewModel.length; cnt++) {
                if( connectionsViewModel[cnt].data.source.nodeID != startNode.data.id &&
                    connectionsViewModel[cnt].data.source.nodeID != endNode.data.id &&
                    connectionsViewModel[cnt].data.dest.nodeID != endNode.data.id &&
                    connectionsViewModel[cnt].data.dest.nodeID != startNode.data.id) {
                    tmpConnectionsViewModel.push(connectionsViewModel[cnt]);
                }
            }
            connectionsDataModel = this.data.connections = tmpConnectionsDataModel;
            connectionsViewModel = this.connections = tmpConnectionsViewModel;
            var startNode: any = {
                nodeID: startNode.data.id,
                connectorIndex: startConnectorIndex
            };

            var endNode: any = {
                nodeID: endNode.data.id,
                connectorIndex: endConnectorIndex
            };

            var connectionDataModel: any = {
                source: startConnectorType == 'output' ? startNode : endNode,
                dest: startConnectorType == 'output' ? endNode : startNode
            };
            connectionsDataModel.push(connectionDataModel);

            var outputConnector: any = startConnectorType == 'output' ? startConnector : endConnector;
            var inputConnector: any = startConnectorType == 'output' ? endConnector : startConnector;

            var connectionViewModel: any = new ConnectionViewModel(connectionDataModel, outputConnector, inputConnector);
            connectionsViewModel.push(connectionViewModel);
        };


        //
        this.handleConnectionMouseDown = function (connection: any, ctrlKey: any) {

            if (ctrlKey) {
                connection.toggleSelected();
            }
            else {
                this.deselectAll();
                connection.select();
            }
        };

        //
        // Delete all nodes and connections that are selected.
        //
        this.deleteSelected = function () {

            var newNodeViewModels: any = [];
            var newNodeDataModels: any = [];

            var deletedNodeIds: any = [];

            //
            // Sort nodes into:
            //		nodes to keep and
            //		nodes to delete.
            //

            for (var nodeIndex = 0; nodeIndex < this.nodes.length; ++nodeIndex) {

                var node = this.nodes[nodeIndex];
                if (!node.selected()) {
                    // Only retain non-selected nodes.
                    newNodeViewModels.push(node);
                    newNodeDataModels.push(node.data);
                }
                else {
                    // Keep track of nodes that were deleted, so their connections can also
                    // be deleted.
                    deletedNodeIds.push(node.data.id);
                }
            }

            var newConnectionViewModels: any = [];
            var newConnectionDataModels: any = [];

            //
            // Remove connections that are selected.
            // Also remove connections for nodes that have been deleted.
            //
            for (var connectionIndex = 0; connectionIndex < this.connections.length; ++connectionIndex) {

                var connection = this.connections[connectionIndex];
                if (!connection.selected() &&
                    deletedNodeIds.indexOf(connection.data.source.nodeID) === -1 &&
                    deletedNodeIds.indexOf(connection.data.dest.nodeID) === -1)
                {
                    //
                    // The nodes this connection is attached to, where not deleted,
                    // so keep the connection.
                    //
                    newConnectionViewModels.push(connection);
                    newConnectionDataModels.push(connection.data);
                }
            }

            //
            // Update nodes and connections.
            //
            this.nodes = newNodeViewModels;
            this.data.nodes = newNodeDataModels;
            this.connections = newConnectionViewModels;
            this.data.connections = newConnectionDataModels;
        };

        //
        // Select nodes and connections that fall within the selection rect.
        //
        this.applySelectionRect = function (selectionRect: any) {

            this.deselectAll();

            for (var i = 0; i < this.nodes.length; ++i) {
                var node = this.nodes[i];
                if (node.x() >= selectionRect.x &&
                    node.y() >= selectionRect.y &&
                    node.x() + node.width() <= selectionRect.x + selectionRect.width &&
                    node.y() + node.height() <= selectionRect.y + selectionRect.height)
                {
                    // Select nodes that are within the selection rect.
                    node.select();
                }
            }

            for (var i = 0; i < this.connections.length; ++i) {
                var connection = this.connections[i];
                if (connection.source.parentNode().selected() &&
                    connection.dest.parentNode().selected())
                {
                    // Select the connection if both its parent nodes are selected.
                    connection.select();
                }
            }

        };

        //
        // Get the array of nodes that are currently selected.
        //
        this.getSelectedNodes = function () {
            var selectedNodes: any = [];

            for (var i = 0; i < this.nodes.length; ++i) {
                var node = this.nodes[i];
                if (node.selected()) {
                    selectedNodes.push(node);
                }
            }

            return selectedNodes;
        };

        //
        // Get the array of connections that are currently selected.
        //
        this.getSelectedConnections = function () {
            var selectedConnections: any = [];

            for (var i = 0; i < this.connections.length; ++i) {
                var connection = this.connections[i];
                if (connection.selected()) {
                    selectedConnections.push(connection);
                }
            }

            return selectedConnections;
        };
    }

};
export = flowchart;