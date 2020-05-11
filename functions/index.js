const functions = require("firebase-functions")
const cors = require('cors')({ origin: true })
const firebase = require('./firebase')
const db = firebase.db
const stripe = firebase.stripe
const domain = firebase.domain

const createSubscription = require('./subscription')
const sendNotification = require('./notification')

const FIVE_THOUSAND_YEN_PLAN = 'FIVE_THOUSAND_YEN_PLAN'
const TEN_THOUSAND_YEN_PLAN = 'TEN_THOUSAND_YEN_PLAN'
const TWENTY_THOUSAND_YEN_PLAN = 'TWENTY_THOUSAND_YEN_PLAN'

exports.createSubscription = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  cors(req, res, async () => {
    await createSubscription(req.body.email, req.body.token, req.body.uid, req.body.ownerId, req.body.plan)
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

    var price
    switch (req.body.plan) {
      case FIVE_THOUSAND_YEN_PLAN:
        price = '5,500'
        break
      case TEN_THOUSAND_YEN_PLAN:
        price = '11,000'
        break
      case TWENTY_THOUSAND_YEN_PLAN:
        price = '22,000'
        break
    }

    var title = `[Truffle.fan] ${owner.shopName} サブスクリプションのご購入が完了しました。`
    var text = `
店舗名：${owner.shopName}
金額：月額${price}円 (税込み)

会員証はこちら
${domain}fan_users/${req.body.ownerId}/${req.body.uid}

提供元：Truffle Technologies KK
お問い合わせ：hello@truffletechnologies.co.jp

* 解約などのお手続きはこちらのメールアドレスにお問い合わせください。
    `
    sendNotification(req.body.email, title, text)

    title = '[Truffle.fan] サブスクリプションが購入されました。'
    text = `
お客様のメールアドレス：${req.body.email}
`
    if (req.body.inviterId) {
      var inviterEmail = await db.collection('FAN_USERS')
        .doc(req.body.inviterId)
        .collection('SECRETS')
        .doc('email')
        .get()
        .then(d => {
          if (d.exists) {
            var data = d.data()
            return data.email
          } else {
            return ''
          }
        })
      if (inviterEmail) text += `招待者のメールアドレス：${inviterEmail}`
    }

    text += `
金額：月額${price}円 (税込み)

お客様の会員証はこちら
${domain}fan_users/${req.body.ownerId}/${req.body.uid}

提供元：Truffle Technologies KK
お問い合わせ：hello@truffletechnologies.co.jp
`

    sendNotification(ownerEmail, title, text)

    var fanUserObj = {
      uid: req.body.uid,
      // email: req.body.email,
      token: req.body.token,
      ownerId: req.body.ownerId,
      plan: req.body.plan,
      createdAt: new Date()
      // iconPhoto: '/img/default-icons/default-icon.png'
    }
    if (req.body.inviterId) fanUserObj.inviterId = req.body.inviterId
    db.collection('FAN_USERS')
      .doc(req.body.uid)
      .set(fanUserObj)

    db.collection('FAN_USERS')
      .doc(req.body.uid)
      .collection('SECRETS')
      .doc('email')
      .set({
        ownerId: req.body.ownerId,
        body: req.body.email,
        createdBy: req.body.uid
      })

    res.status(200).send({ result: 'succeed' }).end()
  }) // cors
})

exports.sendEmailVerification = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  cors(req, res, async () => {
    var title = '[Truffle.fan] アカウントの認証'
    var text = `
会員証が作成されました。

こちらからアカウントを認証してください。
${domain}verify_email/${req.body.ownerId}/${req.body.uid}


提供元：Truffle Technologies KK
お問い合わせ：hello@truffletechnologies.co.jp
    `
    sendNotification(req.body.email, title, text)
    res.status(200).send({ result: 'succeed' }).end()
  }) // cors
})

exports.verifyEmail = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  cors(req, res, async () => {
    console.log("uid", req.body.uid)
    await db.collection('FAN_USERS').doc(req.body.uid).update({ emailIsVerified: true })
    res.status(200).send({ result: 'succeed' }).end()
  }) // cors
})

// exports.sendNotification = functions.https.onRequest((req, res) => {
//   res.set('Access-Control-Allow-Origin', '*')
//   res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
//   res.set('Access-Control-Allow-Headers', 'Content-Type')
//   cors(req, res, async () => {
//     notification.sendNotification()
//     res.status(200).send({ result: 'succeed' }).end()
//   }) // cors
// })
