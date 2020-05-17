import * as PIXI from 'pixi.js'
import Config from '../data/Config'

export default class TextStyle {
  private static measure:PIXI.TextMetrics = null
  private static settings:PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: Config.FONT_FAMILY,
    fontSize: Config.FONT_SIZE,
  })

  static get style():PIXI.TextStyle { return this.settings }

  static measureOfText(text:string):PIXI.TextMetrics { 
    return PIXI.TextMetrics.measureText(text, this.settings)
  }
}