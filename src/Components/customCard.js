
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, Box, Container, IconButton } from '@mui/material';
import { DeleteOutlineOutlined, Height } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { blue, cyan, green, purple, yellow } from '@mui/material/colors';

const avatarColor = (note) => { 
    {
      const all = {
        backgroundColor : blue,
      }
      if (note.category === 'work')  { all.backgroundColor = yellow[700] };
      if (note.category === 'todos') { all.backgroundColor = purple[500] };
      if (note.category === 'master') { all.backgroundColor = cyan [500] };
      return all;
    }
}


export default function CustomCard({note, handleDelete}){
    return(
        <Container>
        <Card elevation={3}>
            <CardHeader
            avatar = {<Avatar sx={avatarColor(note)}>{note.category[0].toUpperCase()}</Avatar>}
            action ={
                <IconButton onClick={() => handleDelete(note.id)}>
                    <DeleteOutlineOutlined/>
                </IconButton>
            }
            title = {note.title}
            subheader = {
                note.date === "" ? note.category : note.category + ' ( do before : ' + note.date + ' )'}
            />
            <CardContent>
                <Typography variant='body2' color='textSecondary'>
                    {note.details}
                </Typography>
            </CardContent> 
        </Card>
        </Container>
    )
}