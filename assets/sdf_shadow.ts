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
			cc.v2(-1.0, -1.0),
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
	// 合并
merge(d1: number, d2: number) {
	return Math.min(d1, d2);
}
  // 距离场函数
  scene_dist(render_v2: cc.Vec2) {
		let dist = 0;


	let light_polygon_j_v2 = cc.v2();
	let end_index_i = 0;
	let d = 0.0;
	  let s = 0.0;
	  let all_polygon_pos_size = 12;
	  let light_polygon_v4s = [
		cc.v2(100.0, 100.0),
		cc.v2(200.0, 100.0),
		cc.v2(200.0, 150.0),
		cc.v2(-1.0, -1.0),
	]
	// 录入多边形坐标数量列表
	for (let k_i = 0; k_i < all_polygon_pos_size; ++k_i) {
		// j = N - 1;
		if (k_i == end_index_i) {
			d = cc.Vec2.dot(render_v2.clone().subtract(light_polygon_v4s[k_i]), render_v2.clone().subtract(light_polygon_v4s[k_i]));
			s = 1.0;
			for (let k2_i = 0; k2_i < all_polygon_pos_size; ++k2_i) {
				if (k2_i <= k_i) {
					continue;
				}
				if (light_polygon_v4s[k2_i].x == -1.0) {
				dist = this.merge(dist, s * Math.sqrt(d));
				if (end_index_i == 0) {
					end_index_i = k2_i;
					light_polygon_j_v2 = light_polygon_v4s[k2_i - 1].clone();
				} else {
					end_index_i = k2_i;
					light_polygon_j_v2 = light_polygon_v4s[k2_i - 1].clone();
					// 结尾用两个-1
					if (light_polygon_v4s[k2_i].y == -1.0) {
					break;
					}
					continue;
				}
				}
			}
		}
		
		let e = light_polygon_j_v2.clone().subtract(light_polygon_v4s[k_i]);
		let w = render_v2.clone().subtract(light_polygon_v4s[k_i]);
		let b = w.clone().subtract(e) * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
		d = min(d, dot(b, b));
		bvec3 c = bvec3(render_v2.y >= light_polygon_v4s[k_i].y, render_v2.y < light_polygon_j_v2.y, e.x * w.y > e.y * w.x);
		if(all(c) || all(not(c))) {
			s *= -1.0;
		}
		light_polygon_j_v2 = light_polygon_v4s[k_i].xy;
	}
	
	

	return dist;
	// return merge(dist, dist2);
	}
}
