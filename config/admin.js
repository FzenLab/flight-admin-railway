module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'bb7aba1f-db8c-4267-8149-91a9e9386ae3'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bb7aba1f-db8c-4267-8149-91a9e9386ae3'),
  },
});
