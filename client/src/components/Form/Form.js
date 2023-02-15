import React, {useState,useEffect} from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button , Typography , Paper } from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId,setCurrentId}) => {
  const [postData,setPostData] = useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  });

  const user = JSON.parse(localStorage.getItem('profile'));

  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch= useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === null) {
      dispatch(createPost({...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  if(!user?.result?.name) {
    return (
      <Paper sx={{p:'16px',m:'8px'}}>
        <Typography variant='h6' align='center'>Please Sign in to create your own memories and like other's memories.</Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{p:'16px',m:'8px'}} >
      <form autoComplete='off' noValidate style={{display: 'flex',flexWrap: 'wrap',justifyContent: 'center'}} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField sx={{margin:'8px 0'}} name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})} />
        <TextField sx={{margin:'8px 0'}} name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})} />
        <TextField sx={{margin:'8px 0'}} name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})} />
        <div width='97%' margin ="8px 0">
          <FileBase
            type="File"
            multiple={false}
            onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64})}
          />
        </div>
        <Button sx={{m:'8px 0'}} variant='contained' color='primary'size='large' type='submit' fullWidth>Submit</Button>
        <Button sx={{m:'8px 0'}} variant='contained' color='secondary'size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form