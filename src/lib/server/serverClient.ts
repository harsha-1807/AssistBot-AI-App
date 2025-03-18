import { ApolloClient, InMemoryCache, DefaultOptions,createHttpLink, HttpLink } from '@apollo/client';


const defaultOptions: DefaultOptions ={

    watchQuery: {
        fetchPolicy: "no-cache" ,
        errorPolicy: "all",
    },
    query: {
        fetchPolicy: "no-cache" ,
        errorPolicy: "all",
    },
    mutate: {
        fetchPolicy: "no-cache" ,
        errorPolicy: "all",
    },

}

const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,// Replace with your
        headers: {
            Authorization: `Apikey ${process.env.GRAPHQL_TOKEN}`,
        },
        fetch ,
    }),
    cache: new InMemoryCache(),
    defaultOptions
})

export default client;