# Real-time collaborative drawing canvas with GraphQL & AWS AppSync

![](graphqlgif1.gif)

Schema:

```graphql
type Canvas @model {
  id: ID!
  clientId: String!
  data: String!
}
```

## To deploy this application

> To deploy this application, you must have the latest version of the Amplify CLI installed & configured. To learn how to do this, check out the documentation [here](https://aws-amplify.github.io/).

1. Clone the repo & change into the directory

```sh
git clone https://github.com/dabit3/appsync-graphql-real-time-canvas.git

cd appsync-graphql-real-time-canvas
```

2. Deploy the GraphQL API

```sh
amplify init
amplify push
```

3. Run the app
```sh
npm start
```