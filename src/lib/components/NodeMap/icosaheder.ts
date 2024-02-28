import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import alata from '$lib/fonts/Alata_Regular.json';

export type Triangle = {
	sideA: THREE.Vector3;
	sideB: THREE.Vector3;
	sideC: THREE.Vector3;
};

export type Icosaheder = {
	triangles: THREE.Mesh[];
	hitBox: THREE.Mesh[];
	hovering: boolean;
	textMesh: THREE.Mesh;
	onClick: () => void;
};

const goldenRatio = (1 + Math.sqrt(5)) / 2;

const vertices = [
	[-1, goldenRatio, 0],
	[1, goldenRatio, 0],
	[-1, -goldenRatio, 0],
	[1, -goldenRatio, 0],
	[0, -1, goldenRatio],
	[0, 1, goldenRatio],
	[0, -1, -goldenRatio],
	[0, 1, -goldenRatio],
	[goldenRatio, 0, -1],
	[goldenRatio, 0, 1],
	[-goldenRatio, 0, -1],
	[-goldenRatio, 0, 1]
];

const faces = [
	[0, 11, 5],
	[0, 5, 1],
	[0, 1, 7],
	[0, 7, 10],
	[0, 10, 11],
	[1, 5, 9],
	[5, 11, 4],
	[11, 10, 2],
	[10, 7, 6],
	[7, 1, 8],
	[3, 9, 4],
	[3, 4, 2],
	[3, 2, 6],
	[3, 6, 8],
	[3, 8, 9],
	[4, 9, 5],
	[2, 4, 11],
	[6, 2, 10],
	[8, 6, 7],
	[9, 8, 1]
];

const triangles: Triangle[] = faces.map((face) => {
	const vectors = face.map(
		(index) => new THREE.Vector3(vertices[index][0], vertices[index][1], vertices[index][2])
	);
	return { sideA: vectors[0], sideB: vectors[1], sideC: vectors[2] };
});

const defaultMaterial = new THREE.MeshPhongMaterial({
	color: 0x156289,
	emissive: 0x072534,
	side: THREE.DoubleSide,
	flatShading: true
});

const defaultTextMaterial = new THREE.MeshPhongMaterial({
	color: 0xffb5ee,
	emissive: 0x072534,
	side: THREE.DoubleSide,
	flatShading: true
});

const transparentMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff, // Set the color
	opacity: 0, // Set the opacity level (0.0 to 1.0)
	transparent: true // Enable transparency
});

export const generateIcosaheder = ({
	position = new THREE.Vector3(0, 0, 0),
	size = 1,
	material = defaultMaterial,
	text = '',
	textMaterial = defaultTextMaterial,
	onClick = () => {}
}: {
	position?: THREE.Vector3;
	size?: number;
	material?: THREE.MeshPhongMaterial;
	text?: string;
	textMaterial?: THREE.MeshPhongMaterial;
	onClick?: () => void;
}): Icosaheder => {
	const trueTriangles = triangles
		.map((triangle) => {
			return {
				sideA: triangle.sideA.normalize().multiplyScalar(size),
				sideB: triangle.sideB.normalize().multiplyScalar(size),
				sideC: triangle.sideC.normalize().multiplyScalar(size)
			};
		})
		.map((triangle) => {
			return {
				sideA: triangle.sideA.add(position),
				sideB: triangle.sideB.add(position),
				sideC: triangle.sideC.add(position)
			};
		});

	const icosahedronCenter = new THREE.Vector3();
	trueTriangles.forEach((triangle) => {
		icosahedronCenter.add(triangle.sideA).add(triangle.sideB).add(triangle.sideC);
	});
	icosahedronCenter.divideScalar(trueTriangles.length * 3);

	const triangleMeshes: THREE.Mesh[] = [];
	const hitBoxMeshes: THREE.Mesh[] = [];
	trueTriangles.forEach((triangle) => {
		const geometry = new THREE.BufferGeometry();
		const verticesArray: number[] = [];
		let side: keyof Triangle;
		for (side in triangle) {
			verticesArray.push(triangle[side].x, triangle[side].y, triangle[side].z);
		}
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(verticesArray, 3));
		const triangleMesh = new THREE.Mesh(geometry, material);
		const hitBoxMesh = new THREE.Mesh(geometry.clone(), transparentMaterial);
		triangleMeshes.push(triangleMesh);
		hitBoxMeshes.push(hitBoxMesh);
	});

	const geometry = new TextGeometry(text, {
		font: new FontLoader().parse(alata),
		size: 0.2,
		height: 0.1
	});

	const textMesh = new THREE.Mesh(geometry, textMaterial);
	geometry.computeBoundingBox();
	const textWidth = geometry.boundingBox?.max?.x ?? 0 - (geometry.boundingBox?.min?.x ?? 0);
	textMesh.position.x = -textWidth / 2;

	return {
		triangles: triangleMeshes,
		hitBox: hitBoxMeshes,
		hovering: false,
		textMesh,
		onClick
	};
};
