import React from 'react';
import { Image, Grid, Header, Segment, Button } from 'semantic-ui-react'

class Landing extends React.Component {
  
  state = {
    count: 0
  }

  handleClick = () => {
    const { history } = this.props;
    if(this.state.count > 15) history.push('/login')
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <Grid stackable columns={3} >
          <Grid.Row style={{ marginTop: 25 }}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column >
              <Segment raised>
                <div style={{ marginTop: 10  }}>
                  <Image onClick={this.handleClick} style={{ display: 'block', margin: 'auto', width: 100 }} src={require('../CampusStoryLogo.svg')} size='small' />
                </div>     
                <Header textAlign="center" as='h1'>Coming Soon</Header>
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
export default Landing;