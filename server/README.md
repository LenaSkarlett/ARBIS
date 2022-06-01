# Income Server

[Kirill Pasha](https://github.com/Nikagen) - Frontend

Income is a project that will allow freelancers or self-employed people to easily keep track of their income, as well as see the statistics of their earnings.

## Features

- User registration
- User authorization
- Getting data about the logged in user

## Installation

Income server requires [Node.js](https://nodejs.org/) v17.8.0 to run.

Install the dependencies and devDependencies and start the server.

```sh
cd income-server
yarn i
yarn dev
```

## System Dependencies

This server also contains system dependencies that need to be installed separately for your operating system.

### Redis

The resident database management system that I used on the server.

```sh
# Installation
sudo apt update
sudo apt install redis-server

# Starting
sudo redis-server

# Checking
sudo systemctl status redis-server

# Restarting
sudo systemctl restart redis
```

### [Yarn install](https://yarnpkg.com/getting-started/install)

## Available APIs `/api`

### User APIs 

#### GET `/users`

Get information about the authenticated user, using the `Authorization` header, which should contain an access token according to the given template:

```typescript
type Request = {
  headers: {
    'Authorization': `Bearer ${accessToken}`;
  };
},

type Response = {
  login: string;
  password: string;
  ordersListId: string;
  refreshToken: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  avatar?: string;
  email?: string;
}
```

#### POST `/users`

Create a new user.

```typescript
type Request = {
  login: string,
  password: string
}

type Response = {
  accessToken: string
}
```

`accessToken` contains a unique user `id` that it generates based on `login`.

#### POST `/auth`

Authorize the user.

```typescript
type Request = {
  login: string,
  password: string
}

type Response = {
  accessToken: string
}
```

`accessToken` contains a unique user `id` that it generates based on `login`.
