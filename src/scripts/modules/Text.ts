import * as PIXI from 'pixi.js'
import TextStyle from './TextStyle';
import {gsap, Power4} from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class Text {
  public text:PIXI.Text

  constructor(str: string, color:number) {
    this.text = new PIXI.Text(str, TextStyle.style);
    this.text.style.fill = color

    // avoid a pixi bug
    this.text.x = -1000
  }

  animateColor = (color:string, text:string):void => {
    gsap.to(this.text.style, {
      duration: 0.5,
      pixi: { fill: color },
      ease: Power4.easeIn,
    }).then(() => {
      this.text.text = text

      gsap.to(this.text.style, {
        duration: 0.5,
        pixi: { fill: color },
        ease: Power4.easeOut,
      })
    })
  }

  set color(value:number) {
    this.text.style.fill = value
  }

  get texture():PIXI.Texture {
    return this.text.texture
  }
}