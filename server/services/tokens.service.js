import jwt from 'jsonwebtoken';
import postgres from './../config/db/postgres.js';

class TokensService {
  #secretAccess = process.env.SECRETS_ACCESS_TOKEN || 'SECRETS_ACCESS_TOKEN_KEY';
  #secretRefresh = process.env.SECRETS_REFRESH_TOKEN || 'SECRETS_REFRESH_TOKEN_KEY';

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
    return (await postgres.query(
      `UPDATE users SET refreshtoken = $1 WHERE id = $2`,
      [token, userId]
    )).rowCount > 0;
  }

  async checkRefreshInDatabase(token) {
    return (await postgres.query(
      `SELECT id FROM users WHERE refreshtoken = $1`,
      [token]
    )).rowCount > 0;
  }

  async refresh(token) {
    if (!this.checkRefreshInDatabase(token)) {
      return null;
    }
    
    const payload = this.verifyRefresh(token);
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
