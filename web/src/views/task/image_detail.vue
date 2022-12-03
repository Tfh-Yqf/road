<template>
  <div>
    <a-modal :visible="visible" title="检测详情" width="750px"  @cancel="onCloseModel" :footer="null">
      <div style="margin-top: 20px;display: flex;flex-direction: column;">
        <div style="display: flex;flex-direction: row;font-size: 17px;">
          <div style="width: 45%;text-align: center">
            <a>拍摄图片</a>
          </div>

          <div style="width: 45%;text-align: center">
            <a>算法图片</a>
          </div>

          <div style="width: 10%;text-align: center">
            <a>结果</a>
          </div>
        </div>

        <div style="display: flex;flex-direction: row" v-for="(item,index) in data.image" :key="index">
          <div style="width: 45%;padding: 10px;">
            <img :src="item" style="width: 100%;height: 150px;" />
          </div>

          <div style="width: 45%;padding: 10px;">
            <img :src="data.result_image[index]" style="width: 100%;height: 150px;" />
          </div>

          <div style="width: 10%;padding: 10px;height: 150px;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <a v-if="data.result[index]" style="color: red;font-weight: 1000;">裂纹</a>
            <a v-else>正常</a>
          </div>
        </div>
      </div>

    </a-modal>

  </div>
</template>

<script>

export default {
  props: ['visible', 'data'],
  model: { prop: 'visible', event: 'cancel' },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    init(){

    },
    onCloseModel() {
      this.$emit('cancel', false);
    },
  },
  watch: {
    visible(status) {
      if (status) {
        this.init();
      }
    },
  },
}
</script>

<style>

#container {
  width: 100%;
  height: 420px;
}

#panel {
  position: absolute;
  background-color: white;
  height: 420px;
  overflow-y: auto;
  top: 300px;
  right: 10px;
  width: 300px;
}
</style>