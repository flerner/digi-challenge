const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')

const DBConnection = require('./models/mongo/DBConnection.js')

//Configuration requires
const ConfigurationModel = require('./models/inputs.json')
const ConfigurationService = require('./services/ConfigurationService')
const ConfigurationController = require('./controllers/ConfigurationController')
//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
  ConfigurationModel
)
const ConfigurationControllerInstance = new ConfigurationController(
  ConfigurationServiceInstance
)
//User requires
const UserModel = require('./models/mongo/MongoUserSchema.js')
const UserService = require('./services/UserService')
const UserController = require('./controllers/UserController')
//User instances
const UserServiceInstance = new UserService(UserModel)
const UserControllerInstance = new UserController(UserServiceInstance)

app.prepare().then(async () => {
  const server = express()
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  await DBConnection.connect()

  //get configuration by path
  server.get('/configuration/:path', (req, res) =>
    ConfigurationControllerInstance.get(req, res)
  )
  server.get('/configuration/', (req, res) =>
    ConfigurationControllerInstance.getAll(req, res)
  )

  server.post('/:path', (req, res) => {
    UserControllerInstance.post(req, res)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
