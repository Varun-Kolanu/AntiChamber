import ballStructure from "./ball_structure";
import * as THREE from "three";

export default function () {
	const ballMesh = ballStructure();
	const velocity=new THREE.Vector2(0, -1);
	//=addControls(ballMesh, camera);
	return {ballMesh,velocity};
}
