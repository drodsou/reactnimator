class Reactnimator {

    constructor ({states,autoCall}) {
      this.states = states
      this.autoCall = autoCall || true   // by default recursive call tick
  
      // init
      this.currentState = null
      this.lastTime = null
      this.progress = 1
      //this.paused = false //TODO
    }
  

    start (state, progress=0) {
      this.currentState = state
      this.progress = progress
      this.lastTime = null
      //this.pause = false
  
      this.tick()
    }
  
  
    /* each frame */
    tick () {
      // check if finished animation
      if (!this.currentState || this.progress === 1) { 
        return true  // animation finished
      }
  
      // check if valid state
      if (!this.states[this.currentState]) {
        /*TODO*/ console.log(`ERROR: Animation: currentState is not a valid animation state ${this.currentState} `)
        return true
      }
      let stateObj = this.states[this.currentState]
  
      // update timePassed and lastTime
      let now = Date.now()
      let timePassed = now - (this.lastTime ? this.lastTime : now)
      this.lastTime = now
  
      // compute new progress 0 to 1
      let newProgress = this.progress + (timePassed/stateObj.duration)
      this.progress =  newProgress>1 ? 1 : newProgress
  
      // calculate animation from progres 0-1, AND RENDER
      stateObj.animate(this.progress)
  
      // self continue animation?
      if (this.autoCall) {
        window.requestAnimationFrame( ()=>this.tick() )
      }
    }
  
  }

  