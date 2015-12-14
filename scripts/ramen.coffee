module.exports = (robot) ->
  robot.respond /(?=.*(ラーメン|らーめん|.*麺.*))/, (msg) ->
  msg.send msg.message.user.text + 'はここがおすすめゴシ！'
  if msg.message.user.text.indexOf('戸越') != -1
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1317/A131712/13003424/'
      'http://tabelog.com/tokyo/A1317/A131712/13094265/'
      'http://tabelog.com/tokyo/A1317/A131712/13066259/'
      'http://tabelog.com/tokyo/A1317/A131712/13153776/'
      'http://tabelog.com/tokyo/A1317/A131710/13162036/'
      'http://tabelog.com/tokyo/A1317/A131712/13154503/'
      'http://tabelog.com/tokyo/A1317/A131712/13042296/'
      'http://tabelog.com/tokyo/A1317/A131712/13058294/'
      'http://tabelog.com/tokyo/A1317/A131712/13127279/'
      'http://tabelog.com/tokyo/A1317/A131712/13018528/'
      'http://tabelog.com/tokyo/A1317/A131712/13158309/'
      'http://tabelog.com/tokyo/A1317/A131712/13147197/'
    ]
  else if msg.message.user.text.indexOf('池袋') != -1
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1317/A131712/13003424/'
      'http://tabelog.com/tokyo/A1317/A131712/13094265/'
      'http://tabelog.com/tokyo/A1317/A131712/13066259/'
      'http://tabelog.com/tokyo/A1317/A131712/13153776/'
      'http://tabelog.com/tokyo/A1317/A131710/13162036/'
      'http://tabelog.com/tokyo/A1317/A131712/13154503/'
      'http://tabelog.com/tokyo/A1317/A131712/13042296/'
      'http://tabelog.com/tokyo/A1317/A131712/13058294/'
      'http://tabelog.com/tokyo/A1317/A131712/13127279/'
      'http://tabelog.com/tokyo/A1317/A131712/13018528/'
      'http://tabelog.com/tokyo/A1317/A131712/13158309/'
      'http://tabelog.com/tokyo/A1317/A131712/13147197/'
    ]
  else if msg.message.user.text.indexOf('新宿') != -1
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1304/A130401/13141542/'
      'http://tabelog.com/tokyo/A1304/A130401/13090261/'
      'http://tabelog.com/tokyo/A1304/A130401/13054766/'
      'http://tabelog.com/tokyo/A1304/A130401/13104460/'
      'http://tabelog.com/tokyo/A1304/A130401/13165665/'
      'http://tabelog.com/tokyo/A1304/A130401/13041214/'
      'http://tabelog.com/tokyo/A1304/A130401/13134209/'
      'http://tabelog.com/tokyo/A1304/A130401/13178753/'
      'http://tabelog.com/tokyo/A1304/A130401/13138659/'
      'http://tabelog.com/tokyo/A1304/A130401/13137361/'
      'http://tabelog.com/tokyo/A1304/A130401/13141446/'
      'http://tabelog.com/tokyo/A1304/A130401/13049537/'
      'http://tabelog.com/tokyo/A1304/A130401/13045287/'
    ]
  else
    msg.send 'おすすめは今探索隊が調査中ゴシ！'
