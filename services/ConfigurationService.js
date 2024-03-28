class ConfigurationService {
  constructor(model) {
    this.model = model //configuration page model
  }

  //id = path name
  getById(id) {
    const configuration = this.model[id]
    return configuration
  }
  getAll() {
    return this.model
  }
}

module.exports = ConfigurationService
