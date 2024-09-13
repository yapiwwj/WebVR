import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useButtonStore = defineStore("button", () => {
  const musicData = ref([
    {
      List: "1",
      name: "Old Man Voll",
      author: "Even Call",
      path: "/music/Evan Call - Old Man Voll.ogg",
    },
    {
      List: "2",
      name: "踩水",
      author: "张渠",
      path: "/music/caishui.ogg",
    },
    {
      List: "3",
      name: "Outer Wilds",
      author: "Andrew Prahlow",
      path: "/music/Andrew Prahlow - 02 (Outer Wilds) (Inst_).ogg",
    },
    {
      List: "4",
      name: "Cozy Leisure Time",
      author: "HOYO-Mix",
      path: "/music/_ HOYO-MiX - Cozy Leisure Time (Wangshu Daytime).flac",
    },
    {
      List: "5",
      name: "酒狂",
      author: "李祥霆",
      path: "/music/jiukuang.ogg",
    },
    {
      List: "6",
      name: "yellow",
      author: "eel",
      path: "/music/eel_ - yellow.ogg",
    },
  ]);

  const guideTipsList = ref([
    { id: 0, title: "返回按钮", desc1: "点击返回至首页轮播图。", desc2: "" },
    {
      id: 1,
      title: "重置按钮",
      desc1: "点击重置Web VR的摄像机视角。",
      desc2: "",
    },
    {
      id: 2,
      title: "音乐菜单按钮",
      desc1: "点击选择并切换音乐。",
      desc2: "",
    },
    {
      id: 3,
      title: "像素校园按钮",
      desc1: "点击将现实校园转化成像素校园。",
      desc2: "",
    },
    {
      id: 4,
      title: "现实校园按钮",
      desc1: "点击将像素校园转化成现实校园。",
      desc2: "",
    },
    {
      id: 5,
      title: "提示按钮",
      desc1: "提示键，点击查看提示。",
      desc2: "键盘WASD移动摄像机位置，键盘↑↓←→旋转摄像机位置。",
    },
  ]);

  return { musicData, guideTipsList };
});
