import * as THREE from "three";
import ballTexture from "/ball.jpg";

export default function () {
	const textureLoader = new THREE.TextureLoader();      
	const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
	const sphereMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load(ballTexture),
	});
	const ballMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

	return ballMesh;
}