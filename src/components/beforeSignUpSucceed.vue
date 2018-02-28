<template>
  <div class="content-wrapper">
    <div class="top-title">
       <div class="top-title-content">
         <img src="../common/image/icon_check.png" width="60px" height="60px"></img>
         <p style="font-size:2rem;color:#ffffff">报名成功</p>
       </div>
    </div>
    <div class="content-first">
        <p style="font-size: 1.6rem;margin-bottom: 10px;">{{userName}},您好</p>
        <p style="font-size: 1.0rem">您已成功报名参加肺癌早期筛查活动，活动正式开始后我们将第一时间通知您，请您保持关注！</p>
    </div>
    <div class="content-second">
      <p style="font-weight: bold;margin-bottom: 30px;font-size: 1.0rem">本次活动不设名额限制，您还可以帮您的家人朋友报名参加。</p>
      <div class="weui-btn-area">
        <x-button text="继续报名" class="custom-primary-button" @click.native="gotoSignUp()">
        </x-button>
      </div>
      <div class="content-third">
         <p style="font-size:0.8rem">如不需要继续报名关闭本页面即可</p>
      </div>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import Notification from "@/components/widget/notification";
import { XButton, Group } from "vux";
export default {
  components: {
    XButton,
    Group,
    Notification
  },
  data() {
    return {
      userName:this.$route.query.userName,
      showNotification: false,
      options: {
        autoClose: true,
        backgroundColor: "#F43530",
        barColor: "#F43530",
        countdownBar: true,
        content: "",
        showTime: 3000,
        textColor: "#fff"
      },
      inUploading: 1, //正在上传标识1:未传，2正在上传，3上传成功
      isShowContent: false,
      userInfo: {}
    };
  },
  computed: {
    uploadstatus() {}
  },
  methods: {
    gotoSignUp() {
      this.$router.go(-1);
    },
    checkName() {},
    checkTel() {}
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
  background-color: #71a0d1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.top-title-content {
  text-align: center;
}

.content-first {
  padding: 20px;
  background: #ffffff;
  margin-top: 8px;
}

.content-second {
  flex: 1;
  padding: 20px;
  background: #ffffff;
  margin-top: 8px;
}

.content-third {
  text-align: center;
  background: #ffffff;
}
</style>
