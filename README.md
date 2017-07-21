# togoshi-bot

[![CircleCI](https://circleci.com/gh/usagi-f/togoshi-bot.svg?style=shield)](https://circleci.com/gh/usagi-f/togoshi-bot)

> a private hubot program

## Main Dependencies

* hubot
* babel
* heroku

## Installation

```
yarn
```

## Contribution

The script file in `src/` directory. There are two ways to check script.

### 1. Unit Testing

Please separate script into functions as much as possible. By doing so you can Unit Test using mocha.

The test file in `test/` directory.

```
yarn test
```

### 2. Local web

If you have an `.env` file, it can be run in Slack.

However, you need the `heroku` command for that.

```
heroku local web
```

## Deployment

It's hosted by heroku. go there exactly.
