'use strict';

/**
 * pilot service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pilot.pilot');
