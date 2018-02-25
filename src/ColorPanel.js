import React from 'react';
import { Control } from './Control';
import { Result } from './Result';

const sounds = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

export class ColorPanel extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    steps:[Math.floor(Math.random() * 4)],
    currentStep: 0,
    yourTurn: false,
    strict: false,
    game: false,
    count: 0,
    speed: 1500,
    error: false,
    restarting: false
  }
  this.onGameStarted = this.onGameStarted.bind(this);
 }


 switchColors(classAction, speed) {
   return new Promise( (resolve) => {
     for (let i = 0; i <= 3; i++) {
         setTimeout( () => {
          if(classAction === 'add') {
            document.querySelectorAll('.panel div[data-pos]')[i].classList.add('bright');
          } else {
            document.querySelectorAll('.panel div[data-pos]')[i].classList.remove('bright');
          }
          if(i === 3) resolve();
        }, speed * i)
   }
 });
 }

error() {
  this.setState({error: true, yourTurn: false});
  this.switchColors('add', 600)
      .then( () => { return this.switchColors('remove', 600) }).then( () => {
  if(this.state.strict) {
    this.gameAborted();
    this.aiTurn();
  } else {
    this.setState({error: false, currentStep: 0});
    this.aiTurn(true);
  }
});
}

onGameStarted() {
  if(this.state.count)  {
    this.setState({error: true, restarting: true});
    this.switchColors('add', 400)
        .then( () => { return this.switchColors('remove', 400) }).then( () => {
      this.gameAborted();
      this.aiTurn();
  });
  } else {
      this.aiTurn();
    }
}


success() {
  const currentStep = 0;
  const yourTurn = !this.state.yourTurn;
  var steps = this.state.steps;
  var speed = this.state.speed;
  steps.push(Math.floor(Math.random() * 4));
  if(steps.length > 3 && steps.length <= 7) speed = 1200;
  if(steps.length > 7 && steps.length <= 12) speed = 1000;
  if(steps.length > 12 && steps.length <= 15) speed = 750;
  if(steps.length > 15 && steps.length <= 20) speed = 620;
  this.setState({steps, currentStep, yourTurn, speed});
  this.aiTurn();
}

click(e) {
  const steps = this.state.steps;
  var currentStep = this.state.currentStep;
  if(!this.state.yourTurn) return;
  const pos = +e.target.dataset.pos;
 if(steps[currentStep] !== pos) {
   this.error();
   return;
 }

  let play = new Audio(sounds[pos]);
  play.addEventListener('play', () => {
   document.querySelectorAll('.panel div[data-pos]')[pos].classList.add('bright');
});
play.addEventListener('ended', () => {
 document.querySelectorAll('.panel div[data-pos]')[pos].classList.remove('bright');
});
play.play();
currentStep = currentStep + 1;
if (currentStep === steps.length) {
  this.success();
  return;
}
this.setState({currentStep});
}


gameAborted() {
  this.setState({
    restarting: false,
    error: false,
    count: 0,
    steps: [Math.floor(Math.random() * 4)],
    currentStep: 0,
    yourTurn: false
  });
}

aiTurn(afterError) {
 var steps = this.state.steps;
 const count = afterError ? this.state.count : this.state.count + 1;
 const speed = this.state.speed;
 const promise = new Promise( (resolve) => {
  var timerArr = [];
   for (let i = 0; i < steps.length; i++) {
      let timeout = setTimeout( () => {
        if(!this.state.game || this.state.restarting) {
          timerArr.map((item) => clearTimeout(item));
          return;
        }
        let play = new Audio(sounds[steps[i]]);
        play.addEventListener('play', () => {
         document.querySelectorAll('.panel div[data-pos]')[steps[i]].classList.add('bright');
     });
        play.addEventListener('ended', () => {
         document.querySelectorAll('.panel div[data-pos]')[steps[i]].classList.remove('bright');
         if(i === steps.length - 1) resolve();
     });
        play.play();
      }, speed * (i+1));
    timerArr.push(timeout);
    }
 })

promise.then( () => {
 const yourTurn = !this.state.yourTurn;
  this.setState({yourTurn, count});
}).catch((error) => console.log("Error: " +error));
}

render() {
  const colors = sounds.map( (item,i) => {
    return <div key={i} className='colors' data-pos={i} onClick={(e) => this.click(e)}></div>
  })
  return(
    <div className='panel'>
      {colors}
      {this.state.error ? <Result error={this.state.error} strict={this.state.strict} restarting={this.state.restarting}/> :
        <Control
        onModeChange={() => this.setState({strict: !this.state.strict})}
        onGameStarted={this.onGameStarted}
        game={this.state.game}
        onGameChange={() => {
        this.setState({game: !this.state.game})
        this.gameAborted();
         }
        }
        strict={this.state.strict}
        count={this.state.count}
        /> }
    </div>
  )
}

}
