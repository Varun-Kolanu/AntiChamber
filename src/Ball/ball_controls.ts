import * as THREE from "three";
// import ball from "./ball";
const ELEMENTARY_ANGLE = 0.06;
const velocity = new THREE.Vector2(0, -1);

const FRAME_RATE = 50;
const keymap = new Map();

export default function (ballMesh: THREE.Mesh, camera: THREE.Camera) {
	document.addEventListener("keydown", (e) => {
		if(jumpId!=-1)
		{
			keymap.clear()
			return;//no navigation when jumping
		}
		if (e.key === "ArrowRight") {
			keymap.set("ArrowRight", true);
		}
		if (e.key === "ArrowLeft") {
			keymap.set("ArrowLeft", true);
		}
		if (e.key === "ArrowUp") {
			keymap.set("ArrowUp", true);
		}
		if (e.key === "ArrowDown") {
			keymap.set("ArrowDown", true);
		}
		if(e.key===" "){
			jumpAnim();
		}
	});
	let jumpId=-1;
	function terminateAnim(id: number)
	{
		clearInterval(jumpId);
		jumpId=-1
		ballMesh.position.z=0;
	}
	function jumpAnim() {
		terminateAnim(jumpId);
		let k=0;
		jumpId=setInterval(()=>
		{
			ballMesh.position.z=-90*Math.sin(k);
			k+=0.05;
			if(k>=Math.PI)
			{
				terminateAnim(jumpId);
			}
			updateCameraPos()
		},10)
	}
	document.addEventListener("keyup", (e) => {
		if (e.key === "ArrowRight") {
			keymap.set("ArrowRight", false);
		}
		if (e.key === "ArrowLeft") {
			keymap.set("ArrowLeft", false);
		}
		if (e.key === "ArrowUp") {
			keymap.set("ArrowUp", false);
		}
		if (e.key === "ArrowDown") {
			keymap.set("ArrowDown", false);
		}
	});
	function updateCameraPos() {
		camera.position.x = ballMesh.position.x - 20 * velocity.x;
		camera.position.y = ballMesh.position.y - 20 * velocity.y;
		camera.position.z=ballMesh.position.z;
	}
	setInterval(function () {
		if (keymap.get("ArrowRight")) {
			velocity.rotateAround(new THREE.Vector2(0, 0), ELEMENTARY_ANGLE);
			camera.rotation.y -= ELEMENTARY_ANGLE;
		}
		if (keymap.get("ArrowLeft")) {
			velocity.rotateAround(new THREE.Vector2(0, 0), -ELEMENTARY_ANGLE);
			camera.rotation.y += ELEMENTARY_ANGLE;
		}
		if (keymap.get("ArrowUp")) {
			ballMesh.position.add(new THREE.Vector3(velocity.x, velocity.y, 0));
		}
		if (keymap.get("ArrowDown")) {
			ballMesh.position.add(
				new THREE.Vector3(-velocity.x, -velocity.y, 0)
			);
		}
		updateCameraPos();
	}, 1000 / FRAME_RATE);
	return velocity;
}
