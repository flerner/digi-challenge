class UserService {
  constructor(model) {
    this.model = model
  }
  addUser(user) {
    const newUser = new this.model(user)
    return newUser.save()
  }
  async login(user) {
    console.log('login', user)
    const { username, password } = user
    const foundUser = await this.model.findOne({ username, password }).exec()
    return foundUser
  }
}

module.exports = UserService
