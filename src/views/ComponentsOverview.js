import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";


class ComponentsOverview extends React.Component {
  render(){
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
      <PageTitle title="Shoppers Concentration Heat Maps" subtitle="Shoppers Heat Maps" className="text-sm-left mb-3" />
    </Row>
        <img src="http://192.168.0.100:5000/camera01_hm_img" width="500" alt="ROI Locations" />
        </Container>
      );
  }
  }

export default ComponentsOverview;
