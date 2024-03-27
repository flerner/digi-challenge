class UserController {
  constructor(userService) {
    this.userService = userService
  }

  post(req, res) {
    console.log(req.body)
    console.log(req.params.path)
  }
}

module.exports = UserController
