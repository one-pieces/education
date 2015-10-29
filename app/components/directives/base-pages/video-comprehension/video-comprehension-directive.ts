/// <reference path = '../../../../app.d.ts' />
/// <amd-dependency path='css!./video-comprehension.css' />
/// <amd-dependency path='text!components/directives/base-pages/video-comprehension/video-comprehension.html' />
import angular = require('angular');
import config = require('config');

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

    result = false;
    choice: number;
    problemIndex: number;
    trustedVideoUrl: string;
    isOptionClicked = false;
    isSubmitted = false;

    constructor(private scope: IScope, private $sce: ng.ISCEService) {
        this.trustedVideoUrl = this.$sce.trustAsResourceUrl(scope.data.videoUrl);
    }

    clickOption(index: number, parentIndex: number) {
        if (!this.isSubmitted) {
            this.choice = index;
            this.problemIndex = parentIndex;
            this.isOptionClicked = true;
            this.scope.data.problems[parentIndex].options.forEach((option: any, i: number) => {
                if (i === index) {
                    option.isClicked = true;
                } else {
                    option.isClicked = false;
                }
            });
        }
    }
    clickSubmit() {
        this.isSubmitted = true;
        var problem = this.scope.data.problems[this.problemIndex];
        problem.options[problem.answer].isCorrect = true;
        if (this.choice === problem.answer) {
            this.result = true;
        } else {
            this.result = false;
        }
        this.scope.$emit('video-comprehension',
            { id: this.scope.data.id, problemIndex: this.problemIndex, result: this.result });
    }
    clickNext() {
        this.isOptionClicked = false;
        this.isSubmitted = false;
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

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(VideoComprehensionDirective);
    }]);