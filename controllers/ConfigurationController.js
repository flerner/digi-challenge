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
      //check if config exist
      const configExist = Object.hasOwn(this.configurationService.model, path)
      if (configExist) {
        return res.status(200).send(this.configurationService.model[path])
      } else {
        return res.status(404).send("configuration doesn't exists")
      }
    } catch (error) {
      console.log(error)
    }
  }
  getAll(req, res) {
    try {
      return res.status(200).send(this.configurationService.model)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ConfigurationController
