/// <reference path='./app.d.ts' />

var appName = 'framework';

var config = {
    appName: appName,
    apiBasePath: '/api',
    basePath: '/' + appName,
    defaultBasePage: 'base',

    production: true
};

config.production = false;

export = config;