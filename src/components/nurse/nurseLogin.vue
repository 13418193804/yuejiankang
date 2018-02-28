<template>
  <div class="content-wrapper" style="background:#ffffff">
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <div class="weui-cell item-wrapper">
        <div class="weui-cell__hd">
           <label class="weui-label"><span style="color:#F43530">*&nbsp;</span>您的名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="填写姓名" v-model="selectName">
        </div>
    </div>
	<div class="item-wrapper" @click="chooseCity()">
        <div class="item-left">
             <p>选择城市</p>
        </div>
        <div class="item-right">
          <p>{{selectCity.name}}</p>
          <label class="item-right-icon"></label>
        </div>
    </div>
    <div class="content-first">
      <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowContent"></vue-loading-top>
      <div v-show="isShowContent" class="first-item-wrapper" v-for="(hospital,index) in hospitals" 
          @click="onItemClick(hospital,index)" :key="index" :class="{'first-item-select':currentIndex === index}">
            {{hospital.hospital_name}}
      </div>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-white-wrapper">
      <x-button class="custom-primary-button" :text="uploadstatus" @click.native="inUploading===1 && gotoNext()" type="primary" :showLoading="inUploading===2">
      </x-button>
    </div>
    <popup v-model="showChoooseCity" :show-mask="true" position="bottom">
          <div v-for="(city,index) in cityList"  :key="index" class="city-item"  @click="onCityClick(city)">
            <div class="city-item-item">
            <span>{{city.name}}</span>
            </div>
          </div>
    </popup>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoadingTop from "@/components/widget/loading/loadingTop";
import Notification from "@/components/widget/notification";
import { XButton, Selector, Popup } from "vux";
export default {
  components: {
    XButton,
    Selector,
    Popup,
    vueLoadingTop,
    Notification
  },
  data() {
    return {
	  inUploading: 1,//正在上传标识1:未传，2正在上传，3上传成功
	  selectName:'',
      showNotification: false,
      options: {},
      currentIndex: -1,
      isShowContent: false,
      showChoooseCity: false,
      selectHospital: null,
      hospitals: [],
      cityList: [
        { value: 1, name: "佛山" },
        { value: 2, name: "东莞" },
        { value: 3, name: "中山" },
        { value: 4, name: "珠海" },
        { value: 5, name: "江门" },
        { value: 6, name: "肇庆" },
        { value: 7, name: "惠州" },
        { value: 8, name: "汕头" },
        { value: 9, name: "潮州" },
        { value: 10, name: "揭阳" },
        { value: 11, name: "汕尾" },
        { value: 12, name: "湛江" },
        { value: 13, name: "茂名" },
        { value: 14, name: "阳江" },
        { value: 15, name: "韶关" },
        { value: 16, name: "清远" },
        { value: 17, name: "云浮" },
        { value: 18, name: "梅州" },
        { value: 19, name: "河源" },
        { value: 20, name: "广州" },
        { value: 21, name: "深圳" }
      ],
      selectCity: {}
    };
  },
  computed: {
	uploadstatus() {
      if (this.inUploading === 1) return "注册";
      else if (this.inUploading === 2) return "注册中";
    }
  },
  created() {
    this.onCityClick({ value: 20, name: "广州" });
  },

  methods: {
    closeNotification() {
      this.showNotification = false;
    },
    chooseCity() {
      this.showChoooseCity = true;
    },
    onCityClick(city) {
      this.showChoooseCity = false;
      this.isShowContent = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/order/hospitals";
      let params = {
        city_id: city.value
      };
      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {
          that.hospitals = data;
          that.selectCity = city;
          that.currentIndex = -1;
        }
        that.isShowContent = true;
      });
    },
    onItemClick(hospital, index) {
      this.currentIndex = index;
      this.selectHospital = hospital;
    },
    gotoNext() {
      let params = {};
      if (!this.selectHospital) {
        this.showNotification = true;
        this.options = {
          autoClose: true,
          backgroundColor: "#fc5050",
          content: "请先选择医院",
          showTime: 1000
        };
        return;
	  }
	 if (!this.selectName || this.selectName < 2) {
        this.showNotification = true;
        this.options = {
          autoClose: true,
          backgroundColor: "#fc5050",
          content: "请先填写名称",
          showTime: 1000
        };
        return;
	  }
	  
	  this.inUploading = 2;
      let url = webconfig.webserverurl + "/api/nurse/addNurse";
      let that = this;
      let userdata =
        "hospital_id=" +
        this.selectHospital.hospital_id +
        "&name=" +
        this.selectName +
        "&open_id=" +
        this.$cookie.get("openid");
      console.log(userdata);
      this.$wrapperHttp.post(this, userdata, url, function(data) {
        if (data) {
          that.$router.go(-1);
        } else {
          that.inUploading = 1;
        }
      });
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
  height: 100px;
}

.top-title {
  background-color: rgb(71, 160, 209);
  padding: 30px;
}

.item-wrapper {
  display: flex;
  margin: 10px;
  border: 1.5px solid #cccccc;
}

.item-left {
  border-right: 1.5px solid #cccccc;
  padding: 10px;
}

.item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px;
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
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #000000;
  margin-left: 6px;
}

.content-first {
  background: #ffffff;
  flex: 1;
}

.first-item-wrapper {
  margin: 10px;
  border: 1.5px solid #cccccc;
  padding: 10px;
}

.first-item-select {
  border-color: rgb(71, 160, 209);
}

.city-item {
  width: 33.333%;
  float: left;
  border-bottom: 1px solid #ccc;
}

.city-item-item {
  padding-bottom: 10px;
  padding-top: 10px;
  text-align: center;
  border-right: 1px solid #ccc;
}

.top-title-content-line {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 55px;
  margin-right: 55px;
}

.top-title-content-text {
  display: flex;
  align-items: center;
  text-align: center;
}

.content-title {
  color: rgb(34, 127, 178);
  font-size: 16px;
  flex: 1;
}

.content-title-select {
  color: #ffffff;
}

.follow-up-route {
  height: 1px;
  background: #ffffff;
  flex: 1;
}

.icon-Processnode {
  content: "";
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border-radius: 7px;
}
.icon-done {
  content: "";
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}
</style>
