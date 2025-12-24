const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  register: async (server, {
    authenticationsService,
    usersService,
    validator,
  }) => {
    const handler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      validator,
    );
    server.route(routes(handler));
  },
};
