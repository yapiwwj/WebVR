<template>
  <div id="app">
    <router-view @select-music="handleMusicChange"></router-view>
    <div class="music-container">
      <ul>
        <li class="music-box" @click="togglePlay">
          <audio
            class="audio"
            ref="audio"
            controls
            preload="auto"
            :src="currentMusic"
            :autoplay="autoplay"
            loop
          ></audio>
          <svg
            t="1725255861975"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1427"
            width="25"
            height="20"
          >
            <path
              d="M830.450526 853.759999q-11.722105 8.791579-27.351579 8.791579-19.536842 0-33.701053-14.164211t-14.164211-33.701053q0-21.490526 16.606316-36.143158 0.976842-0.976842 1.953684-1.465263t1.953684-1.465263l0.976842-0.976842q27.351579-18.56 50.795789-43.957895t41.027368-55.191579 27.351579-63.494737 9.768421-69.84421q0-73.263158-37.12-133.827368t-92.8-99.637895q-20.513684-14.652632-20.513684-39.073684 0-19.536842 14.164211-33.701053t33.701053-14.164211q16.606316 0 29.305263 10.745263 36.143158 25.397895 67.402105 59.098947t53.726316 73.263158 35.166316 84.496842 12.698947 92.8q0 48.842105-12.698947 93.776842t-35.654737 84.985263-54.214737 73.751579-68.378947 59.098947zM775.747368 415.157894q20.513684 28.328421 32.72421 57.145263t12.210526 69.84421q0 39.073684-12.698947 70.332632t-32.235789 56.656842q-7.814737 10.745263-16.606316 19.048421t-22.467368 8.303158q-17.583158 0-29.793684-12.698947t-12.210526-30.282105q0-7.814737 2.930526-15.629474l-0.976842 0q4.884211-10.745263 11.722105-20.513684t13.187368-20.025263 10.745263-23.444211 4.395789-31.747368q0-17.583158-4.395789-30.770526t-10.745263-23.932632-13.187368-20.513684-10.745263-20.513684q-2.930526-6.837895-2.930526-15.629474 0-17.583158 12.210526-30.282105t29.793684-12.698947q13.675789 0 22.467368 8.303158t16.606316 19.048421zM460.227368 995.402104q-49.818947-44.934737-105.498947-93.776842t-103.545263-89.869474q-55.68-46.888421-111.36-92.8-10.745263 0.976842-21.490526 0.976842-8.791579 0.976842-18.56 0.976842l-16.606316 0q-26.374737 0-42.981053-16.117895t-16.606316-38.585263l0-246.16421 0.976842 0-0.976842-0.976842q0-27.351579 17.094737-44.934737t42.492632-17.583158l55.68 0q89.869474-76.193684 163.132631-136.757895 31.258947-26.374737 61.541053-51.28421t54.703158-45.423158 41.027368-34.189474 20.513684-16.606316q29.305263-21.490526 47.376842-19.536842t28.328421 17.583158 14.164211 38.096842 3.907368 41.027368l0 788.311578 0 2.930526q0 18.56-6.837895 39.562105t-21.002105 33.212632-35.654737 10.256842-49.818947-28.328421z"
              p-id="1428"
              fill="#a4a7ff"
            ></path>
          </svg>
        </li>
        <li class="input-box" v-show="true">
          <el-slider
            v-model="volumeValue"
            ref="volumeControl"
            vertical
            height="200px"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const audio = ref(null);
const autoplay = ref(true);
const currentMusic = ref("/music/Evan Call - Old Man Voll.ogg");
const isPlaying = ref(false);
const currentTime = ref(0);

// 播放或暂停音乐的函数
const togglePlay = () => {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play().catch((error) => {
        console.log("Autoplay was prevented by the browser:", error);
      });
    }
    isPlaying.value = !isPlaying.value;
    localStorage.setItem("isPlaying", JSON.stringify(isPlaying.value));
  }
};

// 当音乐文件改变时，保持播放状态
const handleMusicChange = (newMusic) => {
  if (audio.value) {
    currentMusic.value = newMusic;
    audio.value.load();
    audio.value.currentTime = Number(localStorage.getItem("currentTime")) || 0;
    audio.value.play().catch((error) => {
      console.log("Autoplay was prevented by the browser:", error);
    });
    isPlaying.value = JSON.parse(localStorage.getItem("isPlaying")) || false;
    localStorage.setItem("isPlaying", JSON.stringify(isPlaying.value));
  }
};

// 控制音量
const volumeValue = ref(Number(localStorage.getItem("volumeValue")) || 50);
const volumeControl = ref();

// 监听音量值变化并存储到 localStorage
watch(volumeValue, (newValue) => {
  if (audio.value) {
    audio.value.volume = newValue / 100;
  }
  localStorage.setItem("volumeValue", newValue);
});

// 监听播放进度变化并存储到 localStorage
watch(
  () => audio.value?.currentTime,
  (newTime) => {
    if (audio.value) {
      localStorage.setItem("currentTime", audio.value.currentTime);
    }
  }
);

onMounted(() => {
  if (audio.value) {
    audio.value.currentTime = Number(localStorage.getItem("currentTime")) || 0;
    audio.value.volume = volumeValue.value / 100;
    if (autoplay.value) {
      audio.value.play().catch((error) => {
        console.log("Autoplay was prevented by the browser:", error);
      });
      isPlaying.value = JSON.parse(localStorage.getItem("isPlaying")) || false;
      if (isPlaying.value) {
        audio.value.play();
      }
    }
  }
});
</script>

<style scoped lang="scss">
@import "./styles/app.scss";
</style>
