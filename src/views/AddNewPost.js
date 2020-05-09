import React from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "./../components/common/PageTitle";


class AddNewPost extends React.Component {
render(){
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
      <PageTitle title="Region of Interest Locations" subtitle="ROI Locations" className="text-sm-left mb-3" />
    </Row>
      <img src="http://192.168.0.104:5000/camera01_roi_img" width="800" alt="ROI Locations" />
      </Container>
    );
}
}

export default AddNewPost;
