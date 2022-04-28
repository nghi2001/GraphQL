import BookList  from "./component/BookList";
import AddBook  from "./component/AddBook";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  HttpLink,from,
  gql
} from "@apollo/client";
import {onError} from "@apollo/client/link/error"

const httpLink = new HttpLink({
  uri: "http://localhost:3500/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const Client = new ApolloClient({
    link: from([errorLink,httpLink]),
    cache: new InMemoryCache(),
})


function App() {
  return (
    
    <ApolloProvider client={Client}>
      <div id="main">
        <h1>GraphQL Reading List</h1>
        <BookList></BookList>
        <AddBook></AddBook>
      </div>
      </ApolloProvider>
  );
}

export default App;
