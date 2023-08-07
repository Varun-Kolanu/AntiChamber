import * as THREE from "three";
import concrete from "/concrete.avif"
export default function () {
	const geometry = new THREE.PlaneGeometry(2200, 2300);
	const textureLoader = new THREE.TextureLoader();
	const planeMaterial = new THREE.MeshBasicMaterial({
	    map: textureLoader.load(concrete),
	    });
	// const planeMaterial = new THREE.MeshBasicMaterial({
	// 	color: 0x000000,
	// 	side: THREE.DoubleSide,
	// });
	const plane = new THREE.Mesh(geometry, planeMaterial);

	return plane;
}
