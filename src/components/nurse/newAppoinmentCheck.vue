<template>
  <div class="content-wrapper" style="background:#ffffff">
    <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">团队名称</label>
                    <em class="weui-form-preview__value">{{teamInfo.teamName}}</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">预约人数</label>
                    <span class="weui-form-preview__value">{{teamInfo.needNum}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">负责人</label>
                    <span class="weui-form-preview__value">{{teamInfo.leaderName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">联系电话</label>
                    <span class="weui-form-preview__value">{{teamInfo.leaderMobile}}</span>
                </div>
            </div>
    </div>
    <div class="list-wrapper">
      <div v-for="(order,index) in uploadData" :key="index">
       <div class="weui-cell" @click="currentIndex = (currentIndex==index)?-1:index" style="background:#eeeeee;color:#444444">
           <div class="weui-cell__bd">
             <span>{{order.title}}</span>
           </div>
           <span :class="itemClass(index)"></span>
       </div>
      <div class="weui-form-preview__bd" v-show='currentIndex===index' v-for="(item,itemindex) in order.detail" :key="itemindex">
        <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">{{item.time_area}}</label>
           <span class="weui-form-preview__value">{{item.use}}人</span>
        </div>
      </div>
       </div>
     </div>
      <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-wrapper">
      <x-button class="custom-primary-button" :text="uploadstatus" @click.native="inUploading===1 && uploadAppointmentInfo()" type="primary" :showLoading="inUploading===2">
      </x-button>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoadingTop from "@/components/widget/loading/loadingTop";
import { XButton } from "vux";
export default {
  components: {
    XButton
  },
  data() {
    return {
      currentIndex: -1,
      teamInfo: this.$route.query.team_info,
      uploadData: this.$route.query.upload_data,
      appoinmentData: "",
      inUploading: 1 //正在上传标识1:未传，2正在上传，3上传成功
    };
  },
  computed: {
    uploadstatus() {
      if (this.inUploading === 1) return "确定预约";
      else if (this.inUploading === 2) return "上传数据中";
    }
  },
  created() {
    let temp = this.uploadData;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].detail) {
        console.log(temp[i].title);
        for (let j = 0; j < temp[i].detail.length; j++) {
          this.appoinmentData = this.appoinmentData + 
          '&days[]='+ temp[i].title + '/' +temp[i].detail[j].time_area + '/' + temp[i].detail[j].use
        }
      }
    }
  },
  methods: {
    itemClass(index) {
      if (index === this.currentIndex) return "triangle-icon-down-black";
      else return "triangle-icon-black";
    },

    uploadAppointmentInfo() {
      this.inUploading = 2;
      let url = webconfig.webserverurl + "/api/order/addTeamOrder";
      let that = this;
      let userdata =
        "team_name=" +
        this.teamInfo.teamName +
        "&team_leader_name=" +
        this.teamInfo.leaderName +
        "&hospital_id=" +
        this.teamInfo.hospitalId +
        "&team_leader_mobile=" +
        this.teamInfo.leaderMobile +
        "&peoples=" +
        this.teamInfo.needNum +
        this.appoinmentData;
        console.log(userdata);
      this.$wrapperHttp.post(this, userdata, url, function(data) {
        if (data) {
          that.$vux.toast.show({
            text: "预约成功",
            onHide() {
              that.$router.go(-2);
            }
          });
        } else {
          that.inUploading = 1;
          that.$vux.toast.show({
            text: "预约失败",
            onHide() {}
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less";
@import "~vux/src/styles/weui/widget/weui_cell/weui_form.less";
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.list-wrapper {
  overflow: scroll;
  flex: 1;
}

.user-tag {
  border-radius: 5px;
  color: #666;
  background-color: #ffffff;
  font-size: 0.6rem;
  border: 1px solid #000000;
  padding: 2px 4px 2px 4px;
  margin-left: 8px;
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
  color: rgb(71, 160, 209);
}

.confirm_filter .filter_button_style.first {
  border-right: 1px solid #ccc;
  color: #000000;
}

.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.item-wrapper {
  display: flex;
  margin: 5px;
}

.item-left {
  padding: 5px;
  flex: 1;
  text-align: center;
}

.item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.item-right p {
  flex: 1;
  text-align: center;
}

.item-right-icon {
  content: "";
  display: inline-block;
  vertical-align: 4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000000;
  margin-left: 3px;
}
</style>
