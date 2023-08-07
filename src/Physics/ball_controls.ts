import * as CANNON from "cannon-es";
import { Vector2 } from "three";
import * as THREE from "three";
const ELEMENTARY_ANGLE = 0.04;
const velocity = new Vector2(0, -1);

const keymap = new Map();

const updateCameraPos = (obj: CANNON.Body, camera: THREE.PerspectiveCamera) => {
	let scaler = 20 / velocity.length();
	let r2x = obj.position.x - scaler * velocity.x;
	let r2y = obj.position.y - scaler * velocity.y;
	camera.position.set(r2x, r2y, obj.position.z);
};

export default function (
	ballBody: CANNON.Body,
	camera: THREE.PerspectiveCamera
) {
	let jump_can = 1;
	// var delta = 0;
	document.addEventListener("keydown", (e) => {
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
		if (e.key === " " && jump_can == 1) {
			keymap.set("ArrowJump", true);
		}
		if (e.key === "0") {
			ballBody.velocity.setZero();
		}
	});

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
	setInterval(function () {
		updateCameraPos(ballBody, camera);
		if (keymap.get("ArrowRight")) {
			velocity.rotateAround(new Vector2(0, 0), ELEMENTARY_ANGLE);
			camera.rotation.y -= ELEMENTARY_ANGLE;
			ballBody.velocity.setZero();
		}
		if (keymap.get("ArrowLeft")) {
			velocity.rotateAround(new Vector2(0, 0), -ELEMENTARY_ANGLE);
			camera.rotation.y += ELEMENTARY_ANGLE;
			ballBody.velocity.setZero();
		}
		if (ballBody.velocity.length() > 50) return;
		if (keymap.get("ArrowUp")) {
			ballBody.applyForce(
				new CANNON.Vec3(velocity.x * 100, velocity.y * 100, 0)
			);
		}
		if (keymap.get("ArrowDown")) {
			ballBody.applyForce(
				new CANNON.Vec3(-velocity.x * 100, -velocity.y * 100, 0)
			);
		}
	}, 5);
	return ballBody.velocity;
}
