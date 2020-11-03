const _opp_key = Symbol('key')
const _opp_title = Symbol('title')
const _opp_description = Symbol('description')
const _opp_dateDue = Symbol('dateDue')


exports.Opp = class Opp {
    constructor(key, title, description, dateDue) {
        this[_opp_key] = key
        this[_opp_title] = title
        this[_opp_description] = description
        this[_opp_dateDue] = dateDue
    }

    get key() {return this[_opp_key]}
    get title() {return this[_opp_title]}
    set title(newTitle) {this[_opp_title] = newTitle}
    get description() {return this[_opp_description]}
    set description(newDescription) {this[_opp_description] = newDescription}
    get dateDue() {return this[_opp_dateDue]}
    set dateDue(newDateDue) {this[_opp_dateDue] = newDateDue}
}

exports.AbstractOppStore = class AbstractOppStore {
    async close() {}
    async update(key, title, description, dateDue) {}
    async create(key, title, description, dateDue) {}
    async read(key) {}
    async destroy(key) {}
    async keyList() {}
    async count() {}

}