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
    const path = req.params.path
    //check if config exist
    console.log()
    const configExist = Object.hasOwn(this.configurationService.model, path)
    if (configExist) {
      return res.status(200).send('ok')
    } else {
      return res.status(404).send("configuration doesn't exists")
    }
  }
}

module.exports = ConfigurationController
