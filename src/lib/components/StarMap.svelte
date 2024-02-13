<!-- src/components/StarMap.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import type { File, Directory } from '$lib/utils/types';
	import { generateMockData } from '$lib/utils/mockData';

	let mockData: Directory;

	// Generate mock data
	mockData = generateMockData();

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let stars: THREE.Mesh[] = [];
	const starSize = 0.1;
	const clusterOffset = 2; // Adjust the offset between clusters

	let mouseX = 0;
	let mouseY = 0;
	let windowHalfX = 0;
	let windowHalfY = 0;
	let mouseDown = false;
	let zoomSpeed = 0.1; // Adjust zoom speed

	onMount(() => {
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 50); // Adjust camera position
		camera.lookAt(0, 0, 0); // Make camera look at the center of the scene

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// Function to generate random offset within a range
		function getRandomOffset(min: number, max: number): number {
			return Math.random() * (max - min) + min;
		}

		// Recursive function to render stars
		function renderStars(directory: Directory, position: THREE.Vector3) {
			let fileOffset = 0; // Offset for positioning files within a cluster
			directory.files.forEach((file) => {
				const geometry = new THREE.SphereGeometry(starSize, 10, 10);
				const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Adjust color as needed
				const starMesh = new THREE.Mesh(geometry, material);
				const offsetX = getRandomOffset(-0.5, 0.5); // Randomize X offset within a range
				const offsetY = getRandomOffset(-0.5, 0.5); // Randomize Y offset within a range
				starMesh.position.copy(
					new THREE.Vector3(position.x + fileOffset + offsetX, position.y + offsetY, position.z)
				);
				scene.add(starMesh);
				stars.push(starMesh);
				fileOffset += clusterOffset; // Update the offset for the next file
			});

			let subdirOffset = 0; // Offset for positioning subdirectories within a cluster
			directory.subdirectories.forEach((subdirectory) => {
				// Adjust position of subdirectories with randomness
				const offsetX = getRandomOffset(-10, 10); // Randomize X offset within a range
				const offsetY = getRandomOffset(-10, 10); // Randomize Y offset within a range
				const subdirectoryPosition = new THREE.Vector3(
					position.x + offsetX,
					position.y + offsetY,
					position.z
				);
				renderStars(subdirectory, subdirectoryPosition);
			});
		}

		// Start rendering stars from the root directory with random offsets
		const initialPosition = new THREE.Vector3(0, 0, 0); // Centered position
		renderStars(mockData, initialPosition);

		const animate = function () {
			requestAnimationFrame(animate);

			stars.forEach((star) => {
				star.rotation.x += 0.01;
				star.rotation.y += 0.01;
			});

			// Smooth zooming (client-side only)
			if (camera.position.z !== 50) {
				const targetZoom = 50;
				camera.position.z += (targetZoom - camera.position.z) * 0.1;
			}

			// Update camera position based on mouse movement and button state (client-side only)
			if (mouseDown) {
				camera.position.x += (mouseX - camera.position.x) * 0.05;
				camera.position.y += (-mouseY - camera.position.y) * 0.05;

				camera.lookAt(scene.position);
				renderer.render(scene, camera);
			}
		};

		animate();

		// Event listener for window resizing (client-side only)
		if (typeof window !== 'undefined') {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}

			window.addEventListener('resize', onWindowResize);

			// Mouse move event listener for camera rotation (client-side only)
			function onDocumentMouseMove(event: MouseEvent) {
				mouseX = (event.clientX - windowHalfX) / 2;
				mouseY = (event.clientY - windowHalfY) / 2;
			}

			document.addEventListener('mousemove', onDocumentMouseMove);

			// Mouse down event listener for initiating camera movement (client-side only)
			function onDocumentMouseDown(event: MouseEvent) {
				if (event.button === 0) {
					// Only react to left mouse button
					mouseDown = true;
				}
			}

			document.addEventListener('mousedown', onDocumentMouseDown);

			// Mouse up event listener for ending camera movement (client-side only)
			function onDocumentMouseUp(event: MouseEvent) {
				if (event.button === 0) {
					// Only react to left mouse button
					mouseDown = false;
				}
			}

			document.addEventListener('mouseup', onDocumentMouseUp);

			// Mouse wheel event listener for zooming (client-side only)
			function onDocumentMouseWheel(event: WheelEvent) {
				// Zoom in
				if (event.deltaY < 0 && camera.position.z > 5) {
					camera.position.z -= zoomSpeed;
				}
				// Zoom out
				else if (event.deltaY > 0 && camera.position.z < 200) {
					camera.position.z += zoomSpeed;
				}
				renderer.render(scene, camera);
			}

			document.addEventListener('wheel', onDocumentMouseWheel);

			// Cleanup function to remove event listeners
			onDestroy(() => {
				window.removeEventListener('resize', onWindowResize);
				document.removeEventListener('mousemove', onDocumentMouseMove);
				document.removeEventListener('mousedown', onDocumentMouseDown);
				document.removeEventListener('mouseup', onDocumentMouseUp);
				document.removeEventListener('wheel', onDocumentMouseWheel);
			});
		}
	});
</script>

<style>
	canvas {
		display: block;
	}
</style>
