cronJob = require('cron').CronJob
random = require('hubot').Response::random

module.exports = (robot) ->
  ticketClose = new cronJob('0 00 18 * * 5', () ->
    room = room: '#general'
    post = random [
      '<!channel> 今日は花金。チケットクローズよろしくゴシ。'
      '<!channel> 今週もお疲れ様ゴシ。金曜日なのでチケットクローズするゴシ。'
      '<!channel> 今日はチケットクローズしてほしいゴシ…'
      '<!channel> Today is Friday, so please close solved ticket!'
    ]
    robot.send room, post
    start: true
    timeZone: 'Asia/Tokyo'
  )
  ticketClose.start()

  ordinary = new cronJob('0 0 19 * * 1-5', () ->
    room = room: '#general'
    post = random [
      '<!channel> 19時になったゴシ。業務が終わった方は早く帰るゴシ。まだまだ仕事がある方はもうちょっと頑張ろうゴシ！'
      '<!channel> 19時になりました。これからお帰りの方も、残業する方もお疲れ様です。'
      '<!channel> 19時…ゴシ…ﾊﾞﾀｯ'
      '<!channel> お疲れ様ゴシ。もう19時になったゴシ。早いゴシねぇ…'
      '<!channel> http://stamp.bokete.jp/21702992.png'
      '<!channel> http://serif.hatelabo.jp/images/cache/7cabedfe81e8e328aa930388fad4dbe95fe36aa9/c5673d089fdbb895ce57518bd7502a298a6f42aa.gif'
    ]
    robot.send room, post
    start: true
    timeZone: 'Asia/Tokyo'
  )
  ordinary.start()

  companyDailyClose = new cronJob('0 0 19 10 * *', () ->
    room = room: '#general'
    post = random [
      '<!channel> 明日はカンパニーの月次提出日ゴシ。日時提出は今のうち終わらせておくゴシ。'
    ]
    robot.send room, post
    start: true
    timeZone: 'Asia/Tokyo'
  )
  companyDailyClose.start()

  companyMonthlyClose = new cronJob('0 55 9 11 * *', () ->
    room = room: '#general'
    post = random [
      '<!channel> 今日はカンパニーの月次提出日ゴシ。朝のうちに出しておくゴシ。'
    ]
    robot.send room, post
    start: true
    timeZone: 'Asia/Tokyo'
  )
  companyMonthlyClose.start()

  newyearsEve = new cronJob('0 0 23 31 12 *', () ->
    room = room: '#general'
    post = '<!channel> 今年もお世話になったゴシ。みなさま良いお年をゴシ。さて、「笑ってはいけない」見よっと。'
    robot.send room, post
    start: true
    timeZone: 'Asia/Tokyo'
  )
  newyearsEve.start()

  newyear = new cronJob('0 0 8 1 1 *', () ->
    room = room: '#general'
    post = '<!channel> あけましておめでとうゴシ。今年もよろしくお願いしまゴシ。'
    robot.send room, post
    start: true
    timeZone: 'Asia/Tokyo'
  )
  newyear.start()
