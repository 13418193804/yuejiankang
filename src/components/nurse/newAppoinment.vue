<template>
  <div class="content-wrapper">
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <div class="weui-cells">
       <div v-for="(yuyueItem,index) in yuyueDays"  :key="index" class="city-item"  @click="onItemClick(yuyueItem)">
            <div class="city-item-item">
              <div class="city-item-item-item" :style="textColor(yuyueItem.hasItemSelectNum)">
              <p>{{yuyueItem.day}}</p>
              <p v-if="yuyueItem.hasItemSelectNum>0">已选{{yuyueItem.hasItemSelectNum}}</p>
              <p v-else>剩余{{yuyueItem.total_can_use - yuyueItem.total_occ_use}}</p>
              </div>
            </div>
       </div>
    </div>
    <div class="weui-cell" style="background:#ffffff">
        <div class="weui-cell__bd">
           <label class="weui-label">已预约</label>
        </div>
        <div class="weui-cell__ft">
         {{hasSelectSum}}
        </div>
      </div>
      <div class="content-second">
    <div class="weui-cells">
      <div class="weui-cell input-wrapper">
        <div class="weui-cell__hd">
           <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>需预约</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写需预约人数" v-model="needAppointmentNum">
        </div>
      </div>
      <div class="weui-cell input-wrapper">
        <div class="weui-cell__hd">
           <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>团队名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写团队名称" v-model="teamInfo.teamName">
        </div>
      </div>
        <div class="weui-cell input-wrapper">
        <div class="weui-cell__hd">
           <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>负责人</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写负责人" v-model="teamInfo.leaderName">
        </div>
      </div>
        <div class="weui-cell input-wrapper">
        <div class="weui-cell__hd">
           <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>联系电话</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写联系电话" v-model="teamInfo.leaderMobile">
        </div>
      </div>
    </div>
      </div>
     <div class="weui-btn-area">
      <x-button class="custom-primary-button" text="预约" @click.native="uploadAppointmentInfo()">
      </x-button>
    </div>
    <popup v-model="showChoooseDatePop" :hide-on-blur=false>
      <div style="min-height:200px">
          <div class="confirm_filter">
            <span class="clear_all filter_button_style" @click="chooseDate()">取消</span>
            <span class="confirm_select filter_button_style" @click="onDateClick()">确定</span>
          </div>
          <div>
            <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowAppointmentTimes"></vue-loading-top>
            <div>
              <div>
               <div class="weui-cell" style="background:#ffffff">
                 <div class="weui-cell__bd">
                   <label class="weui-label">共{{selectYuyueDay.total_can_use-selectYuyueDay.total_occ_use}}</label>
                 </div>
                 <div class="weui-cell__ft">
                   <span>已选{{selectYuyueDay.hasItemSelectNum}}</span>
                 </div>
                </div>
              </div>
              <div v-show="isShowAppointmentTimes" class="first-item-wrapper weui-form-preview__bd" v-for="(appointmentTime,index) in appointmentTimes" 
                 @click="(appointmentTime.can_use - appointmentTime.occ_use) > 0 && onAppointmentItemClick(appointmentTime,index)" :key="index" :class="{'first-item-select':contains(selectIndexs,index)!=-1}">
               <div class="weui-form-preview__item">
                <label class="weui-form-preview__label" style="color:#000000"> {{appointmentTime.time_area}}</label>
                <span class="weui-form-preview__value">{{'剩余' + (appointmentTime.can_use - appointmentTime.occ_use)}}</span>
               </div>
              </div>
            </div>
          </div>
      </div>
    </popup>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import { XButton, dateFormat, Popup, DatetimeView } from "vux";
import vueLoadingTop from "@/components/widget/loading/loadingTop";
import HsyDialog from "@/components/widget/dialog/Dialog";
import Notification from "@/components/widget/notification";

export default {
  name:'newAppoinment',
  components: {
    XButton,
    vueLoadingTop,
    HsyDialog,
    Popup,
    DatetimeView,
    Notification
  },
  data() {
    return {
      yuyueDays: [],
      selectYuyueDay: {},
      isShowAppointmentTimes: false,
      appointmentTimes: [], //每天可预约时段数据
      showChoooseDatePop: false,
      isShowContent: false,
      selectIndexs: [],
      hasSelectSum: 0, //已经选择的预约数量
      needAppointmentNum: null,
      uploadData: [],
      teamInfo: {},
      showNotification: false,
      options: {}
    };
  },
  computed: {
    
  },
  created() {
    let params = {
      hospital_id: this.$route.query.hospital_id
    };
    this.getData(params);
  },
  methods: {
    closeNotification() {
      this.showNotification = false;
    },
    textColor(num) {
      const style = {};
      if (num > 0) {
        style.background = "#cccccc";
      } else {
        style.background = "#ffffff";
      }
      return style;
    },
    getData(params) {
      this.isShowContent = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/order/teamTimes";

      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {
          that.yuyueDays = data;
        }
        that.isShowContent = true;
      });
    },
    onItemClick(item) {
      this.showChoooseDatePop = true;
      this.selectYuyueDay = item;
      this.isShowAppointmentTimes = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/order/times";
      let params = {
        hospital_id: this.$route.query.hospital_id,
        day: this.selectYuyueDay.day
      };
      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {
          //start重新点击单个日期，需要清空单个日期数据，不然不好判断
          that.appointmentTimes = [];
          that.selectIndexs = [];
          let indexupLoad = -1;
          for (let i = 0; i < that.uploadData.length; i++) {
            console.log(that.uploadData[i].title);
            console.log(that.selectYuyueDay.day);
            if (that.uploadData[i].title == that.selectYuyueDay.day) {
              indexupLoad = i;
            }
          }
          if (indexupLoad != -1) {
            that.uploadData.splice(indexupLoad, 1);
          }
          if (that.selectYuyueDay.hasItemSelectNum > 0) {
            that.hasSelectSum =
              that.hasSelectSum - that.selectYuyueDay.hasItemSelectNum;
          }
          that.selectYuyueDay.hasItemSelectNum = 0;
          //end清空单个日期数据结束

          for (let j = 0; j < data.length; j++) {
            //如果teamUse>0，说明该时间段已经被其他团队占用
            if (data[j].team_use <= 0) that.appointmentTimes.push(data[j]);
          }
        }
        that.isShowAppointmentTimes = true;
      });
    },
    chooseDate() {
      this.showChoooseDatePop = !this.showChoooseDatePop;
      this.selectYuyueDay.hasItemSelectNum = 0;
    },
    //单个日期点击确认事件
    onDateClick() {
      this.showChoooseDatePop = false;
      this.hasSelectSum =
        this.hasSelectSum + this.selectYuyueDay.hasItemSelectNum;
      let itemData = {};
      itemData.title = this.selectYuyueDay.day;
      let itemDataItem = [];
      for (let i = 0; i < this.selectIndexs.length; i++) {
        let item = {};
        let j = this.selectIndexs[i];
        item.time_area = this.appointmentTimes[j].time_area;
        item.use = this.appointmentTimes[j].use;
        itemDataItem.push(item);
      }
      itemData.detail = itemDataItem;
      if(itemData.detail.length>0)
        this.uploadData.push(itemData);
    },
    //上传最终的预约数据
    uploadAppointmentInfo() {
      if (!this.needAppointmentNum || this.needAppointmentNum <= 0 ||this.hasSelectSum <= 0) {
        this.showNotification = true;
        this.options = {
          autoClose: true,
          backgroundColor: "#fc5050",
          content: "需预约数量必须大于0",
          showTime: 1000
        };
        return;
      }
      if (
        !this.teamInfo.teamName ||
        this.teamInfo.teamName.replace(/(\s*$)/g, "").length <= 0
      ) {
        this.showNotification = true;
        this.options = {
          autoClose: true,
          backgroundColor: "#fc5050",
          content: "请填写团队名称",
          showTime: 1000
        };
        return;
      }
      if (
        !this.teamInfo.leaderName ||
        this.teamInfo.leaderName.replace(/(\s*$)/g, "").length <= 0
      ) {
        this.showNotification = true;
        this.options = {
          autoClose: true,
          backgroundColor: "#fc5050",
          content: "请填写团队负责人名称",
          showTime: 1000
        };
        return;
      }
      if (
        !this.teamInfo.leaderMobile ||
        this.teamInfo.leaderMobile.replace(/(\s*$)/g, "").length <= 0
      ) {
        this.showNotification = true;
        this.options = {
          autoClose: true,
          backgroundColor: "#fc5050",
          content: "请填写团队联系电话",
          showTime: 1000
        };
        return;
      }
      let params = {};
      params.upload_data = this.uploadData;
      this.teamInfo.needNum = this.needAppointmentNum;
      this.teamInfo.hospitalId = this.$route.query.hospital_id;
      params.team_info = this.teamInfo;
      this.$router.push({
        name: "newAppoinmentCheck",
        query: params
      });
    },
    //单个日期点击事件
    onAppointmentItemClick(appointmentTime, index) {
      let i = this.contains(this.selectIndexs, index);
      if (i == -1) {
        appointmentTime.use = appointmentTime.can_use - appointmentTime.occ_use;
        //当前页面需要的个数
        let currentNeedUse = this.needAppointmentNum - this.hasSelectSum;

        if (this.selectYuyueDay.hasItemSelectNum < currentNeedUse)
          this.selectIndexs.push(index);

        if (
          this.selectYuyueDay.hasItemSelectNum + appointmentTime.use >
          currentNeedUse
        ) {
          //计算当满员后单个时间段的数量
          appointmentTime.use =
            currentNeedUse - this.selectYuyueDay.hasItemSelectNum;
          this.selectYuyueDay.hasItemSelectNum = currentNeedUse;
        } else {
          this.selectYuyueDay.hasItemSelectNum =
            appointmentTime.use + this.selectYuyueDay.hasItemSelectNum;
        }
      } else {
        let temp = this.selectYuyueDay.hasItemSelectNum - appointmentTime.use;
        this.selectYuyueDay.hasItemSelectNum = temp > 0 ? temp : 0;
        this.selectIndexs.splice(i, 1);
      }
    },
    contains(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return i;
        }
      }
      return -1;
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
  position: absolute;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: #eeeeee;
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

.city-item-wrapper {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}

.city-item {
  width: 20%;
  float: left;
  border-bottom: 1px solid #ccc;
}

.city-item-item {
  text-align: center;
  border-right: 1px solid #ccc;
  font-size: 0.6rem;
  padding: 1px;
}

.city-item-item-item {  
  padding-bottom: 20px;
  padding-top: 20px;
}

.first-item-wrapper {
  margin: 10px;
  border: 1.5px solid #cccccc;
}

.confirm_filter {
  display: flex;
  background-color: #f1f1f1;
  width: 100%;
  padding: 0.8rem 0rem;
}

.confirm_filter .filter_button_style {
  width: 50%;
  height: 1.8rem;
  font-size: 0.8rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  text-align: center;
}

.confirm_filter .clear_all {
  background-color: #fff;
  margin-right: 1rem;
  border: 0.025rem solid #fff;
  margin-left: 1rem;
}

.confirm_filter .confirm_select {
  background-color: rgb(71, 160, 209);
  color: #fff;
  border: 0.025rem solid rgb(71, 160, 209);
  margin-right: 1rem;
}

.first-item-select {
  border-color: rgb(71, 160, 209);
}
.content-second{
  flex: 1;
}
</style>
