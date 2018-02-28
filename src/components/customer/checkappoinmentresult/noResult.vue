<template>
  <div class="content-wrapper">
    <div class="top-title">
       <div class="top-title-content">
         <img src="../../../common/image/icon_no_result.png" width="80px" height="80px"></img>
         <p style="font-size: 1.0rem;padding:15px">暂时还未收到您的检测结果检测结果通常在检测完成后2周~3周内得出请耐⼼等候</p>
       </div>
    </div>
    <div class="content-first">
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    uploadstatus() {}
  },
  methods: {
    gotoNext() {
    }
  }
};
</script>
<style lang="less" scoped>
.content-wrapper {
  display: flex;
  position: absolute;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.top-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.top-title-content {
  text-align: center;
}

.content-first {
  color:#ffffff;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

</style>
