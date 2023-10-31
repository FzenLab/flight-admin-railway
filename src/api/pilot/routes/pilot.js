'use strict';

/**
 * pilot router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pilot.pilot');
