import tokensService from './../services/tokens.service.js';

export default function(request, response, next) {
  if (request.method === 'OPTIONS') {
    next();
  }

  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    return response
      .status(401)
      .json('Authorization header not found.');
  }

  const accessToken = authorizationHeader.split(' ')[1]; 
  if (!accessToken) {
    return response
      .status(401)
      .json('Access token not found.');
  }

  const payload = tokensService.verifyAccess(accessToken);
  if (!payload) {
    return response
      .status(401)
      .json('Token has not been verified.');
  }
  
  request.body.payload = payload;
  
  next();
}
