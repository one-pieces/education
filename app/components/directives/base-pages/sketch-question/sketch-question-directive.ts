/// <referencepath='../../../../app.d.ts' />
/// <amd-dependency path='ng-pageslide' />
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
    data: any;
}

/**
 * SketchQuestion class for the directive
 */
export class SketchQuestion {
    static $inject = ['scope'];

    result = false;
    choice: number;
    isClickButtonDisabled: boolean;
    isSlideShown: boolean;

    constructor(private scope: IScope) {
        this.isSlideShown = false;
        this.isClickButtonDisabled = true;
    }

    checkAnswer() {
        if (this.choice === this.scope.data.answer) {
            this.result = true;
        }
        this.scope.$emit('sketch-question',
            { id: this.scope.data.id, result: this.result });
        this.isSlideShown = true;
    }

    continue() {
        this.isSlideShown = false;
    }

    clickOption(index: number) {
        this.choice = index;
        this.isClickButtonDisabled = false;
        this.scope.data.options.forEach((option: any, i: number) => {
            if(i === index) {
                option.isChecked = true;
            } else {
                option.isChecked = false;
            }
        });
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
        data: '='
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