<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import TWEEN from '@tweenjs/tween.js';
	import { generateIcosaheder, type Icosaheder } from './icosaheder';

	export let root: HTMLElement;
	// let scene: THREE.Scene;
	// let renderer: THREE.WebGLRenderer;
	// let camera: THREE.PerspectiveCamera;
	//
	// const icosaheders: Icosaheder[] = [];
	// onMount(() => {
	// 	scene = new THREE.Scene();
	// 	renderer = new THREE.WebGLRenderer({ alpha: true });
	// 	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	//
	// 	renderer.setClearColor(0x000000, 0); // the default
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	// 	(root && root.appendChild(renderer.domElement)) ||
	// 		document.body.appendChild(renderer.domElement);
	// 	camera.position.z = 5;
	// 	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	// 	scene.add(ambientLight);
	// 	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	// 	directionalLight.position.set(0, 1, 1).normalize();
	// 	scene.add(directionalLight);
	//
	// 	icosaheders.push(
	// 		generateIcosaheder({
	// 			position: new THREE.Vector3(0, 0, 0),
	// 			text: 'Category',
	// 			onClick: () => console.log('Hello World')
	// 		})
	// 	);
	//
	// 	icosaheders.forEach((icosaheder) => {
	// 		icosaheder.triangles.forEach((triangle) => scene.add(triangle));
	// 		icosaheder.hitBox.forEach((triangle) => scene.add(triangle));
	// 		scene.add(icosaheder.textMesh);
	// 	});
	// 	renderer.render(scene, camera);
	// 	renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
	// 	renderer.domElement.addEventListener('click', onDocumentClick, false);
	// 	window.addEventListener('resize', onWindowResize, false);
	// 	animate();
	// 	return () => {
	// 		window.removeEventListener('resize', onWindowResize, false);
	// 	};
	// });
	//
	// const animate = () => {
	// 	requestAnimationFrame(animate);
	// 	TWEEN.update();
	// 	icosaheders.forEach((icosaheder) =>
	// 		icosaheder.triangles.forEach((triangle) => {
	// 			triangle.rotation.x += 0.01;
	// 			triangle.rotation.y += 0.01;
	// 		})
	// 	);
	// 	renderer.render(scene, camera);
	// };
	//
	// const onWindowResize = () => {
	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	// };
	//
	// const onDocumentMouseMove = (event: MouseEvent) => {
	// 	const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
	// 	const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	// 	const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
	// 	vector.unproject(camera);
	//
	// 	const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	// 	const multiplier = 2;
	//
	// 	icosaheders.forEach((icosaheder) => {
	// 		const intersects = raycaster.intersectObjects(icosaheder.hitBox);
	// 		if (intersects.length > 0) {
	// 			if (!icosaheder.hovering) {
	// 				icosaheder.triangles.forEach((triangle) => {
	// 					const geometry = triangle.geometry;
	// 					const vertices = geometry.attributes.position.array;
	// 					const vertex1 = new THREE.Vector3(vertices[0], vertices[1], vertices[2]);
	// 					const vertex2 = new THREE.Vector3(vertices[3], vertices[4], vertices[5]);
	// 					const vertex3 = new THREE.Vector3(vertices[6], vertices[7], vertices[8]);
	// 					const sum = new THREE.Vector3()
	// 						.addVectors(vertex1, vertex2)
	// 						.add(vertex3)
	// 						.normalize()
	// 						.multiplyScalar(multiplier);
	//
	// 					for (let i = 0; i < vertices.length; i += 3) {
	// 						vertices[i] += sum.x;
	// 						vertices[i + 1] += sum.y;
	// 						vertices[i + 2] += sum.z;
	// 					}
	//
	// 					geometry.attributes.position.needsUpdate = true;
	// 				});
	//
	// 				icosaheder.hovering = true;
	// 			}
	// 		} else if (icosaheder.hovering) {
	// 			icosaheder.triangles.forEach((triangle) => {
	// 				const geometry = triangle.geometry;
	// 				const vertices = geometry.attributes.position.array;
	// 				const vertex1 = new THREE.Vector3(vertices[0], vertices[1], vertices[2]);
	// 				const vertex2 = new THREE.Vector3(vertices[3], vertices[4], vertices[5]);
	// 				const vertex3 = new THREE.Vector3(vertices[6], vertices[7], vertices[8]);
	// 				const sum = new THREE.Vector3()
	// 					.addVectors(vertex1, vertex2)
	// 					.add(vertex3)
	// 					.normalize()
	// 					.multiplyScalar(multiplier);
	//
	// 				for (let i = 0; i < vertices.length; i += 3) {
	// 					vertices[i] -= sum.x;
	// 					vertices[i + 1] -= sum.y;
	// 					vertices[i + 2] -= sum.z;
	// 				}
	//
	// 				geometry.attributes.position.needsUpdate = true;
	// 			});
	//
	// 			icosaheder.hovering = false;
	// 		}
	// 	});
	// };
	// const onDocumentClick = () => {
	// 	icosaheders
	// 		.filter((icosageder) => icosageder.hovering)
	// 		.forEach((icosageder) => icosageder.onClick());
	// };
	//
	// onDestroy(() => {
	// 	// renderer && renderer.dispose();
	// });
</script>
