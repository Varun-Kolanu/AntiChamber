import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ballF from "./Ball/ball.ts";
import mazeMaker from "./mazeMaker.ts";
// import * as dat from "dat.gui";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


export const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(50);
axesHelper.position.set(-20,0,0);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);



const ex=ballF(camera);
const ball=ex.ball;
const velocity=ex.velocity;
scene.add(ball);


const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(ball.position.x-20*velocity.x,ball.position.y-20*velocity.y,0);

orbit.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 2000);
scene.add(ambientLight);


const boxGeometry = new THREE.BoxGeometry(1, 1, 1); //width,height,depth
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xa0ff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); //combine geometry and material
scene.add(boxMesh);


mazeMaker(scene);
ball.position.set(20,240,0);
// const gui = new dat.GUI();
function animate() {
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// console.log(scene.children)