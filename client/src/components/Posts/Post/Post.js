import React from 'react';
import {Card, CardActions, CardContent,CardMedia,Button,Typography} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

const Likes = () => {
  if (post.likes.length > 0) {
    return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};

  return (
    <Card style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative'
    }}>
      <CardMedia sx={{
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken'
      }}
      image={post.selectedFile} title={post.title}
      />
      <div style={{
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white'
  }} >
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.name === post?.name || user?.result?.name === post?.name) && (
        <div style={{position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white'}}>
            <Button style={{color:'white'}} size='large' onClick={() => setCurrentId(post._id)}>
              <MoreHorizIcon fontSize='default' />
            </Button>
          </div>
        )}
      
      <div display='flex' justifyContent='space-between' margin='20px'>
        <Typography variant='body2' color='textSecondary' m='20px 20px 10px 20px'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography sx={{padding: '0 16px'}} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions style={{
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.name === post?.name || user?.result?.name === post?.name) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
        
      </CardActions>
      
    </Card>
  )
}

export default Post