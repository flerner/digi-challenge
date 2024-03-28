class UserService {
  constructor(model) {
    this.model = model
  }
  addUser(user) {
    const newUser = new this.model(user)
    return newUser.save()
  }
}

module.exports = UserService
