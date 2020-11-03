let Opp = require('./opportunities').Opp
let AbstractOppStore = require('./opportunities').AbstractOppStore

let opps = [];
exports.InMemoryOppStore = class InMemoryOppStore extends AbstractOppStore {
    async close() {}


    async update(key, title, description, dateDue) {
        opps[key].title = title
        opps[key].description = description
        opps[key].dateDue = dateDue
        return opps[key]
    }

    async create(key, title, description, dateDue){
        opps[key] = new Opp(key, title, description, dateDue)
        return opps[key]
    }

    async read(key){
        if (opps[key])
            return opps[key]
        else
            throw new Error(`Opportunity ${key} does not exist`)
    }

    async destroy(key){
        if (opps[key])
            delete opps[key]
        else
            throw new Error(`In Destroy: Opportunity ${key} does not exist`)

    }

    async keyList() {
        return Object.keys(opps)
    }

    async count() {
        return opps.length
    }

    async count_filtered(){
        let filtered = opps.filter(Boolean)
        return filtered.length
    }
}