<template>
  <div class="content-wrapper">
    <div class="top-title">
       <div class="top-title-content">
         <p style="font-size:1.2rem;color:#71a0d1">5/6 资料使用及保存、保密原则</p>
       </div>
    </div>
    <div class="content-first">
      <p style="font-size:1.0rem">您的检查结果，依照相关法律会被严密保存，不被公开。医院将储存本项目相关材料，任何有关项目的公开报告将不会披露您的个人信息。您的资料可能在以后的研究中使用，材料上贴有带编码的标签，不会出现您的姓名，您的所有个人信息将会保密。若您需要提取本项目相关材料，将按照医院既有的规定执行。在过程中会收集部分标本用于后续研究分析。</p>
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
          name: "letterAgreementSix",
          query: params
        });
      } else {
        this.$router.push({
          name: "letterAgreementSix"
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
