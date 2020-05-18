import * as PIXI from 'pixi.js'
import Text from './Text';
import ISData from '../data/ISData';
import TextStyle from './TextStyle';

interface Params {
  text: string
  speed: number
  y:number
}

export default class Strip {
  private text:Text
  private tilingSprite:PIXI.TilingSprite
  private props:Params

  public view:PIXI.Container

  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()
    // this.text = new Text(props.text, 0x000000)
    this.text = new Text(props.text, 0xffffff)

    this.view.x = 0
    this.view.y = props.y

    this.tilingSprite = new PIXI.TilingSprite(
      this.text.texture,
      window.innerWidth * 2,
      TextStyle.measureOfText(this.props.text).height
    );
    this.tilingSprite.interactive = false;
    this.tilingSprite.buttonMode = false;

    this.view.addChild(this.text.text)
    this.view.addChild(this.tilingSprite)
  }

  setText = (str:string):void => {
    this.text.text.text = str
  }

  animateColor = (color:string, text:string):void => { this.text.animateColor(color, text) }

  update = ():void => {
    this.tilingSprite.tilePosition.x += this.props.speed;
  }

  resize = (data:ISData):void => {
    this.tilingSprite.width = data.width
  }
}