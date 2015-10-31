/// <reference path = '../../../../app.d.ts' />
/// <amd-dependency path='css!./listening-comprehension.css' />
/// <amd-dependency path='text!components/directives/base-pages/listening-comprehension/listening-comprehension.html' />
import angular = require('angular');
import config = require('config');
import choiceDirective = require('../../choice/choice-directive');

'use strict';

export var moduleName = config.appName + '.components.diretcives.basePages.listeningComprehension';
export var directiveName = 'opListeningComprehension';
export var templateText = window.require('text!components/directives/base-pages/listening-comprehension/listening-comprehension.html');

export interface IScope extends ng.IScope {
    listeningComprehension: ListeningComprehension;
    data: any;
}

/**
 * ListeningComprehension class for the directive
 */
export class ListeningComprehension {
    static $inject = ['scope', '$sce'];

    trustedAudioUrl: string;
    constructor(private scope: IScope, private $sce: ng.ISCEService) {
        this.trustedAudioUrl = this.$sce.trustAsResourceUrl(scope.data.audioUrl);
    }
}

/**
 * ListeningComprehension-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-listening-comprehension data="data">
 *     </op-listening-comprehension>
 * </div>
 *
 * ```
 */
export class ListeningComprehensionDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '='
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.listeningComprehension = <ListeningComprehension>
        this.$injector.instantiate(ListeningComprehension, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [choiceDirective.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ListeningComprehensionDirective);
    }]);