
class Test extends React.Component { 


  state = {
    position : 0,   // 0 left, 1 right
    wide : 100,

    animLeft : 0  // animation
  }

  onClick=()=>{   // important for 'this' to work: arrow function or bind to this it in constructor
    //console.log('you clicked!')
    let newPosition = this.state.position === 0 ? 1 : 0
    this.setState( {position: newPosition } )  

    // animation
    if (newPosition ===1) this.animation.start('moving-right')
    else this.animation.start('moving-left')

  }
  
  render=()=>{ 
    return (
      <div style={ {position:'relative', backgroundColor: '#aaa', width: this.state.wide+50+'px', margin:'50px' } }>
        <div 
          style={ { 
            border: '1px solid red', position:'relative', cursor:'pointer', height:'20px', width: '50px', textAlign: 'center',

            //left : (this.state.position * this.state.wide) + 'px',  //no animation
            left : this.state.animLeft + 'px'  // animation

          } }
          onClick={ this.onClick }
        >
          CLICK
        </div>
      </div>
    )
  }

  // ----------------------------------------- ANIMATION
  animation = new Reactnimator ({
    states : {
      "moving-right" : { duration:300, animate : (progress)=>{
        // optional, ease the progress (see https://github.com/gdsmith/jquery.easing/blob/master/jquery.easing.js)
        let easedProgress = 1+2.70158*Math.pow(progress-1,3)+1.70158*Math.pow(progress-1,2)   
        this.setState( {animLeft : easedProgress * this.state.wide} )
      }},
      "moving-left" : { duration:300, animate : (progress)=>{
        // no easing here just linear progress
        this.setState( {animLeft : (1-progress) * this.state.wide} )
      }}
    }
  })
  // -------------------------------------------


}