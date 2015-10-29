/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./choice.css' />
/// <amd-dependency path='text!components/directives/choice/choice.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.choice';
export var directiveName = 'opChoice';
export var templateText = window.require('text!components/directives/choice/choice.html');

export interface IScope extends ng.IScope {
    choice: Choice;
    data: any;
    id: string;
}

/**
 * Choice class for the directive
 */
export class Choice {
    static $inject = ['scope'];

    result = false;
    choice: number;
    problemIndex: number;
    trustedVideoUrl: string;
    isOptionClicked = false;
    isSubmitted = false;

    constructor(private scope: IScope) {
    }

    clickOption(index: number, parentIndex: number) {
        if (!this.isSubmitted) {
            this.choice = index;
            this.problemIndex = parentIndex;
            this.isOptionClicked = true;
            this.scope.data[parentIndex].options.forEach((option: any, i: number) => {
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
        var problem = this.scope.data[this.problemIndex];
        problem.options[problem.answer].isCorrect = true;
        if (this.choice === problem.answer) {
            this.result = true;
        } else {
            this.result = false;
        }
        this.scope.$emit('video-comprehension',
            { id: this.scope.id, problemIndex: this.problemIndex, result: this.result });
    }
    clickNext() {
        this.isOptionClicked = false;
        this.isSubmitted = false;
    }
}

/**
 * Choice-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-choice id="id" data="problems">
 *     </op-choice>
 * </div>
 *
 * ```
 */
export class ChoiceDirective implements ng.IDirective {
        static $inject = ['$injector'];

    constructor(private $injector: ng.auto.IInjectorService) {} 

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '=',
        id: '='
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.choice = <Choice>
        this.$injector.instantiate(Choice, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ChoiceDirective);
    }]);