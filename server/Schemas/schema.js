const graphql = require('graphql');
const BookModel = require("../model/BookModel");
const mongoose = require('mongoose')
const AuthorModell = require("../model/AuthorModel")
const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLID,
        GraphQLList
        } = graphql
const lodash = require('lodash')
let Books = [
    {name: "name of The Wind", genre: "Fantasy", id: "1",authorid:"1"},
    {name: "The Final Empire", genre: "Fantasy", id:"2",authorid:"2"},
    {name: "The Long Earth", genre: "Sci-fi",id: "3",authorid:"3"},
    {name: "The Longg Earth", genre: "Sci-fi",id: "3",authorid:"3"},
    {name: "The Long Earth", genre: "Sci-fi",id: "3",authorid:"3"},
]

let Author = [
    {name: "nghi", age:22,id: '1'},
    {name: "nghi2", age:18,id: '2'},
    {name: "nghi3", age:22,id: '3'},
]
const BooksType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: Authur,
            resolve(parent,args){
                console.log(parent);

                return AuthorModell.findById(parent.authorid)
            }
        }
        
    })
})

const Authur = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BooksType),
            resolve(parent,args){
                return BookModel.find({authorid: parent.id})
                        .then(data => {
                            return data
                        })
                
            }
        }
    })
})
const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BooksType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent,args,request) {
                console.log(request);
                return BookModel.findById(args.id)
            }
        },
        author: {
            type: Authur,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent,args) {
                return AuthorModell.findById(mongoose.Types.ObjectId(args.id),(err,result) => {
                    console.log('test '+result);
                    return result
                }).clone()

                
                    
            }
        },
        books: {
            type: new GraphQLList(BooksType),
            resolve(parent, args) {
                return BookModel.find({})
            }
        },
        authors: {
            type: new GraphQLList(Authur),
            resolve(parent,args) {
                return AuthorModell.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: Authur,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent,args) {
                let newAuthor = new AuthorModell({
                    name: args.name,
                    age: args.age
                })

                return newAuthor.save()

            }
        },
        addBook: {
            type: BooksType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorid: {type: GraphQLID}
            },
            resolve(parent,args) {
                let newBook = new BookModel({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                })

                return newBook.save()
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
})