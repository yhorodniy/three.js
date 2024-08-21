import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Pane } from 'tweakpane';

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add texture loader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('static/textures/solarSystem/cubeMap/')

// adding texture
const sunTexture = textureLoader.load('static/textures/solarSystem/2k_sun.jpg');
const mercuryTexture = textureLoader.load('static/textures/solarSystem/2k_mercury.jpg');
const venusTexture = textureLoader.load('static/textures/solarSystem/2k_venus_surface.jpg');
const earthTexture = textureLoader.load('static/textures/solarSystem/2k_earth_daymap.jpg');
const moonTexture = textureLoader.load('static/textures/solarSystem/2k_moon.jpg');
const marsTexture = textureLoader.load('static/textures/solarSystem/2k_mars.jpg');

const backgroundCubemap = cubeTextureLoader.load( [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
] );
scene.background = backgroundCubemap;

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture});
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture});
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);


const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 17,
    speed: 0.007,
    material: venusMaterial,
    moons: []
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 25,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
        color: '',
      }
    ]
  },
  {
    name: 'Mars',
    radius: 0.7,
    distance: 35,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
        color: '',
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      }
    ]
  },
];

const createPlanet = (planet) => {
  // create the mesh and add it to the scene
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
};

const createMoon = (moon) => {
  // create the mesh and add it to the scene
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

const planetMeshes = planets.map(planet => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh)
  // loop through each moon and create the moon
  planet.moons.forEach(moon => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });
  return {planetMesh, planet};
});

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
scene.add(ambientLight);3

const pointLight = new THREE.PointLight(0xffff00, 10);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;


// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  planetMeshes.forEach(({planetMesh, planet}) => {
    planetMesh.rotation.y += planet.speed;
    planetMesh.position.x = Math.sin(planetMesh.rotation.y) * planet.distance;
    planetMesh.position.z = Math.cos(planetMesh.rotation.y) * planet.distance;
    planetMesh.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planet.moons[moonIndex].speed;
      moon.position.x = Math.sin(moon.rotation.y) * planet.moons[moonIndex].distance;
      moon.position.z = Math.cos(moon.rotation.y) * planet.moons[moonIndex].distance;
    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();