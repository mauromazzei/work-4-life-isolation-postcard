import * as PIXI from 'pixi.js'
import ISData from '../data/ISData';
import Strip from './Strip';
import TextStyle from './TextStyle';
import Config from '../data/Config';
import {gsap, Power4} from 'gsap';
import AbstractCarousel from './carousel/AbstractCarousel';
import LeftCarousel from './carousel/LeftCarousel';
import RightCarousel from './carousel/RightCarousel';

interface Params {
  text:string
  maskText:string
  direction:number
  y:number
}

export default class CarouselWrapper {
  public view:PIXI.Container
  public stripHeight:number
  private props:Params
  private strips:Array<AbstractCarousel> = []
  private rows:number

  constructor(props?:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.view.y = this.props.y
    this.rows = Math.floor(window.innerHeight / TextStyle.measureOfText(this.props.text).height)
    // this.rows = 3
    this.stripHeight = TextStyle.measureOfText(this.props.text).height

    let strip:AbstractCarousel

    for (let i = 0; i < this.rows; i++) {
      strip = new RightCarousel({
        text: this.props.text,
        maskText: this.props.maskText,
        speed: this.randomIntFromInterval(Config.SPEED_MIN, Config.SPEED_MAX) * this.props.direction,
        y: (TextStyle.measureOfText(this.props.text).height + Config.MARGIN) * i
      })

      this.strips.push(strip)
      this.view.addChild(strip.view)
    }
  }

  setMargin = (margin:number):void => {
    for (let i = 0; i < this.strips.length; i++) {
      gsap.to(this.strips[i].view, {
        duration: 1,
        y: margin * i,
        ease: Power4.easeInOut,
      })
    }
  }

  update = ():void => {
    for (let i = 0; i < this.strips.length; i++) {
      this.strips[i].update()
    }
  }

  animate = ():void => {
    for (let i = 0; i < this.strips.length; i++) {
      this.strips[i].animate()
    }
  }

  resize = (data:ISData):void => {
    for (let i = 0; i < this.strips.length; i++) {
      this.strips[i].resize(data)
    }
  }

  randomIntFromInterval = (min:number, max:number):number => {
    return Math.random() * (max - min + 1) + min;
  }
}