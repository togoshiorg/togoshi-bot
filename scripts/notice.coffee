cron = require('cron').CronJob
module.exports = (robot) ->
  new cron('0 * * * * 1-5', () ->
    robot.messageRoom '#sandbox', 'cronTest'
  , null, true, 'Asia/Tokyo').start()
