let appcache = {
  getPeopleType: function () {
    let result = window.localStorage.getItem('peopletype')
    return result;
  },
  setPeopleType: function (type) {
    window.localStorage.setItem('peopletype', type)
  },
  getHospitalId: function () {
    let result = window.localStorage.getItem('hospitalId')
    return result;
  },
  setHospitalId: function (type) {
    window.localStorage.setItem('hospitalId', type)
  },
  getUserId: function () {
    let result = window.localStorage.getItem('userId')
    return result;
  },
  setUserId: function (type) {
    window.localStorage.setItem('userId', type)
  },
  getPrepareDay: function () {
    let result = window.localStorage.getItem('prepareDay')
    return result;
  },
  setPrepareDay: function (type) {
    window.localStorage.setItem('prepareDay', type)
  },
  getPrepareTime: function () {
    let result = window.localStorage.getItem('prepareTime')
    return result;
  },
  setPrepareTime: function (type) {
    window.localStorage.setItem('prepareTime', type)
  },
  getOrderId: function () {
    let result = window.localStorage.getItem('orderId')
    return result;
  },
  setOrderId: function (type) {
    window.localStorage.setItem('orderId', type)
  },
  getStreetId: function () {
    let result = window.localStorage.getItem('streetId')
    return result;
  },
  setStreetId: function (type) {
    window.localStorage.setItem('streetId', type)
  },
  getCommitteeId: function () {
    let result = window.localStorage.getItem('CommitteeId')
    return result;
  },
  setCommitteeId: function (type) {
    window.localStorage.setItem('CommitteeId', type)
  },

  getSetupPeoppleId: function () {
    let result = window.localStorage.getItem('SetupPeoppleId')
    return result;
  },
  setSetupPeoppleId: function (type) {
    window.localStorage.setItem('SetupPeoppleId', type)
  },

  getsettingStreetId: function () {
    let result = window.localStorage.getItem('setsettingStreetId')
    return result;
  },
  setsettingStreetId: function (type) {
    window.localStorage.setItem('setsettingStreetId', type)
  }


  // getHasReLoaded: function() {
  //    let result = window.localStorage.getItem('hasreloaded')
  //    return result === 'true'
  // },
  // setHasReLoaded: function(hasReLoaded) {
  //   window.localStorage.setItem('hasreloaded',hasReLoaded)
  // },
  // getOrderqueryCache: function() {
  //    let result = window.localStorage.getItem('orderquerycache')
  //    if(result){
  //      return JSON.parse(result)
  //    }
  //    return null;
  // },
  // setOrderqueryCache: function(jsondata) {
  //   let result = JSON.stringify(jsondata)
  //   window.localStorage.setItem('orderquerycache',result)
  // },
  // getOrderListCache: function() {
  //    let result = window.localStorage.getItem('orderlistcache')
  //    if(result){
  //      return JSON.parse(result)
  //    }
  //    return null;
  // },
  // setOrderListCache: function(jsondata) {
  //   let result = JSON.stringify(jsondata)
  //   window.localStorage.setItem('orderlistcache',result)
  // }


  , getAppoinmentInfo: function () {
    let result = window.localStorage.getItem('appoinmentinfo')
    if (result) {
      return JSON.parse(result)
    }
    return null;
  },
  setAppoinmentInfo: function (jsondata) {
    let result = JSON.stringify(jsondata)
    window.localStorage.setItem('appoinmentinfo', result)
  }

}
export default {
  install(Vue) {
    Vue.prototype.$AppCacheKey = appcache
  }
}
