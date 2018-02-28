import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

//微信Js权限列表
//const jsApiList =  ['chooseImage','previewImage','uploadImage','openLocation','getLocation','scanQRCode','downloadImage','getLocalImgData'];

export default new Router({
  routes: [{
    name: 'notFoundComponent',
    path: '*',
    component: function(resolve) {
      require(['@/components/notFoundComponent.vue'], resolve)
    },
    meta: { title: '错误页' }
  },{
    name: 'wepayPage',
    path: '/pay/wepayPage',
    component: function(resolve) {
      require(['@/components/pay/wepayPage.vue'], resolve)
    },
    meta: { title: '爱肺中心-支付' ,jsApiList: ['chooseWXPay']}
  },{
    name: 'spreadPage',
    path: '/spreadPage',
    component: function(resolve) {
      require(['@/components/spreadPage.vue'], resolve)
    },
    meta: { title: '爱肺中心-早筛科普' }
  },{
    name: 'beforeSignUp',
    path: '/beforeSignUp',
    component: function(resolve) {
      require(['@/components/beforeSignUp.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },{
    name: 'beforeSignUpSucceed',
    path: '/beforeSignUpSucceed',
    component: function(resolve) {
      require(['@/components/beforeSignUpSucceed.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },{
    name: 'signUp',
    path: '/customer/signup/signUp',
    component: function(resolve) {
      require(['@/components/customer/signup/signUp.vue'], resolve)
    },
    meta: { title: '普通居民知情书' }
  },{
    name: 'signUpForTeamLetter',
    path: '/customer/signup/signUpForTeamLetter',
    component: function(resolve) {
      require(['@/components/customer/signup/signUpForTeamLetter.vue'], resolve)
    },
    meta: { title: '机团知情书' }
  },{
    name: 'signUpForDiBao',
    path: '/customer/signup/signUpForDiBao',
    component: function(resolve) {
      require(['@/components/customer/signup/signUpForDiBao.vue'], resolve)
    },
    meta: { title: '低保知情书' }
  },{
    name: 'signUpForStreet',
    path: '/customer/signup/signUpForStreet',
    component: function(resolve) {
      require(['@/components/customer/signup/signUpForStreet.vue'], resolve)
    },
    meta: { title: '街道居民知情书' }
  },{
    name: 'letterAgreementOne',
    path: '/customer/signup/letterAgreementOne',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementOne.vue'], resolve)
    },
    meta: { title: '爱肺中心-知情书' }
  },{
    name: 'letterAgreementTwo',
    path: '/customer/signup/letterAgreementTwo',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementTwo.vue'], resolve)
    },
    meta: { title: '爱肺中心-知情书' }
  },{
    name: 'letterAgreementThree',
    path: '/customer/signup/letterAgreementThree',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementThree.vue'], resolve)
    },
    meta: { title: '爱肺中心-知情书' }
  },{
    name: 'letterAgreementFour',
    path: '/customer/signup/letterAgreementFour',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementFour.vue'], resolve)
    },
    meta: { title: '爱肺中心-知情书' }
  },{
    name: 'letterAgreementFive',
    path: '/customer/signup/letterAgreementFive',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementFive.vue'], resolve)
    },
    meta: { title: '爱肺中心-知情书' }
  },{
    name: 'letterAgreementSix',
    path: '/customer/signup/letterAgreementSix',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementSix.vue'], resolve)
    },
    meta: { title: '爱肺中心-知情书' }
  },{
    name: 'letterAgreementEnd',
    path: '/customer/signup/letterAgreementEnd',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementEnd.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },{
    name: 'wenQuan',
    path: '/customer/signup/wenQuan',
    component: function(resolve) {
      require(['@/components/customer/signup/wenQuan.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },{
    name: 'wenQuanForAll',
    path: '/customer/signup/wenQuanForAll',
    component: function(resolve) {
      require(['@/components/customer/signup/wenQuanForAll.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },{
    name: 'signUpSucceedForStreet',
    path: '/customer/signup/signUpSucceedForStreet',
    component: function(resolve) {
      require(['@/components/customer/signup/signUpSucceedForStreet.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },{
    name: 'letterAgreementEndForTeam',
    path: '/customer/signup/letterAgreementEndForTeam',
    component: function(resolve) {
      require(['@/components/customer/signup/letterAgreementEndForTeam.vue'], resolve)
    },
    meta: { title: '爱肺中心' }
  },

    {
      name: 'wenQuanForStreet',
      path: '/customer/signup/wenQuanForStreet',
      component: function(resolve) {
        require(['@/components/customer/signup/wenQuanForStreet.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'signUpSucceed',
      path: '/customer/signup/signUpSucceed',
      component: function(resolve) {
        require(['@/components/customer/signup/signUpSucceed.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'signUpMenu',
      path: '/customer/signup/signUpMenu',
      component: function(resolve) {
        require(['@/components/customer/signup/signUpMenu.vue'], resolve)
      },
      meta: { title: '报名预约' }
    },{
      name: 'yueXiuSignUpMenu',
      path: '/customer/signup/yueXiuSignUpMenu',
      component: function(resolve) {
        require(['@/components/customer/signup/yueXiuSignUpMenu.vue'], resolve)
      },
      meta: { title: '街道选择' }
    },{
      name: 'startSignupWriteUserInfo',
      path: '/customer/signup/startSignupWriteUserInfo',
      component: function(resolve) {
        require(['@/components/customer/signup/startSignupWriteUserInfo.vue'], resolve)
      },
      meta: { title: '填写信息' }
    },
    {
      name: 'startSignupWriteUserInfoDibao',
      path: '/customer/signup/startSignupWriteUserInfoDibao',
      component: function(resolve) {
        require(['@/components/customer/signup/startSignupWriteUserInfoDibao.vue'], resolve)
      },
      meta: { title: '填写信息' }
    },
    {
      name: 'startSignupWriteUserInfoForTeam',
      path: '/customer/signup/startSignupWriteUserInfoForTeam',
      component: function(resolve) {
        require(['@/components/customer/signup/startSignupWriteUserInfoForTeam.vue'], resolve)
      },
      meta: { title: '填写信息' }
    },
    {
      name: 'startSignupWriteUserInfoForStreet',
      path: '/customer/signup/startSignupWriteUserInfoForStreet',
      component: function(resolve) {
        require(['@/components/customer/signup/startSignupWriteUserInfoForStreet.vue'], resolve)
      },
      meta: { title: '填写信息' }
    },
    {
      name: 'signUpForTeam',
      path: '/customer/signup/signUpForTeam',
      component: function(resolve) {
        require(['@/components/customer/signup/signUpForTeam.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'hospitalInfoForTeam',
      path: '/customer/signup/hospitalInfoForTeam',
      component: function(resolve) {
        require(['@/components/customer/signup/hospitalInfoForTeam.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'appointmentList',
      path: '/customer/appointment/appointmentList',
      component: function(resolve) {
        require(['@/components/customer/appointment/appointmentList.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'appointmentChooseHospital',
      path: '/customer/appointment/appointmentChooseHospital',
      component: function(resolve) {
        require(['@/components/customer/appointment/appointmentChooseHospital.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },{
      name: 'appointmentChooseDate',
      path: '/customer/appointment/appointmentChooseDate',
      component: function(resolve) {
        require(['@/components/customer/appointment/appointmentChooseDate.vue'], resolve)
      },
      meta: { title: '日期选择' }
    },
    {
      name: 'temAppointmentChooseHospital',
      path: '/customer/appointment/temAppointmentChooseHospital',
      component: function(resolve) {
        require(['@/components/customer/appointment/temAppointmentChooseHospital.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'teamAppointmentChooseDate',
      path: '/customer/appointment/teamAppointmentChooseDate',
      component: function(resolve) {
        require(['@/components/customer/appointment/teamAppointmentChooseDate.vue'], resolve)
      },
      meta: { title: '日期选择' }
    },
    {
      name: 'appointmentSucceed',
      path: '/customer/appointment/appointmentSucceed',
      component: function(resolve) {
        require(['@/components/customer/appointment/appointmentSucceed.vue'], resolve)
      },
      meta: { title: '爱肺中心' ,jsApiList: ['closeWindow']}
    },{
      name: 'appointmentCheck',
      path: '/customer/appointment/appointmentCheck',
      component: function(resolve) {
        require(['@/components/customer/appointment/appointmentCheck.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },{
      name: 'noResult',
      path: '/customer/checkappoinmentresult/noResult',
      component: function(resolve) {
        require(['@/components/customer/checkappoinmentresult/noResult'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'resultList',
      path: '/customer/checkappoinmentresult/resultList',
      component: function(resolve) {
        require(['@/components/customer/checkappoinmentresult/resultList'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'checkResult',
      path: '/customer/checkappoinmentresult/checkResult',
      component: function(resolve) {
        require(['@/components/customer/checkappoinmentresult/checkResult'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'checkQuestionnaire',
      path: '/customer/checkappoinmentresult/checkQuestionnaire',
      component: function(resolve) {
        require(['@/components/customer/checkappoinmentresult/checkQuestionnaire'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'appointmentManager',
      path: '/nurse/appointmentManager',
      component: function(resolve) {
        require(['@/components/nurse/appointmentManager.vue'], resolve)
      },
      meta: { title: '护士-预约管理' }
    },
    {
      name: 'newAppoinment',
      path: '/nurse/newAppoinment',
      component: function(resolve) {
        require(['@/components/nurse/newAppoinment.vue'], resolve)
      },
      meta: { title: '新增团队预约' }
    },
    {
      name: 'nurseLogin',
      path: '/nurse/nurseLogin',
      component: function(resolve) {
        require(['@/components/nurse/nurseLogin.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'newAppoinmentCheck',
      path: '/nurse/newAppoinmentCheck',
      component: function(resolve) {
        require(['@/components/nurse/newAppoinmentCheck.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    } ,
    {
      name: 'myReview',
      path: '/customer/review/myReview',
      component: function(resolve) {
        require(['@/components/customer/review/myReview.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'choosePayWay',
      path: '/components/pay/choosePayWay',
      component: function(resolve) {
        require(['@/components/pay/choosePayWay.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },

    {
      name: 'wenQuanForCommittee',
      path: '/customer/signup/wenQuanForCommittee',
      component: function(resolve) {
        require(['@/components/customer/signup/committee.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'choosePeopleType',
      path: '/nurse/setting/choosePeopleType',
      component: function(resolve) {
        require(['@/components/nurse/setting/choosePeopleType.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'bookTime',
      path: '/nurse/setting/bookTime',
      component: function(resolve) {
        require(['@/components/nurse/setting/bookTime.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'chooseTime',
      path: '/nurse/setting/chooseTime',
      component: function(resolve) {
        require(['@/components/nurse/setting/chooseTime.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },
    {
      name: 'yuexiuBooktime',
      path: '/nurse/setting/yuexiuBooktime',
      component: function(resolve) {
        require(['@/components/nurse/setting/yuexiuBooktime.vue'], resolve)
      },
      meta: { title: '爱肺中心' }
    },

  ]
})


