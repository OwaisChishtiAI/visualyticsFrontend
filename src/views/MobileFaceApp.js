import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';
import {
  Container,
  Button,
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

class MobileFaceApp extends React.Component {

	constructor(props){
		super(props);
		this.state={
			face:"",
			minWidth: 100,
			maxWidth: 500,
			minHeight: 100,
			maxHeight: 500,
			li : ['jpg', 'jpeg', 'png']
		}
		// this.handleSubmit = this.handleSubmit.bind(this);
		}

	handleTakePhoto (dataUri) {
		this.setState({face : dataUri})
		console.log('takePhoto');
	}

	fileUpload = (baseFile) => {
		try{
		console.log("File Upload");
		console.log(baseFile);
		}
		catch{
			alert("File type not supported, Use .jpg, .jpeg or .png files.");
		}
	}

	fileTypeError = () => {
		alert("File type not supported, Use .jpg, .jpeg or .png files.");
		console.log("File type not supported, Use .jpg, .jpeg or .png files.");
	}


  render(){
  return (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle title="Know Your Customer" subtitle="AI Powered - KYC" className="text-sm-left mb-3" />
		</Row>
		<Row>
			<Col lg="2" md="3" sm="3" className="mb-4">
			<ImagePicker
			extensions={this.state.li}
			dims={this.state.minWidth, this.state.maxWidth, this.state.minHeight, this.state.maxHeight}
			onChange={this.fileUpload.bind(this)}
			// onError={} 
			>
			<Button>
			Upload Front Side of NIC
			</Button>
			</ImagePicker>
			</Col>
			<Col lg="4" md="3" sm="3" className="mb-4">
			<ImagePicker
			extensions={this.state.li}
			dims={this.state.minWidth, this.state.maxWidth, this.state.minHeight, this.state.maxHeight}
			onChange={this.fileUpload.bind(this)}
			// onError={this.fileTypeError.bind()} 
			>
			<Button>
			Upload Back Side of NIC
			</Button>
			</ImagePicker>
			</Col>
		</Row>
	</Container>
	//   <>
    // <Camera onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } } />
	// <img src={this.state.face} width="100" alt="No Face Extracted." />
	// </>
  );
  }
}

export default MobileFaceApp;