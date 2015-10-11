/// <reference path='../../../app.d.ts' />
import angular = require('angular');

'use strict';

export var moduleName = 'cftvc.components.diretcives.scrollToFixedTop';
export var directiveName = 'opScrollToFixedTop';

/**
 * ScrollToFixedTop-Directive
 * The element will be fixed at the top of window when it's srcolled to top.
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <div op-srcoll-to-fixed-top>
 *     </div>
 * </div>
 *
 * ```
 */
export class ScrollToFixedTopDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'A';

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        var top = element[0].offsetTop;
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= top) {
                element.addClass('fixed-top');
            } else {
                element.removeClass('fixed-top');
            }
        });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ScrollToFixedTopDirective);
    }]);