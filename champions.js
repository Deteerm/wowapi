const fs = require('fs').promises
const path = require('path')

const championsFile = path.join(__dirname, '/champions.json')

module.exports = {
  list,
  get
}

async function list(options = {}) {
  const {offset = 0, limit = 10, faction} = options
  const data = await fs.readFile(championsFile)
  return JSON.parse(data)
  .filter((champion) => !faction || champion.faction === faction)
  .slice(offset, offset + limit)
}

async function get(name) {
  const champions = JSON.parse(await fs.readFile(championsFile))
  for (let i = 0; i < champions.length; i++) {
    if (champions[i].name === name) return champions[i]
  }
  return null
}