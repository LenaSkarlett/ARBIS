import config from 'config';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './../routes/index.js';
import logsMiddleware from './../middlewares/logs.middleware.js';

const app = express();
const port = config.get('server.port');
const secretCookie = config.get('secrets.cookie');

app.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', `http://localhost:3000`);
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secretCookie));
app.use(logsMiddleware);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server] running on port ${port}`);
});

export default app;
