let axios = require('axios')
    
exports.getUserInfo = getUserInfo;
exports.getGeocoderAddress = getGeocoderAddress;

function getUserInfo(req, res) {
    let params = {
        username: req.params.username
    };
    res.send(userdata)
}

function getGeocoderAddress(req, res) {
    let url = "http://apis.map.qq.com/ws/geocoder/v1";
    axios.get(url,{params:req.query}).then((response) => {
        res.send(response.data);
    });
}
