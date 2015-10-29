/// <reference path='../../app.d.ts' />

import angular = require('angular');
import config = require('config');
import mouseCaptureService = require('../../components/services/mouse-capture-service');
'use strict';

export var moduleName = config.appName + '.components.services.dragging';
export var serviceName = 'draggingService';

/**
 * Angular service used by XXXX(service name) as utility functions.
 */
export class DraggingService {
    static $inject = ['$rootScope', mouseCaptureService.serviceName];
    threshold: number;
    constructor(private $rootScope: ng.IRootScopeService, private mouseCaptureService: mouseCaptureService.Service) {
        this.threshold = 5;
    }
    startDrag(evt: any, config: any): void {
            var dragging: boolean = false;
            var x: number = evt.pageX;
            var y: number = evt.pageY;

            var mouseMove = (evt: any) => {
                if (!dragging) {
                    if (Math.abs(evt.pageX - x) > this.threshold ||
                        Math.abs(evt.pageY - y) > this.threshold)
                    {
                        dragging = true;

                        if (config.dragStarted) {
                            config.dragStarted(x, y, evt);
                        }

                        if (config.dragging) {
                            // First 'dragging' call to take into account that we have
                            // already moved the mouse by a 'threshold' amount.
                            config.dragging(evt.pageX, evt.pageY, evt);
                        }
                    }
                }
                else {
                    if (config.dragging) {
                        config.dragging(evt.pageX, evt.pageY, evt);
                    }

                    x = evt.pageX;
                    y = evt.pageY;
                }
            };

            //
            // Handler for when mouse capture is released.
            //
            var released = () => {

                if (dragging) {
                    if (config.dragEnded) {
                        config.dragEnded();
                    }
                }
                else {
                    if (config.clicked) {
                        config.clicked();
                    }
                }
            };



            var mouseUp = (evt: any) => {
                this.mouseCaptureService.release();
                evt.stopPropagation();
                evt.preventDefault();
            };

            //
            // Acquire the mouse capture and start handling mouse events.
            //
            this.mouseCaptureService.acquire(evt, {
                mouseMove: mouseMove,
                mouseUp: mouseUp,
                released: released
            });

            evt.stopPropagation();
            evt.preventDefault();
        }

}

export class Service extends DraggingService {}

angular.module(moduleName, [mouseCaptureService.moduleName])
    .service(serviceName, DraggingService);

