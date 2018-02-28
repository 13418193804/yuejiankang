<template>
  <div class="content-wrapper">
    <div class="top-title">
         <!-- <p style="font-size:1.0rem;color:#71a0d1">团队报名请选择"关于早筛-团体检测"</p> -->
    </div>
    <div class="content-first">
      <div  v-for="(menuName,index) in menuNames"
          @click="onItemClick(menuName,index)" :key="index" class="menu-item">
          <p>{{menuName.title}}</p>
          <p style="font-size:0.7rem;">{{menuName.detail}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
export default {
  components: {
  },
  data() {
    return {
        menuNames: [{title:'广东全省普通居民入口',detail:''},
        {title:'机团用户预约入口',detail:'您所在机团需先在“关于早筛-团体检测”处报名'},
        {title:'广州越秀区居民入口',detail:'仅限50-74岁⼈⺠街、珠光街、光塔街、北京街居⺠'},
        {title:'广州低保入口',detail:'仅限50岁以上低保低收入五保人员'}],
    };
  },
  computed: {
  },
  methods: {
     onItemClick(menuName, index) {
       this.$AppCacheKey.setPeopleType(index+1);
       switch(index){
         case 0:
          this.$router.push({
             name: "signUp"
          });
          break;
         case 1:
          this.$router.push({
             name: "signUpForTeam"
          });
          break;
         case 2:
          this.$router.push({
             name: "yueXiuSignUpMenu"
          });
          break;
         case 3:
          this.$router.push({
             name:'signUpForDiBao'

            // name: "startSignupWriteUserInfoDibao"
          });
          break;
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
  background: #ffffff;
}

.top-title {
  text-align: center;
  margin-top: 40px;
}

.content-first{
  padding: 10px;
}
.menu-item{
  text-align: center;
  border-radius: 15px;
  border-color: #ffffff;
  background-color: #ffffff;
  color: rgb(71,160,209);
  border: 1.5px solid rgb(71,160,209);
  font-size: 1.5rem;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  &:active {
    color: #ffffff;
    background-color: rgb(71,160,209);
  }
}
</style>
