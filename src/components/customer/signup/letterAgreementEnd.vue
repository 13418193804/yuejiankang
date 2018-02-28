<template>
  <div class="content-wrapper">
    <div class="content-first">
      <div>
      <p style="font-size:1.0rem">&nbsp;&nbsp;&nbsp;您已成功报名参加本次筛查,接下来需要您针对个⼈情况填写⾃
测问卷。</p>
    <p style="font-size:1.0rem">&nbsp;&nbsp;&nbsp;如您中途退出，将视为预约不成功,可在“肺癌早筛-我的预约”中重新填写并进⾏预约</p>
    </div>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-wrapper">
      <x-button text="填写问卷预约筛查" class="custom-primary-button" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import { XButton } from "vux";
export default {
  components: {
    XButton
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    gotoNext() {
      if (this.$route.query.order_id && this.$route.query.user_id) {
       let params = {};
        params.order_id = this.$route.query.order_id;
        params.user_id = this.$route.query.user_id;
        var dataparam = '?order_id='+ params.order_id +'&user_id=' + params.user_id;

        window.location.href='http://jiankang.aisimob.com/wenquan/ask.html' + dataparam;

      } else {
         
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content-first {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
  
}

</style>
