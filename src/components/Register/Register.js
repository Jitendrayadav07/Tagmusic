import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const RegisterPage = () => {

  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try{
      await axios.post('/organization/register',{
        name,
        email,
        password,
        phone_number,
        // confirmpassword,
      });
      alert("Registeation successul . Now you can log in")
      navigate('/login');
    }catch(e){
      alert("Registeation Failed . Please try again")
    }
    // Perform login logic here
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Create a new account
        </Header>
        <Form size="large"  onSubmit={handleSubmit}>
          <Segment style={{width: "100%"}} stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="Name" type="text" value={name} onChange={ev => setUsername(ev.target.value)} />  
            <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail address" value={email} onChange={ev => setEmail(ev.target.value)} />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <Form.Input fluid icon="phone" iconPosition="left" placeholder="Phone number" value={phone_number} onChange={ev => setPhoneNumber(ev.target.value)} /> {/* New phone number input field */}
            {/* <Form.Input fluid icon="lock" iconPosition="left" placeholder="Confirm Password" type="password" value={confirmpassword} onChange={ev => setConfirmPassword(ev.target.value)} /> */}
            <Button color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
        <div style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterPage;