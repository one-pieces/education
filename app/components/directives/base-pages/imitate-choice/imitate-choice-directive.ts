/// <reference path = '../../../../app.d.ts' />
/// <amd-dependency path='css!./imitate-choice.css' />
/// <amd-dependency path='text!components/directives/base-pages/imitate-choice/imitate-choice.html' />
import angular = require('angular');
import config = require('config');
import choiceDirective = require('../../choice/choice-directive');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.imitateChoice';
export var directiveName = 'opImitateChoice';
export var templateText = window.require('text!components/directives/base-pages/imitate-choice/imitate-choice.html');

export interface IScope extends ng.IScope {
    imitateChoice: ImitateChoice;
    data: any;
}

/**
 * ImitateChoice class for the directive
 */
export class ImitateChoice {
    static $inject = ['scope', '$sce'];

    // trustedVideoUrl: string;
    isCurrentProblemLastOne = false;
    constructor(private scope: IScope, private $sce: ng.ISCEService) {
        // this.trustedVideoUrl = this.$sce.trustAsResourceUrl(scope.data.videoUrl);
    }
}

/**
 * ImitateChoice-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-imitate-choice data="data">
 *     </op-imitate-choice>
 * </div>
 *
 * ```
 */
export class ImitateChoiceDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '='
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.imitateChoice = <ImitateChoice>
        this.$injector.instantiate(ImitateChoice, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [choiceDirective.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ImitateChoiceDirective);
    }]);