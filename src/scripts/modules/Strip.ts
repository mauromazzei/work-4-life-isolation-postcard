import * as PIXI from 'pixi.js'
import Text from './Text';
import ISData from '../data/ISData';
import TextStyle from './TextStyle';
import Config from '../data/Config';

interface Params {
  text: string
  maskText: string
  speed: number
  y:number
}

export default class Strip {
  private text:Text
  private tilingSprite:PIXI.TilingSprite
  public view:PIXI.Container
  private props:Params

  private originalX:number = 0
  private posX:number = 0

  constructor(props:Params) {
    this.props = props
    this.view = new PIXI.Container()
    this.text = new Text(props.text, 0x000000, props.maskText)

    this.view.x = 0
    this.view.y = props.y

    this.tilingSprite = new PIXI.TilingSprite(
      this.text.texture,
      window.innerWidth,
      TextStyle.measureOfText(this.props.text).height
    );
    this.tilingSprite.interactive = false;
    this.tilingSprite.buttonMode = false;

    // this.tilingSprite.uvMatrix

    this.view.addChild(this.text.view)
    this.view.addChild(this.tilingSprite)
  }

  update = ():void => {
    this.tilingSprite.tilePosition.x += this.props.speed;
  }

  setText = (str:string):void => {
    this.text.text.text = str
  }

  animateText = ():void => {
    this.text.enlarge()
    
    // setTimeout(():void => {
    //   this.tilingSprite.texture = this.text.texture
    //   console.log('ok!')
    // }, 2000)
  }

  resize = (data:ISData):void => {
    this.tilingSprite.width = data.width
  }
}