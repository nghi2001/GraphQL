const {GraphQLSchema,GraphQLObjectType,GraphQLInt,GraphQLString, GraphQLList} = require('graphql');
const UserType = require('./Typedef/UserType');
const userData = require('../MOCK_DATA.json');

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt}},
            resolve(parent,args) {
                return userData
            }
        }

    }
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                first_name: {type: GraphQLString},
                last_name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent,args){
                userData.push({id:userData.length+1,first_name:args.first_name,last_name: args.last_name,email: args.email,password: args.password})
                return args;
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
})