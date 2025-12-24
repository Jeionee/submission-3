const InvariantError = require('../exceptions/InvariantError');
const { 
    AlbumSchema, 
    SongSchema, 
    UserPayloadSchema, 
    AuthenticationPayloadSchema, 
    TokenPayloadSchema, 
    PlaylistPayloadSchema, 
    PlaylistSongPayloadSchema, 
    CollaborationPayloadSchema, 
    ExportPlaylistsPayloadSchema,
    ImageHeadersSchema
} = require('./schema');

const AlbumValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = AlbumSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },

    validateImageHeaders: (headers) => {
        const validationResult = ImageHeadersSchema.validate(headers);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
};

const SongValidator = {
    validateSongPayload: (payload) => {
        const validationResult = SongSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const UserValidator = {
    validateUserPayload: (payload) => {
        const validationResult = UserPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const AuthenticationValidator = {
    validateAuthenticationPayload: (payload) => {
        const validationResult = AuthenticationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const TokenValidator = {
    validateTokenPayload: (payload) => {
        const validationResult = TokenPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const PlaylistValidator = {
    validatePlaylistPayload: (payload) => {
        const validationResult = PlaylistPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const PlaylistSongValidator = {
    validatePlaylistSongPayload: (payload) => {
        const validationResult = PlaylistSongPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const CollaborationsValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = CollaborationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

const ExportsValidator = {
    validateExportPlaylistPayload: (payload) => {
        const validationResult = ExportPlaylistsPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = { 
    AlbumValidator, 
    SongValidator, 
    UserValidator, 
    AuthenticationValidator, 
    TokenValidator, 
    PlaylistValidator, 
    PlaylistSongValidator, 
    CollaborationsValidator, 
    ExportsValidator,
};