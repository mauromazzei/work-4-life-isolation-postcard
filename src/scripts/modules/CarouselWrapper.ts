import * as PIXI from 'pixi.js'
import Text from './Text';
import ISData from '../data/ISData';
import TextStyle from './TextStyle';
import {gsap, Power4} from 'gsap';

interface Params {
  text: string
  maskText: string
  speed: number
  y:number
}

export default class CarouselWrapper {
  // private text:Text
  public view:PIXI.Container
  private props:Params

  private textColumn:Array<Text> = []

  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()
    
    let columns:number = window.innerWidth / TextStyle.measureOfText(props.maskText).width
    let text:Text
    for (let i:number = 0; i < columns; i++) {
      text = new Text(props.text, 0x000000, 'WORK ')
      text.view.x = TextStyle.measureOfText(this.props.maskText).width * i

      this.textColumn.push(text)

      this.view.addChild(text.view)
    }
  }

  update = ():void => {
    // this.tilingSprite.tilePosition.x += this.props.speed;
  }

  animate = ():void => {
    let newX
    for (let i:number = 0; i < this.textColumn.length; i++) {
      this.textColumn[i].enlarge()

      gsap.to(this.textColumn[i].view, {
        duration: 1,
        x: TextStyle.measureOfText(this.props.text).width * i,
        ease: Power4.easeInOut
      })
    }
  }
}