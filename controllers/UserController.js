class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async post(req, res) {
    try {
      const user = req.body
      const path = req.params.path
      if (path == 'register') {
        const userRegistered = await this.userService.addUser(user)
        res.json(userRegistered)
      }
      if (path == 'login') {
        const foundUser = await this.userService.login(user)
        if (foundUser) {
          return res.json(foundUser)
        } else {
          return res.status(404).send('User not found')
        }
      }
    } catch (err) {
      console.log('error creating user', err)
      return res.status(400).send('User already exist')
    }
  }
}

module.exports = UserController
