import ballStructure from "./ball_structure";
import addControls from "./ball_controls";
import * as THREE from "three";

export default function (camera: THREE.Camera) {
	const ball = ballStructure();
	const velocity=addControls(ball, camera);
	return {ball,velocity};
}
