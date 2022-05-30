import { createEffect } from 'solid-js';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const init = () => {
  // シーン作成
  const scene = new THREE.Scene()

  // 照明1
  const light = new THREE.PointLight()
  light.position.set(0, 0, 30.0)
  scene.add(light)

  // 照明2
  const ambientLight = new THREE.AmbientLight()
  scene.add(ambientLight)

  // カメラ作成
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 360)

  // レンダラー作成
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.target.set(0, 1, 0)

  const fbxLoader = new FBXLoader()

  fbxLoader.load(
    'KamakuraHotel.fbx',
    (object) => {
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
  )

  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    }

  function tick() {
    // カメラコントローラーを更新
    controls.update();

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}

function App() {
  createEffect(() => {
    init()
  })
  return (
    <div class="App">

    </div>
  );
}

export default App;
