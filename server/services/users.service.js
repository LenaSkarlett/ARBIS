import postgres from './../config/db/postgres.js';
import bcrypt from 'bcryptjs';
import tokensService from './tokens.service.js';

class UsersService {
  async create(login, password) {
    const hashPassword = this.getHashPassword(password);
    await postgres.query(
      `INSERT INTO users (login, password) VALUES ($1, $2);`, 
      [login, hashPassword]
    );
    return true;
  }

  async exists(login) {
    return (await postgres.query(`SELECT login FROM users WHERE login = $1;`, [login])).rowCount > 0;
  }

  async get(login) {
    return (await postgres.query(`SELECT * FROM users WHERE login = $1;`, [login])).rows[0];
  }

  async authUser(login, password) {
    if (!(await this.exists(login))) {
      return null;
    }

    const user = await this.get(login);

    const validPassword = this.validatePassword(password, user.password);
    if (!validPassword) {
      return null;
    }

    const payload = { userId: user.id };
    const refreshToken = tokensService.generateRefresh(payload);
    await tokensService.saveRefresh(user.id, refreshToken);

    return { 
      ...user, 
      refreshToken: refreshToken, 
      accessToken: tokensService.generateAccess(payload) 
    };
  }

  getHashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default new UsersService();
