import * as THREE from "three";
// import ballTexture from "/ball.webp";

export default function () {
	// const textureLoader = new THREE.TextureLoader();      
	const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
	// const sphereMaterial = new THREE.MeshStandardMaterial({
	// 	map: textureLoader.load(ballTexture),
	// });
	const sphereMaterial = new THREE.MeshStandardMaterial({color: "blue"});
	const ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
	return ball;
}