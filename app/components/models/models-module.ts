/// <reference path='../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
'use strict';

var mod = angular.module(config.appName + '.models', [ 'restmod' ]);
export = mod;