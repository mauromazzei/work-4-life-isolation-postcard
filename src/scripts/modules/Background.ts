import * as PIXI from 'pixi.js'
import ISData from '../data/ISData';
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/all';

gsap.registerPlugin(PixiPlugin)

export default class Background {
  public view:PIXI.Sprite

  constructor(color:number) {
    this.view = new PIXI.Sprite(PIXI.Texture.WHITE)
    this.view.width = window.innerWidth * 2
    this.view.height = window.innerHeight * 2
    this.view.tint = color
  }

  resize = (data:ISData):void => {
    this.view.width = data.width * 2
    this.view.height = data.height * 2
  }
}