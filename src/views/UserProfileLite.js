import React from "react";
import Chart from "../utils/chart";
import PropTypes from "prop-types";
import axios from 'axios';
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

var CanvasJSReact = require('./canvasjs/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserProfileLite extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title: "Users Statistics",
      GenderData: { 
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            label : "Male/Female Count",
            // order: 4,
            data: [],
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)"            ]
          }
        ],
        labels: ["Male", "Female"]
      },

      AgeData: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            label : "Gender Count",
            // order: 4,
            data: [24, 22, 70, 34, 54, 32, 11, 5, 0],
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.8)",
              "rgba(0,123,255,0.7)",
              "rgba(0,123,255,0.6)",
              "rgba(0,123,255,0.5)",
              "rgba(0,123,255,0.4)",
              "rgba(0,123,255,0.3)",
              "rgba(0,123,255,0.2)",
            ]
          }
        ],
        labels: ["(0-2 Years)", "(4-6 Years)", "(8-12 Years)",  "(15-20 Years)", "(25-32 Years)", "(38-43 Years)", "(48-53 Years)", "(60-100 Years)"]
      },
      EmotionsData: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            label : "Customers Emotions Count",
            // order: 4,
            data: [24, 22, 30, 11, 0],
            backgroundColor: [
              "rgba(0,0,255,0.9)",
              "rgba(0,255,0,0.9)",
              "rgba(204,255,51,0.9)",
              "rgba(255,0,0,0.9)",
            ]
          }
        ],
        labels: ["Neutral", "Happy", "Sad", "Angry"]
      },
    }

    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
    this.canvasRef3 = React.createRef();
  }

  componentDidMount() {
    // http://192.168.8.105:5000/counter
    axios.get('http://192.168.8.105:5000/counter')
          .then(response => {
              if (response.status === 200 && response != null) {
                let GenderData_local= { 
                  datasets: [
                    {
                      hoverBorderColor: "#ffffff",
                      label : "Male/Female Count",
                      // order: 4,
                      data: [],
                      backgroundColor: [
                        "rgba(0,123,255,0.9)",
                        "rgba(0,123,255,0.5)"            ]
                    }
                  ],
                  labels: ["Male", "Female"]
                }
                let data_labels = ['Male', 'Female']
                for(var i = 0; i < response.data.gender.length; i++){
                  GenderData_local.datasets[0].data.push(response.data.gender[i][data_labels[i]]);
                }
                // GenderData_local.datasets[0].data.push(0);
                this.setState({
                  GenderData : GenderData_local
                });
                const chartConfig = {
                  type: "bar",
                  data: this.state.GenderData,
                };
              
              new Chart(this.canvasRef.current, chartConfig);
              // API call 2 for GENDER GRAPH
              let data_labels2 = ["(0-2)", "(4-6)", "(8-12)",  "(15-20)", "(25-32)", "(38-43)", "(48-53)", "(60-100)"]
              let AgeData_local= {
                datasets: [
                  {
                    hoverBorderColor: "#ffffff",
                    label : "Gender Count",
                    // order: 4,
                    data: [],
                    backgroundColor: [
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.8)",
                      "rgba(0,123,255,0.7)",
                      "rgba(0,123,255,0.6)",
                      "rgba(0,123,255,0.5)",
                      "rgba(0,123,255,0.4)",
                      "rgba(0,123,255,0.3)",
                      "rgba(0,123,255,0.2)",
                    ]
                  }
                ],
                labels: ["(0-2 Years)", "(4-6 Years)", "(8-12 Years)",  "(15-20 Years)", "(25-32 Years)", "(38-43 Years)", "(48-53 Years)", "(60-100 Years)"]
              }
              for(var i = 0; i < response.data.age.length; i++){
                AgeData_local.datasets[0].data.push(response.data.age[i][data_labels2[i]]);
              }
              this.setState({
                AgeData : AgeData_local
              })
              const chartConfig2 = {
                type: "bar",
                data: this.state.AgeData,
              };
              new Chart(this.canvasRef2.current, chartConfig2);

              // API CALL 3 for EMOTIONS GRAPH
              let data_labels3 = ["Anger", "Happy", "Sad", "Neutral"];
              let EmotionsData_local= {
                datasets: [
                  {
                    hoverBorderColor: "#ffffff",
                    label : "Customers Emotions Count",
                    // order: 4,
                    data: [],
                    backgroundColor: [
                      "rgba(0,0,255,0.9)",
                      "rgba(0,255,0,0.9)",
                      "rgba(204,255,51,0.9)",
                      "rgba(255,0,0,0.9)",
                    ]
                  }
                ],
                labels: ["Anger", "Happy", "Sad", "Neutral"] 
              }
              for(var i = 0; i < response.data.emotion.length; i++){
                EmotionsData_local.datasets[0].data.push(response.data.emotion[i][data_labels3[i]]);
              }
              console.log(EmotionsData_local);
              this.setState({
                EmotionsData : EmotionsData_local
              })
              const chartConfig3 = {
                type: "bar",
                data: this.state.EmotionsData,
              };
              new Chart(this.canvasRef3.current, chartConfig3);
              }
              else{
                console.log("Problem");
              }
            }
          );
  }
render() {
  const { title } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <PageTitle title="Understand Customers Better" subtitle="Users Profile" className="text-sm-left mb-3" />
        </Row>
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <Row>
        <Col lg="4" md="6" sm="6" className="mb-4">
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Col>
        <Col lg="4" md="6" sm="6" className="mb-4">
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef2}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Col>
        <Col lg="4" md="6" sm="6" className="mb-4">
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef3}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Col>
        </Row>
      </Card>
      </Container>
    );
 }
}

export default UserProfileLite;
