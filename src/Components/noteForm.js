import LoginIcon from '@mui/icons-material/Login';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Container, ButtonGroup, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {format} from 'date-fns'
import SimpleSnackbar from './SimpleSnackbar';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const btn = {
    backgroundColor: 'lightBlue',
    border : 'none',
    color : 'black',
    '&:hover': {
      backgroundColor : 'lightCoral'
    }
} 

export default function NoteForm() {
    const [message, setMessage] = useState ('Success')
    const [date, setDate] = useState('')
    const [title,setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [err, setError] = useState(false)
    const [category, setCategory] = useState('master')

    const handleSubmit = (event)=>{
        setError(false)
        // preventDefault permet d'annuler le comportement par defaut du composant (c'est a dire annuler le rafraichissement de la page apres le submit)
        event.preventDefault()
        if (title && details) {
            setError(false)
            setMessage('note added successfully')
            fetch('http://localhost:8000/notes',{
                method : 'POST',
                headers : {"Content-type":'Application/json'},
                body: JSON.stringify({title,details,category,date})
            }).then(() => console.log('success'))

        }
        else {setError(true); setMessage('Please fill out the title and details')}
    }
  return (
    <Container>
        <Button
          sx={btn}
          variant='outlined' 
          color='primary'
          align='left'
          startIcon = {<LoginIcon/>}
          endIcon ={<KeyboardArrowRightIcon/>}
        >
          login
        </Button>
        <Button
        variant='outlined'
            color='primary'
        >
            logout
        </Button>
        <br/>
        <Typography>Test de la nouvelle template</Typography>
        <br/>
        <form autoComplete='off' noValidate  onSubmit={handleSubmit}>
        <TextField
            onChange={(e) => setTitle(e.target.value)}
            variant='outlined'
            label="Title"
            required
            fullWidth
            error = {err} 
        />
        <br/>
        <br/>
        <TextField
            onChange={(e) => setDetails(e.target.value)}
            variant='outlined'
            label="Details"
            required
            multiline
            minRows={4}
            fullWidth
        />
         {/* Formcontrol est de sorte de contenaire (wrraper) qui permet de separer differentes section du formulaire} */}
        <FormControl>
            <FormLabel>Level</FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                <FormControlLabel control = {<Radio/>} value ='master' label='Master'></FormControlLabel> 
                <FormControlLabel control = {<Radio/>} value ='bachelor' label='Bachelor'></FormControlLabel> 
            </RadioGroup>
        </FormControl>       
        <br/>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* Le composant DemoContainer permet au date picker de prendre toute la largeur d l'ecran*/}
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="To do before" onChange={(date) => setDate (format(date,'dd / MM / Y'))}/>
            </DemoContainer>
        </LocalizationProvider>
        <br/>
        
        <SimpleSnackbar
            type = "submit" 
            value = "submit"
            message = {message}
            state = {err}
        />
        <br/>
        </form>
    </Container>
  );
}