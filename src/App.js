import React, { Component } from 'react';
import './App.css';
import { Button, Row, Col, 
         Icon, Preloader, Card, 
         CardTitle, Collection,
         CollectionItem, MediaBox,
         Modal, Input} from '../node_modules/react-materialize';

function Media(props) {
  if(props.src !== null){
    return (
      <MediaBox src={props.src} caption={props.caption} width="300"/>
    )
  }
  else {
    return (
      <p>No additional media found.</p>
    )
  }
}

function Activity(props) {
  return (
    <Card  header={<CardTitle reveal image={props.data.actor_avator} waves='light'/>}
      title={props.data.actor_username +"'s activity"}
      reveal={<Collection> 
               <CollectionItem>{"Activity date: " + props.data.activity_date}</CollectionItem>
               <CollectionItem>{"User's Name: " + props.data.actor_name}</CollectionItem>
               <CollectionItem>{"Activity Description: " + props.data.actor_description}</CollectionItem>
               <CollectionItem>{"Activity Message: " +props.data.activity_message}</CollectionItem>
               <CollectionItem><Media src={props.data.activity_attachment} caption={props.data.activity_attachement_type} /></CollectionItem>
             </Collection>}>
     <p>
       <Modal
          header='Leave A Comment'
          trigger={
            <Button id='comments'>
              <Icon left>chat_bubble_outline</Icon>
              {props.data.activity_comments}
            </Button>
          }
          actions={ <div>
                      <Button waves='light' modal='close' flat>Close</Button> 
                      <Button waves='light' modal='close' flat>Submit</Button> 
                    </div>}>
         <Input id='commentText' placeholder="Be Nice!" s={6} label="" />
       </Modal>
 
       <a href={props.data.activity_url}>
         Source: {props.data.provider}
       </a> 
       <Button id='span' 
               onClick={() => document.getElementById('span').innerHTML  = props.data.activity_likes + 1}>
               {props.data.activity_likes}
               <Icon right>thumb_up</Icon> 
       </Button> 
     </p>
   </Card>
  );
 }

class App extends Component {
  constructor(){
    super();
    this.state = {
      url:'https://nuvi-challenge.herokuapp.com/activities',
      data: [],
    };  
  }  
   
  httpreq(url, callback){
    var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          var json = JSON.parse(xmlHttp.responseText);
          callback(json);
        } 
      }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  }

  renderData() {
    var activities = [];
    for(var i = 0; i < this.state.data.length; i++) {
      activities.push(<Activity data={this.state.data[i]} key={this.state.data[i].id} /> )
    }
    return activities;    
  }
  
  organizeData(data){
    var rows =  [];
    var i = 0;
    while(i < data.length-1){
      if(i+4 > data.length-1) {
        var j = (data.length-1) - i;
          if(j===3) {
            rows.push(<Row m={12} key={i}>
                        <Col m={3}>{data[i]}</Col>
                        <Col m={3}>{data[i+1]}</Col>
                        <Col m={3}>{data[i+2]}</Col>
                      </Row>);
            break;
          }
          else if(j===2) {
            rows.push(<Row m={12} key={i}>
                        <Col m={3}>{data[i]}</Col> 
                        <Col m={3}>{data[i+1]}</Col>
                      </Row>);
            break;
          }
          else {
            rows.push(<Row m={12} key={i}>
                        <Col m={3}>{data[i]}</Col>
                      </Row>);
            break;
          }
        }
      else {
        rows.push(<Row m={12} key={i}>
                    <Col m={3}>{data[i]}</Col> 
                    <Col m={3}>{data[i+1]}</Col> 
                    <Col m={3}>{data[i+2]}</Col> 
                    <Col m={3}>{data[i+3]}</Col>
                  </Row>);
        i+=4;
      }
    }
  return rows;
  }
    
  componentDidMount(){ 
    if(localStorage.getItem("data") === null || localStorage.getItem("data") === undefined) {
      this.httpreq('https://nuvi-challenge.herokuapp.com/activities', res => {
      this.setState({data: res});
      localStorage.setItem("data", JSON.stringify(res)); 
      });
    }
    else {
      this.setState({data: JSON.parse(localStorage.getItem("data"))});
    }
  }
  
  render() {
    if(this.state.data.length < 1){
      return (
      <Row>
        <Col offset='l6' l={12}>
          <Preloader flashing size='big'/>
        </Col>
      </Row>
    );
  }
  else {     
    return (
      <div className="App">
        <div>
          {this.organizeData(this.renderData())}
        </div>
      </div>
    );
   }  
  }
}

export default App;
