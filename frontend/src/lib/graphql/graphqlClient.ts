import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_API_GRAPHQL;

if (!endpoint) {
    throw new Error("NEXT_PUBLIC_API_GRAPHQL is not defined");
}

export const graphqlClient = new GraphQLClient(endpoint);
