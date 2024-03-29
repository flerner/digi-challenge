class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService
  }

  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */
  async get(req, res) {
    try {
      const path = req.params.path
      const config = await this.configurationService.getById(path)
      if (config) {
        return res.status(200).send(config)
      } else {
        return res.status(404).send("configuration doesn't exists")
      }
    } catch (error) {
      console.log(error)
    }
  }
  async getAll(req, res) {
    try {
      const config = await this.configurationService.getAll()

      return res.status(200).send(config)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ConfigurationController
