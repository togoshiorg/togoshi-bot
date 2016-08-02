# togoshi-bot

デザイン部FEチームで開発しているSlackBotです。

* hubot
* ES2015(babel)
* cron

* heroku

# 開発のしかた

`src` ディレクトリに実行するscriptのソースファイルが入っています。
ここのファイルを編集することで、機能追加・修正が可能です。

`npm run build` を実行することで、babelが走り実行可能なjsファイルとして `build` ディレクトリに生成されます。

（※デプロイ先サーバー上でbabelが走るようにscripts設定がされているため、build配下ファイルはコミットする必要はありません。）

# ローカルでの動作確認方法

`.env` ファイルにFEチームのSlackAPITokenが記載されているので、 `heroku local web` と実行するだけでSlackと紐付いた状態でローカルにbotが立ち上がります。

（※heroku上の既存のbotが常時実行されているため、見た目上は変化ありません。）

# デプロイ

herokuリポジトリのmasterブランチに対してpushすることでデプロイされます。

`https://git.heroku.com/togoshi-bot.git`
