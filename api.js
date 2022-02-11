const Champions = require('./champions')

module.exports = {
    listChampions,
    getChampion
}

async function listChampions(req, res, next) {
    const  {offset = 0, limit = 10, faction} = req.query
    try {
        res.json(await Champions.list({
            offset: Number(offset),
            limit: Number(limit),
            faction: faction
        }))
    } catch(err) {
        next(err)
    }
}

async function getChampion(req, res, next) {
    const {name} = req.params

    try {
        const champion = await Champions.get(name)
        if (!champion) next()

        res.json(champion)
    } catch(err) {
        next(err)
    }
}