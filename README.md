# A Node GraphQL Apollo Server example

Implements server-side architecture using GraphQL and Apollo Server.

**Based on [Simple Node Server with Babel](https://www.robinwieruch.de/minimal-node-js-babel-setup) and [The Road to GraphQL](https://roadtoreact.com/course-details?courseId=THE_ROAD_TO_GRAPHQL) authored by [Robin Wieruch](https://www.robinwieruch.de/)**

## Features

- GraphQL
- Apollo Server
- Express
- Babel 7
- Environment Variables

## Requirements

- [node & npm](https://nodejs.org/en/)
- [git](https://git-scm.com/)

## Installation

- `git clone git@github.com:SenhorLion/node-graphql-apollo-server.git`
- `npm install`
- `npm start`
- `http://localhost:8000/graphql` to test queries

## GraphQL API

**Get list of users:**

```
{
    users {
        username
        email
    }
}
```

**Get user by id:**

```
{
    user(id: "2") {
        username
        email
    }
}
```

**Get 'computed' user:**

```
{
    me {
        username
        email
    }
}
```
