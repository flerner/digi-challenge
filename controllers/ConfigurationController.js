class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService
  }

  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */
  get(req, res) {
    try {
      const path = req.params.path
      const config = this.configurationService.getById(path)
      if (config) {
        return res.status(200).send(config)
      } else {
        return res.status(404).send("configuration doesn't exists")
      }
    } catch (error) {
      console.log(error)
    }
  }
  getAll(req, res) {
    try {
      const config = this.configurationService.getAll()
      return res.status(200).send(config)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ConfigurationController
