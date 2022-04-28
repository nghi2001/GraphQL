import {useState} from "react";
import {gql, useLazyQuery, useQuery} from "@apollo/client";

const getBookQuery = gql`
    {
        books {
            name
            id
            author{
                name
            }
        }
    }
`
function BookList() {
    const [Book,{loading,error,data}] = useLazyQuery(getBookQuery,{
        pollInterval:500
    })
    console.log(data);
    if(!loading) {
        
    
    return (
        <div>
            <button onClick={() => Book()}>jajaj</button>
            <ul>
                {
                    data ? data.books.map((val,ind) => (
                        <li key={ind}>{val.name} - {val.id}</li>
                    )):''
                }
            </ul>
        </div>
    )}
    return ('')
}

export default BookList