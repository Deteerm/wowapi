const fs = require('fs').promises
const path = require('path')

const championsFile = path.join(__dirname, '/champions.json')

module.exports = {
  list
}

async function list() {
  const data = await fs.readFile(championsFile)
  return JSON.parse(data)
}