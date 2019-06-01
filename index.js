/**
 * @author PMH Studio
 * @version 0.3.0
 * @module Bot
 */

const discord = require('discord.js')


class Quiz {
  /**
   * 퀴즈를 만듭니다
   * @param {Object} data 퀴즈 데이터 객체
   * @param {String} data.question 퀴즈 문제
   * @param {String} data.explanation 퀴즈 풀이
   * @param {String} data.image 퀴즈 이미지 Url (선택)
   * @param {Boolean} data.awnser 정답이 O 면 true X면 false
   */
  constructor(data) {
    this.question = data.question
    this.explanation = data.explanation
    this.image = data.image
    this.awnser = data.awnser
  }

  /**
   * 퀴즈 데이터를 수정합니다
   * @param {Object} data 퀴즈 데이터 객체
   * @param {String} data.question 퀴즈 문제
   * @param {String} data.explanation 퀴즈 풀이
   * @param {String} data.image 퀴즈 이미지 Url (선택)
   * @param {Boolean} data.awnser 정답이 O 면 true X면 false
   */
  changeData(data) {
    this.question = data.question
    this.explanation = data.explanation
    this.image = data.image
    this.awnser = data.awnser
  }

  
  /**
   * 퀴즈 문제를 수정합니다
   * @param {String} question 퀴즈 문제
   */
  changeQuestion(question) {
    this.question = question
  }


  /**
   * 퀴즈 풀이를 수정합니다
   * @param {String} explanation 퀴즈 풀이
   */
  changeExplanation(explanation) {
    this.explanation = explanation
  }

  /**
   * 퀴즈 문제를 수정합니다
   * @param {Boolean} awnser 정답이 O 면 true X면 false
   */
  changeAwnser(awnser) {
    this.awnser = awnser
  }
}

class QuizCollection {
  /**
   * 퀴즈들을 모아둔 콜렉션을 만듭니다
   * @param {Array.<{question: String, explanation: String, awnser: boolean}> | Array.<Quiz>} collect 퀴즈들의 배열
   */
  constructor(collect) {
    this.quiz = []
    collect.forEach((v, i) => {
      this.quiz[i] = {}
      if (v instanceof Quiz || typeof collect === "object") {
        this.quiz[i].question = v.question || '문제가 비어있습니다'
        this.quiz[i].explanation = v.explanation || '풀이가 비어있습니다'
        this.quiz[i].awnser = v.awnser || false
      }
    })
  }

  /**
   * 퀴즈 콜렉션에 퀴즈 하나를 추가합니다
   * @param {Object|Quiz} quiz 
   */
  addQuiz(quiz) {
    this.quiz[this.quiz.length] = {
      question: quiz.question,
      explanation: quiz.explanation,
      awnser: quiz.awnser
    }
  }

  /**
   * 퀴즈 콜렉션을 배열로 변환합니다
   * @returns {Array}
   */
  toArray() {
    let temp = []
    this.quiz.forEach((v, i) => {
      temp[i] = new Quiz({
        question: v.question,
        explanation: v.explanation,
        awnser: v.awnser
      })
    })
    return temp
  }
}

class Bot {
  /**
   * 
   * 퀴즈봇을 만듭니다
   *  
   * @param {Object} config
   * @param {String} config.name 봇의 이름
   * @param {String} config.token 봇의 토큰
   * @param {String} config.prefix 봇의 호출명
   * @param {String} config.issueUrl 봇의 깃헙 이슈 Url
   * @param {String} config.activity 봇의 상태표시
   * @returns {Bot}
   * 
   */
  constructor(config) {
    this.name = config.name
    this.token = config.token
    this.prefix = config.prefix
    this.issueUrl = config.issueUrl
    this.activity = config.activity || null
    return this
  }

  /**
   * 봇의 설정을 변경합니다
    * 
    * @param {Object} config
    * @param {String} config.name 봇의 이름
    * @param {String} config.token 봇의 토큰
    * @param {String} config.prefix 봇의 호출명
    * @param {String} config.issueUrl 봇의 깃헙 이슈 Url
    * @param {String} config.activity 봇의 상태표시
    * @returns {Bot}
    * 
    */
  setConfig(config) {
    this.name = config.name
    this.token = config.token
    this.prefix = config.prefix
    this.issueUrl = config.issueUrl
    this.activity = config.activity || null
    return this
  }

  /**
   * 봇의 토큰을 변경합니다
   * @param {String} token 봇의 토큰
   */
  setToken(token) {
    this.token = token
  }

  /**
   * 봇의 호출명을 변경합니다
   * @param {String} prefix 봇의 호출명
   */
  setPrefix(prefix) {
    this.prefix = prefix
  }

  /**
   * 봇의 상태 표시를 변경합니다
   * @param {String} activity 봇의 상태 표시
   */
  setActivity(activity) {
    this.activity = activity
    if (this.client) this.client.user.setActivity(activity)
  }

  /**
   * 봇의 퀴즈들을 설정합니다
   * @param {QuizCollection | Array.<Quiz> | Array.<{question: String, explanation: String, awnser: boolean}>}
   */
  setQuiz(quizs) {
    if (quizs instanceof QuizCollection) {
      this.quizCollection = quizs
    } else {
      this.quizCollection = new QuizCollection(quizs)
    }
  }

  /**
   * 설정된 봇을 적용합니다
   * @returns {Bot}
   */
  deploy() {
    if (this.client) this.client.destroy()

    if (!this.token) {
      console.error(new Error('주어진 토큰이 잘못되었습니다'))
    } else {
      this.client = new discord.Client()
      this.client.login(this.token)
      
      this.client.on('ready', () => {
        this.client.user.setActivity(this.activity || this.prefix + '를 입력해 퀴즈 풀기')
        console.log(this.client.user.username + ' is Up!\n')
      })
  
      this.client.on('message', (msg) => {
        if (msg.author.id === this.client.user.id) { return }
        console.log('Message Detected')
      
        let filter = (reaction, user) => (reaction.emoji.name === '⭕' || reaction.emoji.name === '❌') && user.id === msg.author.id
      
        // Message Caculation.
        let msgArray = msg.content.split(this.prefix.split('')[this.prefix.length])
        if (msgArray[0] === this.prefix.split(this.prefix.split('')[this.prefix.length])[0]) {
          let quizNum
          if (!msgArray[1]) {
            quizNum = Math.floor(Math.random() * this.quizCollection.quiz.length)
          } else {
            if (parseInt(msgArray[1]) < this.quizCollection.quiz.length) {
              quizNum = msgArray[1]
            } else {
              let quizNumberNotExist = new discord.RichEmbed()
                .setColor(0xff0000)
                .addField('퀴즈 No. ' + msgArray[1] + '(을)를 찾을 수 없습니다', '퀴즈는 No. ' + (this.quizCollection.quiz.length - 1) + '까지만 존재합니다')
              return msg.channel.send(quizNumberNotExist)
            }
          }
          let quizEmbed = new discord.RichEmbed()
            .setColor(0x0000ff)
            .setAuthor(msg.author.username + '님이 ' + this.name + '를 풀고있습니다', msg.author.displayAvatarURL)
            .setTitle('Quiz No.' + quizNum)
            .addField('Q. ' + this.quizCollection.quiz[quizNum].question.replace('{username}', msg.author.username), '맞으면 O, 틀리면 X를 누르세요!')
          if (this.quizCollection.quiz[quizNum].image) {
            quizEmbed.setImage(this.quizCollection.quiz[quizNum].image)
          }
          msg.channel.send(quizEmbed).then((th) => {
            if (Math.floor(Math.random() * 1)) {
              th.react('⭕')
              setTimeout(() => {
                th.react('❌')
              }, 1000)
            } else {
              th.react('❌')
              setTimeout(() => {
                th.react('⭕')
              }, 1000)
            }
            th.awaitReactions(filter, {
              max: 1
            }).then((collected) => {
                let QuizAwnser
                if (this.quizCollection.quiz[quizNum].awnser === true) {
                  QuizAwnser = '⭕'
                } else if (this.quizCollection.quiz[quizNum].awnser === false) {
                  QuizAwnser = '❌'
                }
      
                if (collected.array()[0].emoji.name === QuizAwnser) {
                  let quizCorrectEmbed = new discord.RichEmbed()
                    .setColor(0x00ff00)
                    .setDescription('[문제, 정답, 풀이 오류신고, 수정요청, 추가신청](' + this.issueUrl + ')')
                    .setAuthor(msg.author.username + '님이 ' + this.name + '를 맞추셨습니다!', msg.author.displayAvatarURL)
                    .setTitle('Quiz No.' + quizNum)
                    .addField('Q. ' + this.quizCollection.quiz[quizNum].question.replace('{username}', msg.author.username), '**A.** ' + this.quizCollection.quiz[quizNum].explanation)
                  if (this.quizCollection.quiz[quizNum].image) {
                    quizCorrectEmbed.setImage(this.quizCollection.quiz[quizNum].image)
                  }
                  th.edit(quizCorrectEmbed)
                } else {
                  let quizNotCorrectEmbed = new discord.RichEmbed()
                    .setColor(0xff0000)
                    .setDescription('[문제, 정답, 풀이 오류신고, 수정요청, 추가신청](' + this.issueUrl + ')')
                    .setAuthor(msg.author.username + '님이 ' + this.name + '를 풀지못하셨습니다', msg.author.displayAvatarURL)
                    .setTitle('Quiz No.' + quizNum)
                    .addField('Q. ' + this.quizCollection.quiz[quizNum].question.replace('{username}', msg.author.username), '**A.** ' + this.quizCollection.quiz[quizNum].explanation)
                  if (this.quizCollection.quiz[quizNum].image) {
                    quizNotCorrectEmbed.setImage(this.quizCollection.quiz[quizNum].image)
                  }
                  th.edit(quizNotCorrectEmbed)
                }
            })
          })
        }
      })

      this.client.on('disconnect', () => {
        this.client = null
      })
    }

    return this
  }

  /**
   * Deploy된 봇을 종료합니다
   * @returns {void}
   */
  kill() {
    if (this.client) this.client.destroy()
    return
  }
}

module.exports.Bot = Bot
module.exports.Quiz = Quiz
module.exports.QuizCollection = QuizCollection
