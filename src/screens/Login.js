import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { Image, Grid, Label, Button, Checkbox, Segment } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
state = {
    email: '',
    password: '',
    error: false,
    keepLoggedIn: true,
    loading: false
  }
  componentWillUnmount() {
    this.mounted = false;  
  }
  componentDidMount() {
    // verify the token
    const token = sessionStorage.getItem('token');
    this.mounted = true;
    if(!token || token === undefined) return;  
    if(!this.state.loading) {
      this.setState({loading: true });
      this.setState({ loading: true });
      let formData = new FormData();
      
      axios.post("/auth/super/verify", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token
          } 
        })
        .then( (result) => {
          // console.log(result);
          result = result.data;
          if(!result.error) {
            this.props.login_success({ keepLoggedIn: this.state.keepLoggedIn, token: result.token })
          } else {
            this.props.login_failed();
          }
        })
        .catch( (err) => console.log(err) )
        .finally( () => {
          if(this.mounted)
            this.setState({ loading: false });
        } )
    }
  }
  
  handleLogin = () => {
    this.setState({ loading: true });
    // console.log(this.state.email);
    // console.log(this.state.password);
    axios.post("/auth/super/signin", { email: this.state.email, password: this.state.password })
      .then( (result) => {
        result = result.data;

        if(!result.error) {
          this.props.login_success({ keepLoggedIn: this.state.keepLoggedIn, token: result.token })
        }
      })
      .catch( (err) => console.log(err) )
      .finally( () => {
        if(this.mounted)
          this.setState({ loading: false });
      } )
  }
  
  render() {
    return (
      <div>
        
        { this.props.auth.authenticated && <Redirect to="/admin/create-channel"/> }
        <Grid stackable columns={3} >
    <Grid.Row style={{ marginTop: 25 }}>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column >
          <Segment raised>
            <div style={{ marginTop: 10  }}>
              <Image style={{ display: 'block', margin: 'auto', width: 100 }} src={require('../CampusStoryLogo.svg')} size='small' />
            </div>     
            <Label style={{ marginTop: 10, marginBottom: 10 }}>Email</Label>
            <Input placeholder='username' type="email" style={{ width: '100%'}} onChange={ (event, data) => this.setState({ email: data.value }) } value={this.state.email} error={this.state.error} />
            <Label style={{ marginTop: 10, marginBottom: 10 }}>Password</Label>
            <Input placeholder='password' type="password" style={{ width: '100%' }} onChange={ (event, data) => this.setState({ password: data.value }) } value={this.state.password} error={this.state.error}/>
            <Checkbox style={{ marginTop: 10 }} label='Keep me logged in' checked={this.state.keepLoggedIn} onChange={ (event, data) => this.setState({ keepLoggedIn: !this.state.keepLoggedIn }) }/>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button style={{ marginTop: 10, AlignSelf: 'center' }} loading={this.state.loading} onClick={this.handleLogin}>Login</Button>
            </div>
            </Segment>
        </Grid.Column>
        <Grid.Column>

        </Grid.Column>
        </Grid.Row>
    </Grid>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return { 
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login_success: (payload) => {
      dispatch({ type: 'AUTH_USER', payload });
    },
    login_failed: (payload) => {
      dispatch({ type: 'UNAUTH_USER', payload });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);