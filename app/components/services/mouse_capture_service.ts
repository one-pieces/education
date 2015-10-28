/// <reference path='../../app.d.ts' />

import angular = require('angular');
import config = require('config');
'use strict';

export var moduleName = config.appName + '.components.services.mouseCapture';
export var serviceName = 'opMouseCapture';

/**
 * Angular service used by XXXX(service name) as utility functions.
 */
export class MouseCaptureService {
    static $inject = ['$rootScope'];
    $element: any;
    mouseCaptureConfig: any;
    constructor(private $rootScope: ng.IRootScopeService) {
        this.$element = document;
        mouseCaptureConfig = null;
    }

    mouseMove(event: any): void {
        if (this.mouseCaptureConfig && this.mouseCaptureConfig.mouseMove) {

            this.mouseCaptureConfig.mouseMove(evt);

            this.$rootScope.$digest();
        }
    }

    mouseUp(event: any): void {
        if (this.mouseCaptureConfig && this.mouseCaptureConfig.mouseUp) {

            this.mouseCaptureConfig.mouseUp(evt);

            this.$rootScope.$digest();
        }
    }

    registerElement(element: any): void {
        this.$element = element;
    }

    acquire(event: any, config: any):void {
        this.release();
        this.mouseCaptureConfig = config;
        this.$element.mousemove(this.mouseMove);
        this.$element.mouseup(this.mouseUp);
    }

    release(): void {
        if (this.mouseCaptureConfig) {

            if (this.mouseCaptureConfig.released) {

                this.mouseCaptureConfig.released();
            }

            this.mouseCaptureConfig = null;
        }

        this.$element.unbind("mousemove", this.mouseMove);
        this.$element.unbind("mouseup", this.mouseUp);
    }

}

export class Service extends MouseCaptureService {}

angular.module(moduleName, [])
    .service(serviceName, MouseCaptureService);

