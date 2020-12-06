const format = require('date-fns/format')
const ja = require('date-fns/locale/ja')
const nodemailer = require("nodemailer")

const firebase = require("../firebase.js")
const db = firebase.db

// const gmailEmail = "appsocially.common@gmail.com"
// const gmailPassword = "chatcenter"

const gmailEmail = "truffletechnologies@gmail.com"
const gmailPassword = "3rlarDjs"

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

var sendNotification = async (email, subject, text) => {

  console.log(`send ${text} \n`)
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: email,
    subject,
    text
  }

  // 管理者へのメール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`)
    }
    return console.log("send success.")
  })
}

// sendNotification('ko.ishihara@chatcenter.io', 'title', 'body')

module.exports = sendNotification