import app from './app.js'
import config from './config.js'

// Get port from environment and store in Express.
const port = config.port
const hostname = config.hostname

app.listen(port, hostname, () => {
  console.info(`Listening on ${hostname}:${port}`)
})
