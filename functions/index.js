const functions = require("firebase-functions")
const cors = require('cors')({ origin: true })
const firebase = require('./firebase')
const db = firebase.db
const stripe = firebase.stripe

const createSubscription = require('./subscription')
const sendNotification = require('./notification')

exports.createSubscription = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  cors(req, res, async () => {
    await createSubscription(req.body.email, req.body.token, req.body.uid, req.body.ownerId)

    console.log("req.body.ownerId", req.body.ownerId)
    var owner = await db.collection('OWNERS').doc(req.body.ownerId).get().then(d => { return d.data() })
    var ownerEmail = await db.collection('OWNERS')
      .doc(req.body.ownerId)
      .collection('SECRETS')
      .doc('email')
      .get()
      .then(d => {
        var data = d.data()
        return data.body
      })
    console.log('ownerEmail', ownerEmail)

    var title = `${owner.shopName}サブスクリプションのご購入が完了しました。`
    var text = `
店舗名：${owner.shopName}
金額：月額１万円


提供元：AppSocially株式会社
お問い合わせ：hello@appsocial.ly

* 解約などのお手続きはこちらのメールアドレスにお問い合わせください。
    `
    sendNotification(req.body.email, title, text)

    title = 'サブスクリプションが購入されました。'
    text = `
お客様のメールアドレス：${ownerEmail}
`
    if (req.body.inviterId) {
      var inviterEmail = await db.collection('FAN_USERS')
        .doc(req.body.inviterId)
        .get()
        .then(d => {
          var data = d.data()
          return data.email
        })
      text += `招待者のメールアドレス：${inviterEmail}`
    }

    text += `
金額：月額１万円


提供元：AppSocially株式会社
お問い合わせ：hello@appsocial.ly
`

    sendNotification(ownerEmail, title, text)

    var fanUserObj = {
      uid: req.body.uid,
      email: req.body.email,
      token: req.body.token
    }
    if (req.body.inviterId) fanUserObj.inviterId = req.body.inviterId
    db.collection("FAN_USERS")
      .doc(req.body.uid)
      .set(fanUserObj)
    
    res.status(200).send({ result: "succeed" }).end()
  }) // cors
})

exports.sendNotification = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  cors(req, res, async () => {
    notification.sendNotification()
    res.status(200).send({ result: "succeed" }).end()
  }) // cors
})
