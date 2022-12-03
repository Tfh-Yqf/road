<template>
  <div class="background" ref="card" >
    <a-card class="card" >
      <div style="">
        <div style="text-align: center; padding-top: 16px">
          <img :src="logo" width="100" style="cursor: pointer; margin-top: 16px" />
        </div>
        <div class="title" style="margin-top: 16px">
          <span style="cursor: pointer; font-size: 24px" >RoadTrack</span>
        </div>
        <div style="text-align: center; font-size: 16px; color: #1890ff; margin-top: 8px; margin-bottom: 24px">
          <span>道路裂纹自动检测系统</span>
        </div>
      </div>
      <router-view />
    </a-card>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  data() {
    return {
      logo: require("@/assets/logo.png")
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.card {
  width: 580px;
  border-radius: 8px;
  padding-bottom: 64px;
  margin: auto;
}

.background {
  min-height: 100%;
  padding: 10vh 0;
  background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c84ba6b8-76a1-4911-86f7-95839ee7bd57/eb70a786-4162-441b-b497-49a6ce8caa0d.jpg") ;
  background-size: 100% 100%;
}

.title {
  text-align: center;
  font-size: 32px;
  color: #1890ff;
  margin-top: 8px;
  font-weight: bold;
}
</style>
