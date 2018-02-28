<template>
  <div class="content-wrapper">
    <div class="top-title">
       <div class="top-title-content">
         <p style="font-size:1.2rem;color:#71a0d1">2/6 低剂量螺旋CT说明</p>
       </div>
    </div>
    <div class="content-first">
      <p style="font-size:1.0rem">低剂量螺旋CT扫描是一种无创性检查技
术，安全、无痛苦。所用射线剂量仅为常
规CT剂量的1/6～1/10。然而，任何一种
影像学检查方法均存在一定的漏诊，而且
在肺癌的发生发展过程中，有“间隔癌症”情
况发生，即此次进行的肺癌早期筛查项目
仅能对本次检查的结果负责，您仍然需要
在今后定期进行健康查体等相关检查。如
果您想进一步了解情况，请与检查小组的
医生联系。</p>
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
    return {};
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
          name: "letterAgreementThree",
          query: params
        });
      } else {
        this.$router.push({
          name: "letterAgreementThree"
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
