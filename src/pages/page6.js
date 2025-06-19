//Full scene 

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { init as initRoom1 } from './page1.js';
import { init as initRoom2 } from './page2.js';
import { init as initRoom3 } from './page3.js';
import { init as initRoom4 } from './page4.js';
import { init as initRoom5 } from './page5.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd3d3d3);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 30, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Ghép các phòng
const room1 = initRoom1();
room1.position.set(0, 0, 0); 
scene.add(room1);

const room2 = initRoom2();
room2.position.set(0, 0.25, 0); 
scene.add(room2);

const room3 = initRoom3();
room3.position.set(0, 36, 0); 
scene.add(room3);

const room4 = initRoom4();
room4.position.set(0, 56, 0); 
scene.add(room4);

const room5 = initRoom5();
room5.position.set(0, 76, 0); 
scene.add(room5);

// Animate
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
