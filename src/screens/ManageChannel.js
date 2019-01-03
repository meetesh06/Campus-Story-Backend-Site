import React from 'react';
import {  Grid, List, Segment, Form, Message, Label, Button, Image } from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';

class ManageChannel extends React.Component {
    constructor(props) {
        super(props);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    state = {
        channelList: [],
        currentSelected: {},
        name: '',
        description: '',
        creatorPassword: '',
        fileName: ''
    }

    updateCurrent = (value) => {
        // console.log(value);
        this.setState({ 
            currentSelected: value, 
            name: value.name,
            description: value.description,
            creatorPassword: value.creator_password
        })
    }

    componentDidMount() {
        let formData = new FormData();
        this.setState({ loading: true });
        axios.post("/admin/get-channel-list", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-access-token': this.props.auth.user_token
            }
          })
          .then( (result) => {
            result = result.data;
            // console.log(result);
            if(!result.error) {
                this.setState({ loading: false, channelList: result.data });
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
        let error = false;
        let messages = [];
        let file = document.getElementById('upload').files[0];
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

        if(this.state.creatorPassword.length < 3) {
            error = true;
            messages.push("The creator password is less than 3 characters");
        }
        
        if(this.state.creatorPassword.length > 140) {
            error = true;
            messages.push("The creator password is more than 140 characters");
        }
        
        
        
        
        if(error === false) {
            const formData = new FormData();
            const _id = this.state.currentSelected._id;
            const name = this.state.name;
            const description = this.state.description;
            const creatorPassword = this.state.creatorPassword;

            formData.append("_id", _id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("creatorPassword", creatorPassword);
            
            if(file !== undefined) {
                formData.append("poster", file);
            }
            
            axios.post("/admin/update-channel", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'x-access-token': this.props.auth.user_token
                } 
              })
              .then( (result) => {
                result = result.data;
                // console.log(result);
                if(!result.error) {
                    const a = [ ...this.state.channelList ];
                    let index = a.findIndex(item => item._id === _id);
                    a[index].name = name;
                    a[index].description = description;
                    a[index].creator_password = creatorPassword;
                    
                    // console.log(index, a);
                    
                    // items[itemIndex]['name'] = name;
                    // items[itemIndex]['description'] = description;
                    // items[itemIndex]['creatorPassword'] = creatorPassword;
                    
                    this.setState({ 
                        loading: false, 
                        messages: ["Channel " + this.state.name +" update success"], 
                        error: false,
                        channelList: a, 
                        success: true
                    });
                } else {
                    this.setState({ loading: false, messages: ["Error updating the channel"], error: true });
                }
              })
              .catch( (err) => console.log(err) )
              .finally( () => {
                if(this.mounted)
                    this.setState({ loading: false });
                    window.scrollTo(0, 0);
              } )
        } else {
            this.setState({ messages, error, loading: false })
        }
    }

    render() {
        return(
            <Grid stackable columns='equal'>
                <Grid.Column>
                    <Segment>
                        <List divided relaxed style={{ maxHeight: 400, overflow: 'scroll' }}>
                            { this.state.channelList.map((value, index) =>
                                <List.Item key={index}>
                                    { this.state.currentSelected._id === value._id && <List.Icon name='angle double right' size='large' verticalAlign='middle' />}
                                    <List.Content>
                                        <List.Header onClick={ () => this.updateCurrent(value) } as='a'>{value.college}/{value.name}</List.Header>
                                        <List.Description>{value.category}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )}
                            
                        </List>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                    {
                        this.state.error &&
                        <Message>
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
                    {/* <Image style={{ display: 'block', margin: 'auto', width: 50 }} src={"https://mycampusdock.com/" + this.state.currentSelected.media} size='small' /> */}
                    <Image style={{ display: 'block', margin: 'auto', width: '100%', maxHeight: 250, objectFit: 'contain' }} src={"https://mycampusdock.com/" + (this.state.currentSelected.media && this.state.currentSelected.media[0])} size='big' />
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input value={this.state.name} onChange={ (event, value) => this.setState({ name: value.value }) } fluid label='Channel Name' placeholder='Channel Name' />
                        </Form.Group>
                        
                        <Form.TextArea value={this.state.description} onChange={ (event, value) => this.setState({ description: value.value }) } label='Description' placeholder='What will this channel be about...' />
                        <Form.Checkbox disabled={true} checked={this.state.currentSelected.private !== undefined ? this.state.currentSelected.private : false} label='Make this channel private?' />
                        <Form.Checkbox disabled={true} checked={this.state.currentSelected.priority === 5 ? true : false} label='Official Channel?' />
                        <Form.Dropdown disabled={true} value={this.state.currentSelected.category} placeholder='Select a category'/>
                        <Form.Group widths='equal'>
                            <Form.Input disabled={true} value={this.state.currentSelected.creator !== undefined ? this.state.currentSelected.creator : ""}  fluid label='Creator Name' placeholder='Creator Name' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input value={this.state.currentSelected.creator_email !== undefined ? this.state.currentSelected.creator_email : ""} id="creator-email" disabled={true} fluid label='Email' placeholder='Email' />
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
                            <Form.Button loading={this.state.loading} disabled={this.state.currentSelected === {} } onClick={this.submitForm}>Submit</Form.Button>
                        </div>
                    </Form>
                    </Segment>
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

  
export default connect(mapStateToProps)(ManageChannel);
