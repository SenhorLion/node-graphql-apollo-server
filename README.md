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

### Get list of users:

```
{
  users{
    id
    email
    username
    messages{
      id
      text
    }

  }
}
```

**Response**: Array [User]

```
{
  "data": {
    "users": [
      {
        "id": "1",
        "email": "lion@kungfu.com",
        "username": "Lionel Kung Fu",
        "messages": [
          {
            "id": "1",
            "text": "Hello message one"
          },
          {
            "id": "3",
            "text": "Hello message Three, by user 1"
          },
          {
            "id": "26294920-eb80-4377-aad4-2b8eb46b0845",
            "text": "Lorem ipsum dolor sit amec"
          }
        ]
      },
      {
        "id": "2",
        "email": "mr@kungfu.com",
        "username": "Bruce Lee",
        "messages": [
          {
            "id": "2",
            "text": "Hello message two"
          }
        ]
      }
    ]
  }
}
```

### Get user by Id:

```
{
  user(id: 1){
    id
    username
    email
    messages{
      id
    }
  }
}
```

**Response**: User

```
{
  "data": {
    "user": {
      "id": "1",
      "username": "Lionel Kung Fu",
      "email": "lion@kungfu.com",
      "messages": [
        {
          "id": "1"
        },
        {
          "id": "3"
        },
        {
          "id": "26294920-eb80-4377-aad4-2b8eb46b0845"
        }
      ]
    }
  }
}
```

### Get 'computed' user:

```
{
  me{
    username
    email
    id
    messages{
      id
      text
    }
  }
}
```

**Response**: User

```
{
  "data": {
    "me": {
      "id": "1",
      "username": "Lionel Kung Fu",
      "email": "lion@kungfu.com",
      "messages": [
        {
          "id": "1",
          "text": "Hello message one"
        },
        {
          "id": "3",
          "text": "Hello message Three, by user 1"
        },
        {
          "id": "26294920-eb80-4377-aad4-2b8eb46b0845",
          "text": "Lorem ipsum dolor sit amec"
        }
      ]
    }
  }
}
```

### Get list of messages:

```
{
  messages{
    id
    text
    user{
      id
      username
    }
  }
}
```

**Response**: Array [Message]

```
{
  "data": {
    "messages": [
      {
        "id": "1",
        "text": "Hello message one",
        "user": {
          "id": "1",
          "username": "Lionel Kung Fu"
        }
      },
      {
        "id": "2",
        "text": "Hello message two",
        "user": {
          "id": "2",
          "username": "Bruce Lee"
        }
      },
      {
        "id": "3",
        "text": "Hello message Three, by user 1",
        "user": {
          "id": "1",
          "username": "Lionel Kung Fu"
        }
      },
      {
        "id": "26294920-eb80-4377-aad4-2b8eb46b0845",
        "text": "Lorem ipsum dolor sit amec",
        "user": {
          "id": "1",
          "username": "Lionel Kung Fu"
        }
      }
    ]
  }
}
```

### Get a message by Id:

```
{
  message(id:"1"){
    id
    text
    user{
      id
      username
      email
    }
  }
}
```

**Response**: Message

```
{
  "data": {
    "message": {
      "id": "1",
      "text": "Hello message one",
      "user": {
        "id": "1",
        "username": "Lionel Kung Fu",
        "email": "lion@kungfu.com"
      }
    }
  }
}
```

### Create a message:

_NB: This assumes a logged in user, here the computed user `me`_

```
mutation{
  createMessage(text:"Lorem ipsum dolor sit amec"){
    id
    text
  }
}
```

**Response**: Message

```
{
  "data": {
    "createMessage": {
      "id": "a22d2c79-f49a-4890-af3a-638664ddcd10",
      "text": "Lorem ipsum dolor sit amec"
    }
  }
}
```

### Update a message

```
mutation{
updateMessage(id:"1", text:"Audere est Facere!")
}
```

**Response**: Boolean

```
Either true:

{
  "data": {
    "updateMessage": true
  }
}

Or false:

{
  "data": {
    "updateMessage": false
  }
}
```

### Delete a message

```
mutation{
deleteMessage(id:"3")
}
```

**Response**: Boolean

```
Either true:

{
  "data": {
    "deleteMessage": true
  }
}

Or false:

{
  "data": {
    "deleteMessage": false
  }
}
```
