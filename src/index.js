"use strict";

module.exports = {


  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");


    // Custom query resolver to get all authors and their details.
    extensionService.use(({ strapi }) => ({
      typeDefs: `

      type PilotData {
        pilot: PilotEntity
        balance: Balance

      }

      type Balance {
        total_balance: Float
        detail: [FlightDetail]

      }

      type FlightDetail { 
        balance: Float
        planeCode: String
      }

        type Query {
          listPilotsBalance: [PilotData]
        }
      `,

      resolvers: {
        Query: {
          listPilotsBalance: {
            resolve: async (parent, args, context) => {
              var pilotData = [];

              const pilots = await strapi.entityService.findMany('api::pilot.pilot', {
                populate: "*",

              });

              const entries = await strapi.entityService.findMany('api::flight-record.flight-record', {
                populate: "*",

              });
                
              pilots.forEach(pilot => {
                var details = [];
                var planesID = [];
                var planeData = { 
                  balance : 0
                }

                var pilotBalance = 0;
                entries.forEach(entrie => {
                  if(entrie.pilot.id == pilot.id){
                    pilotBalance = pilotBalance + entrie.hours
                    if(!planesID.includes(entrie.plane.code)){
                      planesID.push(entrie.plane.code)
                    }

                  } 
                });

                planesID.forEach(planeId => {
                  var planeBalance = 0
                  entries.forEach(entrie => {
                    if(planeId == entrie.plane.code && entrie.pilot.id == pilot.id ){
                      planeBalance =  planeBalance + entrie.hours
                    }
                  });
                  details.push({
                    planeCode : planeId,
                    balance : planeBalance
                  })
                });
               
                pilotData.push({
                  pilot :pilot,
                  balance : {
                    total_balance :pilotBalance * -1,
                    detail :details
                    
                  }
                })
              });

              return pilotData;
            },
          },
        }
      },

      resolversConfig: {
        "Query.listPilotsBalance": {
          auth: false,
        },
      },
    }));
  },
};