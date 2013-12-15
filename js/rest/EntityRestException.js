"use strict";

goog.provide('tutao.rest.EntityRestException');

/**
 * A rest exception is thrown whenever an entity could not be loaded or stored. There is always an underlying original exception that causes an EntityRestException.
 * @param {Error} originalException The original exception.
 * @constructor
 * @extends Error
 */
tutao.rest.EntityRestException = function(originalException) {
	this._original = originalException;
	this.stack = new Error().stack;
	this.message = "original exception: " + this._original.message;
	this.name = "EntityRestException";
};

goog.inherits(tutao.rest.EntityRestException, Error);

tutao.rest.EntityRestException.prototype.getOriginal = function() {
	  return this._original;
};

tutao.rest.EntityRestException.prototype.isConnectionDown = function() {
    if (this._original instanceof tutao.rest.RestException) {
        /* @type {tutao.rest.RestException}*/
        var original = this._original;
        return original.getResponseCode() == 0;
    }
	return false;
};
