import jwt from 'jsonwebtoken';
import config from 'config';
import postgre from './../config/db/postgres.js';

class TokensService {
  #secretAccess = config.get('secrets.access_token');
  #secretRefresh = config.get('secrets.refresh_token');

  generateAccess(payload) {
    return jwt.sign(payload, this.#secretAccess, { expiresIn: '30m'});
  }

  verifyAccess(token) {
    try {
      return jwt.verify(token, this.#secretAccess);
    }
    catch(error) {
      return null;
    }
  }

  generateRefresh(payload) {
    return jwt.sign(payload, this.#secretRefresh, { expiresIn: '30d'});
  }

  verifyRefresh(token) {
    try {
      return jwt.verify(token, this.#secretRefresh);
    }
    catch(error) {
      return null;
    }
  }

  async saveRefresh(userId, token) {
    return( await postgre.query(
      `UPDATE users SET refreshToken = $1 WHERE id = $2`,
      [token, userId])).rowCount > 0;
  }

  async refresh(refreshToken) {
    const payload = this.verifyRefresh(refreshToken);
    if (!payload || typeof(payload) === 'string') {
      return null;
    }

    const tokens = {
      access: this.generateAccess({ userId: payload.userId }),
      refresh: this.generateRefresh({ userId: payload.userId })
    }

    await this.saveRefresh(payload.userId, tokens.refresh);

    return tokens;
  }
}

export default new TokensService();
