class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async post(req, res) {
    try {
      const user = req.body
      console.log(user)
      const path = req.params.path
      if (path == 'register') {
        console.log('register path')
        const userRegistered = await this.userService.addUser(user)
        console.log('user registered', userRegistered)
        res.json(userRegistered)
      }
      // if (path == 'login') {
      //   this.userService.login(user)
      //   console.log()
      // }
    } catch (err) {
      console.log('error creating user', err)
      return res.status(400).send('Check your fields!')
    }
  }
}

module.exports = UserController
