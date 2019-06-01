let quizmodule = require('discord-quiz-bot')

let bot = new quizmodule.Bot({
  name: '테스트퀴즈',
  token: 'NTgwNzQ2NTg0MzM4NDY0NzY5.XPFCPQ.veOQjifzLGFeefyKE-aW441G-fs',
  prefix: 'moduleTest!',
  issueUrl: 'https://github.com/PMHStudio/DiscordQuizBot/issues',
  activity: '자작 모듈 테스팅중',
  quizs: [{
      "language": "js",
      "question": "JavaScript에서 세미콜론은 의무입니다\n즉, 문장을 끝넬경우 무조건 적어야 합니다",
      "explanation": "선택사항입니다, 예시로, JavaScript Standard Style에서는 세미콜론이 없어야 한다는 규칙이 있습니다! (예외사항도 있음)\n[정말](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding) [없어도](http://inimino.org/~inimino/blog/javascript_semicolons) [됩니다](https://www.youtube.com/watch?v=gsfbh17Ax9I)",
      "awnser": false
    },
    {
        "language": "genaral",
        "question": "{username}(은)는 심심하여 아래의 그림과 같은 논리게이트를 가지고 놀고 있었다\n이때, 그가 A부분에 전기를 흘려보내고 B부분에는 전기를 흘려보내지 않는다면, Q에는 전기가 흐르는가?",
        "explanation": "흐르지 않습니다, 이 논리게이트는 [And 게이트](https://ko.wikipedia.org/wiki/AND_%EA%B2%8C%EC%9D%B4%ED%8A%B8)로서 A와 B부분이 전부 전기가 흘러야 Q에 전기가 흐르게 됩니다",
        "awnser": false,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/AND_ANSI_Labelled.svg/1920px-AND_ANSI_Labelled.svg.png"
    }
  ]
})

bot.deploy()
