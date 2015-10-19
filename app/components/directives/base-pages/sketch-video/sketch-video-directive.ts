/// <reference path='../../../../app.d.ts' />
/// <amd-dependency path='css!./sketch-video.css' />
/// <amd-dependency path='text!components/directives/base-pages/sketch-video/sketch-video.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.sketchVideo';
export var directiveName = 'opSketchVideo';
export var templateText = window.require('text!components/directives/base-pages/sketch-video/sketch-video.html');

export interface IScope extends ng.IScope {
    sketchVideo: SketchVideo;
    someAttribute: string;
}

/**
 * SketchVideo class for the directive
 */
export class SketchVideo {
    static $inject = ['scope'];
    
    someValue: string;

    constructor(private scope: IScope) {
        this.someValue = 'goal-page-directive';
    }
}

/**
 * SketchVideo-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-sketch-video some-attribute="AString">
 *     </op-sketch-video>
 * </div>
 *
 * ```
 */
export class SketchVideoDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        someAttribute: '@?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.sketchVideo = <SketchVideo>
        this.$injector.instantiate(SketchVideo, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(SketchVideoDirective);
    }]);