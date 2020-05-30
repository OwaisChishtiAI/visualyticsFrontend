import React from "react";
import { Container,
  Row,
  Col,
  FormSelect,
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter  } from "shards-react";
import Image from 'react-bootstrap/Image'
import PageTitle from "./../components/common/PageTitle";
import Webcam from "react-webcam";
import axios from 'axios';


const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
 
// const webcamRef = React.useRef(null);

class FaceAuth extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  constructor(props){
    super(props);
    this.state={
      face:"",
      name_placeholder: "", 
      submit_btn_bool: false,
      user: ""
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    var querystring = require("querystring");
    // let post_data = {"img" : imageSrc}
    axios.post('http://localhost:5000/getScreenShot', querystring.stringify({ img: imageSrc }))
          .then(response => {
              if (response.status === 200 && response != null) {
                let face_inner =  "data:image/jpeg;base64," + response.data.STATUS;
                this.setState({
                  face: face_inner,
                  submit_btn_bool: true
                });
                console.log("FACE")
                // console.log(this.state.face);
                
              }
              else{
                alert("Face Cannot be Detected !!")
              }
            }
          )
          .catch(error => {
            alert("Face Cannot be Detected !!")})
  };

  myChangeHandler = (event) => {
    this.setState({name_placeholder: event.target.value});
    
  }
  handleSubmit = (event) => {
    var querystring = require("querystring");
    axios.post('http://localhost:5000/saveuser', querystring.stringify({ usr: this.state.face , name : this.state.name_placeholder }))
          .then(response => {
              if (response.status === 200 && response != null) {
                let status = response.data.STATUS;
                if(status == "200"){
                  alert("User Saved as: " + this.state.name_placeholder)
                }
                else{
                  alert("User Not Saved due to some issue. Try Again Later...")
                }
              }
            }
          )
    console.log(this.state.name_placeholder);
    event.preventDefault();
    this.setState({name_placeholder:"", submit_btn_bool:false})
    
  }


  searchUser = () => {
    var querystring = require("querystring");
    axios.post('http://localhost:5000/checkuser', querystring.stringify({ usr: this.state.face}))
          .then(response => {
              if (response.status === 200 && response != null) {
                let matched_user = response.data.STATUS;
                if(matched_user == ""){
                  this.setState({user:"No User Found"})
                }
                else{
                  this.setState({user:matched_user})
                }
              }
            }
          )
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
      <PageTitle title="Understand Customers Better" subtitle="Users Profile" className="text-sm-left mb-3" />
      </Row>
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Live Camera Feed</h6>
        </CardHeader>
        <Row>
        <Col lg="6" md="6" sm="6" className="mb-4">
        <CardBody lg="2" className="d-flex py-0">
        <Webcam
          audio={false}
          height={450}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={450}
          mirrored={true}
          videoConstraints={videoConstraints}
        />
        
        </CardBody>
        </Col>
        <Col lg="4" md="6" sm="6" className="mb-4">
        {/* <CardBody className="d-flex py-0"> */}
        <h6>Extracted Face</h6>
        <img src={this.state.face} width="100" alt="No Face Extracted." />
        {/* </CardBody> */}
        </Col>
        </Row>
        <Row>
        <Col lg="4" md="4" sm="4" className="mb-4">
        <Button onClick={this.capture}>Capture photo</Button>
        
        <form onSubmit={this.handleSubmit}>
        <br></br>
        <label>
          Name:
          <input type="text" value={this.state.name_placeholder} onChange={this.myChangeHandler} required disabled={!this.state.submit_btn_bool}/>
        </label>
        
        <Button disabled={!this.state.submit_btn_bool}>Save User</Button>
        </form>
        
        <br></br>
        <Button disabled={!this.state.submit_btn_bool} onClick={this.searchUser}>Check User</Button>
        </Col>
        </Row>
        <Row>
          <Col>
        <textarea value={this.state.user} />
        </Col>
        </Row>
        </Card>
      </Container>
    );
  }
}

export default FaceAuth;
