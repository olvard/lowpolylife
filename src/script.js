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
let globalEarth // Global så tick hittar skiten
gltfloader.load('Earth.glb', (earth) => {
  let object = earth.scene
  globalEarth = object
  object.position.set(0, -5, -10)
  object.rotation.set(8, 4, 1)
  scene.add(object)
})

//Sun
let globalSun // Global så tick hittar skiten
gltfloader.load('sun.glb', (sun) => {
  let object = sun.scene
  globalSun = object
  object.position.set(0, -8, -13)
  object.rotation.set(8, 4, 1)
  scene.add(object)
})

//moon
let globalMoon
gltfloader.load('moon4.glb', (moon) => {
  let object = moon.scene
  globalMoon = object
  object.position.set(4, 16, -10)
  object.rotation.set(10, 8, 10)
  scene.add(object)
})

//cloud
let globalCloud
gltfloader.load('cloud.glb', (cloud) => {
  let object = cloud.scene
  globalCloud = object
  object.position.set(4, 16, -13)
  object.rotation.set(0, 0, 0)
  scene.add(object)
})

//cloud 2
let globalCloud2
gltfloader.load('cloud.glb', (cloud2) => {
  let object = cloud2.scene
  globalCloud2 = object
  object.position.set(-15, 12, -13)
  object.rotation.set(3, 6, 3)
  scene.add(object)
})

//sat
let globalSat
gltfloader.load('sat.glb', (sat) => {
  let object = sat.scene
  globalSat = object
  object.position.set(-20, -5, -12)
  object.rotation.set(0, 0, 7)
  scene.add(object)
})

// Lights
const pointLight = new THREE.PointLight(0xffffff, 4)
pointLight.position.x = 80
pointLight.position.y = 100
pointLight.position.z = 80
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x404040, 4) // soft white light
scene.add(ambientLight)

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
  alpha: true,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () => {
  var orbitRadius = 20
  var orbitRadiusmoon = 30
  var orbitRadiusSun = 40

  var orbitsat
  var orbitmoon
  var orbitcloud
  var orbitsun
  orbitsat = Date.now() * 0.0001
  orbitmoon = Date.now() * 0.0001
  orbitcloud = Date.now() * 0.0001
  orbitsun = Date.now() * 0.001

  if (globalEarth && globalSat && globalCloud && globalCloud2 && globalMoon) {
    // Earth
    globalEarth.rotation.z += 0.001

    // Moon
    globalMoon.rotation.z += 0.01
    globalMoon.rotation.x += 0.01
    globalMoon.position.set(1.2 * Math.cos(orbitmoon) * orbitRadiusmoon, 0, 1.2 * Math.sin(orbitmoon) * orbitRadiusmoon)

    // Sat
    globalSat.rotation.x += 0.01
    globalSat.position.set(
      Math.cos(orbitsat * 1.3) * orbitRadius,
      Math.sin(orbitsat * 1.3) * orbitRadius,
      orbitRadius,
      Math.sin(orbitsat * 1.3) * orbitRadius
    )

    // Cloud
    globalCloud.rotation.z *= 0.0012
    globalCloud.position.set(
      0.7 * Math.cos(orbitcloud * 1.1) * orbitRadius,
      0.7 * Math.sin(orbitcloud * 1.1) * orbitRadius,
      0
    )

    // Cloud 2
    globalCloud2.position.set(Math.cos(orbitcloud * 1.15) * orbitRadius, 0, Math.sin(orbitcloud * 1.15) * orbitRadius)

    // Sun rotation & Light rotation
    globalSun.position.set(Math.cos(orbitsun) * orbitRadiusSun, 0, Math.sin(orbitsun) * orbitRadiusSun)

    pointLight.position.set(Math.cos(orbitsun) * orbitRadiusSun, 0, Math.sin(orbitsun) * orbitRadiusSun)
  }

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
