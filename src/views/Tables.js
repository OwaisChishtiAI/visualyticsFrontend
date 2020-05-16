import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Form, Button } from "shards-react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';
// import ScriptTag from 'react-script-tag';
import * as d3 from "d3";
import Tree from 'react-tree-graph';
import axios from 'axios';
import './treePlot.css'
import PageTitle from "./../components/common/PageTitle";


class Tables extends React.Component {
    constructor(props) {
    super(props);
    this.state={
    fabrics : ["Q1", "Q2", "Q5"],
    tree_data : {
        name: 'Parent',
        children: [{
            name: 'Child One',
            children: [{name: "Grand 1"}, {name: "Grand 2"}]
        }, {
            name: 'Child Three',
            children: [{name: "Grand 3"}, {name: "Grand 4"}]
        }, {
            name: "Child Two",
            children: [{name: "Grand 5"}, {name: "Grand 6"}]
        }]
    }
}
    }


    plotGraph = (q) => {
        // window.location.reload(false);
        console.log(q);
        axios.get('http://192.168.8.105:5000/camera01_markov?parent=' + q)
          .then(response => {
              if (response.status === 200 && response != null) {
                //   console.log(response.data.data);
                  let data = {
                    name: q,
                    children: [],
                  }
                  console.log(data);
                  let json_data = response.data.data;
                  json_data.keys.forEach(element => {
                      data.children.push({name:element, children:[]})
                  });

                for(var i = 0; i < data.children.length; i++) {
                    var key = data.children[i].name;
                    for(var j = 0; j < json_data[key].length; j++) {
                        data.children[i].children.push({name: json_data[key][j]})
                    }
                }
                this.setState({
                    tree_data: data
                });
              }
              else {
                console.log("Problem");
              }
            });
    }

    render(){
        // const { tree_data } = this.tree_data;
        const  { fabrics } = this.state;
        return(
            <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
            <PageTitle title="Customer Transitions b/w ROIs" subtitle="Customer Journey" className="text-sm-left mb-3" />
            </Row>
            
            <Form action="http://192.168.8.105:5000/bubblechart" target="_blank">
            {/* <input type="submit" value="Track Last Hour Movements" /> */}
            <Button>Track Last Hour Movements</Button>
            </Form>

            
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                   
                        
                    {/* <button onClick={this.buttonClick.bind(this)}>Click me</button>   {function(evt){console.log(evt)}} */}
                            <Dropdown className="d-inline-block mr-2 mt-2 card-title" onSelect={this.plotGraph}>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Select ROI
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        {Array.isArray(fabrics) && fabrics.map(object => (
                                        <Dropdown.Item eventKey={object}>{object}</Dropdown.Item>
                                        // <Dropdown.MenuItem key={object.name} href={'#${object.name}'}></Dropdown.MenuItem>
                                        ))}
                                            
                                        </Dropdown.Menu>
                                    </Dropdown>
                            
                       
                                    <div>

                                    <div className="custom-container">
                                    <Tree
                                    data={this.state.tree_data}
                                    height={400}
                                    // nodeOffset={-9}
                                    // nodeRadius={10}
                                    // animated
                                    // margins={{bottom:100,left:1, right:100, top:10}}
                                    width={400}/>
                                    </div>
                                    </div>

                       
                   
                        
                        
                    </div>
                    
                </div>
            </div>

            </Container>
        )
    }
} 

export default Tables;