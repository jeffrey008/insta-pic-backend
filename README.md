
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript for instaPic.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API

### GET /
Return 'Hello World!'.

### POST /register
Accepts body as follows:

`username`: username. Required.

`password`: 8-20 character password. Required.

### POST /login
Accepts body as follows:

`username`: username. Required.

`password`: password. Required.

Returns `acessToken` in Jwt format. Use this token to call protected route.

### Get /posts
Return all posts. Protected route. Accepts query parameters as follows:

`orderBy`: must be `date`. Optional.

`order`: -1 (desc) or 1 (asc). Optional.

`username`: View all post created by `username`. Optional.

### POST /posts
Create a new post. Protected route. Accepts body as follows:

`desc`: Description. Required.

`image`: Base 64 URL encoded image. Required.

