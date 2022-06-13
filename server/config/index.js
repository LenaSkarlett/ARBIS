import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './../routes/index.js';
import logsMiddleware from './../middlewares/logs.middleware.js';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 4000;
const accessControlAllowOrigin = process.env.ACCESS_CONTROL_ALLOW_ORIGIN || '';
const secretCookie = process.env.SECRETS_COOKIE || 'SECRETS_COOKIE_KEY';

app.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', accessControlAllowOrigin);
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secretCookie));
app.use(logsMiddleware);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server] running on port ${port}`);
});

export default app;
