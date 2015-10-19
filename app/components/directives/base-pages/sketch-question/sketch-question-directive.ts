/// <referencepath='../../../../app.d.ts' />
/// <amd-dependency path='css!./sketch-question.css' />
/// <amd-dependency path='text!components/directives/base-pages/sketch-question/sketch-question.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.sketchQuestion';
export var directiveName = 'opSketchQuestion';
export var templateText = window.require('text!components/directives/base-pages/sketch-question/sketch-question.html');

export interface IScope extends ng.IScope {
    sketchQuestion: SketchQuestion;
    someAttribute: string;
}

/**
 * SketchQuestion class for the directive
 */
export class SketchQuestion {
    static $inject = ['scope'];
    
    someValue: string;

    constructor(private scope: IScope) {
        this.someValue = 'goal-page-directive';
    }
}

/**
 * SketchQuestion-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-sketch-question some-attribute="AString">
 *     </op-sketch-question>
 * </div>
 *
 * ```
 */
export class SketchQuestionDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        someAttribute: '@?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.sketchQuestion = <SketchQuestion>
        this.$injector.instantiate(SketchQuestion, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(SketchQuestionDirective);
    }]);