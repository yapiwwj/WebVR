<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useButtonStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const props = defineProps(["camera", "index"]);
const emit = defineEmits(["select-music", "styleChange"]);

const router = useRouter();

const buttonStore = useButtonStore();
const { musicData, guideTipsList } = storeToRefs(buttonStore);

const iconList = ref([
  { id: 1, iconClass: "iconfont icon-angle-left", content: "返回" },
  { id: 2, iconClass: "iconfont icon-redo", content: "重置" },
  { id: 3, iconClass: "iconfont icon-music", content: "音乐菜单" },
  { id: 4, iconClass: "iconfont icon-xiangsufeng_fangzi", content: "像素校园" },
  { id: 5, iconClass: "iconfont icon-faxianshi", content: "现实校园" },
  { id: 6, iconClass: "iconfont icon-xinxi", content: "提示" },
]);

const myCamera = props.camera;
const resetCamera = (id) => {
  switch (id) {
    case 1:
      router.push("/home");
      break;
    case 2:
      myCamera.position.set(0, 0, 1);
      myCamera.rotation.set(0, 0, 0);
      break;
    case 3:
      DialogVisible.value = true;
      break;

    case 4:
      emit("styleChange", {
        newPath: `/VR?index=${props.index[0]}S`,
        someData: "extra info",
      });
      break;

    case 5:
      emit("styleChangeBack", {
        newPath: `/VR?index=${props.index[0]}`,
        someData: "extra info",
      });
      break;
    case 6:
      alert(
        "Tips: \n" +
          "1. 鼠标左键拖动鼠标，控制摄像机视角。\n" +
          "2. 键盘WASD移动摄像机位置，键盘↑↓←→旋转摄像机位置。\n" +
          "3. 鼠标滚轮缩放摄像机视角。\n" +
          "4. Previous按钮，点击返回至首页轮播图。\n" +
          "5. Reset按钮，点击重置Web VR的摄像机视角。\n" +
          "6. Music按钮，点击选择并切换音乐。\n" +
          "7. Tips按钮，点击查看提示。\n"
      );
      break;
  }
};

const selectMusic = (musicSrc) => {
  // 发出 select-music 事件，传递给(APP.vue)
  emit("select-music", musicSrc);
};

const DialogVisible = ref(false);
const handleEdit = (index, row) => {
  const { path } = row;
  selectMusic(path);
  DialogVisible.value = false;
};

//引导
const open = ref(props.index.split("").length === 1 ? true : false);

onMounted(() => {
  console.log(props.index);
});
</script>

<template>
  <div class="container">
    <ul>
      <li v-for="i in iconList" :key="i.id" :ref="`button${i.id}`">
        <div @click="resetCamera(i.id)">
          <i :class="i.iconClass"></i>
          <span>{{ i.content }}</span>
        </div>
      </li>
    </ul>
  </div>

  <el-tour v-model="open">
    <el-tour-step
      v-for="item in guideTipsList"
      :key="item.id"
      placement="top"
      :title="item.title"
    >
      <div>{{ item.desc1 }}</div>
    </el-tour-step>
  </el-tour>

  <el-dialog v-model="DialogVisible" title="音乐菜单" width="800" center>
    <el-scrollbar style="height: 250px">
      <el-table :data="musicData">
        <el-table-column property="List" label="序列" width="150" />
        <el-table-column property="name" label="乐名" width="200" />
        <el-table-column property="author" label="歌手" />
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" @click="DialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
@import "@/styles/components/button.scss";
</style>
