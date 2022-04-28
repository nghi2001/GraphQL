import {useRef, useState} from "react";
import {gql, useMutation} from "@apollo/client";

const ADD = gql`
    mutation adddBook($name:String!,$genre:String!,$id:ID!){
        addBook(name: $name , genre: $genre, authorid: $id) {
            name
        }
    }
`
function AddBook() {
    const NameInput = useRef();
    const GenreInput = useRef();
    const AuthorInput = useRef();
    const [adddBook , {data,loading,error}] = useMutation(ADD);
    
    function Add() {
        adddBook({variables:{name: NameInput.current.value,genre:GenreInput.current.value,id:AuthorInput.current.value}});

    }
    console.log(data);
    return (
        <div>
            <label htmlFor="">Name</label>
            <input type="text" name="" id="" ref={NameInput}/> <br />
            <label htmlFor="">Genre</label>
            <input type="text" name="" id="" ref={GenreInput} /><br />
            <label htmlFor="">Id author</label>
            <input type="text" name="" id="" ref={AuthorInput} />
            <button onClick={Add}>
                Add
            </button>
        </div>
    )
}

export default AddBook