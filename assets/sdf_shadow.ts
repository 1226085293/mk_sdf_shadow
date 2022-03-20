import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

/**用于传递 effect 参数 */
@ccclass("sdf_shadow")
export class sdf_shadow extends Component {
	start() {
		/**canvas 尺寸 */
		let content_size = cc.view.getCanvasSize();

		let material = this.node.getComponent(cc.Sprite).material;
		// 光坐标
		material.setProperty("light_pos_v2s", [cc.v2(200, 100), cc.v2(500, 300), cc.v2(-1)]);
		// 光半径
		material.setProperty("light_radius_v2s", [cc.v2(300), cc.v2(80)]);
		// 光颜色
		material.setProperty("light_color_v2s", [cc.v4(0, 1, 1, 1), cc.v4(1, 0, 0, 1)]);
		material.setProperty("light_polygon_v2s", [
			cc.v2(100.0, 100.0),
			cc.v2(200.0, 100.0),
			cc.v2(200.0, 150.0),
		]);

		let temp_v2 = cc.v2();
		let light_pos_v2s_handle = material.passes[0].getHandle("light_pos_v2s");
		this.node.on(
			cc.Node.EventType.TOUCH_MOVE,
			(event_: cc.EventTouch) => {
				event_.getUILocation(temp_v2);
				material.passes[0].setUniformArray(light_pos_v2s_handle, [
					temp_v2,
					cc.v2(500, 300),
					cc.v2(-1),
				]);
			},
			this
		);
	}
}
