import React from 'react';
import {  Grid, List, Segment, Form, Message, Label, Button, Image } from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';

class SetTrending extends React.Component {
    constructor(props) {
        super(props);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    state = {
        eventList: [],
        trending: [],
        currentSelected: {},
        title: '',
        description: '',
        date: new Date(),
        validity: new Date(),
        creatorPassword: '',
        fileName: ''
    }

    updateCurrent = (value) => {
        // console.log(value);
        this.setState({ 
            currentSelected: value, 
            title: value.title,
            description: value.description,
            date: new Date(value.date)
        })
    }

    componentDidMount() {
        this.updateList();
        const that = this;
        document.getElementById("trending_date").addEventListener("change", function() {
            var input = this.value;
            var dateEntered = new Date(input);
            console.log(input); //e.g. 2015-11-13
            dateEntered.setHours(24,0,0,0);
            that.setState({ validity: dateEntered });
        });
        
    }

    updateList = () => {
        let formData = new FormData();
        this.setState({ loading: true });
        axios.post("/admin/get-event-list", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-access-token': this.props.auth.user_token
            }
          })
          .then( (result) => {
            result = result.data;
            // console.log(result);
            if(!result.error) {
                this.setState({ eventList: result.data });
                axios.post("/admin/get-trending", formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'x-access-token': this.props.auth.user_token
                    }
                  })
                  .then( (result1) => {
                      result1 = result1.data;
                    //   console.log(result1)
                    if(!result1.error) {
                        this.setState({ loading: false, trending: result1.data });
                    } else {
                        this.setState({ loading: false, messages: ["Error with network, please reload"], error: true });
                    }
                  })
                  .catch( (err) => {
                    console.log(err)
                  })
                  .finally( () => {
                    if(this.mounted)
                        this.setState({ loading: false });
                  });
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
        let messages = [];
        this.setState({ loading: true });
        if(this.state.currentSelected._id === undefined) return;
        const formData = new FormData();
        const _id = this.state.currentSelected._id;
        
        const validity = this.state.validity;

        formData.append('_id', _id);
        formData.append('validity', validity);

        axios.post("/admin/add-to-trending", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': this.props.auth.user_token
            } 
            })
            .then( (result) => {
                this.setState({ loading: false });
                result = result.data;
                // console.log(result);
                if(!result.error) {
                    this.setState({ loading: false, messages: ['success'], error: false });
                } else {
                    this.setState({ loading: false, messages: [JSON.stringify(result.mssg)], error: true });
                }
                this.updateList();
            })
            .catch( (err) => console.log(err) )
            .finally( () => this.setState({ loading: false }) );
    }

    render() {
        return(
            <Grid stackable columns='equal'>
                <Grid.Column>
                    <Segment>
                        <Label>
                            Event List
                        </Label>
                        <List divided relaxed style={{ maxHeight: 400, overflow: 'scroll' }}>
                            { this.state.eventList.map((value, index) =>
                                <List.Item key={index}>
                                    { this.state.currentSelected._id === value._id && <List.Icon name='angle double right' size='large' verticalAlign='middle' />}
                                    <List.Content>
                                        <List.Header onClick={ () => this.updateCurrent(value) } as='a'>{value.college}/{value.title}</List.Header>
                                        <List.Description>{value.category}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )}
                            
                        </List>
                        <Label>
                            Trending List
                        </Label>
                        <List divided relaxed style={{ maxHeight: 400, overflow: 'scroll' }}>
                            { this.state.trending.map((value, index) =>
                                <List.Item key={index}>
                                    { this.state.currentSelected._id === value._id && <List.Icon name='angle double right' size='large' verticalAlign='middle' />}
                                    <List.Content>
                                        <List.Header onClick={ () => this.updateCurrent(value) } as='a'>{value.college}/{value.title}</List.Header>
                                        <List.Description>{JSON.stringify(value.validity)}</List.Description>
                                    </List.Content>
                                    {/* <List.Icon name='delete' size='large' verticalAlign='middle' /> */}
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
                    <Image style={{ borderRadius: 15, display: 'block', margin: 'auto', width: 333, maxHeight: 250, objectFit: 'contain' }} src={"https://mycampusdock.com/" + (this.state.currentSelected.media && this.state.currentSelected.media[0])} size='big' />
                    <br></br>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input disabled value={this.state.title} onChange={ (event, value) => this.setState({ name: value.value }) } fluid label='Channel Name' placeholder='Channel Name' />
                        </Form.Group>
                        
                        <Form.TextArea disabled value={this.state.description} onChange={ (event, value) => this.setState({ description: value.value }) } label='Description' placeholder='What will this channel be about...' />
                        <Label>
                            Selected: {this.state.validity.getFullYear() + '-'+( (this.state.validity.getMonth() + 1) > 9 ? this.state.validity.getMonth() + 1 : '0' + (this.state.validity.getMonth() + 1)) + '-' + ( this.state.validity.getDate() > 9 ? this.state.validity.getDate() : '0' + this.state.validity.getDate())} Date is +1 due to midnight validity
                        </Label>
                        <input id="trending_date" type="date" max={ this.state.date.getFullYear() + '-'+( (this.state.date.getMonth() + 1) > 9 ? this.state.date.getMonth() + 1 : '0' + (this.state.date.getMonth() + 1)) + '-' + ( this.state.date.getDate() > 9 ? this.state.date.getDate() : '0' + this.state.date.getDate()) }
                            min={ new Date().getFullYear() + '-'+( (new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)) + '-' + ( new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()) }
                        >
                        </input>
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

  
export default connect(mapStateToProps)(SetTrending);
