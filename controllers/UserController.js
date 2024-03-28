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
      if (path == 'login') {
        const foundUser = await this.userService.login(user)
        if (foundUser) {
          console.log('User found', foundUser)
          return res.json(foundUser)
        } else {
          console.log('User not found')
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
