const Champions = require('./champions')

module.exports = {
    listChampions
}

async function listChampions(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        res.json(await Champions.list())
    } catch(err) {
        res.status(500).json({"error": err.message})
    }
}