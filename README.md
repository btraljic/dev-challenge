# dev-challenge
A dev challenge for anyone who wants to join the Lane engineering team! 

## Server Todos
- todo: (1) 1. would be cool to include all the data and expand out the User type so it includes all the fields.
- todo: (2) 1. would be awesome to include the Address type so we can return users Address info.
- todo: (3) 3. adding in a Company field to return the Users full company data would be great.  This will require adding a resolver as well.
- todo: (4) 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered. How can we check for a non-existing user id and throw a more friendly error.
- todo: (5) 2 why is this update overwriting existing user data? Need to fix this so that just data input is updated rather than overwritting all the data.
- todo: (6) 3. need a resolver to make the employees field work, right now it's just returning null. this query below should work.
- todo: (7) 3. can we accept a input variable into the graphql query to only show certain users? Maybe allowing filter by name to begin with.
- todo: (8) 5. getting this list of all users is slow. Would be really cool if it could return all the users in a more performant way. Keeping in mind that the underlaying JSON files may get updated.
- todo: (9) 5. it would be nicer to return a base62 value for the id field instead of a base16 uuid. Ideally this would be implemented without changing the underlaying data, in a reusable way. Sending data to the client side should convert a base16 uuid to a base62 string, and inputting into the graphql api should convert a base62 string back to a base16 uuid

## Server Playground (GraphQL)

```json
{
  user(id: "jsb7jHXnuLxH2Rlt2VtyO") {
    id
    name
    address {
      city
      streetName
    }
    company{
      id
      name
    }
    friends {
      id
      name
    }
  }
}
```

```json
{
  users {
    id
    name
    friends {
      id
      name
    }
  }
}
```

```json
{
  users(name: "Jan") {
    id
    name
    friends {
      id
      name
    }
  }
}
```

```json
mutation {
  updateUser(user: {
    id: "jsb7jHXnuLxH2Rlt2VtyO"
    name: "Eudora Welch 01"
  })
}
```

```json
{
  company(id: "f0dfb770-b4cf-4871-be5b-4ef1b1cf105f") {
    id
    name
    color
    image
    employees {
      name
      image
      id
      friends {
        name
        id
      }
    }
  }
}
```

```json
{
  companies {
    id
    name
    color
    image
    employees {
      name
      image
      id
      friends {
        name
        id
      }
    }
  }
}
```

# 
### Database
Our CTO is an absolute genius and has invented a new kind of JSON database.
To KISS, it's all implemented as separate JSON files for each record.  The 
file format is ${id}.json.

We don't want to change that database. We've built our whole company around it!

There are many todo's in the project.  Each todo has a point score based on how
difficult it is.  Search for todos and do as many as you can.

Choose at least one 1 pointer, one 3 pointer and one 5 pointer.  Implement your 
answers, and send back to use to check out.

# server 
Our GraphQL API into our amazing platform.

Install the required packages.

```yarn install```

Startup the graphql server.

```yarn start```

# mobile
Contains a react-native project that consumes our GraphQL api, it needs some work.

Install the required packages.

```yarn install```

Start up the app.

```react-native start-ios```

or 

```react-native start-android```

