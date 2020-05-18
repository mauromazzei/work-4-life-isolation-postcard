
import * as PIXI from 'pixi.js'
import ISData from '../data/ISData';
import Wrapper from '../modules/Wrapper';
import {gsap, Power4, TweenMax, TimelineMax} from 'gsap'
import Store from '../data/Store';
import Background from '../modules/Background'
import PixiPlugin from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)



export default class Application {

  private app:PIXI.Application
  private container:PIXI.Sprite

  private workWrapper:Wrapper
  private lifeWrapper:Wrapper

  private timeline:TimelineMax
  private background:Background

  constructor() {
    PIXI.utils.skipHello();

    //Create a Pixi Application
    this.app = new PIXI.Application({
      width: window.innerWidth * 2, 
      height: window.innerHeight * 2,
      transparent: false,
      backgroundColor: 0xffffff
    });
    document.body.appendChild(this.app.view);
    Store.app = this.app

    // create the container that will wrap every visible object
    this.container = new PIXI.Sprite()
    // this.container.pivot.set(this.container.width / 2, this.container.height / 2)
    // this.container.pivot.x = window.innerWidth / 2
    // this.container.pivot.y = window.innerHeight / 2
    // this.container.anchor.set(0.5, 0.5)
    this.app.stage.addChild(this.container)

    this.app.stage.pivot.x = window.innerWidth
    this.app.stage.pivot.y = window.innerHeight

    this.app.stage.x = window.innerWidth / 2
    this.app.stage.y = window.innerHeight / 2

    // Store.gui.add(this.app.stage, 'rotation', -1, 1)

    this.background = new Background(0xffffff)
    this.container.addChild(this.background.view)

    this.workWrapper = new Wrapper({
      text: 'WORK  ',
      direction: -1,
      y: (window.innerHeight - (window.innerHeight / 2)) * 2
    })

    this.lifeWrapper = new Wrapper({
      text: 'LIFE  ',
      direction: 1,
      // y: (window.innerHeight * -1) + (window.innerHeight / 2)
      y: 0
    })

    this.container.addChild(this.workWrapper.view)
    this.container.addChild(this.lifeWrapper.view)

    this.setupAnimation()
  }

  private setupAnimation():void {
    this.timeline = new TimelineMax()
    this.timeline.pause()
    
    this.timeline.to(this.lifeWrapper.view, {
      duration: 1,
      y: this.lifeWrapper.stripHeight,
      ease: Power4.easeInOut,
    })

    this.timeline.to(this.workWrapper.view, {
      duration: 1,
      y: 0,
      ease: Power4.easeInOut,
    }, '-=1')

    this.timeline.to(this.background.view, {
      duration: 1,
      pixi: { tint: '#000000' },
      ease: Power4.easeInOut,
    }, '-=1')

    // this.timeline.to(this.app.stage, {
    //   duration: 1,
    //   pixi: {
    //     rotation: -30
    //   },
    //   ease: Power4.easeInOut,
    // }, '-=1')
  }

  /**************************************************/
  /**                 PUBLIC API                   **/
  /**************************************************/
  
  init = (data:ISData):void => {
    this.render(data)
  }

  changeState = (data:boolean):void => {
    if (data) {
      this.timeline.play()

      this.lifeWrapper.setMargin(this.lifeWrapper.stripHeight * 2)
      this.workWrapper.setMargin(this.lifeWrapper.stripHeight * 2)

      // this.workWrapper.setColor(0xff0000)
      this.workWrapper.animateColor('#ffffff', 'WORK 4 LIFE  ')
      this.lifeWrapper.animateColor('#ffffff', 'LIFE WORK 4  ')
    } else {
      this.timeline.reverse()

      this.lifeWrapper.setMargin(this.lifeWrapper.stripHeight)
      this.workWrapper.setMargin(this.lifeWrapper.stripHeight)

      this.workWrapper.animateColor('#000000', 'WORK  ')
      this.lifeWrapper.animateColor('#000000', 'LIFE  ')
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
    this.app.view.width = data.width * 2
    this.app.view.height = data.height * 2
  }

  onMouseMove = (data:object) => {
  
  }
}