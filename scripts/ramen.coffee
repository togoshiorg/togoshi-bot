# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = (robot) ->

  # robot.hear /badger/i, (res) ->
  #   res.send "Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS"
  #
  # robot.respond /open the (.*) doors/i, (res) ->
  #   doorType = res.match[1]
  #   if doorType is "pod bay"
  #     res.reply "I'm afraid I can't let you do that."
  #   else
  #     res.reply "Opening #{doorType} doors"
  #
  # robot.hear /I like pie/i, (res) ->
  #   res.emote "makes a freshly baked pie"
  #
  # lulz = ['lol', 'rofl', 'lmao']
  #
  # robot.respond /lulz/i, (res) ->
  #   res.send res.random lulz
  #
  # robot.topic (res) ->
  #   res.send "#{res.message.text}? That's a Paddlin'"
  #
  #
  # enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  # leaveReplies = ['Are you still there?', 'Target lost', 'Searching']
  #
  # robot.enter (res) ->
  #   res.send res.random enterReplies
  # robot.leave (res) ->
  #   res.send res.random leaveReplies
  #
  # answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
  #
  # robot.respond /what is the answer to the ultimate question of life/, (res) ->
  #   unless answer?
  #     res.send "Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again"
  #     return
  #   res.send "#{answer}, but what is the question?"
  #
  # robot.respond /you are a little slow/, (res) ->
  #   setTimeout () ->
  #     res.send "Who you calling 'slow'?"
  #   , 60 * 1000
  #
  # annoyIntervalId = null
  #
  # robot.respond /annoy me/, (res) ->
  #   if annoyIntervalId
  #     res.send "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
  #     return
  #
  #   res.send "Hey, want to hear the most annoying sound in the world?"
  #   annoyIntervalId = setInterval () ->
  #     res.send "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
  #   , 1000
  #
  # robot.respond /unannoy me/, (res) ->
  #   if annoyIntervalId
  #     res.send "GUYS, GUYS, GUYS!"
  #     clearInterval(annoyIntervalId)
  #     annoyIntervalId = null
  #   else
  #     res.send "Not annoying you right now, am I?"
  #
  #
  # robot.router.post '/hubot/chatsecrets/:room', (req, res) ->
  #   room   = req.params.room
  #   data   = JSON.parse req.body.payload
  #   secret = data.secret
  #
  #   robot.messageRoom room, "I have a secret: #{secret}"
  #
  #   res.send 'OK'
  #
  # robot.error (err, res) ->
  #   robot.logger.error "DOES NOT COMPUTE"
  #
  #   if res?
  #     res.reply "DOES NOT COMPUTE"
  #
  # robot.respond /have a soda/i, (res) ->
  #   # Get number of sodas had (coerced to a number).
  #   sodasHad = robot.brain.get('totalSodas') * 1 or 0
  #
  #   if sodasHad > 4
  #     res.reply "I'm too fizzy.."
  #
  #   else
  #     res.reply 'Sure!'
  #
  #     robot.brain.set 'totalSodas', sodasHad+1
  #
  # robot.respond /sleep it off/i, (res) ->
  #   robot.brain.set 'totalSodas', 0
  #   res.reply 'zzzzz'

  robot.respond /^(?=.*戸越)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "戸越のおすすめはここゴシ！"
    msg.send msg.random ["http://tabelog.com/tokyo/A1317/A131712/13003424/", "http://tabelog.com/tokyo/A1317/A131712/13094265/", "http://tabelog.com/tokyo/A1317/A131712/13066259/", "http://tabelog.com/tokyo/A1317/A131712/13153776/", "http://tabelog.com/tokyo/A1317/A131710/13162036/", "http://tabelog.com/tokyo/A1317/A131712/13154503/", "http://tabelog.com/tokyo/A1317/A131712/13042296/", "http://tabelog.com/tokyo/A1317/A131712/13058294/", "http://tabelog.com/tokyo/A1317/A131712/13127279/", "http://tabelog.com/tokyo/A1317/A131712/13018528/", "http://tabelog.com/tokyo/A1317/A131712/13158309/", "http://tabelog.com/tokyo/A1317/A131712/13147197/"]

  robot.respond /^(?=.*池袋)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "池袋のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*新宿)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "新宿のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*渋谷)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "渋谷のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*恵比寿)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "恵比寿のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*金沢)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "金沢のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*加賀)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "加賀のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*吉祥寺)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "吉祥寺のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

  robot.respond /^(?=.*幡ヶ谷)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "幡ヶ谷のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]

robot.respond /^(?=.*成増)(?=.*(ラーメン|らーめん|.*麺.*)).*$/, (msg) ->
    msg.send "成増のおすすめはここゴシ！"
    msg.send msg.random ["tabelog.com/tokyo/A1305/A130501/13003927/"]
