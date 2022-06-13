import usersService from './../services/users.service.js';
import tokensService from './../services/tokens.service.js';

class UsersController {
  async signup(request, response) {
    const { login, password } = request.body;
    if (!login || !password) {
      return response
        .status(400)
        .json('Login or password was not received.');
    }

    if (await usersService.exists(login)) {
      return response
        .status(400)
        .json('Login already taken.');
    }

    await usersService.create(login, password);

    return response.redirect(307, '/api/auth');
  }

  async signin(request, response) {
    const { login, password } = request.body;
    if (!login || !password) {
      return response
        .status(404)
        .json('Login or password was not founded.');
    }

    const user = await usersService.authUser(login, password);
    if (!user) {
      return response
        .status(400)
        .json('Login or password entered incorrectly.');
    }

    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 1000*60*60*24*30, // 30 days
      httpOnly: true
    });

    return response
      .status(200)
      .json({
        'accessToken': user.accessToken
      });
  }

  async refresh(request, response) {
    const { refreshToken } = request.cookies;
    if (!refreshToken) {
      return response
        .status(401)
        .json('Refresh token not found.');
    }

    const tokens = await tokensService.refresh(refreshToken);
    if (!tokens) {
      return response
        .status(401)
        .json('Refresh token not been validated.');
    }

    response.cookie('refreshToken', tokens.refresh, {
      maxAge: 1000*60*60*24*30, // 30 days
      httpOnly: true
    });

    return response
      .status(200)
      .json({
        'accessToken': tokens.access
      });
  }
}

export default new UsersController();
