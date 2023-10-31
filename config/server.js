module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  app: {
    keys: ['bb7aba1f-db8c-4267-8149-91a9e9386ae3', 'bb7aba1f-db8c-4267-8149-91a9e9386ae3']
  },
});
