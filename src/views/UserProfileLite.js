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
import {emojify} from 'react-emojione';
import SmallStats from "../components/common/SmallStats";

import "./cards.css"

import RangeDatePicker from "../components/common/RangeDatePicker";

var CanvasJSReact = require('./canvasjs/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
  // convertShortnames: true,
  // convertUnicode: true,
  // convertAscii: true,
  style: {
      // backgroundImage: 'url("/path/to/your/emojione.sprites.png")',
      height: 150,
      margin: 2,
  },
  // this click handler will be set on every emoji
  // onClick: event => alert(event.target.title)
};

const datasets= [
  {
    label: "Today",
    fill: "start",
    borderWidth: 1.5,
    backgroundColor: "rgba(0, 184, 216, 0.1)",
    borderColor: "rgb(0, 184, 216)",
    data: [1, 2, 1, 3, 5, 4, 7]
  }
]
const attrs= { md: "6", sm: "6" };

class UserProfileLite extends React.Component{
  constructor(props) {
    super(props);
    this.canvasRefLine = React.createRef();
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
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      LinechartData: {
        // labels: ["05-17-2020 20:24", "05-17-2020 20:25", "05-17-2020 20:26"],
        labels : ["Q1", "Q2", "Q3"],
        datasets: [
          {
            label: "Red",
            backgroundColor: "red",
            data: [4,3,5]
            },
            {
              label: "Blue",
            backgroundColor: "blue",
            data: [3,7,4]
          },
          {
            label: "Green",
            backgroundColor: "green",
            data: [7,2,6]
                }
          ],
      }
      // END OF THIS.STATE
    }

    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
    this.canvasRef3 = React.createRef();
    this.canvasRef4 = React.createRef();
  }

  componentDidMount() {
    // http://192.168.8.105:5000/counter
    axios.get('http://localhost:5000/counter')
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
                        "rgba(255,0,179,0.9)"
                                    ]
                    }
                  ],
                  labels: ["Male", "Female"]
                }
                let data_labels = ['Male', 'Female']
                for(var i = 0; i < response.data.gender.length; i++){
                  GenderData_local.datasets[0].data.push(response.data.gender[i][data_labels[i]]);
                }
                GenderData_local.datasets[0].data.pop();
                GenderData_local.datasets[0].data.push(3);
                // GenderData_local.datasets[0].data.push(0);
                this.setState({
                  GenderData : GenderData_local
                });
                const chartConfig = {
                  type: "pie",
                  data: this.state.GenderData,
                };
              
              new Chart(this.canvasRef.current, chartConfig);
              // API call 2 for GENDER GRAPH
              let data_labels2 = ["(0-2)", "(4-6)", "(8-12)",  "(15-20)", "(25-32)", "(38-43)", "(48-53)", "(60-100)"]
              let AgeData_local= {
                datasets: [
                  {
                    hoverBorderColor: "#ffffff",
                    label : "Age Groups Count",
                    // order: 4,
                    data: [],
                    backgroundColor: [
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
                      "rgba(0,123,255,0.9)",
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
              });
            //   let optionsThis = {
            //     scales: {
            //         xAxes: [{
            //             gridLines: {
            //                 offsetGridLines: false
            //             }
            //         }]
            //     }
            // };
              const chartConfig2 = {
                type: "bar",
                data: this.state.AgeData,
                options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              // max: 5,
                              // min: 0,
                              stepSize: 1
                          }
                      }]
                  }
              }
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
              // new Chart(this.canvasRef3.current, chartConfig3);
              }
              else{
                console.log("Problem");
              }
            

            // console.log(this.state.EmotionsData.datasets[0].data);
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          

          // let LinechartData_local = {
          //   labels : [],
          // datasets: []
          // }
          // let groups = "rgba(0,123,";
          // for(var j = 0; j < response.data.aggregate[1].groups.length; j++){
          //   let array_local = {
          //     label: "",
          //     fill: "start",
          //     data: [],
          //     backgroundColor: "",
          //     borderColor: "",
          //     pointBackgroundColor: "#ffffff",
          //     pointHoverBackgroundColor: "",
          //     borderWidth: 1.5,
          //     pointRadius: 1,
          //     pointHoverRadius: 7
          //   };
          //   let color = (j+1)*100
          //   array_local.backgroundColor = groups + color + ",0.1)";
          //   array_local.borderColor = groups + color + ",1)";
          //   array_local.pointBackgroundColor = groups + color + ")";
          //   // groups.push(response.data.aggregate[1].groups[j])
          //   for(var k = 0; k < response.data.aggregate[0].data[response.data.aggregate[1].groups[j]].length; k++){
          //     // console.log(response.data.aggregate[0].data[response.data.aggregate[1].groups[j]][k]);
          //     array_local.label = response.data.aggregate[1].groups[j];
          //     array_local.data.push(response.data.aggregate[0].data[response.data.aggregate[1].groups[j]][k]);
          //   }
          //   LinechartData_local.datasets.push(array_local);
          //   // array_local.data = [];
          // };
          
          // for(var l = 0; l < response.data.aggregate[2].dates.length; l++){
          //   LinechartData_local.labels.push(response.data.aggregate[2].dates[l])
          // }
          // // console.log("DATA Is HERE");
          // // console.log(LinechartData_local);

          // this.setState({
          //   LinechartData : LinechartData_local
          // });

          // const chartOptionsLine = {
          //   ...{
          //     responsive: true,
          //     legend: {
          //       position: "top"
          //     },
          //     elements: {
          //       line: {
          //         // A higher value makes the line look skewed at this ratio.
          //         tension: 0.3
          //       },
          //       point: {
          //         radius: 0
          //       }
          //     },
          //     hover: {
          //       mode: "nearest",
          //       intersect: false
          //     },
          //     tooltips: {
          //       custom: false,
          //       mode: "nearest",
          //       intersect: false
          //     }
          //   },
          //   ...this.props.chartOptionsLine
          // };
      
          // const BlogUsersOverview = new Chart(this.canvasRefLine.current, {
          //   type: "LineWithLine",
          //   data: this.state.LinechartData, 
          //   options: chartOptionsLine
          // });
      
          // // They can still be triggered on hover.
          // const buoMeta = BlogUsersOverview.getDatasetMeta(0);
          // buoMeta.data[0]._model.radius = 0;
          // buoMeta.data[
          //   this.state.LinechartData.datasets[0].data.length - 1
          // ]._model.radius = 0;
      
          // // Render the chart.
          // BlogUsersOverview.render();

          // label: "Red",
          //   backgroundColor: "red",
          //   data: [4,3,5]
          //   },
          let LinechartData_local= {
            labels : [],
            datasets: [],
          }
          let groups = [];
          response.data.aggregate[1].forEach(element => {
            LinechartData_local.labels.push(element)
          });
          response.data.aggregate[2].forEach(element => {
            groups.push(element)
          });
          // console.log("DATES");
          // console.log(LinechartData_local.labels);  
          // console.log(groups);
          const colors_bg = ["blue", "pink", "orange", "brown"]
          for(var g=0 ; g<groups.length ; g++){
            var data_inner = {
              label: "",
              backgroundColor: "",
              data: []
              }
            data_inner.label = groups[g];
            data_inner.backgroundColor = colors_bg[g];
            data_inner.data = response.data.aggregate[0][data_inner.label]
            LinechartData_local.datasets.push(data_inner)
            
            // data_inner.label = "";
            // data_inner.data = [];
          }
          // console.log(LinechartData_local);
          this.setState({
            LinechartData: LinechartData_local
          })
          let chartConfig4 = {
            type: "bar",
            data: this.state.LinechartData,
            options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          stepSize: 1
                      }
                  }]
              }
          }
          };
          new Chart(this.canvasRef4.current, chartConfig4);
          // for(var ite=0 ; ite < response.data.aggregate.groups ; ite++){
          //   data_inner.label = response.data.aggregate.groups[ite];
          //   data_inner.label.push(response.data.aggregate.data[data_inner.label][0])
          // }
          // var gr = 0;

          // let chartConfig4 = {
          //   type: "bar",
          //   data: this.state.LinechartData,
          //   options: {
          //     scales: {
          //         yAxes: [{
          //             ticks: {
          //                 stepSize: 1
          //             }
          //         }]
          //     }
          // }
          // };
          // new Chart(this.canvasRef4.current, chartConfig4);
          
          // END OF AXIOS
        });
  // END OF COMPONENT      
  
  }
  
render() {
  const { title } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <PageTitle title="Understand Customers Better" subtitle="Users Profile" className="text-sm-left mb-3" />
        </Row>
        
        <Row>
        <Col md="6" sm="6" lg="3">
        <div className="stats-card purple-card mb-4">
        <h6>Angry Customers</h6>
        {emojify('😠', options)}
        {/* <span></span> */}
        {/* <span style={{float:"right"}}>/ Hr</span> */}
        <span style={{color:"blue", fontSize:"xx-large", float:"right"}}>{this.state.EmotionsData.datasets[0].data[0]}</span>
          </div>
          </Col>
        <Col md="6" sm="6" lg="3">
        <div className="stats-card purple-card mb-4">
        <h6>Happy Customers</h6>
        {emojify(':)', options)}
        <span style={{color:"blue", fontSize:"xx-large", float:"right"}}>{this.state.EmotionsData.datasets[0].data[1]}</span>
          </div>
          </Col>
          <Col md="6" sm="6" lg="3">
        <div className="stats-card purple-card mb-4">
        <h6>Sad Customers</h6>
        {emojify(':(', options)}
        <span style={{color:"blue", fontSize:"xx-large", float:"right"}}>{this.state.EmotionsData.datasets[0].data[2]}</span>
          </div>
          </Col>
          <Col md="6" sm="6" lg="3">
        <div className="stats-card purple-card mb-4">
        <h6>Neutral Customers</h6>
        {emojify('😐', options)}
        <span style={{color:"blue", fontSize:"xx-large", float:"right"}}>{this.state.EmotionsData.datasets[0].data[3]}</span>
          </div>
          </Col>
          </Row>


      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <Row>
        <Col lg="6" md="6" sm="6" className="mb-4">
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Col>
        <Col lg="6" md="6" sm="6" className="mb-4">
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
            height="120"
            ref={this.canvasRef3}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        </Col>
        </Row>
      </Card>


      <br></br>
      <Card small className="h-100">
      <CardHeader className="border-bottom">
          <h6 className="m-0">Time-wise Age Groups</h6>
        </CardHeader>
        <Row>
        <Col lg="12" md="6" sm="6" className="mb-4">
        <CardBody className="d-flex py-0">
          <canvas
            height="120"
            ref={this.canvasRef4}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody></Col></Row></Card>
      </Container>
    );
 }
}


UserProfileLite.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};




export default UserProfileLite;
