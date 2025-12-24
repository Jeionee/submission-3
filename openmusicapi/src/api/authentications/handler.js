const Jwt = require('@hapi/jwt');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.AuthenticationValidator
      .validateAuthenticationPayload(request.payload);

    const { username, password } = request.payload;
    const userId = await this._usersService.verifyUserCredential(username, password);

    const accessToken = Jwt.token.generate(
      { userId },
      {
        key: process.env.ACCESS_TOKEN_KEY,
        algorithm: 'HS256',
      },
    );

    const refreshToken = Jwt.token.generate(
      { userId },
      {
        key: process.env.REFRESH_TOKEN_KEY,
        algorithm: 'HS256',
      },
    );

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    this._validator.TokenValidator.validateTokenPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);

    const { decoded } = Jwt.token.decode(refreshToken);
    const { userId } = decoded.payload;

    const accessToken = Jwt.token.generate(
      { userId },
      {
        key: process.env.ACCESS_TOKEN_KEY,
        algorithm: 'HS256',
      },
    );

    const response = h.response({
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    });
    response.code(200);
    return response;
  }

  async deleteAuthenticationHandler(request, h) {
    this._validator.TokenValidator.validateTokenPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Refresh token berhasil dihapus', 
    });
    response.code(200);
    return response;
  }
}

module.exports = AuthenticationsHandler;