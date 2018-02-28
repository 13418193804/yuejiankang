<template>
  <div class="content-wrapper">
    <notification :options.sync="options" :show.sync="showNotification"></notification>
    <div class="top-title">
       <p>请填写您的个人信息</p>
    </div>
    <div class="content-first">
     <div class="weui-cell input-wrapper">
      <div class="weui-cell__hd">
         <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>姓名</label>
      </div>
      <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写姓名" v-model="userInfo.name" @blur="checkName()">
      </div>
    </div>
        <div class="weui-cell input-wrapper">
      <div class="weui-cell__hd">
         <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>性别</label>
      </div>
      <div class="weui-cell__bd">
          <label class="single"><input type="radio" name="sex" value="男" v-model="userInfo.sex"/>男</label>
          <label class="single"><input type="radio" name="sex" value="女" v-model="userInfo.sex" style="margin-left:20px"/>女</label>
      </div>
    </div>
    <div class="weui-cell input-wrapper">
      <div class="weui-cell__hd">
         <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>身份证号</label>
      </div>
      <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写身份证号" v-model="userInfo.code" @blur="checCardId()">
      </div>
    </div>
    <div class="weui-cell input-wrapper">
      <div class="weui-cell__hd">
         <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>手机号码</label>
      </div>
      <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写手机号码" v-model="userInfo.mobile" @blur="checkTel()">
      </div>
    </div>
    </div>
    <div class="content-second">
       <div>
        <p style="font-size:0.9rem;color:rgb(145,145,145)">温馨提示</p>
        <p style="font-size:0.9rem;color:rgb(145,145,145)">
          1.我们将对您填写的信息严格保密，请放⼼填写;</p>
        <p style="font-size:0.9rem;color:rgb(145,145,145)">
          2.为保证检测的顺利进⾏，请填写真实有效的信息;</p>
        <p style="font-size:0.9rem;color:rgb(145,145,145)">
          3.检测时请带上<span style="color:#71a0d1">身份证</span>签到</p>
       </div>
    </div>
    <div class="btn-area">
      <x-button class="custom-primary-button" :text="uploadstatus" @click.native="inUploading===1 && checkUserSignUpInfo()" type="primary" :showLoading="inUploading===2">
      </x-button>
    </div>
   <!-- <hsy-dialog class="confirm" v-model="showDialog">
      <div slot="body">
        <div style="padding:10px;max-height:100px;line-height:20px">您不在团队名单中</div>
        <div class="confirm_filter">
            <span class="first filter_button_style" @click="handleYes()">再试一次</span>
            <span class="filter_button_style" @click="handleNo()">重填信息</span>
        </div>
      </div>
    </hsy-dialog> -->
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import { XButton, Selector, PopupPicker, Picker, Datetime } from "vux";
import Notification from "@/components/widget/notification";
import HsyDialog from "@/components/widget/dialog/Dialog";
export default {
  components: {
    XButton,
    Selector,
    PopupPicker,
    Picker,
    Datetime,
    Notification,
    HsyDialog
  },
  data() {
    return {
      showDialog: false,
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
      userInfo: {
        sex: "男"
      },
      inUploading: 1 //正在上传标识1:未传，2正在上传，3上传成功
    };
  },
  computed: {
    uploadstatus() {
      if (this.inUploading === 1) return "下一步";
      else if (this.inUploading === 2) return "上传数据";
    }
  },
  created() {
    this.$AppCacheKey.setPeopleType(2);
  },
  methods: {
    checkUserSignUpInfo() {
      if (!this.userInfo.name || this.userInfo.name.length < 2) {
        this.options.content = "请输入正确的姓名";
        this.showNotification = true;
        return;
      }
      if (
        !this.userInfo.mobile ||
        !/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(
          this.userInfo.mobile
        )
      ) {
        this.options.content = "手机号码格式不对";
        this.showNotification = true;
        return;
      }
      if (
        !this.userInfo.code ||
        !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(
          this.userInfo.code
        )
      ) {
        this.options.content = "身份证格式不对";
        this.showNotification = true;
        return;
      }
      this.inUploading = 2;
      let url = webconfig.webserverurl + "/api/order/checkUser";
      let that = this;
      let userdata =
        "user_type_id=" +
        this.$AppCacheKey.getPeopleType() +
        "&name=" +
        this.userInfo.name +
        "&code=" +
        this.userInfo.code +
        "&team_id=" +
        this.$route.query.team_id;
      this.$http
        .post(url, userdata)
        .then(response => {
          if (response.status === 200 && response.data.code === 1) {
            that.uploadUserInfo();
          } else {
            that.options.content = "身份验证失败";
            that.showNotification = true;
            that.inUploading = 1;
          }
        })
        .catch(function(error) {
          that.inUploading = 1;
          that.$vux.toast.show({
            text: "异常:" + error,
            type: "warn",
            time: 3000
          });
        });
    },
    uploadUserInfo() {
      let url = webconfig.webserverurl + "/api/order/addUser";
      let that = this;
      let userdata =
        "name=" +
        this.userInfo.name +
        "&mobile=" +
        this.userInfo.mobile +
        "&code=" +
        this.userInfo.code +
        "&sex=" +
        this.userInfo.sex +
        "&team_id=" +
        this.$route.query.team_id +
        "&open_id=" +
         this.$cookie.get("openid") +
        "&user_type_id=" +
        this.$AppCacheKey.getPeopleType();
      console.log(userdata);
      this.$wrapperHttp.post(this, userdata, url, function(data) {
        if (data) {
          let params = {};
          params.order_id = data.order_id;
          params.user_id = data.user_id;
          params.team_id = that.$route.query.team_id;
          params.hospital_id = that.$route.query.hospital_id;
          params.hospital_name = that.$route.query.hospital_name;
          that.$router.push({
            name: "signUpForTeamLetter",
            query: params
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
      if (
        !this.userInfo.mobile ||
        !/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(
          this.userInfo.mobile
        )
      ) {
        this.options.content = "手机号码格式不对";
        this.showNotification = true;
      } else {
        this.showNotification = false;
      }
    },
    checCardId() {
      if (
        !this.userInfo.code ||
        !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(
          this.userInfo.code
        )
      ) {
        this.options.content = "身份证格式不对";
        this.showNotification = true;
      } else {
        this.showNotification = false;
      }
    },
    handleYes() {
      this.showDialog = false;
    },
    handleNo() {
      this.showDialog = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.top-title {
  background-color: rgb(71, 160, 209);
  text-align: center;
  padding: 35px 0 35px 0;
  color: rgb(238, 238, 238);
  font-size: 1.2rem;
}

.content-first {
  margin-top: 8px;
}

.content-second {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.btn-area {
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.input-wrapper {
  background: #ffffff;
}

.confirm_filter {
  display: flex;
  width: 100%;
  border-top: 1px solid #ccc;
}

.confirm_filter .filter_button_style {
  width: 50%;
  text-align: center;
  padding: 0.8rem;
}

.confirm_filter .first {
  border-right: 1px solid #ccc;
}
</style>
