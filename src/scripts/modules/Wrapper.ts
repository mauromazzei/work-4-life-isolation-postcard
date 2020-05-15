import * as PIXI from 'pixi.js'
import Text from './Text';
import ISData from '../data/ISData';
import Strip from '../modules/Strip';
import TextStyle from './TextStyle';
import Config from '../data/Config';

interface Params {
  text:string
  direction:number
  y:number
}

export default class Wrapper {
  public view:PIXI.Container
  private props:Params
  private strips:Array<Strip> = []

  constructor(props?:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.view.y = this.props.y

    let rows = Math.floor(window.innerHeight / TextStyle.measureOfText('work').height)
    
    let strip:Strip

    for (let i = 0; i < rows; i++) {
      strip = new Strip({
        text: this.props.text,
        speed: this.randomIntFromInterval(Config.SPEED_MIN, Config.SPEED_MAX) * this.props.direction,
        y: (TextStyle.measureOfText('work').height + Config.MARGIN) * i
      })

      this.strips.push(strip)
      this.view.addChild(strip.view)
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