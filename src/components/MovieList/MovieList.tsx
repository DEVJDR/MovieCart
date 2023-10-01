import { useState } from "react";
import MovieDb from "../MovieDb/MovieDb";
import Card from 'react-bootstrap/Card';
    
const MovieList = () => {
    const [data,setData]=useState("")
    const [state,setstate]=useState(false)
    const getGenre=(e:any)=>{
        setData(e.target.value)
        setstate(false)
    }
    const Mood:string[]=["Happy","Adventurous","Peaceful","Sad","Inspired"

    ]
    const buttonClick=()=>{
      setstate(true)
    }
  return (
    <>
    <input onChange={getGenre} type="text" placeholder="Genre"></input><button type="button" onClick={buttonClick}>GetMovie</button>
    
    { //map the items inside movieDb array of objects
        MovieDb.map((itm)=>{
         
          //rendering the movie poster for each mood..
          if(data=="Happy"){ 
            if((itm.Genre.includes("Comedy"))&& state){ 
              return <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={itm.Poster} /></Card>   
            }
           }          
          if(data=="Adventurous"){
            if((itm.Genre.includes("War")||(itm.Genre.includes("Thriller")))&& state){
              return <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={itm.Poster} /></Card>
            } 
          }
        })
      }
    </>
    
    
  )
}

export default MovieList;