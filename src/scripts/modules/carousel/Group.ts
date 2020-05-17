import * as PIXI from 'pixi.js'
import Text from '../Text';
import ISData from '../../data/ISData';
import TextStyle from '../TextStyle';
import {gsap, Power4} from 'gsap';

interface Params {
  text: string
  columns: number 
  maskText: string
  speed: number
  color: number
  openedWidth: number
  closedWidth: number
}

export default class Group {
  private props:Params
  private textColumns:Array<Text> = []
  private bg = new PIXI.Graphics()


  public view:PIXI.Container


  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()

    let text:Text
    for (let i:number = 0; i < this.props.columns; i++) {
      text = new Text(this.props.text, 0x000000, this.props.maskText)
      text.view.x = TextStyle.measureOfText(this.props.maskText).width * i

      this.textColumns.push(text)

      this.view.addChild(text.view)
    }

    this.bg.beginFill(this.props.color, 0.5)
    this.bg.drawRect(0, 0, this.view.width, this.view.height)
    this.bg.endFill()
    this.view.addChild(this.bg)
  }

  update = ():void => {
    // this.inner1.x += this.props.speed
    // this.inner2.x += this.props.speed

    // this.reorder()

    // if (this.activeContainer.x <= valueToCheck * -1) {
    //   this.activeContainer.x = valueToCheck

    //   if (this.activeContainer == this.inner1) {
    //     this.activeContainer = this.inner2
    //   } else {
    //     this.activeContainer = this.inner1
    //   }
    // }
  }

  animate = ():void => {
    // 1 - testi
    for (let i:number = 0; i < this.textColumns.length; i++) {
      this.textColumns[i].enlarge()

      gsap.to(this.textColumns[i].view, {
        duration: 1,
        x: TextStyle.measureOfText(this.props.text).width * i,
        ease: Power4.easeInOut
      })
    }

    // 2- background
    gsap.to(this.bg, {
      duration: 1,
      width: this.props.openedWidth,
      ease: Power4.easeInOut
    })
  }
}