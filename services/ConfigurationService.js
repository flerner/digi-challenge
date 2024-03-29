class ConfigurationService {
  constructor(model) {
    this.model = model //configuration page model
    this.DIGI_CONFIG_ID = '6606dde004f90a898ce69796' //I hardcoded the ID for exercise reasons as this is not in the scope
    //in a more scalable code I would get all configs and iterate that array of configs to send all to client
  }

  //id = path name
  async getById(id) {
    const doc = await this.model.findById(this.DIGI_CONFIG_ID)
    console.log('doc by path', doc)
    const configuration = doc.get(id)
    console.log(id, 'config by path', configuration)
    return configuration
  }
  async getAll() {
    const configs = await this.model.findById(this.DIGI_CONFIG_ID)
    return configs
  }
}

module.exports = ConfigurationService
