/**
 * @author PMH Studio
 * @version 0.2.0
 * @module Bot
 */

const discord = require('discord.js')

class Bot {
  /**
   * 
   * 퀴즈봇 Constructor
   * 
   * @param {Object} config
   * @param {String} config.token 봇의 토큰
   * @param {String} config.prefix 봇의 호출명
   * @param {String} config.activity
   * @returns {Bot}
   * 
   */
  constructor(config) {
    this.token = config.token
    this.prefix = config.prefix
    this.activity = config.activity || null
    return this
  }

  /**
   * 봇의 설정을 변경합니다
    * 
    * @param {Object} config
    * @param {String} config.token 봇의 토큰
    * @param {String} config.prefix 봇의 호출명
    * @param {String} config.activity
    * @returns {Bot}
    * 
    */
  setConfig(config) {
    this.token = config.token
    this.prefix = config.prefix
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
        if (msg.content.startsWith(this.prefix)) {
          console.log(msg.author.username + '> ' + msg.content)
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
