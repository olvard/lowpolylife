import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

var gltfloader = new GLTFLoader()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('#00003B')

// Katastrof ordning på koden, men rotationer och orbits fungerar. 

//earth
let globalEarth; // Global så tick hittar skiten
gltfloader.load('Earth.glb', (earth) => {
 let object = earth.scene
 globalEarth = object
 object.position.set(0,-5,-10)
 object.rotation.set(8,4,1)
 scene.add(object)
})

//moon
let globalMoon; 
gltfloader.load('Moon2.glb', (moon) => {
 let object = moon.scene
 globalMoon = object
   object.position.set(4,16,-10)
   object.rotation.set(10,8,10)
 scene.add(object)
})

//cloud
let globalCloud;
gltfloader.load('cloud.glb', (cloud) => {
   let object = cloud.scene
   globalCloud = object
   object.position.set(4,16,-10)
   object.rotation.set(10,8,10)
   scene.add(object)
 })

//cloud 2
let globalCloud2;
gltfloader.load('cloud.glb', (cloud2) => {
   let object = cloud2.scene
   globalCloud2 = object
   object.position.set(-15,12,-10)
   object.rotation.set(0,0,3)
   scene.add(object)
 })

//sat
let globalSat;
gltfloader.load('sat.glb', (sat) => {
   let object = sat.scene
   globalSat = object
   object.position.set(-20,-5,-10)
   object.rotation.set(0,0,7)
   scene.add(object)
 })

// Lights
const pointLight = new THREE.PointLight(0xffffff, 3)
pointLight.position.x = 80
pointLight.position.y = 100
pointLight.position.z = 80
scene.add(pointLight)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 60
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const tick = () => {

  var orbitRadius = 20; 
  var orbitRadiusmoon = 30;

  var orbit;
  orbit = Date.now() * 0.001;

 if(globalEarth && globalSat && globalCloud && globalCloud2 && globalMoon){

  // Earth 
  globalEarth.rotation.z += 0.001; 

  // Moon
  globalMoon.rotation.z += 0.01;
  globalMoon.position.set(1.2*Math.cos(orbit) * orbitRadiusmoon, 0 , 1.2*Math.sin(orbit) * orbitRadiusmoon); 

  // Sat
  globalSat.rotation.x += 0.01; 
  globalSat.position.set(Math.cos(orbit*1.3) * orbitRadius, Math.sin(orbit*1.3) * orbitRadius , orbitRadius, Math.sin(orbit*1.3) * orbitRadius );

  // Cloud
  globalCloud.position.set(0.7*Math.cos(orbit*1.1) * orbitRadius, 0.7*Math.sin(orbit*1.1) * orbitRadius , 0);

  // Cloud 2
  globalCloud2.position.set(0.7*Math.cos(orbit*1.15) * orbitRadius, 0.7*Math.sin(orbit*1.15) * orbitRadius , 0);

}

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)

}

tick()
