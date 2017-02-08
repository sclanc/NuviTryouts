import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";
import './App.css';
import { Row, Col } from '../node_modules/react-materialize';

class Analysis extends Component {
    constructor(){
    super();
    this.state = {
      data: JSON.parse(localStorage.getItem("data")),
    };  
  }  
  
  getUnique(value, index, self) {
      return self.indexOf(value) === index;
  }
  
  getTags() {
      var words = "";
      for(var i = 0; i < this.state.data.length; i++) {
          words += this.state.data[i].actor_description;
      }
      var wordsArray = words.split(" ");
      var wordsSet = wordsArray.filter(this.getUnique);
      var returnData = [];
      for(var k = 0; k <wordsSet.length; k++) {
          var temp = {value:wordsSet[k].toString(), count:0};
          console.log(temp);
          returnData.push(temp);
          for(var j = 0; j < wordsArray.length; j++) {
              if(wordsArray[j] === wordsSet[k]) {
                  returnData[k].count++;
              }
          }
      }
      console.log(returnData);
      return this.getRandomSubarray(returnData, 40);
  }
  
  getRandomSubarray(arr, size) {
    var shuffle = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffle[index];
        shuffle[index] = shuffle[i];
        shuffle[i] = temp;
    }
    return shuffle.slice(0, size);
}
  
    render(){
        return (
            <div>
            <Row s='12'>
                <Col s='6'>
                    <p id='wordDeets'> 
                        Please Click a Word.
                    </p>
                </Col>
             </Row>  
          <Row s='12'>           
            <TagCloud minSize={20}
            maxSize={150}
            tags={this.getTags()}
            className="simple-cloud"
            onClick={tag => document.getElementById("wordDeets").innerHTML = `Word: ${tag.value}    Count: ${tag.count}` }  />
          </Row>
           </div>
        );
    }
    
}

export default Analysis