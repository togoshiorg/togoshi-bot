cronJob = require('cron').CronJob
module.exports = (robot) ->
  ticketClose = new cronJob('0 50 18 * * 5', () ->
    room = room: '#general'
    robot.send room, msg.random [
      '@channel 今日は花金。チケットクローズよろしくゴシ。'
    ]
  , null, true, 'Asia/Tokyo')
  ticketClose.start()

  ordinary = new cronJob('0 0 19 * * 1-5', () ->
    room = room: '#general'
    robot.send room, msg.random [
      '@channel 定時になったゴシ。リソース:normal:の人は早く帰るゴシ。'
    ]
  , null, true, 'Asia/Tokyo')
  ordinary.start()

  newyearsEve = new cronJob('0 0 23 31 12 *', () ->
    robot.messageRoom '#general', '@channel 今年もお世話になったゴシ。みなさま良いお年をゴシ。さて、「笑ってはいけない」見よっと。'
  , null, true, 'Asia/Tokyo')
  NewYearsEve.start()

  newyear = new cronJob('0 0 7 1 1 *', () ->
    robot.messageRoom '#general', '@channel あけましておめでとうゴシ。今年もよろしくお願いしまゴシ。'
  , null, true, 'Asia/Tokyo')
  ordinary.start()

  test = new cronJob('0 * * * * *', () ->
    room = room: '#sandbox'
    robot.send room, '@ito-mutsumi テストだゆ'
  , null, true, 'Asia/Tokyo')
  test.start()

