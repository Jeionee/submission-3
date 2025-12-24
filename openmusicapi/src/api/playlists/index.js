const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  register: async (server, { service, songsService, validator, playlistSongValidator }) => {
    const handler = new PlaylistsHandler(service, songsService, validator, playlistSongValidator);
    server.route(routes(handler));
  },
};