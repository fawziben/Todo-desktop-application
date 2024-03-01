import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "./customCard";
import Masonry from 'react-masonry-css'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const classes = {
    fab: {
        position: 'fixed',
        bottom: '16px', // Ajustez la position verticale en fonction de vos besoins
        right: '16px', // Ajustez la position horizontale en fonction de vos besoins
      },    
}



export default function Don(){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('add')
    }

    const [notes,setNotes] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8000/notes').then(res => res.json()).then(don => setNotes(don))
    },[])

const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/'+id,{
        method : 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
}

const breakpoints = {
    default : 3,
    1100 : 1,
}

    return(
        // <Grid container spacing={3}>
        //     {notes.map(note => (
        //         <Grid item key={note.id} xs={12} md={6} lg={4}>
        //             <CustomCard note= {note} handleDelete = {handleDelete}/>
        //         </Grid>
        //     ))}
        // </Grid>
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {notes.map(note => (
            <div key={note.id}>
              <CustomCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
            <Fab sx={classes.fab} color='primary' aria-label="add" onClick = {handleClick}>
                <AddIcon/>
            </Fab>
        </Masonry>
      </Container>
    )
}