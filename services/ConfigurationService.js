class ConfigurationService {
  constructor(model) {
    this.model = model //configuration page model
    this.DIGI_CONFIG_ID = '6607021a04f90a898ce697b6' //I hardcoded the ID for exercise reasons as this is not in the scope
    //in a more scalable code I would get all configs and iterate that array of configs to send all to client
  }

  //id = path name
  async getById(id) {
    const doc = await this.model.findById(this.DIGI_CONFIG_ID)
    const configuration = doc.get(id) // here we search by config name(path)
    return configuration
  }
  async getAll() {
    const configs = await this.model.findById(this.DIGI_CONFIG_ID)
    return configs
  }
}

module.exports = ConfigurationService
