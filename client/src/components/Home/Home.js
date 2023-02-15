import React, {useState,useEffect} from "react";
import { Container, Grow, Grid} from '@mui/material';
import {useDispatch} from 'react-redux';
import { getPosts} from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId,dispatch]);
  return (
    <Grow in>
        <Container maxWidth='lg' sx={{alignItems:'center'}}>
            <Grid container sx={{justifyContent:'space-between', alignItems:{sm:'center',md:'stretch'},flexDirection:{xs:'column-reverse',md:'row'}}} spacing={3}>
                <Grid item xs={12} sm={9} md={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>    
        </Container>
    </Grow>
  )
}

export default Home