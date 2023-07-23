import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'; 
import { useDispatch } from 'react-redux';
import { setUser, setToken } from './../../Redux/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try{
      const response = await axios.post('/organization/sign-in',{
        email,
        password,
        // confirmpassword,
      });
      const { token, name } = response.data.result
      // const { token, user } = response // Assuming your API returns token and user data
      console.log("token",token)
      // // Store the token and user data in localStorage
      Cookies.set('token', token, { expires: 1 });
      localStorage.setItem('user', JSON.stringify({ email, name }));

      dispatch(setUser(name)); // Dispatch the setUser action with the user data
      dispatch(setToken(token)); // Dispatch the setToken action with the token
      alert('Login successful. Now you can log in');
      navigate('/dashboard/home');
    }catch(e){
      alert("login Failed . Please try again")
    }
    // Perform login logic here
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 550 }}>
        <Header as="h2" textAlign="center">
          Login to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment style={{width: "100%"}} stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" type="text" value={email} onChange={ev => setEmail(ev.target.value)}/>
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <div style={{ marginTop: '1rem' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default Login;