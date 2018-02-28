<template>
  <div>
     <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
     <div class="tabbar" v-show='isShowContent'>
     	<a  v-for="(menuName,index) in menuNames" 
          @click="onItemClick(index)" :key="index" class="tag-item" :class="{'tag-item-style':currentIndex === index}">{{menuName}}
      </a>
      <a @click="gotoSetting"  class="tag-item">设置</a>
     </div>
     <div class="item-content" v-show='isShowContent'>
        <component :is="keet" :selectHospitalId="hospitalId"></component>
     </div>
  </div>
</template>

<script>
import AppoinmentConfig from "./nurseAppoinmentConfig";
import AppointmentList from "./nurseAppointmentList";
import vueLoading from "@/components/widget/loading/loading";
import webconfig from "@/common/webconfig";

export default {
  components: {
    AppoinmentConfig,
    AppointmentList,
    vueLoading
  },
  data() {
    return {
      menuNames: ["预约列表", "团体预约"],
      currentIndex: 0,
      keet: "AppoinmentConfig",
      hospitalId: '0',
      isShowContent: true
    };
  },
  created() {
    this.isShowContent = false;
    let that = this;
    let url = webconfig.webserverurl + "/api/nurse/login";
    let params = {
      open_id: this.$cookie.get("openid")
    };
    this.$wrapperHttp.get(this, params, url, function(data) {
      if (data) {
        if(data.hospital_id){
           that.hospitalId = data.hospital_id;
           that.onItemClick(0);
        }
        else {
         that.$router.push({
          name: "nurseLogin"
        });
      } 
      }else{
         that.$router.push({
          name: "nurseLogin"
        });
      }
      that.isShowContent = true;
    });
  },
  methods: {
    onItemClick(index) {
      this.currentIndex = index;
      if (index == 0) this.keet = "AppointmentList";
      else this.keet = "AppoinmentConfig";
    },
    gotoSetting(){
    this.$router.push({
              name: "choosePeopleType"
            });
    }
  },
  gotoSetting(){
       this.$router.push({
                    name: "choosePeopleType"
                  });
  }
};
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #cccccc;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 13;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-top: -45px;
}
.tag-item {
  flex: 1;
  text-align: center;
  display: block;
  color: rgb(77, 85, 93);
  font-size: 15px;
}

.tag-item-style {
  color: #71a0d1;
  border-bottom: 3px solid #71a0d1;
}

.item-content {
  margin-top: 45px;
}
</style>
