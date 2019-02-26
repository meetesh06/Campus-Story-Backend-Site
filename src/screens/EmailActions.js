import React from 'react';
import { Form, Grid, Dropdown, Segment, Label } from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';

const stateOptions = [
  { key: 'INVITE', value: 'INVITE', text: 'Invite' },
  { key: 'MESSAGE', value: 'MESSAGE', text: 'Message' },
];

class EmailActions extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind();
    this.submitFormMessage = this.submitFormMessage.bind();
  }

  state = {
    selected: '',
    email: '',
    name: '',
    name1: '',
    message: '',
    name_1: '',
    name_2: '',
  }

  submitForm = () => {
    const formData = new FormData();
    if(
      this.state.email === '' ||
      this.state.name === '' ||
      this.state.name1 === ''
      ) return;

    formData.append('email', this.state.email);
    formData.append('name', this.state.name);
    formData.append('name1', this.state.name1);
    this.setState({ loading: true });
    axios.post("/admin/email-invite", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': this.props.auth.user_token
      }
    })
    .then( (result) => {
      result = result.data;
      // console.log(result);
      if(!result.error) {
          alert('email sent successfully');
          this.setState({ loading: false });
      } else {
          alert('email sending failed');
          this.setState({ loading: false });
      }
    })
    .catch( (err) => alert(JSON.stringify(err)) )
    .finally( () => {
      this.setState({ loading: false });
    } )
  }

  submitFormMessage = () => {
    const formData = new FormData();
    if(
      this.state.email === '' ||
      this.state.message === ''
      ) return;

    formData.append('email', this.state.email);
    formData.append('message', this.state.message);
    formData.append('name_1', this.state.name_1);
    formData.append('name_2', this.state.name_2);
    
    this.setState({ loading: true });

    axios.post("/admin/email-message", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': this.props.auth.user_token
      }
    })
    .then( (result) => {
      result = result.data;
      // console.log(result);
      if(!result.error) {
          alert('email sent successfully');
          this.setState({ loading: false });
      } else {
          alert('email sending failed');
          this.setState({ loading: false });
      }
    })
    .catch( (err) => alert(JSON.stringify(err)) )
    .finally( () => {
      this.setState({ loading: false });
    } )
  }

  
    render() {
        return(
            <Grid stackable columns='equal'>
                <Grid.Column
                  style={{
                    textAlign: 'center' }}
                >
                  <div style={{ padding: 10 }}>
                    <Label>
                        Select Email Type
                    </Label>
                  </div>
                  <Dropdown
                    placeholder='State'
                    search
                    selection
                    onChange={(val, val1) => this.setState({ selected: val1.value })}
                    options={stateOptions}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                    {
                      this.state.selected === 'INVITE' &&
                      <Segment>
                        <h1>Invite a new Creator</h1>
                        <Form>
                          <Form.Group widths='equal'>
                              <Form.Input value={this.state.email} onChange={ (event, value) => this.setState({ email: value.value }) } fluid label='Email Address' placeholder='Email Address' />
                          </Form.Group>
                          <Form.Group widths='equal'>
                              <Form.Input value={this.state.name} onChange={ (event, value) => this.setState({ name: value.value }) } fluid label='Full Name' placeholder='Full Name' />
                          </Form.Group>
                          <Form.Group widths='equal'>
                              <Form.Input value={this.state.name1} onChange={ (event, value) => this.setState({ name1: value.value }) } fluid label='Invitor Full Name' placeholder='Invitor Full Name' />
                          </Form.Group>
                          <Form.Button loading={this.state.loading} disabled={this.state.loading} onClick={this.submitForm}>Submit</Form.Button>
                        </Form>
                      </Segment>
                    }
                    {
                      this.state.selected === 'MESSAGE' &&
                      <Segment>
                        <h1>Send a message to a Creator</h1>
                        <Form>
                          <Form.Group widths='equal'>
                              <Form.Input value={this.state.email} onChange={ (event, value) => this.setState({ email: value.value }) } fluid label='Email Address' placeholder='Email Address' />
                          </Form.Group>
                          <Form.Group widths='equal'>
                              <Form.Input value={this.state.name_1} onChange={ (event, value) => this.setState({ name_1: value.value }) } fluid label='Reciever Name' placeholder='Reciever Name' />
                          </Form.Group>
                          <Form.Group widths='equal'>
                              <Form.Input value={this.state.name_2} onChange={ (event, value) => this.setState({ name_2: value.value }) } fluid label='Sender Name' placeholder='Sender Name' />
                          </Form.Group>
                          <Form.Group widths='equal'>
                            <Form.TextArea value={this.state.message} onChange={ (event, value) => this.setState({ message: value.value }) } label='Message' placeholder='Message...' />
                          </Form.Group>
                          <Form.Button loading={this.state.loading} disabled={this.state.loading} onClick={this.submitFormMessage}>Submit</Form.Button>
                        </Form>
                      </Segment>
                    }
                </Grid.Column>
            </Grid>
            
        );
    }
}


const mapStateToProps = (state) => {
    return { 
      auth: state.auth
    };
};

  
export default connect(mapStateToProps)(EmailActions);
