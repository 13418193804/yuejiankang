<template>
  <div class="content-wrapper">
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <div class="top-title" v-show="isShowContent">
       <div class="top-title-content">
         <img src="../../../common/image/icon_check.png" width="80px" height="80px"></img>
         <p style="font-size:2rem;color:#ffffff">报名成功</p>
       </div>
    </div>
    <div class="content-first" v-show="isShowContent">
        <p style="font-size: 1.2rem">可在“肺癌早筛-我的预约”中进⾏预约,取消操作！</p>
    </div>
     <div class="bottom-btn-place-wrapper" v-show="isShowContent">
    </div>
    <div class="bottom-btn-white-wrapper" style="background-color:rgb(71, 160, 209)" v-show="isShowContent">
      <x-button text="立即预约" class="custom-primary-button" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoading from "@/components/widget/loading/loading";

import { XButton } from "vux";
export default {
  components: {
    XButton,
    vueLoading
  },
  data() {
    return {
      selectOrderId: null,
      isShowContent: true
    };
  },
  computed: {
    uploadstatus() {}
  },
  created() {},
  methods: {
    gotoNext() {
      if (this.$route.query.order_id && this.$route.query.user_id) {
        let params = {};
        params.order_id = this.$route.query.order_id;
        params.user_id = this.$route.query.user_id;
        this.$router.push({
          name: "appointmentChooseHospital",
          query: params
        });
      }
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
  background-color: rgb(71, 160, 209);
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
  color: #ffffff;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.custom-primary-button {
  border-radius: 70px !important;
  color: rgb(71, 160, 209) !important;
  background-color: #ffffff !important;
  &:active {
    border-color: #bbbbbb !important;
    background-color: #bbbbbb !important;
  }
}
</style>
