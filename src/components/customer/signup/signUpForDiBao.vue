<template>
  <div class="content-wrapper">
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <div class="top-title">
       <div class="top-title-content">
         <p style="font-size:1.5rem;color:#71a0d1">服务介绍</p>
         <div style="background: #71a0d1;width:100%;height:2px"></div>
       </div>
    </div>
    <div class="content-first" >
       <ul>
          <li>主办单位：
              <p>本次服务由⼴东省胸部疾病协会、广州医科大学附属第一医院、⼴东移动等权威机构联合发起。由广州医科大学附属第一医院作为最终审核机构,严格保证检测质量.</p>
          </li>
          <li>筛查方法：
              <p>筛查⽅式为低剂量螺旋CT检查</p>
          </li>
      </ul>
    </div>
    <div class="top-title">
       <div class="top-title-content">
         <p style="font-size:1.5rem;color:#71a0d1">参与方式</p>
         <div style="background: #71a0d1;width:100%;height:2px"></div>
       </div>
    </div>
    <div class="content-second">
        <p>1.您可以免费参加本次活动，届时请带好<span style="color:#F43530">⾝份证与低保证明</span>到现场进⾏检测</p>
        <p style="color:#F43530">2.孕期与计划怀孕者请勿参加检测</p>
        <p>3.需阅读并同意《知情同意书》后报名</p>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-wrapper">
      <x-button text="了解并查看《知情同意书》" class="custom-primary-button" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import Notification from "@/components/widget/notification";
import vueLoading from "@/components/widget/loading/loading";
import { XButton } from "vux";
export default {
  components: {
    XButton,
    Notification,
    vueLoading
  },
  data() {
    return {
      showNotification: false,
      options: {}
    };
  },
  computed: {
    uploadstatus() {}
  },
  created() {},
  methods: {
    closeNotification() {
      this.showNotification = false;
    },
    gotoNext() {
    //  if (this.$route.query.order_id && this.$route.query.user_id) {
    //    let params = {}
    //    params.order_id = this.$route.query.order_id;
    //    params.user_id = this.$route.query.user_id;
        this.$router.push({
          name: "letterAgreementOne",
    //      query: params
        });
    //  }
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
  margin-top: 10px;
}

.content-first ul {
  padding-left: 20px;
  padding-right: 20px;
}

.content-first li {
  margin-top: 8px;
  font-size: 1.2rem;
  font-weight: bold;
}

.content-first li p {
  font-size: 1rem;
  font-weight: normal;
}

.content-second {
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  margin-top: 10px;
}

.content-second p {
  margin-top: 8px;
  font-size: 1rem;
}
</style>
