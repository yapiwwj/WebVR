<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const email = ref("");

const submit = async () => {
  const form = {
    username: username.value,
    password: password.value,
    email: email.value,
  };
  const res= await axios
    .post("http://127.0.0.1:3007/api/register", JSON.stringify(form),{
      headers: {
        "Content-Type": "application/json",
      },
    })

  console.log(res.data)
};
</script>
<template>
  <form>
    <h3>注册</h3>
    账户：<input type="text" v-model="username" />
    密码：<input type="password" v-model="password" />
   邮箱：<input type="text" v-model="email" />
  </form>
  <button @click="submit">提交</button>
</template>

<style scoped></style>
