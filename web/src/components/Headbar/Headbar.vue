<template>
  <div>
    <div style="float: left;">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="$emit('toggleCollapsed')" />
    </div>
    <div style="float: right;">

      <a-dropdown :trigger="['click']">
        <span class="trigger">
          {{username}}
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item @click="$router.push('/user/set_password')">
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="logout">
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: 'Headbar',
    props: ['collapsed', 'username'],
    inject: ['reloadPage'],
    data() {
      return {
      };
    },
    methods: {
      initData() {
      },
      logout() {
        Cookies.remove('access');
        Cookies.remove('refresh');
        this.$router.push('/user/login');
      }
    },
    mounted() {
      this.initData();
    },
  }
</script>

<style scoped>
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
</style>