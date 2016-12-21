import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';
import Loader from 'react-loader';

class ViewPolls extends Component{



renderPolls(){
const pollArray = this.props.allPolls.map((userPolls) => {

  return userPolls.polls.map((poll) => {
    return(
      <li className="viewPollItems" key={poll._id.toString()}>
        <Link style={{"color":"white"}} to={"viewpolls/"+poll._id.toString()}>
          <span className="text-center"><strong>{poll.pollTitle}</strong></span><img className="magGlassImg" onMouseEnter={this.mouseHover.bind(this)} onMouseOut={this.mouseOut.bind(this)} src="../../style/img/magnifying_glass.png"/>
        </Link>
      </li>
    )
  })
})
 return pollArray;
}

mouseHover(event){

  const tag = '.showPollTag';
  const left =(event.clientX + 15)+'px';
  const top = (event.clientY - 25)+'px'
  const element = document.querySelector(tag);

element.style.left = left;
element.style.top = top;
element.style.opacity = 1;

}

mouseOut(event){
  const tag = '.showPollTag';

  const element = document.querySelector(tag);
  element.style.opacity = 0;
}

render(){
const {allPolls, loaded} = this.props;

  const loaderOptions = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      scale: 1.00,
      corners: 1,
      color: 'white',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      top: '50%',
      left: '50%',
      shadow: false,
      hwaccel: false,
      position: 'absolute'
  };

  if(!allPolls){
    return <div style={{"textAlign":"center"}}>
    <Loader loaded={loaded} options={loaderOptions} id="loader">
    </Loader>
    Please wait while the server awakes from hibernation. Patience is a virtue.
    </div>
  }
  else{
    return(
      <div style={{"overflow":"hidden"}}><div className="showPollTag">show poll</div>
      <h1>view polls<img className="chartImg imgHeight" src="../../style/img/blue_chart.png" alt="chart image" /></h1>
      <ul className="viewPollContainer">
      {this.renderPolls()}
      </ul>
      </div>
    )
  }
}

}

function mapStateToProps(state){
  return{
    allPolls:state.polls.allPolls,
    loaded:state.polls.loaded
  }
}

export default connect(mapStateToProps,actions)(ViewPolls)
