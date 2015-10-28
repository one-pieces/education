/// <reference path='../../node_modules/node-shared-typescript-defs/requirejs/require.d.ts' />
// http://www.tuicool.com/articles/jam2Anv
(function () {
    requirejs.config({
        map: {
            '*': {
                css: 'vendor/require-css/css'
            }
        },
        paths: {
            angular: 'vendor/angular/angular',
            bootstrap: 'vendor/bootstrap/bootstrap',
            'bootstrap-css': 'vendor/bootstrap-css/bootstrap.min',
            jquery: 'vendor/jquery/jquery',
            json: 'vendor/requirejs-plugins/json',
            require_config: 'config/require_config',
            restmod: 'vendor/angular-restmod/angular-restmod-bundle.min',
            shared_require_config: 'config/shared_require_config',
            'slick-carousel': 'vendor/slick-carousel/slick.min',
            text: 'vendor/requirejs-text/text',
            'ui.router': 'vendor/angular-ui-router/angular-ui-router',
            'ng-pageslide': 'vendor/ng-pageslide/index' //https://github.com/dpiccone/ng-pageslide
        },
        shim: {
            angular: {
                deps: ['jquery'],
                exports: 'angular'
            },
            bootstrap: {
                deps: ['jquery']
            },
            'bootstrap-css': {
                deps: ['jquery']
            },
            restmod: {
                deps: ['angular']
            },
            'slick-carousel': {
                deps: ['jquery']
            },
            'ui.router': {
                deps: ['angular']
            },
            'ng-pageslide': {
                deps: ['angular']
            },
            'svg-class': {}
        }
    });
})();
//# sourceMappingURL=shared_require_config.js.map