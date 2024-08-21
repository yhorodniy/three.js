import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const vertices = new Float32Array([
  0, 0, 0,
  0, 2, 0,
  2, 0, 0,
])

const bufferAttribute = new THREE.BufferAttribute(vertices, 3)

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', bufferAttribute)

const cubeMatherial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const mesh = new THREE.Mesh(geometry, cubeMatherial);

scene.add(mesh);



// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMatherial);
// cubeMesh.position.y = -1;
// cubeMesh.scale.setScalar(0.5);
// cubeMesh.rotation.reorder('XYZ') // default reorder
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(15);
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(30);
// cubeMesh.rotation.z = THREE.MathUtils.degToRad(70);


// cubeMesh.rotation.reorder('ZXY') // reorder if change x-y-z orders
// cubeMesh.rotation.z = THREE.MathUtils.degToRad(70);
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(15);
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(30);


// const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMatherial);
// cubeMesh2.position.x = 2;
// const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMatherial);
// cubeMesh3.position.x = -2;

// const group = new THREE.Group()
// group.add(cubeMesh);
// group.add(cubeMesh2);
// group.add(cubeMesh3);

// group.position.y = 2
// group.scale.setScalar(2)

// scene.add(group);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;


const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const clock = new THREE.Clock();
let previousTime = 0;

const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  const vector = new THREE.Vector3(
    Math.sin(currentTime),
    Math.sin(currentTime) + 1,
    Math.sin(currentTime) + 0.5,
  )
  
  previousTime = currentTime;

  // group.rotation.x += THREE.MathUtils.degToRad(1) * delta * 10
  
  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 30
  // cubeMesh2.rotation.y += THREE.MathUtils.degToRad(-1) * delta * 20
  // cubeMesh3.rotation.y += THREE.MathUtils.degToRad(1) * delta * 30
  
  // group.rotation.z += THREE.MathUtils.degToRad(-1) * delta * 40
  // cubeMesh.position.copy(vector)

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();