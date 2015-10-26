var chartDataModel = {

    nodes: [
        {
            name: "chair ",
            id: 0,
            x: 0,
            y: 0,
            outputConnectors: [
                {
                    name: "A",
                }
            ],
        },

        {
            name: "椅子",
            id: 1,
            x: 0,
            y: 200,
            inputConnectors: [
                {
                    name: "A",
                }
            ]
        },

    ],
    connections: [
        {}
    ]
};

export = chartDataModel;
