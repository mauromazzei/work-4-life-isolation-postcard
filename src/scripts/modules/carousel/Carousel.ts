import * as PIXI from 'pixi.js'
import Text from '../Text';
import ISData from '../../data/ISData';
import TextStyle from '../TextStyle';
import {gsap, Power4} from 'gsap';
import Group from './Group';

interface Params {
  text: string
  maskText: string
  speed: number
  y:number
}

export default class Carousel {
  public view:PIXI.Container
  private group1:Group
  private group2:Group
  private props:Params

  private textColumn:Array<Text> = []
  private activeContainer:Group

  private columns:number
  private openedWidth:number
  private closedWidth:number

  private opened:boolean = false



  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.columns = Math.ceil(window.innerWidth / TextStyle.measureOfText(this.props.maskText).width)
    // this.columns = 2
    this.openedWidth = TextStyle.measureOfText(this.props.text).width * this.columns
    this.closedWidth = TextStyle.measureOfText(this.props.maskText).width * this.columns

    this.group1 = new Group({
      text: this.props.text,
      maskText: this.props.maskText,
      color: 0xFF0000,
      columns: this.columns,
      openedWidth: this.openedWidth,
      closedWidth: this.closedWidth,
      speed: this.props.speed
    })

    this.group2 = new Group({
      text: this.props.text,
      maskText: this.props.maskText,
      color: 0x0000FF,
      columns: this.columns,
      openedWidth: this.openedWidth,
      closedWidth: this.closedWidth,
      speed: this.props.speed
    })
    this.group2.view.x = this.group1.view.width

    
    this.activeContainer = this.group1

    this.view.addChild(this.group1.view)
    this.view.addChild(this.group2.view)
    this.view.y = this.props.y
  }

  update = ():void => {
    this.group1.view.x += this.props.speed
    this.group2.view.x += this.props.speed

    this.reorder()

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

    if (this.group1.view.x <= -valueToCheck) {
      this.checkSingle(this.group1, this.group2)
    } else if (this.group2.view.x <= -valueToCheck) {
      this.checkSingle(this.group2, this.group1)
    }
  }

  checkSingle = (active:Group, next:Group):void => {
    active.view.x = next.view.x + next.view.width
  }

  animate = ():void => {
    let groupToMove
    let fixedGroup
    if (this.group2.view.x >= this.group1.view.x) {
      // sposta il 2
      groupToMove = this.group2.view
      fixedGroup = this.group1.view
    } else {
      // sposta l'1
      groupToMove = this.group1.view
      fixedGroup = this.group2.view
    }

    gsap.to(groupToMove, {
      duration: 1,
      x: fixedGroup.x + this.openedWidth,
      ease: Power4.easeInOut
    })

    this.group1.animate()
    this.group2.animate()
  }
}