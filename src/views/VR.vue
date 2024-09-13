<script setup>
import * as three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import {
  ref,
  onMounted,
  watch,
  onUnmounted,
  onBeforeUnmount,
  onBeforeMount,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/button.vue";

const route = useRoute();
const router = useRouter();

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

const geometry = new three.SphereGeometry(16, 50, 50);
const loader = new RGBELoader();
const sphereMesh = ref(null);

const hdrIndex = ref(route.query.index);
watch(
  () => hdrIndex.value,
  (newIndex) => {
    loadHDR(newIndex);
  }
);
const loadHDR = (index) => {
  hdrIndex.value = index;
  const url = `/hdr/test${index}.hdr?timestamp=${new Date().getTime()}`;
  // const url = `/hdr/test${index}.hdr?}`;
  loaderFn(url);
};

const loaderFn = (url) => {
  loader.load(url, (texture) => {
    const material = new three.MeshBasicMaterial({ map: texture });
    if (sphereMesh.value) {
      scene.remove(sphereMesh.value);
    }
    const sphere = new three.Mesh(geometry, material);
    sphere.geometry.scale(16, 16, -16);
    sphereMesh.value = sphere;
    scene.add(sphere);
  });
};

//风格切换
const handleStyleChange = (data) => {
  router.push(data.newPath).then(() => {
    window.location.reload();
  });
};

const handleStyleChangeBack = (data) => {
  router.push(data.newPath).then(() => {
    window.location.reload();
  });
};

const handleKeyDown = (event) => {
  const moveStep = 5;
  const rotateStep = 0.05;
  const direction = new three.Vector3();
  camera.getWorldDirection(direction);

  switch (event.key) {
    case "w":
      camera.position.addScaledVector(direction, moveStep);
      break;
    case "s":
      camera.position.addScaledVector(direction, -moveStep);
      break;
    case "a":
      camera.position.x -= moveStep;
      break;
    case "d":
      camera.position.x += moveStep;
      break;
    case "ArrowUp":
      camera.rotation.x += rotateStep;
      break;
    case "ArrowDown":
      camera.rotation.x -= rotateStep;
      break;
    case "ArrowLeft":
      camera.rotation.y += rotateStep;
      break;
    case "ArrowRight":
      camera.rotation.y -= rotateStep;
      break;
  }
  // Ensure the camera does not move beyond the sphere
  const maxDistance = 200;
  if (camera.position.length() > maxDistance) {
    camera.position.setLength(maxDistance);
  }
};

onBeforeMount(() => {
  const hasRefreshed = localStorage.getItem("hasRefreshed");
  if (!hasRefreshed) {
    window.location.reload();
    localStorage.setItem("hasRefreshed", true);
  }
});

onMounted(() => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  render();

  loadHDR(route.query.index);

  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  localStorage.removeItem("hasRefreshed");
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="box"></div>
  <Button
    :camera="camera"
    :index="hdrIndex"
    @select-music="$emit('select-music', $event)"
    @styleChange="handleStyleChange"
    @styleChangeBack="handleStyleChangeBack"
  />
</template>

<style scoped lang="scss">
@import "@/styles/VR.scss";
</style>
