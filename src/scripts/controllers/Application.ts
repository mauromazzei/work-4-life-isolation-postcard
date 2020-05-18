
import * as PIXI from 'pixi.js'
// import Strip from '../modules/Strip';
import ISData from '../data/ISData';
import Wrapper from '../modules/Wrapper';
import {gsap, Power4, TweenMax} from 'gsap'
import Text from '../modules/Text';
import Store from '../data/Store';
import CarouselWrapper from '../modules/CarouselWrapper';

export default class Application {

  private app:PIXI.Application
  private container:PIXI.Container

  private workWrapper:Wrapper
  private lifeWrapper:Wrapper

  private lifeAnimationSequence:TweenMax
  private workAnimationSequence:TweenMax

  private carousel:CarouselWrapper
  private text:Text

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
    Store.app = this.app

    // create the container that will wrap every visible object
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    this.workWrapper = new Wrapper({
      text: 'WORK',
      maskText: 'WORK',
      direction: -1,
      y: window.innerHeight - (window.innerHeight / 2)
    })

    this.lifeWrapper = new Wrapper({
      text: 'LIFE',
      maskText: 'LIFE',
      direction: 1,
      y: (window.innerHeight * -1) + (window.innerHeight / 2)
    })
    


    // this.carousel = new RightCarousel({
    //   text: 'WORK 4 LIFE',
    //   maskText: 'WORK',
    //   speed: 10,
    //   y: 0
    // })

    this.carousel = new CarouselWrapper({
      text: 'WORK 4 LIFE',
      maskText: 'WORK',
      direction: 1,
      y: 0
    })
    this.container.addChild(this.carousel.view)

    // this.container.addChild(this.workWrapper.view)
    // this.container.addChild(this.lifeWrapper.view)

    this.setupAnimation(() => {
      // this.workWrapper.setText('JESUS 4 LIFE ')
      // this.lifeWrapper.setText('LIFE WORK 4 ')

      // this.workWrapper.animateText()
    })


    // this.text = new Text('WORK 4 LIFE', 0x000000, 'WORK')

    // this.container.addChild(this.text.view)
  }

  private setupAnimation(callback?:Function):void {
    this.lifeAnimationSequence = gsap.to(this.lifeWrapper.view, {
      duration: 1,
      y: this.lifeWrapper.stripHeight,
      ease: Power4.easeInOut,
      paused: true,
      onComplete: () => {
        if (typeof(callback) !== 'undefined') {
          callback()
        }
      }
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

      this.lifeWrapper.setMargin(this.lifeWrapper.stripHeight * 2)
      this.workWrapper.setMargin(this.lifeWrapper.stripHeight * 2)

      // this.workWrapper.setText('WORK 4 LIFE  ')
      // this.lifeWrapper.setText('WORK 4 LIFE  ')

      this.carousel.animate()
      // this.text.enlarge()
    } else {
      this.lifeAnimationSequence.reverse()
      this.workAnimationSequence.reverse()

      this.lifeWrapper.setMargin(this.lifeWrapper.stripHeight)
      this.workWrapper.setMargin(this.lifeWrapper.stripHeight)

      // this.workWrapper.setText('WORK  ')
      // this.lifeWrapper.setText('LIFE  ')
    }
  }

  render = (data:ISData):void => {
    this.carousel.update()

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