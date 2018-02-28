<template>
  <div class="content-wrapper">
    <div class="top-title">
       <div class="top-title-content">
         <p style="font-size:1.2rem;color:#71a0d1">3/6 筛查可能获得的益处</p>
       </div>
    </div>
    <div class="content-first">
      <p style="font-size:1.0rem">CT检查可发现您是否患有或疑似肺癌，如
果你确有肺癌或可疑病变，我们会优先安
排您进行及时治疗及随诊。如果您参加检
查，还可全面了解你有无肺的其它病变，
有无冠状动脉钙化，有无早期肺小气道改
变，有无主动脉瘤等。</p>
    </div>
    <div class="content-second">
        <p style="font-size:0.7rem;color:#F43530">为确保您正确理解本服务的内容、益处和参与条件，请仔细阅读并同意《知情同意书》，再决定是否报名。如有不明白的地方，您可拨打客服电话 4001621828 咨询</p>
    </div>
     <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-wrapper">
      <x-button text="同意并继续" class="custom-primary-button" @click.native="gotoNext()">
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
    return {
    };
  },
  computed: {},
  methods: {
   gotoNext() {
      if (this.$route.query.order_id && this.$route.query.user_id) {
        let params = {};
        params.order_id = this.$route.query.order_id;
        params.user_id = this.$route.query.user_id;
        if (this.$route.query.team_id) {
          params.team_id = this.$route.query.team_id;
          params.hospital_id = this.$route.query.hospital_id;
          params.hospital_name = this.$route.query.hospital_name;
        }
        this.$router.push({
          name: "letterAgreementFour",
          query: params
        });
      } else {
        this.$router.push({
          name: "letterAgreementFour"
        });
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

.top-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 25px;
}

.top-title-content {
  text-align: center;
  width: 100%;
}

.content-first {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
}

.content-second {
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 20px;
}

</style>
