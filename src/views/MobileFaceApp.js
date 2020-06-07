import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';
import {Form, Button, Modal} from 'react-bootstrap';
import {
  Container,
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import { ImagePicker } from 'react-file-picker'
import Webcam from "react-webcam";
import Badge from 'react-bootstrap/Badge'
import LoadingOverlay from 'react-loading-overlay';


class DefaultModal extends React.Component {
    render() {
        return (
            <Modal
				{...this.props}
				
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Form>
                        <Row>
							<div>
								<p>
		<h6>Front CNIC v/s Back CNIC: <b> {this.props.data.nicTonic}%</b></h6><br></br>
		<h6>CNIC v/s Video (Average): <b> {this.props.data.nicTovideo}%</b></h6><br></br>
		<h6>Front CNIC v/s Selfie: <b> {this.props.data.nicFToselfie}%</b></h6><br></br>
		<h6>Back CNIC v/s Selfie: <b> {this.props.data.nicBToselfie}%</b></h6><br></br>
								</p>
							</div>
						</Row>

                        <Button variant="secondary float-right w-80" onClick={this.props.onHide}>
                            Cancle
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

class CameraModal extends React.Component {
	setRef = webcam => {
		this.webcam = webcam;
	  };
	  
	  constructor(props){
		super(props);
		this.state={
			btn3Show: false,
			btn3Dis : true,
			btn3Scs : false,
		}
	}

	  capture = () => {
		const dataUri = this.webcam.getScreenshot();
		var querystring = require("querystring");
		axios.post('http://localhost:5000/selfie', querystring.stringify({ selfie: dataUri}))
			.then(response => {
				if (response.status === 200 && response != null) {
					if(response.data.status == 200){
						// alert("Face Detected")
						this.setState({selfie : dataUri, btn3Show : true, btn3Scs : true});
					}
					else{
						// alert("No Face Detected.")
						this.setState({selfie : dataUri, btn3Show : true, btn3Scs : false});
					}
				}
			})
	}

    render() {
		const videoConstraints = {
			width: 20,
			height: 20,
			facingMode: "user"
		  };
        return (
            <Modal
				{...this.props}
				
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Form>
                        <Row>
							<div>
							<Webcam
							audio={false}
							height={100}
							ref={this.setRef}
							screenshotFormat="image/jpeg"
							width={100}
							mirrored={true}
							videoConstraints={videoConstraints}
							/>
							</div>
						</Row>

						<Button variant="primary w-80" onClick={this.capture} >
                            Capture
                        </Button>
						{this.state.btn3Show ? (this.state.btn3Scs ? (<Badge pill variant="success">Face Detected</Badge>) : (<Badge pill variant="warning">No Face</Badge>)) : <></>}
						
                        <Button variant="secondary float-right w-80" onClick={this.props.onHide} >
                            Use
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

class MobileFaceApp extends React.Component {
	setRef = webcam => {
		this.webcam = webcam;
	  };

	constructor(props){
		super(props);
		this.state={
			nicF:"",
			nicB:"",
			minWidth: 100,
			maxWidth: 500,
			minHeight: 100,
			maxHeight: 500,
			li : ['jpg', 'jpeg', 'png'],
			selectedVideo: null,
			selfie : '',
			btn0 : false,
			btn0Scs : false,
			btn0Show : false,
			btn1 : true,
			btn1Scs : false,
			btn1Show : false,
			btn2 : true,
			btn2Scs : false,
			btn2Show : false,
			btn3 : false,
			btn4 : true,
			test_state : "owais",
			eval_results: {
			nicTonic : "owais",
			nicTovideo : "",
			nicFToselfie : "",
			nicBToselfie : "",
			},
			modalShow : false,
			cameraShow : false,
			loader : false,
		}
		// this.handleSubmit = this.handleSubmit.bind(this);
		}

	cameraClose = () => {
		this.setState({ cameraShow: false });
	}

	modalClose = () => {
		this.setState({ modalShow: false });
		window.location.reload(false);
	}

	nicFrontUpload = (baseFile) => {
		this.setState({nicF : baseFile, loader : true})
		var querystring = require("querystring");
		axios.post('http://localhost:5000/nicF', querystring.stringify({ nicF: this.state.nicF}))
			.then(response => {
				this.setState({loader : false})
				if (response.status === 200 && response != null) {
					if(response.data.status == 200){
						this.setState({btn0Scs : true, btn0Show : true, btn1 : false})
						// alert("Face Detected")
					}
					else{
						this.setState({btn0Scs : false, btn0Show : true, btn1 : false})
						// alert("No Face Detected.")
					}
				}
				})
		
	}


	nicBackUpload = (baseFile) => {
		this.setState({nicB : baseFile, loader : true})
		var querystring = require("querystring");
		axios.post('http://localhost:5000/nicB', querystring.stringify({ nicF: this.state.nicB}))
			.then(response => {
				this.setState({loader : false})
				if (response.status === 200 && response != null) {
					if(response.data.status == 200){
						// alert("Face Detected")
						this.setState({btn1Scs : true, btn1Show : true, btn2 : false})
					}
					else{
						// alert("No Face Detected.")
						this.setState({btn1Scs : false, btn1Show : true, btn2 : false})
					}
				}
				})
		
	}

	onFileChange = event => { 
     
		// Update the state 
		this.setState({ selectedVideo: event.target.files[0] }); 
	   
	  }; 
	   
	  // On file upload (click the upload button) 
	onVideoUpload = () => { 
		this.setState({loader : true})
		this.setState({btn3 : false})
		const formData = new FormData(); 
		
		// Update the formData object 
		formData.append( 
			"file", 
			this.state.selectedVideo, 
		);
		// console.log(this.state.selectedVideo); 
		// console.log(this.state.selectedVideo.name);
		
		axios.post('http://localhost:5000/video', formData)
			.then(response => {
				this.setState({loader : false})
				if (response.status === 200 && response != null) {
					console.log("Video Uploaded")
					this.setState({btn2Scs : true, btn2Show : true})
				}
				else{
					this.setState({btn2Scs : false, btn2Show : true})
				}
				
				})
				.catch(this.setState({btn2Scs : false, btn2Show : true, loader : false}))
	}; 

	

	showCamera = () => {
		this.setState({btn4 : false})
		this.setState({cameraShow : true})
	}

	evaluate = () => {
		this.setState({
			btn0 : true,
			btn1 : true,
			btn2 : true,
			btn3 : true,
			btn4 : true,
		})
		axios.get('http://localhost:5000/evaluate')
			.then(response => {
				if (response.status === 200 && response != null) {
					let nicTonic_i = "";
					let nicTovideo_i = "";
					let nicFToselfie_i = "";
					let nicBToselfie_i = "";
					var results = response.data.results;
					nicTonic_i = results["nic-nic"];
					nicTovideo_i = results["nic-video"];
					nicFToselfie_i = results["nicF-selfie"];
					nicBToselfie_i = results["nicB-selfie"];
					let eval_results_i = {nicTonic : nicTonic_i, nicTovideo : nicTovideo_i, nicFToselfie : nicFToselfie_i, nicBToselfie : nicBToselfie_i}
					this.setState({
						eval_results : eval_results_i,
						modalShow : true,
						
						
					})
				}
			})
		
	}


  render(){
  return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle title="Know Your Customer" subtitle="AI Powered - KYC" className="text-sm-left mb-3" />
		</Row>
		<LoadingOverlay
			active={this.state.loader}
			spinner
			text='Loading...'
			>
		<Row>
			<Col lg="4" md="3" sm="3" className="mb-4">
			<ImagePicker
			extensions={this.state.li}
			dims={this.state.minWidth, this.state.maxWidth, this.state.minHeight, this.state.maxHeight}
			onChange={this.nicFrontUpload.bind(this)}
			// onError={} 
			>
			<Button disabled={this.state.btn0} variant="primary rounded btn-block">
			Upload Front Side of NIC
			</Button>
			</ImagePicker>
			{this.state.btn0Show ? (this.state.btn0Scs ? (<Badge pill variant="success">Face Detected</Badge>) : (<Badge pill variant="warning">No Face</Badge>)) : <></>}

			</Col>
			</Row>
			<Row>
			<Col lg="4" md="3" sm="3" className="mb-4">
			<ImagePicker
			extensions={this.state.li}
			dims={this.state.minWidth, this.state.maxWidth, this.state.minHeight, this.state.maxHeight}
			onChange={this.nicBackUpload.bind(this)}
			// onError={this.fileTypeError.bind()} 
			>
			<Button disabled={this.state.btn1} variant="primary rounded btn-block">
			Upload Back Side of NIC
			</Button>
			</ImagePicker>
			{this.state.btn1Show ? (this.state.btn1Scs ? (<Badge pill variant="success">Face Detected</Badge>) : (<Badge pill variant="warning">No Face</Badge>)) : <></>}
			</Col>
			</Row>
			<Row>
			</Row>
			<Row>
			<Col lg="4" md="3" sm="3" className="mb-4">
                <input type="file" onChange={this.onFileChange} /> 
                <Button onClick={this.onVideoUpload} disabled={this.state.btn2} variant="primary rounded btn-block"> 
                  Upload Video
                </Button> 
				{this.state.btn2Show ? (this.state.btn2Scs ? (<Badge pill variant="success">Uploaded</Badge>) : (<Badge pill variant="warning">Upload Error</Badge>)) : <></>}
            </Col>
			</Row>
				
				{/* <Row>
				<Col lg="4" md="3" sm="3" className="mb-4">
				<img src={this.state.selfie} width="100" alt="No Face Extracted." />
				</Col>
				</Row> */}
				<Row>
				<Col lg="4" md="3" sm="3" className="mb-4">
				<Button onClick={this.showCamera} disabled={this.state.btn3} variant="primary rounded btn-block">Capture Selfie</Button>
				</Col>
				</Row>

				<Row>
				<Col lg="4" md="3" sm="3" className="mb-4">
				<Button onClick={this.evaluate} disabled={this.state.btn4} variant="primary rounded btn-block">Evaluate</Button>
				</Col>
				</Row>
				<DefaultModal
                    show={this.state.modalShow}
					onHide={this.modalClose}
					data={this.state.eval_results}
                />
				<CameraModal
                    show={this.state.cameraShow}
					onHide={this.cameraClose}
                />
				</LoadingOverlay>
	</Container>
	//   <>
    // <Camera onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } } />
	// <img src={this.state.face} width="100" alt="No Face Extracted." />
	// </>
  );
  }
}

export default MobileFaceApp;