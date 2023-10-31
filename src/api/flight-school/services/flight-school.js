'use strict';

/**
 * flight-school service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flight-school.flight-school');
