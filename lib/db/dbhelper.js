
exports.insertTicketToken = insertTicketToken;
exports.getTicketToken = getTicketToken;
exports.insertAccessToken = insertAccessToken;
exports.getAccessToken = getAccessToken;

let low = require("lowdb");
let db = low("jssdktoken.json");

db.defaults({token:{}}).write();

function insertTicketToken(ticketToken) {
    db.set('token.ticketToken',ticketToken).write();
}

function getTicketToken() {
    return db.get('token').value().ticketToken;
}

function insertAccessToken(accessToken) {
    db.set('token.accessToken',accessToken).write();
}

function getAccessToken() {
    return db.get('token').value().accessToken;
}