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
  private graphics:PIXI.Graphics
  private text:Text
  private tilingSprite:PIXI.TilingSprite
  public view:PIXI.Container
  private props:Params

  private originalX:number = 0
  private posX:number = 0

  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.text = new Text(props.text, 0x000000)

    this.view.x = 0
    this.view.y = props.y

    this.tilingSprite = new PIXI.TilingSprite(
      this.text.view.texture,
      window.innerWidth,
      TextStyle.measureOfText(this.props.text).height
    );
    this.tilingSprite.interactive = true;
    this.tilingSprite.buttonMode = true;

    this.view.addChild(this.text.view)
    this.view.addChild(this.tilingSprite)
  }


  update = ():void => {
    this.tilingSprite.tilePosition.x += this.props.speed;
  }

  resize = (data:ISData):void => {
    this.tilingSprite.width = data.width
  }
}