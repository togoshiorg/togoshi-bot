cron = require('cron').CronJob
module.exports = (robot) ->
  new cron('0 50 18 * * 5', () ->
    robot.messageRoom '#general', '今日は花金。チケットクローズよろしくゴシ。'
  , null, true, 'Asia/Tokyo').start()
