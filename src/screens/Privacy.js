import React from 'react';
import axios from 'axios';
import { Input, Form, Header, Divider, List, Container, Image, Grid, Button, Segment } from 'semantic-ui-react'

class Privacy extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
state = {
    name: '',
    email: '',
    subject: '',
    description: '',
    password: '',
    error: false,
    keepLoggedIn: true,
    loading: false
  }

  handleSubmit = () => {
    const {
      name,
      email,
      subject,
      description,
      loading
    } = this.state;
    if(!loading) {
      this.setState({loading: true });
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('description', description);
      axios.post("/public/contact", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          } 
        })
        .then( (result) => {
          // console.log(result);
          result = result.data;
          this.setState({
            name: '',
            email: '',
            subject: '',
            description: ''
          })
        })
        .catch( (err) => console.log(err) )
        .finally( () => this.setState({ loading: false }))
      
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div style={{ backgroundColor: '#333' }}>
        <nav style={{ padding: 10, display: 'flex', backgroundColor: '#222', justifyContent: 'center' }}>
          <Image href="/" style={{  alignSelf: 'center', width: 60 }} src={require('../CampusStoryLogo.svg')} size='small' />       
        </nav>
    <Segment style={{ backgroundColor: '#fff', padding: '4em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Privacy Policy
        </Header>
        <p style={{ textAlign: 'left', fontSize: '1.11em' }}>
          CAMPUS STORY (the “Company”) is committed to maintaining robust privacy protections for its users.  Our Privacy Policy (“Privacy Policy”) is designed to help you understand how we collect, use and safeguard the information you provide to us and to assist you in making informed decisions when using our Service.<br/>
          For purposes of this Agreement, “App” refers to the Company’s App, which can be accessed at through our mobile Application via App Store & Play store .<br/>
          “Service” refers to the Company’s services accessed via the App, in which users can register, see different content, update the content etc. <br/>
          The terms “we,” “us,” and “our” refer to the Company. “You” refers to you, as a user of our App or our Service.<br/>
          By accessing our App or our Service, you accept our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms of use</a>, and you consent to our collection, storage, use and disclosure of your Personal Information as described in this Privacy Policy.<br/>
        </p>
        
        <b>I. INFORMATION WE COLLECT</b> <br/>
        
        <p>
        We collect “Non-Personal Information” and “Personal Information.” <b>Non-Personal Information</b> includes information that cannot be used to personally identify you, such as anonymous usage data, general demographic information we may collect, referring/exit pages and URLs, platform types, preferences you submit and preferences that are generated based on the data you submit and number of clicks, views & time spent. <b>Personal Information</b> includes your email, phone, your full name, which you submit to us through the registration process at the App.
        To activate the Service you do not need to submit any Personal Information. To use the Service thereafter, you do not need to submit further Personal Information. However, in an effort to improve the quality of the Service, we track information provided to us by app or by our software application the type of phone you use, the device from which you connected to the Service, the time and date of access, and other information that does not personally identify you. We track this information using device ids, or small text files which include an anonymous unique identifier. 
        </p>
        
        <ol style={{ textAlign: 'left', fontSize: '1.11em' }}>
          <li style={{ margin: 5 }}>
            <b>Information you provide us by registering for an account</b> <br/>
              Information you provide us by registering for an account
              In addition to the information provided automatically by the app, to become a subscriber to the Service you will need to create a personal profile. You can create a profile by registering with the Service and entering the details required which are non personal. By registering, you are authorizing us to collect, store and use your email address in accordance with this Privacy Policy.
          </li>
          <li style={{ margin: 5 }}>
            <b>Children’s Privacy</b> <br/>
              Information you provide us by registering for an account
              The Site and the Service are not directed to anyone under the age of 13. The Site does not knowingly collect or solicit information from anyone under the age of 13, or allow anyone under the age of 13 to sign up for the Service. In the event that we learn that we have gathered personal information from anyone under the age of 13 without the consent of a parent or guardian, we will delete that information as soon as possible. If you believe we have collected such information, please contact us at support@mycampusdock.chat. 
          </li>
          <li style={{ margin: 5 }}>
            <b>Children’s Privacy</b> <br/>
              Information you provide us by registering for an account
              The Site and the Service are not directed to anyone under the age of 13. The Site does not knowingly collect or solicit information from anyone under the age of 13, or allow anyone under the age of 13 to sign up for the Service. In the event that we learn that we have gathered personal information from anyone under the age of 13 without the consent of a parent or guardian, we will delete that information as soon as possible. If you believe we have collected such information, please contact us at support@mycampusdock.chat. 
          </li>
        </ol>
        
        
        
        <b> II. HOW WE USE AND SHARE INFORMATION </b> <br/>
        <p style={{ padding: 10 }}>
          <b>Personal Information:</b> <br></br>
          Except as otherwise stated in this Privacy Policy, we do not sell, trade, rent or otherwise share for marketing purposes your Personal Information with third parties without your consent. We do share Personal Information with vendors who are performing services for the Company, such as the servers for our email communications who are provided access to user’s email address for purposes of sending emails from us. Those vendors use your Personal Information only at our direction and in accordance with our Privacy Policy.
          In general, the Personal Information you provide to us is used to help us communicate with you. For example, we use Personal Information to contact users in response to questions, solicit feedback from users, provide technical support, and inform users about promotional offers.
          We may share Personal Information with outside parties if we have a good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to meet any applicable legal process or enforceable governmental request; to enforce applicable Terms of Service, including investigation of potential violations; address fraud, security or technical concerns; or to protect against harm to the rights, property, or safety of our users or the public as required or permitted by law.
        </p>
        <p style={{ padding: 10 }}>
          <b>Non-Personal Information:</b> <br></br>
          In general, we use Non-Personal Information to help us improve the Service and customize the user experience. We also aggregate Non-Personal Information in order to track trends and analyze use patterns on the Site. This Privacy Policy does not limit in any way our use or disclosure of Non-Personal Information and we reserve the right to use and disclose such Non-Personal Information to our partners, advertisers and other third parties at our discretion.
          In the event we undergo a business transaction such as a merger, acquisition by another company, or sale of all or a portion of our assets, your Personal Information may be among the assets transferred. You acknowledge and consent that such transfers may occur and are permitted by this Privacy Policy, and that any acquirer of our assets may continue to process your Personal Information as set forth in this Privacy Policy. If our information practices change at any time in the future, we will post the policy changes to the Site so that you may opt out of the new information practices. We suggest that you check the Site periodically if you are concerned about how your information is used.
        </p>
        
        <b> III. HOW WE PROTECT INFORMATION </b> <br/>
        <p style={{ padding: 10 }}>
            We implement security measures designed to protect your information from unauthorized access. Your account is protected and we urge you to take steps to keep your personal information safe by not disclosing your password and by logging out of your account after each use. We further protect your information from potential security breaches by implementing certain technological security measures including encryption, firewalls and secure socket layer technology. However, these measures do not guarantee that your information will not be accessed, disclosed, altered or destroyed by breach of such firewalls and secure server software. By using our Service, you acknowledge that you understand and agree to assume these risks.
        </p>
        
        <b> IV. YOUR RIGHTS REGARDING THE USE OF YOUR PERSONAL INFORMATION </b> <br/>
        <p style={{ padding: 10 }}>
          You have the right at any time to prevent us from contacting you for marketing purposes.  When we send a promotional communication to a user, the user can opt out of further promotional communications by following the unsubscribe instructions provided in each promotional email. You can also indicate that you do not wish to receive marketing communications from us in the [list location of opt-out page, i.e. “Settings” section] of the Site. Please note that notwithstanding the promotional preferences you indicate by either unsubscribing or opting out in the app, we may continue to send you administrative emails including, for example, periodic updates to our Privacy Policy.
        </p>

        <b> V. LINKS TO OTHER WEBSITES </b> <br/>
        <p style={{ padding: 10 }}>
          As part of the Service, we may provide links to or compatibility with other websites or applications. However, we are not responsible for the privacy practices employed by those websites or the information or content they contain. This Privacy Policy applies solely to information collected by us through the Site and the Service. Therefore, this Privacy Policy does not apply to your use of a third party website accessed by selecting a link on our Site or via our Service. To the extent that you access or use the Service through or on another website or application, then the privacy policy of that other website or application will apply to your access or use of that site or application. We encourage our users to read the privacy statements of other websites before proceeding to use them.
        </p>
        
        <b> VI. CHANGES TO OUR PRIVACY POLICY </b> <br/>
        <p style={{ padding: 10 }}>
          The Company reserves the right to change this policy and our Terms of Service at any time.  We will notify you of significant changes to our Privacy Policy by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site. Significant changes will go into effect 30 days following such notification. Non-material changes or clarifications will take effect immediately. You should periodically check the Site and this privacy page for updates.
        </p>

        <b> VII. CONTACT US </b> <br/>
        <p style={{ padding: 10 }}>
          If you have any questions regarding this Privacy Policy or the practices of this Site, please contact us by sending an email to support@mycampusdock.chat. Last Updated: This Privacy Policy was last updated on March 07, 2019.
        </p>
        
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          {/* <a href='#'>Like What We Do</a> */}
          Like What We Do
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Get in touch with us
        </Header>
        <Form>
        <Form.Field>
      <label>Email</label>
      <Input value={this.state.email} placeholder='Email Address' onChange={ (event, data) => this.setState({ email: data.value }) }/>
    </Form.Field>
    <Form.Field>
      <label>Name</label>
      <Input value={this.state.name} placeholder='Full Name' onChange={ (event, data) => this.setState({ name: data.value }) }/>
    </Form.Field>
    <Form.Field>
      <label>Subject</label>
      <Input value={this.state.subject} placeholder='Subject' onChange={ (event, data) => this.setState({ subject: data.value }) }/>
    </Form.Field>
    <Form.TextArea value={this.state.description} label='Description' placeholder='Tell us more...' onChange={ (event, data) => this.setState({ description: data.value }) }/>
    <Button disabled={this.state.loading || this.state.email === '' || this.state.name  === '' || this.state.subject === '' || this.state.description === ''} loading={this.state.loading} onClick={this.handleSubmit} size='large' type='submit'>Submit</Button>
  </Form>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            {/* <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column> */}
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Campus Story
              </Header>
              <p>
                Copyright 2019 Campus Story
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
      </div>
    );

  }
}

export default Privacy;