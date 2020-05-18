import * as PIXI from 'pixi.js'
import Text from './Text';
import ISData from '../data/ISData';
import Strip from '../modules/Strip';
import TextStyle from './TextStyle';
import Config from '../data/Config';
import {gsap, Power4} from 'gsap';

interface Params {
  text:string
  direction:number
  y:number
}

export default class Wrapper {
  public view:PIXI.Container
  public stripHeight:number
  private props:Params
  private strips:Array<Strip> = []
  private rows:number

  constructor(props?:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.view.y = this.props.y
    this.rows = Math.floor(window.innerHeight / TextStyle.measureOfText(this.props.text).height)
    this.stripHeight = TextStyle.measureOfText(this.props.text).height

    let strip:Strip

    for (let i = 0; i < this.rows; i++) {
      strip = new Strip({
        text: this.props.text,
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

  setColor = (color:number):void => {
    for (let i = 0; i < this.strips.length; i++) {
      this.strips[i].setColor(color)
    }
  }

  animateColor = (color:string, text:string):void => { 
    for (let i = 0; i < this.strips.length; i++) {
      this.strips[i].animateColor(color, text)
    }
  }

  update = ():void => {
    for (let i = 0; i < this.strips.length; i++) {
      this.strips[i].update()
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