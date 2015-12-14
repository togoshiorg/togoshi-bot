module.exports = (robot) ->

  robot.response /ラーメン|らーめん|.*麺.*/, (msg) ->
  msg.send msg.message.text + 'はここがおすすめゴシ！'
  if msg.message.text.indexOf('戸越') != -1
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
  else if msg.message.text.indexOf('新宿') != -1
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


  ###
  robot.hear /(?=.*戸越)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '戸越のおすすめはここゴシ！'
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1317/A131712/13003424/',
      'http://tabelog.com/tokyo/A1317/A131712/13094265/',
      'http://tabelog.com/tokyo/A1317/A131712/13066259/',
      'http://tabelog.com/tokyo/A1317/A131712/13153776/',
      'http://tabelog.com/tokyo/A1317/A131710/13162036/',
      'http://tabelog.com/tokyo/A1317/A131712/13154503/',
      'http://tabelog.com/tokyo/A1317/A131712/13042296/',
      'http://tabelog.com/tokyo/A1317/A131712/13058294/',
      'http://tabelog.com/tokyo/A1317/A131712/13127279/',
      'http://tabelog.com/tokyo/A1317/A131712/13018528/',
      'http://tabelog.com/tokyo/A1317/A131712/13158309/',
      'http://tabelog.com/tokyo/A1317/A131712/13147197/'
    ]

  robot.hear /(?=.*戸越)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '戸越のおすすめはここゴシ！'
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1317/A131712/13003424/',
      'http://tabelog.com/tokyo/A1317/A131712/13094265/',
      'http://tabelog.com/tokyo/A1317/A131712/13066259/',
      'http://tabelog.com/tokyo/A1317/A131712/13153776/',
      'http://tabelog.com/tokyo/A1317/A131710/13162036/',
      'http://tabelog.com/tokyo/A1317/A131712/13154503/',
      'http://tabelog.com/tokyo/A1317/A131712/13042296/',
      'http://tabelog.com/tokyo/A1317/A131712/13058294/',
      'http://tabelog.com/tokyo/A1317/A131712/13127279/',
      'http://tabelog.com/tokyo/A1317/A131712/13018528/',
      'http://tabelog.com/tokyo/A1317/A131712/13158309/',
      'http://tabelog.com/tokyo/A1317/A131712/13147197/'
    ]

  robot.hear /(?=.*池袋)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '池袋のおすすめはここゴシ！'
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1305/A130501/13003927/',
      'http://tabelog.com/tokyo/A1305/A130501/13019216/',
      'http://tabelog.com/tokyo/A1305/A130501/13183280/',
      'http://tabelog.com/tokyo/A1305/A130501/13157738/',
      'http://tabelog.com/tokyo/A1305/A130501/13003932/',
      'http://tabelog.com/tokyo/A1305/A130501/13005588/',
      'http://tabelog.com/tokyo/A1305/A130501/13173818/',
      'http://tabelog.com/tokyo/A1305/A130501/13003877/',
      'http://tabelog.com/tokyo/A1305/A130501/13136428/',
      'http://tabelog.com/tokyo/A1305/A130501/13184103/',
      'http://tabelog.com/tokyo/A1305/A130501/13147507/',
      'http://tabelog.com/tokyo/A1305/A130501/13171370/',
      'http://tabelog.com/tokyo/A1305/A130501/13016969/',
      'http://tabelog.com/tokyo/A1305/A130501/13169118/',
      'http://tabelog.com/tokyo/A1305/A130501/13175970/',
      'http://tabelog.com/tokyo/A1305/A130501/13175267/',
      'http://tabelog.com/tokyo/A1305/A130501/13045828/'
    ]

  robot.hear /(?=.*新宿)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '新宿のおすすめはここゴシ！'
    msg.send msg.random [
      'http://tabelog.com/tokyo/A1304/A130401/13141542/',
      'http://tabelog.com/tokyo/A1304/A130401/13090261/',
      'http://tabelog.com/tokyo/A1304/A130401/13054766/',
      'http://tabelog.com/tokyo/A1304/A130401/13104460/',
      'http://tabelog.com/tokyo/A1304/A130401/13165665/',
      'http://tabelog.com/tokyo/A1304/A130401/13041214/',
      'http://tabelog.com/tokyo/A1304/A130401/13134209/',
      'http://tabelog.com/tokyo/A1304/A130401/13178753/',
      'http://tabelog.com/tokyo/A1304/A130401/13138659/',
      'http://tabelog.com/tokyo/A1304/A130401/13137361/',
      'http://tabelog.com/tokyo/A1304/A130401/13141446/',
      'http://tabelog.com/tokyo/A1304/A130401/13049537/',
      'http://tabelog.com/tokyo/A1304/A130401/13045287/'
    ]

  robot.hear /(?=.*渋谷)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '渋谷のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*恵比寿)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '恵比寿のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*金沢)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '金沢のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*加賀)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '加賀のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*吉祥寺)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '吉祥寺のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*幡ヶ谷)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '幡ヶ谷のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*成増)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '成増のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']

  robot.hear /(?=.*志木)(?=.*(ラーメン|らーめん|.*麺.*)).*/, (msg) ->
    msg.send '志木のおすすめは今探索隊が調査中ゴシ！'
    #msg.send msg.random ['今探索隊が調査中ごし！']
  ###
