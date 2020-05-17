import * as PIXI from 'pixi.js'
import TextStyle from './TextStyle';
import { gsap, Power4 } from 'gsap';
import Config from '../data/Config';
import Store from '../data/Store';

export default class Text {
  
  private mask:PIXI.Graphics

  public text:PIXI.Text
  public view:PIXI.Sprite

  private _texture:PIXI.Texture

  constructor(str: string, color:number, maskText: string) {
    this.text = new PIXI.Text(str, TextStyle.style);
    this.text.style.fill = color
    
    // this.text.x = -1000
  
    // set mask
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0xff0000, 0.5)
    this.mask.drawRect(0, 0, TextStyle.measureOfText(maskText).width, TextStyle.measureOfText(maskText).height)
    this.mask.endFill()

    this.text.mask = this.mask
    
    // MAZ - TEST
    this.render()
    //////////////////

    // this.view = new PIXI.Sprite(this._texture)
    this.view = new PIXI.Sprite(this.text.texture)
    // this.view = new PIXI.Sprite()
    this.view.addChild(this.text)
    this.view.addChild(this.mask)

    

    // avoid a pixi bug
    this.view.x = -1000

    this.view.mask = this.mask
  }

  enlarge = ():void => {
    console.log('enlarge')

    gsap.to(this.mask, {
      duration: 1,
      width: TextStyle.measureOfText('WORK 4 LIFE').width,
      x: 0,
      ease: Power4.easeInOut,
      onUpdate: ():void => {
        // this.render()
        // this.view.texture = this._texture
      }
    })
  }

  render = ():void => {
    this._texture = Store.app.renderer.generateTexture(this.text, PIXI.SCALE_MODES.LINEAR, 1)
  }

  get texture():PIXI.Texture {
    return this.view.texture
    // return this._texture
  }

  // get view():PIXI.Text { return this.text }
}