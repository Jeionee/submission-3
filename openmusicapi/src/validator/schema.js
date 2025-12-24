const Joi = require('joi');

const AlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
});

const SongSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

const AuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const TokenPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const CollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

const ExportPlaylistsPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string().valid(
    'image/apng', 
    'image/avif', 
    'image/gif', 
    'image/jpeg', 
    'image/png', 
    'image/webp'
  ).required(),
}).unknown();

module.exports = {
  AlbumSchema,
  SongSchema,
  UserPayloadSchema,
  AuthenticationPayloadSchema,
  TokenPayloadSchema,
  PlaylistPayloadSchema,
  PlaylistSongPayloadSchema,
  CollaborationPayloadSchema,
  ExportPlaylistsPayloadSchema,
  ImageHeadersSchema,
};