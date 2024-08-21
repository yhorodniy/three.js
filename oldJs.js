import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Pane } from 'tweakpane';

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader 
const textureLoader = new THREE.TextureLoader();

// initialize the geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const uv2BoxGeometry = new THREE.BufferAttribute(boxGeometry.attributes.uv.array, 2);
boxGeometry.setAttribute('uv2', uv2BoxGeometry);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const uv2TorusKnotGeometry = new THREE.BufferAttribute(torusKnotGeometry.attributes.uv.array, 2);
torusKnotGeometry.setAttribute('uv2', uv2TorusKnotGeometry);

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const uv2PlaneGeometry = new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2);
planeGeometry.setAttribute('uv2', uv2PlaneGeometry);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const uv2SphereGeometry = new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2);
sphereGeometry.setAttribute('uv2', uv2SphereGeometry);

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const uv2CylinderGeometry = new THREE.BufferAttribute(cylinderGeometry.attributes.uv.array, 2);
cylinderGeometry.setAttribute('uv2', uv2CylinderGeometry);

// load the grass textures
const grassAlbedo = textureLoader.load('static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
const grassAo = textureLoader.load('static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png');
const grassHeight = textureLoader.load('static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png');
const grassMetalic = textureLoader.load('static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png');
const grassNormal = textureLoader.load('static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png');
const grassRoughness = textureLoader.load('static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png');

// load the boulder textures
const boulderAlbedo = textureLoader.load('static/textures/badlands-boulders-bl/badlands-boulders_albedo.png');
const boulderAo = textureLoader.load('static/textures/badlands-boulders-bl/badlands-boulders_ao.png');
const boulderHeight = textureLoader.load('static/textures/badlands-boulders-bl/badlands-boulders_height.png');
const boulderMetalic = textureLoader.load('static/textures/badlands-boulders-bl/badlands-boulders_metallic.png');
const boulderNormal = textureLoader.load('static/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png');
const boulderRoughness = textureLoader.load('static/textures/badlands-boulders-bl/badlands-boulders_roughness.png');

// load the space cruiser textures
const spaceCruiserAlbedo = textureLoader.load('static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png');
const spaceCruiserAo = textureLoader.load('static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png');
const spaceCruiserHeight = textureLoader.load('static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png');
const spaceCruiserMetalic = textureLoader.load('static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png');
const spaceCruiserNormal = textureLoader.load('static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png');
const spaceCruiserRoughness = textureLoader.load('static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png');

// initialize the grass material
const grassMaterial = new THREE.MeshStandardMaterial();
grassMaterial.map = grassAlbedo;
grassMaterial.aoMap = grassAo;
grassMaterial.displacementMap = grassHeight;
grassMaterial.displacementScale = 0.1;
grassMaterial.metalnessMap = grassMetalic;
grassMaterial.normalMap = grassNormal;
grassMaterial.roughnessMap = grassRoughness;

pane.addBinding(grassMaterial, 'metalness', {min: 0, max: 1, step: 0.01});
pane.addBinding(grassMaterial, 'roughness', {min: 0, max: 1, step: 0.01});
pane.addBinding(grassMaterial, 'displacementScale', {min: 0, max: 1, step: 0.01});
pane.addBinding(grassMaterial, 'aoMapIntensity', {min: 0, max: 1, step: 0.01});

// initialize the boulder material
const boulderMaterial = new THREE.MeshStandardMaterial();
boulderMaterial.map = boulderAlbedo;
boulderMaterial.aoMap = boulderAo;
boulderMaterial.displacementMap = boulderHeight;
boulderMaterial.displacementScale = 0.1;
boulderMaterial.metalnessMap = boulderMetalic;
boulderMaterial.normalMap = boulderNormal;
boulderMaterial.roughnessMap = boulderRoughness;

pane.addBinding(boulderMaterial, 'metalness', {min: 0, max: 1, step: 0.01});
pane.addBinding(boulderMaterial, 'roughness', {min: 0, max: 1, step: 0.01});
pane.addBinding(boulderMaterial, 'displacementScale', {min: 0, max: 1, step: 0.01});
pane.addBinding(boulderMaterial, 'aoMapIntensity', {min: 0, max: 1, step: 0.01});

// initialize the space cruiser material
const spaceCruiserMaterial = new THREE.MeshStandardMaterial();
spaceCruiserMaterial.map = spaceCruiserAlbedo;
spaceCruiserMaterial.aoMap = spaceCruiserAo;
spaceCruiserMaterial.displacementMap = spaceCruiserHeight;
spaceCruiserMaterial.displacementScale = 0.1;
spaceCruiserMaterial.metalnessMap = spaceCruiserMetalic;
spaceCruiserMaterial.normalMap = spaceCruiserNormal;
spaceCruiserMaterial.roughnessMap = spaceCruiserRoughness;

pane.addBinding(spaceCruiserMaterial, 'metalness', {min: 0, max: 1, step: 0.01});
pane.addBinding(spaceCruiserMaterial, 'roughness', {min: 0, max: 1, step: 0.01});
pane.addBinding(spaceCruiserMaterial, 'displacementScale', {min: 0, max: 1, step: 0.01});
pane.addBinding(spaceCruiserMaterial, 'aoMapIntensity', {min: 0, max: 1, step: 0.01});

// initialize the mesh
// const cube = new THREE.Mesh(boxGeometry, grassMaterial);

// const knot = new THREE.Mesh(torusKnotGeometry, grassMaterial);
// knot.position.x = 1.5;

// const plane = new THREE.Mesh(planeGeometry, grassMaterial);
// plane.position.x = -1.5;

// const sphere = new THREE.Mesh(sphereGeometry, grassMaterial);
// sphere.position.y = 1.5;

// const cylinder = new THREE.Mesh(cylinderGeometry, grassMaterial);
// cylinder.position.y = -1.5;


const sphere1 = new THREE.Mesh(sphereGeometry, grassMaterial);
const sphere2 = new THREE.Mesh(sphereGeometry, spaceCruiserMaterial);
sphere2.position.x = -1.5;
const sphere3 = new THREE.Mesh(sphereGeometry, boulderMaterial);
sphere3.position.x = 1.5;

// add the mesh to the scene
const group = new THREE.Group();
group.add(sphere1, sphere2, sphere3);
scene.add(group)

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(3, 3, 3);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;
camera.position.y = 5


// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
  // const currentTime = clock.getElapsedTime();
  // const delta = currentTime - previousTime;
  // const vector = new THREE.Vector3(
  //   Math.sin(currentTime),
  //   Math.sin(currentTime) + 1,
  //   Math.sin(currentTime) + 0.5,
  // )

  // group.children.forEach(child => {
  //   if(child instanceof THREE.Mesh) {
  //     child.rotation.y += 0.01
  //   }
  // })
  
  // previousTime = currentTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();