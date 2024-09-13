<template xmlns="">
  <div
    class="container"
    ref="container"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <div class="contain-box">
      <iframe src="/static/cube.html" frameborder="0" scrolling="no"></iframe>
      <div class="main">
        <ul class="images" :style="{ '--quantity': 6 }">
          <li
            v-for="(i, index) in 6"
            :key="i"
            :style="{ '--position': `${i}` }"
          >
            <img
              :src="`/images/scence${i}.png`"
              alt=""
              @click="toVR(index)"
              @mouseover="changeImage(`/images/scence${i}.png`, index)"
              @mouseleave="resetImage()"
            />
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <header>
        <h1>{{ infoList[currentImageIndex].title }}</h1>
      </header>
      <div class="desc">
        <h3>{{ infoList[currentImageIndex].desc }}</h3>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const container = ref(null);
const bg = ref("/images/home.png");

const currentImageIndex = ref(0);
const changeImage = (url, index) => {
  currentImageIndex.value = index + 1;
  bg.value = url;
};

const resetImage = () => {
  bg.value = "/images/home.png";
  currentImageIndex.value = 0;
};

const toVR = (index) => {
  currentImageIndex.value = index + 1;
  router.push(`/VR?index=${currentImageIndex.value}`);
};

const infoList = ref([
  { id: 0, title: "", desc: "" },
  { id: 1, title: "演播楼", desc: "独一无二的浙传地标" },
  { id: 2, title: "图书馆", desc: "徜徉知识海洋的渡轮" },
  { id: 3, title: "第一教学楼", desc: "知识启迪的场所" },
  { id: 4, title: "现代教育楼", desc: "高尖技术孕育的温床" },
  { id: 5, title: "足球场", desc: "活力与激情迸发的绿茵" },
  { id: 6, title: "食堂", desc: "营养与美味的补给站" },
]);

onBeforeMount(() => {
  const hasRefreshed = localStorage.getItem("hasRefreshed");
  if (!hasRefreshed) {
    window.location.reload();
    localStorage.setItem("hasRefreshed", true);
  }
});

onBeforeUnmount(() => {
  localStorage.removeItem("hasRefreshed");
});
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
</style>
