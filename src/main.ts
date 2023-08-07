import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ballF from "./three_world/Ball/ball.ts";
import bricks from "/brick2.webp"
import worldMaker from "./Physics/Physics.ts";
import * as CANNON from "cannon-es";
import groundF from "./three_world/Plane/Plane.ts";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(50);
axesHelper.position.set(-20, 0, 0);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const ballExports = ballF();
const ball = ballExports.ballMesh;
const velocity = ballExports.velocity;
scene.add(ball);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(
	ball.position.x - 20 * velocity.x,
	ball.position.y - 20 * velocity.y,
	0
);

orbit.update();
orbit.enabled = false;
const ambientLight = new THREE.AmbientLight(0xffffff, 2000);
scene.add(ambientLight);

const groundMesh = groundF();
scene.add(groundMesh);

function cast_CANNON_THREE_Vec3(vec: CANNON.Vec3) {
	return new THREE.Vector3(vec.x, vec.y, vec.z);
}
function cast_CANNON_THREE_Qnion(qnion: CANNON.Quaternion) {
	return new THREE.Quaternion(qnion.x, qnion.y, qnion.z, qnion.w);
}

// const gui = new dat.GUI();
const { world, CANNON_OBJS } = worldMaker(camera);

//to be moved somwhere else
const textureLoader = new THREE.TextureLoader();
CANNON_OBJS.walls.forEach((wall) => {
	const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
	// const boxMaterial = new THREE.MeshBasicMaterial({
	// 	color: 0x00ff00,
	// });
	const boxMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load(bricks)
	})
	const ballMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	ballMesh.position.copy(cast_CANNON_THREE_Vec3(wall.position));
	scene.add(ballMesh);
});

groundMesh.position.copy(cast_CANNON_THREE_Vec3(CANNON_OBJS.ground.position));
groundMesh.quaternion.copy(
	cast_CANNON_THREE_Qnion(CANNON_OBJS.ground.quaternion)
);
// ball.position.set(0,0,-200)

const timeStep = 1 / 60;

// function updateCameraPos() {
// 	// let velocity = CANNON_OBJS.PHY_BALL.velocity;
// 	// camera.position.x = ball.position.x - 20 * velocity.x;
// 	// camera.position.y = ball.position.y - 20 * velocity.y;
// 	// camera.position.z = ball.position.z;

// 	let scaler = 20 / velocity.length();
// 	let r2x = CANNON_OBJS.PHY_BALL.position.x - scaler * velocity.x;
// 	let r2y = CANNON_OBJS.PHY_BALL.position.y - scaler * velocity.y;
// 	camera.position.set(r2x, r2y, ball.position.z);
// }
camera.position.set(20, 260, -5);

function animate() {
	world.step(timeStep);
	ball.position.copy(cast_CANNON_THREE_Vec3(CANNON_OBJS.PHY_BALL.position));
	ball.quaternion.copy(
		cast_CANNON_THREE_Qnion(CANNON_OBJS.PHY_BALL.quaternion)
	);
	// updateCameraPos();
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// console.log(scene.children)
