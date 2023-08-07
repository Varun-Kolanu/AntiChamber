import * as CANNON from "cannon-es";
import mazeMaker from "./mazeMaker";
import ball_controls from "./ball_controls";
import * as THREE from "three";
export default function (camera: THREE.PerspectiveCamera) {
	const world = new CANNON.World({
		gravity: new CANNON.Vec3(0, 0, 9.81),
	});

	world.defaultContactMaterial.friction = 300;
	world.defaultContactMaterial.restitution = 0.2;

	let walls = mazeMaker(world);

	//add ball
	const sphereBody = new CANNON.Body({
		mass: 4,
		shape: new CANNON.Sphere(4),
		position: new CANNON.Vec3(20, 240, -10),
	});
	ball_controls(sphereBody, camera);
	world.addBody(sphereBody);

	//add plane
	const groundBody = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	groundBody.quaternion.setFromEuler(-Math.PI, 0, 0);
	groundBody.position.set(120, 120, 0);

	world.addBody(groundBody);

	let CANNON_OBJS: {
		walls: CANNON.Body[];
		PHY_BALL: CANNON.Body;
		ground: CANNON.Body;
	} = { walls, PHY_BALL: sphereBody, ground: groundBody };

	return { world, CANNON_OBJS };
}
