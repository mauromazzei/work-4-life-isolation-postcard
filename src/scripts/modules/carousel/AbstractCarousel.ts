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

export default abstract class AbstractCarousel {
  public view:PIXI.Container
  protected group1:Group
  protected group2:Group
  protected props:Params

  protected columns:number
  protected openedWidth:number
  protected closedWidth:number
  protected isAnimating:boolean = false


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

    this.view.addChild(this.group1.view)
    this.view.addChild(this.group2.view)
    this.view.y = this.props.y
  }

  public update = ():void => {}

  // protected __reorder = ():void => {}

  // protected __updateSingleWidth = (active:Group, next:Group):void => {}

  public animate = ():void => {}

  public resize = (data:ISData):void => {
    console.log('AbstractCarousel.resize()')
  }
}