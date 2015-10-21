/// <r e ferenc e  path='../../../../app.d.ts' />
/// <amd-dependency path='css!./footer-button.css' />
/// <amd-dependency path='text!components/directives/footer-button/footer-button.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.footerButton';
export var directiveName = 'opFooterButton';
export var templateText = window.require('text!components/directives/footer-button/footer-button.html');

export interface IScope extends ng.IScope {
    footerButton: FooterButton;
    isCheckButton?: boolean;
    isClickButtonDisabled?: boolean;
    clickEvent?: Function;
}

/**
 * FooterButton class for the directive
 */
export class FooterButton {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
        console.log('dddaa' + scope.isCheckButton);
    }
}

/**
 * FooterButton-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-footer-button is-check-button="true">
 *     </op-footer-button>
 * </div>
 *
 * ```
 */
export class FooterButtonDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        isCheckButton: '=?',
        isClickButtonDisabled: '=?',
        clickEvent: '&?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.footerButton = <FooterButton>
        this.$injector.instantiate(FooterButton, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(FooterButtonDirective);
    }]);