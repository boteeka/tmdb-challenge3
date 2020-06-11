export default class Genre {
    constructor(obj) {
        this._id = obj.id;
        this._name = obj.name;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
}
