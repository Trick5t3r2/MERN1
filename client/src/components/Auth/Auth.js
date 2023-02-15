import React,{useState} from 'react';
import { Avatar,Button,Paper,Grid,Typography,Container } from '@mui/material';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';
import Input from './Input';
import { pink } from '@mui/material/colors';
import Icon from './icon';
import jwt_decode from 'jwt-decode';

const initialState= {firstname:'',lastname:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch= useDispatch();
    const navigate=useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(isSignup) {
        dispatch(signup(formData, navigate));
      } else {
        dispatch(signin(formData, navigate));
      }
    };

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
    };
  

    const googleSuccess =async (res:any) => {
      
     const result = jwt_decode(res.credential)
     const token = res?.credential;

     console.log(result);

    try {
        dispatch({ type: AUTH, data: {result,token } });
  
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };

    const googleFailure = (error) => {
      console.log(error);
      console.log('Google Sign IN was unsuccessful. Try Again Later');
    };

  return (
    <GoogleOAuthProvider clientId='636368595096-ogk8rc57vub6os7e1in0se19k2i6nkfv.apps.googleusercontent.com' >
    <Container component='main' maxWidth='xs'>
        <Paper sx={{marginTop:(8),display: 'flex',flexDirection: 'column',alignItems: 'center',padding:(2)}} elevation={3}>
            <Avatar sx={{margin:(1),backgroundColor:'secondary'}}>
                <LockOutlinedIcon sx={{backgroundColor:pink[500]}} />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form style={{width: '100%',marginTop:(3),marginBottom:(3)}} onSubmit={handleSubmit} >
              <Grid container spacing={2}>
                {
                  isSignup && (
                    <>                    
                        <Input name='firstName' label='First Name' handleChange={handleChange} half />                  
                        <Input name='lastName' label='Last Name' handleChange={handleChange} half />          
                    </>
                  )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
              </Grid>
              <Button type='submit' fullWidth variant='contained' color='primary' sx={{mt:(3),mb:(3)}}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
              <GoogleLogin
              clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
              render={(renderProps) => (
              <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
              )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
            />
              <Grid container justify='flex-end'>
                <Button onClick={switchMode}>
                  { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </Grid> 
            </form>
        </Paper>
    </Container>
    </GoogleOAuthProvider>
  )
}

export default Auth