import React from 'react';
import { Form, Grid, Label, Button, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';

class HomeAdmin extends React.Component {
    handleChange = (e, { value }) => this.setState({ value })
    state = {
        categories: [
            // { value: 'all', text: 'All' },
            // { value: 'articles', text: 'Articles' },
            // { value: 'products', text: 'Products' },
        ],
        privateChannel: false,
        officialChannel: false,
        error: false,
        success: false,
        loading: false,
        messages: [],
        name: '',
        category: '',
        description: '',
        creatorName: '',
        creatorEmail: '',
        creatorPassword: '',
        fileName: ''
    }

    componentDidMount() {
        let formData = new FormData();
        this.setState({ loading: true });
        axios.post("/admin/get-categories", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-access-token': this.props.auth.user_token
            }
          })
          .then( (result) => {
            result = result.data;
            // console.log(result);
            if(!result.error) {
                this.setState({ loading: false, categories: result.data });
            } else {
                this.setState({ loading: false, messages: ["Error with network, please reload"], error: true });
            }
          })
          .catch( (err) => console.log(err) )
          .finally( () => {
            if(this.mounted)
                this.setState({ loading: false });
          } )
    }

    submitForm = () => {
        if(this.state.loading === true) return;
        let error = false;
        let messages = [];
        let file = document.getElementById('upload').files[0];
        let creatorEmail = document.getElementById('creator-email');
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.setState({ loading: true });
        if(this.state.name.length < 3) {
            error = true;
            messages.push("The channel name is less than 3 characters");
        }
        
        if(this.state.name.length > 140) {
            error = true;
            messages.push("The channel name is more than 140 characters");
        }
        
        if(this.state.description.length < 10) {
            error = true;
            messages.push("The channel description is less than 10 characters");
        }
        if(this.state.description.length > 140) {
            error = true;
            messages.push("The channel description is more than 140 characters");
        }
        
        if(this.state.category === '') {
            error = true;
            messages.push("No category selected");
        }

        if(this.state.creatorName.length < 3) {
            error = true;
            messages.push("The creator name is less than 3 characters");
        }
        
        if(this.state.creatorName.length > 140) {
            error = true;
            messages.push("The creator name is more than 140 characters");
        }

        if(this.state.creatorPassword.length < 3) {
            error = true;
            messages.push("The creator password is less than 3 characters");
        }
        
        if(this.state.creatorPassword.length > 140) {
            error = true;
            messages.push("The creator password is more than 140 characters");
        }
        
        
        if(!re.test(String(creatorEmail.value).toLowerCase())) {
            error = true;
            messages.push("Invalid Email entry");
        }
        
        if(file === undefined) {
            error = true;
            messages.push("No file selected");
        }
        
        if(error === false) {
            const formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("description", this.state.description);
            formData.append("private", this.state.privateChannel);
            formData.append("official", this.state.officialChannel);
            formData.append("category", this.state.category);
            formData.append("creatorName", this.state.creatorName);
            formData.append("creatorEmail", this.state.creatorEmail);
            formData.append("creatorPassword", this.state.creatorPassword);
            formData.append("poster", file);
            
            axios.post("/admin/create-channel", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'x-access-token': this.props.auth.user_token
                } 
              })
              .then( (result) => {
                result = result.data;
                // console.log(result);
                if(!result.error) {
                    this.setState({ 
                        loading: false, 
                        messages: ["Channel " + this.state.name +" successfully created"], 
                        error: false, 
                        success: true,
                        name: '',
                        description: '',
                        privateChannel: '',
                        officialChannel: '',
                        category: '',
                        creatorName: '',
                        creatorEmail: '',
                        creatorPassword: '',
                    });
                } else {
                    this.setState({ loading: false, messages: ["Error creating the channel"], error: true });
                }
              })
              .catch( (err) => console.log(err) )
              .finally( () => {
                if(this.mounted)
                    this.setState({ loading: false });
                    window.scrollTo(0, 0);
              } )
        } else {
            this.setState({ messages, error })
        }
    }

    render() {
        return(
            <Grid stackable columns={3}>
                <Grid.Row>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                <Segment>
                    {
                        this.state.error &&
                        <Message success={true}>
                            <Message.Header>Opps, there were a few problems</Message.Header>
                            <Message.List>
                                {
                                    this.state.messages.map( (value, index) =>
                                        <Message.Item key={index}> {value}</Message.Item>        
                                    )
                                }
                                
                            </Message.List>
                        </Message>
                    }
                    {
                        this.state.success &&
                        <Message>
                            <Message.Header>Success Creating a new channel</Message.Header>
                            <Message.List>
                                {
                                    this.state.messages.map( (value, index) =>
                                        <Message.Item key={index}> {value}</Message.Item>        
                                    )
                                }
                                
                            </Message.List>
                        </Message>
                    }
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input value={this.state.name} onChange={ (event, value) => this.setState({ name: value.value }) } fluid label='Channel Name' placeholder='Channel Name' />
                        </Form.Group>
                        
                        <Form.TextArea value={this.state.description} onChange={ (event, value) => this.setState({ description: value.value }) } label='Description' placeholder='What will this channel be about...' />
                        <Form.Checkbox label='Make this channel private?' checked={this.state.privateChannel} onChange={ (event, data) => this.setState({ privateChannel: !this.state.privateChannel }) }/>
                        <Form.Checkbox label='Official Channel?' checked={this.state.officialChannel} onChange={ (event, data) => this.setState({ officialChannel: !this.state.officialChannel }) }/>
                        <Form.Dropdown value={this.state.category} onChange={(event, value) => this.setState({ category: value.value }) } label='Category' options={this.state.categories} placeholder='Select a category'/>
                        <Form.Group widths='equal'>
                            <Form.Input value={this.state.creatorName} onChange={ (event, value) => this.setState({ creatorName: value.value }) } fluid label='Creator Name' placeholder='Creator Name' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input id="creator-email" value={this.state.creatorEmail} type="email" onChange={ (event, value) => this.setState({ creatorEmail: value.value }) } fluid label='Email' placeholder='Email' />
                            <Form.Input value={this.state.creatorPassword} type="text" onChange={ (event, value) => this.setState({ creatorPassword: value.value }) } fluid label='Password' placeholder='Password' />
                        </Form.Group>

                        <Label
                            as="label"
                            // basic
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            htmlFor="upload"
                        >
                            <Button
                                icon="upload"
                                label={{
                                    basic: true,
                                    content: 'Select a banner for the channel'
                                }}
                                labelPosition="right"
                            />
                            <p>{this.state.fileName}</p>
                            <input
                                accept="image/x-png,image/gif,image/jpeg"
                                hidden
                                onChange={() => {
                                    let file = document.getElementById('upload').files[0];
                                    return this.setState({ fileName: file.name === undefined ? "" : file.name })
                                }}
                                id="upload"
                                multiple
                                type="file"
                            />
                        </Label>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Form.Button loading={this.state.loading} onClick={this.submitForm}>Submit</Form.Button>
                        </div>
                    </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            
        );
    }
}

const mapStateToProps = (state) => {
    return { 
      auth: state.auth
    };
};

  
export default connect(mapStateToProps)(HomeAdmin);
