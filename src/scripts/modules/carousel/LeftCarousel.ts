import * as PIXI from 'pixi.js'
import TextStyle from '../TextStyle';
import {gsap, Power4} from 'gsap';
import Group from './Group';
import AbstractCarousel from './AbstractCarousel';

interface Params {
  text: string
  maskText: string
  speed: number
  y:number
}

export default class LeftCarousel extends AbstractCarousel {
  constructor(props:Params) {
    super(props)    

    console.log('left')
    
    this.group2.view.x = this.group1.view.width
  }

  private __reorder = ():void => {
    if (this.group1.view.x <= -this.group1.view.width) {
      this.__updateSingleWidth(this.group1, this.group2)
    } else if (this.group2.view.x <= -this.group2.view.width) {
      this.__updateSingleWidth(this.group2, this.group1)
    }
  }

  private __updateSingleWidth = (active:Group, next:Group):void => {
    active.view.x = next.view.x + next.view.width
  }

  public update = ():void => {
    if (!this.isAnimating) {
      this.group1.view.x += this.props.speed
      this.group2.view.x += this.props.speed

      this.__reorder()
    }
  }

  public animate = ():void => {

    console.log('left animate')
    
    // super.animate()
    let groupToMove:PIXI.Container
    let fixedGroup:PIXI.Container

    this.isAnimating = true

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
      ease: Power4.easeInOut,
    }).then(():void => {
      this.isAnimating = false
    })

    this.group1.animate()
    this.group2.animate()
  }
}