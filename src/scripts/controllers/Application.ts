
import * as PIXI from 'pixi.js'
// import Strip from '../modules/Strip';
import ISData from '../data/ISData';
import Wrapper from '../modules/Wrapper';
import Config from '../data/Config';

import {gsap, Power4, TweenMax} from 'gsap'

export default class Application {

  private app:PIXI.Application
  private container:PIXI.Container

  private workWrapper:Wrapper
  private lifeWrapper:Wrapper

  private lifeAnimationSequence:TweenMax
  private workAnimationSequence:TweenMax

  constructor() {
    PIXI.utils.skipHello();

    //Create a Pixi Application
    this.app = new PIXI.Application({
      width: window.innerWidth, 
      height: window.innerHeight,
      transparent: false,
      backgroundColor: 0xffffff
    });
    document.body.appendChild(this.app.view);

    // create the container that will wrap every visible object
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    this.workWrapper = new Wrapper({
      text: 'WORK  ',
      direction: -1,
      y: window.innerHeight - (window.innerHeight / 2)
    })

    this.lifeWrapper = new Wrapper({
      text: 'LIFE      ',
      direction: 1,
      y: (window.innerHeight * -1) + (window.innerHeight / 2)
    })
    
    this.container.addChild(this.workWrapper.view)
    this.container.addChild(this.lifeWrapper.view)

    this.setupAnimation()
  }

  private setupAnimation():void {
    this.lifeAnimationSequence = gsap.to(this.lifeWrapper.view, {
      duration: 1,
      y: 0,
      ease: Power4.easeInOut,
      paused: true
    })

    this.workAnimationSequence = gsap.to(this.workWrapper.view, {
      duration: 1,
      y: 0,
      ease: Power4.easeInOut,
      paused: true
    })
  }

  /**************************************************/
  /**                 PUBLIC API                   **/
  /**************************************************/
  
  init = (data:ISData):void => {
    this.render(data)
  }

  changeState = (data:boolean):void => {
    if (data) {
      this.lifeAnimationSequence.play()
      this.workAnimationSequence.play()
    } else {
      this.lifeAnimationSequence.reverse()
      this.workAnimationSequence.reverse()
    }
  }

  render = (data:ISData):void => {
    this.workWrapper.update()
    this.lifeWrapper.update()
    this.app.render()
  }

  

  /**************************************************/
  /**               EVENT LISTENERS                **/
  /**************************************************/

  onResize = (data:ISData) => {
    this.app.view.width = data.width
    this.app.view.height = data.height
  }

  onMouseMove = (data:object) => {
  
  }
}