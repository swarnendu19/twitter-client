import {graphql} from "../../gql"

export const verifyGoogleTokenQuery = graphql(`#graphql
query VerifyUserGoogleToken($token:String!){
verifyGoogleToken(token: $token)
}
`)

export const getCurrentUserQuery = graphql(`
 query GetCurrentUser {
    getCurrentUser{
        id
        profileImageURL
        email
        firstName
        lastName
    }
 }
`)