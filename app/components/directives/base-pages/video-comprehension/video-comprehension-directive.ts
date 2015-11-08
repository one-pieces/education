/// <reference path = '../../../../app.d.ts' />
/// <amd-dependency path='css!./video-comprehension.css' />
/// <amd-dependency path='text!components/directives/base-pages/video-comprehension/video-comprehension.html' />
import angular = require('angular');
import config = require('config');
import choiceDirective = require('../../choice/choice-directive');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.videoComprehension';
export var directiveName = 'opVideoComprehension';
export var templateText = window.require('text!components/directives/base-pages/video-comprehension/video-comprehension.html');

export interface IScope extends ng.IScope {
    videoComprehension: VideoComprehension;
    data: any;
}

/**
 * VideoComprehension class for the directive
 */
export class VideoComprehension {
    static $inject = ['scope', '$sce'];

    trustedVideoUrl: string;
    isCurrentProblemLastOne = false;
    constructor(private scope: IScope, private $sce: ng.ISCEService) {
        this.trustedVideoUrl = this.$sce.trustAsResourceUrl(scope.data.videoUrl);
    }
}

/**
 * VideoComprehension-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-video-comprehension data="data">
 *     </op-video-comprehension>
 * </div>
 *
 * ```
 */
export class VideoComprehensionDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '='
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.videoComprehension = <VideoComprehension>
        this.$injector.instantiate(VideoComprehension, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [choiceDirective.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(VideoComprehensionDirective);
    }]);