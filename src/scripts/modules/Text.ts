import * as PIXI from 'pixi.js'
import TextStyle from './TextStyle';

export default class Text {
  private text:PIXI.Text

  constructor(str: string, color:number) {
    this.text = new PIXI.Text(str, TextStyle.style);
    this.text.style.fill = color

    // avoid a pixi bug
    this.text.x = -1000
  }

  get view():PIXI.Text { return this.text }
}