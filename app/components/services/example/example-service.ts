/// <reference path='../../../app.d.ts' />

import angular = require('angular');
import config = require('config');
'use strict';

export var moduleName = config.appName + '.components.services.example';
export var serviceName = 'opExample';

/**
 * Angular service used by XXXX(service name) as utility functions.
 */
export class ExampleService {
    static $inject = ['$q'];
    
    constructor(private $q: ng.IQService) {}

    /**
     * a utility function 
     */
    exampleFunc(): string {
        return 'This is a string from the example service.';
    }
}

export class Service extends ExampleService {}

angular.module(moduleName, [])
    .service(serviceName, ExampleService);

