<template>
  <div class='notfoundcompoent-grid-wrapper'>
    <div class="grid-item-wrapper" style="background-color:#C6E4ED" @click="onItemClick()">
      <p class="grid-item-title">无权访问该地址,请联系管理员</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onItemClick() {
      // this.$router.push({
      //     name: 'menu'
      // });
    }
  }
}
</script>
<style lang="less" scoped>
.notfoundcompoent-grid-wrapper {
  display: flex;
  position: absolute;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.grid-item-wrapper {
  flex: 1;
  width: 100%;
  color: #9B9B9B;
  font-size: 24px;
  align-items: center;
  display: flex;
}

.grid-item-title {
  text-align: center;
  display: inline-block;
  width: 100%;
}

</style>
