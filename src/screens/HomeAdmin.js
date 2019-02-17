import React, { Component } from 'react'
import { Button, Icon, Menu, Segment, Sidebar, Label, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from '../components/require_auth';
import CreateChannel from './CreateChannel';
import ManageChannel from './ManageChannel';
import SetTrending from './SetTrending';

class HomeAdmin extends Component {
  state = { visible: false }

  handleShowClick = () => this.setState({ visible: !this.state.visible })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state
    const { history } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Button onClick={this.handleShowClick} icon>
                <Icon name="sidebar" />
            </Button>
            {/* <Button  onClick={this.handleShowClick} icon>
                <Icon name="sidebar" />
            </Button> */}
            <div style={{ flex: 1, marginTop: 10  }}>
              <Image style={{ display: 'block', margin: 'auto', width: 50 }} src={require('../CampusStoryLogo.svg')} size='small' />
            </div>     
            <Button onClick={ () =>  this.props.logout()} animated>
                <Button.Content visible>logout</Button.Content>
                <Button.Content hidden>
                <Icon name="close" />
                </Button.Content>
            </Button>

        </div>
        

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a' onClick={() => history.push('/admin/create-channel')} >
              <Icon name='plus square outline' />
              Create Channel
            </Menu.Item>
            <Menu.Item as='b' onClick={() => history.push('/admin/manage-channel')} >
              <Icon name='edit outline' />
              Manage Channels
            </Menu.Item>
            <Menu.Item as='b' onClick={() => history.push('/admin/set-trending')} >
              <Icon name='bell' />
              Set Trending
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic style={{minHeight: '100vh', display: 'flex', flexFlow: 'column nowrap'}}>
                <Switch>
                    <Route exact path="/admin/create-channel" component={RequireAuth(CreateChannel)} />
                    <Route exact path="/admin/manage-channel" component={RequireAuth(ManageChannel)} />
                    <Route exact path="/admin/set-trending" component={RequireAuth(SetTrending)} />
                </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return { 
      auth: state.auth
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: (payload) => {
        dispatch({ type: 'UNAUTH_USER', payload });
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);