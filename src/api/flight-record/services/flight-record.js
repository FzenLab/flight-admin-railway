'use strict';

/**
 * flight-record service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flight-record.flight-record');
