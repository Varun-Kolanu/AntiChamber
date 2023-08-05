import * as THREE from "three";
const SCALE = 20;
const mazestr = `1 0 0 0 0 1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 9 0 10 0 11 2 11 3 11 4 11 5 11 6 11 7 11 8 11 9 11 10 11 11 11 11 10 11 9 11 8 11 7 11 6 11 5 11 4 11 3 11 2 11 0 10 0 9 0 8 0 7 0 6 0 5 0 4 0 3 0 2 0 2 10 2 9 2 8 2 7 2 6 2 5 2 4 4 4 4 5 4 6 4 7 5 6 6 6 7 6 8 6 8 5 8 4 6 4 6 3 7 3 8 3 9 3 3 9 4 9 5 9 6 9 7 9 7 8 8 8 9 8 9 10 2 3 2 2 3 2 4 2 4 3 6 2 9 2 `;

const mazeCoords = mazestr.split(" ");

export default function mazeMaker(scene: THREE.Scene) {
	for (let i = 0; i < mazeCoords.length; i += 2) {
		let x = parseInt(mazeCoords[i]) * SCALE;
		let y = parseInt(mazeCoords[i + 1]) * SCALE;
		const geometry = new THREE.BoxGeometry(20, 20, 20);
		const material = new THREE.MeshBasicMaterial({ color: 0x00dfe0 });
		const cube = new THREE.Mesh(geometry, material);

		scene.add(cube);
		cube.position.set(x, y, 0);
	}
}
