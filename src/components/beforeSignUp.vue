<template>
  <div>
    <notification :options.sync="options" :show.sync="showNotification"></notification>
    <div>
      <img src="../common/image/banner.jpg" class="banner-wrapper"></img>
    </div>
    <div class="weui-cell input-wrapper">
          <div class="weui-cell__hd">
            <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>姓名</label>
          </div>
          <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入您的姓名" v-model="userInfo.name" @blur="checkName()">
          </div>
    </div>
    <div class="weui-cell input-wrapper">
          <div class="weui-cell__hd">
            <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>手机号码</label>
          </div>
          <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入11位手机号码" v-model="userInfo.mobile" @blur="checkTel()">
          </div>
    </div>
    <div class="describe-wrapper">
        <p>1.本筛查由广东省胸部疾病学会、广州医科大学附属第一医院、广东移动等权威机构联合发起;</p>
        <p>2.本筛查采用先进的低剂量螺旋CT检查方法，是检测早期肺癌的金标准;</p>
        <p>3.本筛查遵循自愿原则，建议年龄在40岁以上的居民参加;</p>
        <p style="marginTop:15px;color:#71a0d1">特别注意：孕期与计划怀孕者请勿参加</p>
    </div>
    <div style="padding-left:15px;padding-right:15px">
    <div class="weui-btn-area">
      <x-button class="custom-primary-button" :text="uploadstatus" @click.native="inUploading===1 && syncUpload()" type="primary" :showLoading="inUploading===2">
      </x-button>
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
      userInfo: {},
      currentFrom:'weixin'
    };
  },
  created() {
    let from = this.$route.query.from;
    if(from === 'app')
       this.currentFrom = from;
    else
       this.currentFrom = 'weixin';
  },
  computed: {
    uploadstatus() {
      if (this.inUploading === 1) return "立即报名";
      else if (this.inUploading === 2) return "上传数据";
    }
  },
  methods: {
    syncUpload() {
      if (!this.userInfo.mobile || !/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(this.userInfo.mobile)) {
        this.options.content = "手机号码格式不对";
        this.showNotification = true;
        return;
      }
      if (!this.userInfo.name || this.userInfo.name.length < 2) {
        this.options.content = "请输入正确的姓名";
        this.showNotification = true;
        return;
      }
      this.inUploading = 2;
      let url = webconfig.webserverurl + "/api/signup";
      let that = this;
      let userdata = 'name=' + this.userInfo.name + '&mobile=' + this.userInfo.mobile + '&from=' + this.currentFrom;
      this.$wrapperHttp.post(this,userdata, url, function(data) {
        if (data) {
          that.$router.push({
            name: "beforeSignUpSucceed",
            query: {
               userName: that.userInfo.name
            }
          });
        } else {
          that.inUploading = 1;
        }
      });
    },
    checkName() {
      if (!this.userInfo.name || this.userInfo.name.length < 2) {
        this.options.content = "请输入正确的姓名";
        this.showNotification = true;
      } else {
        this.showNotification = false;
      }
    },
    checkTel() {
      if (!this.userInfo.mobile || !/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(this.userInfo.mobile)) {
        this.options.content = "手机号码格式不对";
        this.showNotification = true;
      } else {
        this.showNotification = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.input-wrapper {
  background: #ffffff;
}
.describe-wrapper {
  padding: 10px 20px 0 20px;
}
p {
  font-size: 13px;
}
</style>
