/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
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
import UsersByDevice from "./../components/blog/UsersByDevice";
import Chart from "../utils/chart";
import PageTitle from "./../components/common/PageTitle";

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      title: "Shoppers Concetraction Camera 01",
      chartData: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: [68, 24, 7],
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
              "rgba(0,123,255,0.3)"
            ]
          }
        ],
        labels: ["ROI 1", "ROI 2", "ROI 3"]
      }
    }

    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
    this.canvasRef3 = React.createRef();
    this.canvasRef4 = React.createRef();
    this.canvasRef5 = React.createRef();
    this.canvasRef6 = React.createRef();
  }

  componentDidMount() {
    const chartConfig = {
      type: "pie",
      data: this.state.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
    new Chart(this.canvasRef2.current, chartConfig);
    new Chart(this.canvasRef3.current, chartConfig);
    new Chart(this.canvasRef4.current, chartConfig);
    new Chart(this.canvasRef5.current, chartConfig);
    new Chart(this.canvasRef6.current, chartConfig);
  }
  render() {

        return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
      <PageTitle title="Shoppers Concentration Charts" subtitle="Shopper Feeds" className="text-sm-left mb-3" />
    </Row>
      <Row>
      <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 01</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            // className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
        </Col>

        <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 02</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef2}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
        </Col>

        <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 03</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef3}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
        </Col>

      </Row>

      <Row>
      <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 04</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef4}
            // className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
        </Col>

        <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 05</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef5}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
        </Col>

        <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 06</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef6}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
        </Col>

      </Row>


    </Container>
      );
  }
}

export default BlogPosts;
{/* <Col lg="4" md="6" sm="12" className="mb-4">
        <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Shoppers Concetraction Camera 02</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Card>
      </Col> */}