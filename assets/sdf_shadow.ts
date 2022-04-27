import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

/**用于传递 effect 参数 */
@ccclass("sdf_shadow")
export class sdf_shadow extends Component {
	private _material: cc.renderer.MaterialInstance;
	private _light_circle_v4s_handle_n: number;
	/* -------------------------------segmentation------------------------------- */
	start() {
		this._material = this.node.getComponent(cc.Sprite).material;
		this._light_circle_v4s_handle_n = this._material.passes[0].getHandle("light_circle_v4s");

		// 圆
		this._material.setProperty("light_circle_v4s", [
			cc.v4(200, 100, 20),
			cc.v4(240, 100, 20),
			cc.v4(400, 100, 20),
			cc.v4(500, 100, 20),
			cc.v4(600, 100, 20),
			cc.v4(200, 180, 20),
			cc.v4(300, 180, 20),
			cc.v4(400, 180, 20),
			cc.v4(500, 180, 20),
			cc.v4(600, 180, 20),
			cc.v2(-1),
		]);
		// 矩形
		this._material.setProperty("light_box_v4s", [
			cc.v4(360, 320, 100, 20),
			cc.v4(500, 300, 50, 40),
			cc.v2(-1),
		]);
		// 多边形
		// material.setProperty("light_polygon_v4s", [
		// 	cc.v2(600, 100),
		// 	cc.v2(700, 100),
		// 	cc.v2(700, 200),
		// 	cc.v2(-1),
		// ]);

		// 光坐标 & 半径
		this._material.setProperty("light_pos_radius_v4s", [cc.v4(200, 100, 300), cc.v2(-1)]);
		// 光颜色
		this._material.setProperty("light_color_v4s", [cc.v4(0, 1, 1, 1), cc.v4(0, 0, 1, 1)]);

		// material.setProperty("light_polygon_v4s", [
		// 	cc.v2(100.0, 100.0),
		// 	cc.v2(200.0, 100.0),
		// 	cc.v2(200.0, 150.0),
		// 	cc.v2(-1.0, -1.0),
		// ]);
		//

		let temp_v2 = cc.v2();
		let temp_v4 = cc.v4(0, 0, 300);
		let light_pos_v2s_handle = this._material.passes[0].getHandle("light_pos_radius_v4s");
		this.node.on(
			cc.Node.EventType.TOUCH_MOVE,
			(event_: cc.EventTouch) => {
				event_.getLocation(temp_v2);
				temp_v4.x = temp_v2.x;
				temp_v4.y = temp_v2.y;
				this._material.passes[0].setUniformArray(light_pos_v2s_handle, [
					temp_v4,
					cc.v2(-1),
				]);
			},
			this
		);
	}
	update() {
		let sin_n = Math.sin(cc.game.totalTime * 0.001);
		this._material.setProperty("light_circle_v4s", [
			cc.v4(250 + 50 * sin_n, 100, 20),
			cc.v4(250 - 50 * sin_n, 100, 20),
			cc.v4(450 + 50 * sin_n, 100, 20),
			cc.v4(450 - 50 * sin_n, 100, 20),
			cc.v4(650 + 50 * sin_n, 100, 20),
			cc.v4(650 - 50 * sin_n, 100, 20),
			cc.v4(250 + 50 * sin_n, 180, 20),
			cc.v4(250 - 50 * sin_n, 180, 20),
			cc.v4(450 + 50 * sin_n, 180, 20),
			cc.v4(450 - 50 * sin_n, 180, 20),
			cc.v4(600, 180, 20),
			cc.v2(-1),
		]);
	}
}
