import * as PIXI from 'pixi.js'
import Text from '../Text';
import ISData from '../../data/ISData';
import TextStyle from '../TextStyle';
import {gsap, Power4} from 'gsap';

interface Params {
  text: string
  maskText: string
  speed: number
  y:number
}

export default class Carousel {
  public view:PIXI.Container
  public inner1:PIXI.Container
  public inner2:PIXI.Container
  private props:Params

  private textColumn:Array<Text> = []
  private activeContainer:PIXI.Container

  private bg = new PIXI.Graphics()
  private bg2 = new PIXI.Graphics()

  private columns:number
  private openedWidth:number
  private closedWidth:number

  private opened:boolean = false



  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.inner1 = new PIXI.Container()
    this.inner2 = new PIXI.Container()
    
    this.columns = Math.ceil((window.innerWidth * 0.1) / TextStyle.measureOfText(props.maskText).width)

    let text:Text
    for (let i:number = 0; i < this.columns; i++) {
      text = new Text(this.props.text, 0x000000, this.props.maskText)
      text.view.x = TextStyle.measureOfText(this.props.maskText).width * i

      this.textColumn.push(text)

      this.inner1.addChild(text.view)
    }

    this.bg.beginFill(0xff0000, 0.5)
    this.bg.drawRect(0, 0, this.inner1.width, this.inner1.height)
    this.bg.endFill()
    this.inner1.addChild(this.bg)

    for (let i:number = 0; i < this.columns; i++) {
      text = new Text(props.text, 0x000000, this.props.maskText)
      text.view.x = TextStyle.measureOfText(this.props.maskText).width * i

      this.textColumn.push(text)

      this.inner2.addChild(text.view)
    }

    this.bg2.beginFill(0x0000ff, 0.5)
    this.bg2.drawRect(0, 0, this.inner2.width, this.inner2.height)
    this.bg2.endFill()
    this.inner2.addChild(this.bg2)

    console.log(`columns: ${this.columns}`)

    this.inner2.x = this.inner1.width
    this.activeContainer = this.inner1

    this.view.addChild(this.inner1)
    this.view.addChild(this.inner2)
    this.view.y = this.props.y
    


    this.openedWidth = TextStyle.measureOfText(this.props.text).width * this.columns
    this.closedWidth = TextStyle.measureOfText(this.props.maskText).width * this.columns

    // this.inner1.x -= 700
    // this.inner2.x -= 700
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

  reorder = ():void => {
    const valueToCheck = (this.opened) ? this.openedWidth : this.closedWidth

    if (this.inner1.x <= valueToCheck * -1) {
      this.checkSingle(this.inner1, this.inner2)
    } else if (this.inner2.x <= valueToCheck * -1) {
      this.checkSingle(this.inner2, this.inner1)
    }
  }

  checkSingle = (active:PIXI.Container, next:PIXI.Container):void => {
    active.x = next.x + next.width
  }

  animate = ():void => {
    // 1 - testi
    for (let i:number = 0; i < this.textColumn.length; i++) {
      this.textColumn[i].enlarge()

      gsap.to(this.textColumn[i].view, {
        duration: 1,
        x: TextStyle.measureOfText(this.props.text).width * i,
        ease: Power4.easeInOut
      })
    }

    // 2- background
    gsap.to(this.bg, {
      duration: 1,
      width: this.openedWidth,
      ease: Power4.easeInOut
    })

    gsap.to(this.bg2, {
      duration: 1,
      width: this.openedWidth,
      ease: Power4.easeInOut
    })

    // 3- posizione gruppi
    if (this.inner2.x >= this.inner1.x) {
      // sposta il 2
    } else {
      // sposta l'1
    }

    // this.inner2.x = this.inner1.x + this.inner1.width
  }
}