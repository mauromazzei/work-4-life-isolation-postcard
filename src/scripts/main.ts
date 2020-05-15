
import Application from './controllers/Application'

declare var IS:any

const app = new Application()


IS.create({
  onInit: app.init,
  onChangeState: app.changeState,
  onResize: app.onResize,
  onTick: app.render,
  onPointerMove: (data:Object) => app.init
})