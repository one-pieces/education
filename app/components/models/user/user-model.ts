/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import modelNames = require('../model-names');
import modelsModule = require('../models-module');

'use strict';

export var serviceName = modelNames.USER;

export interface ILearnUser {
    id?: string;
    userName: string;
    password: string;
    email: string;
    givenName: string;
    familyName: string;
}

/**
 * Represents an instance of User
 */
export interface IUser extends ILearnUser, ng.restmod.IModel<IUser> {
    /** relationship
     * For example, the user has a relationship of a book, 
     * then you should declare a book model in here.
     */
    ui?: {
        // for ui temp
        fullName?: string;
    };
}

/**
 * Represents a collection of User
 */
export interface IUserCollection extends ng.restmod.IModelCollection<IUser> {
    sortUsers(): ng.restmod.IModelCollection<IUser>;
}

/**
 * The User model type
 */
export interface IUserStatic extends ng.restmod.IModelStatic<IUser> {
}

modelsModule
    .factory(serviceName, ['restmod', (restmod: ng.restmod.IRestmodService): IUserStatic => {
        var API_PATH = config.apiBasePath + '/v1/users';

        var model = restmod.model(API_PATH).mix({
            ui: { mask: true, init: () => { return {}; } },
            $extend: {
                Collection: {
                    sortUsers: function() {
                        return this.$action(function() {
                            this.sort(function(one: IUser, other: IUser) {
                                return one.userName < other.userName ? -1 : 1;
                            });
                        });
                    }
                }
            }
        });
        return model;
    }]);