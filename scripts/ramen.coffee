module.exports = (robot) ->

  robot.respond /(?=.*(ラーメン|らーめん|.*麺.*))/, (msg) ->
    if msg.message.text.indexOf('戸越') != -1
      msg.send '戸越ではここがおすすめゴシ！'
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
    else if msg.message.text.indexOf('池袋') != -1
      msg.send '池袋ではここがおすすめゴシ！'
      msg.send msg.random [
        'http://tabelog.com/tokyo/A1305/A130501/13003927/'
        'http://tabelog.com/tokyo/A1305/A130501/13019216/'
        'http://tabelog.com/tokyo/A1305/A130501/13183280/'
        'http://tabelog.com/tokyo/A1305/A130501/13157738/'
        'http://tabelog.com/tokyo/A1305/A130501/13003932/'
        'http://tabelog.com/tokyo/A1305/A130501/13005588/'
        'http://tabelog.com/tokyo/A1305/A130501/13173818/'
        'http://tabelog.com/tokyo/A1305/A130501/13003877/'
        'http://tabelog.com/tokyo/A1305/A130501/13136428/'
        'http://tabelog.com/tokyo/A1305/A130501/13184103/'
        'http://tabelog.com/tokyo/A1305/A130501/13147507/'
        'http://tabelog.com/tokyo/A1305/A130501/13171370/'
        'http://tabelog.com/tokyo/A1305/A130501/13016969/'
        'http://tabelog.com/tokyo/A1305/A130501/13169118/'
        'http://tabelog.com/tokyo/A1305/A130501/13175970/'
        'http://tabelog.com/tokyo/A1305/A130501/13175267/'
        'http://tabelog.com/tokyo/A1305/A130501/13045828/'
      ]
    else if msg.message.text.indexOf('新宿') != -1
      msg.send '新宿ではここがおすすめゴシ！'
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
    else if msg.message.text.indexOf('志木') != -1
      msg.send '志木ではここがおすすめゴシ！'
      msg.send msg.random [
        'http://tabelog.com/saitama/A1103/A110302/11028399/'
        'http://tabelog.com/saitama/A1103/A110302/11032129/'
        'http://tabelog.com/saitama/A1103/A110302/11026527/'
        'http://tabelog.com/saitama/A1103/A110302/11009072/'
        'http://tabelog.com/saitama/A1103/A110302/11032313/'
        'http://tabelog.com/saitama/A1103/A110302/11000330/'
        'http://tabelog.com/saitama/A1103/A110302/11023639/'
        'http://tabelog.com/saitama/A1103/A110302/11040024/'
        'http://tabelog.com/saitama/A1103/A110302/11000286/'
      ]
    else
      msg.send 'そこのおすすめは今探索隊が調査中ゴシ！'
