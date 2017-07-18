import { ssplit } from './ssplit';

export class ApiObserver {
    api: any;

    constructor(api, property, callback) {
        var self = this;
        this.api = new LiveAPI(max.patcher, val => {
            if (val.shift() == property) callback(val)
        }, "live_set")
        this.api.path = api.path
        this.api.mode = api.mode
        this.api.property = property
    }
    close() {
        this.api.property = 0
        this.api.id = 0
        this.api = null
    }
}

export class JsApi {
    api: any;
    observers: any;
    key: any;

    constructor(path, followPath?) {
        this.api = new LiveAPI(max.patcher, path)
        this.api.mode = followPath ? 0 : 1
        this.observers = {}
    }
    exists() { return this.getId() != 0 }
    getKey() { return this.key }
    setKey(key) { this.key = key }
    getPath() { return this.api.path }
    setPath(path) { this.api.path = path }
    getId() { return parseInt(this.api.id + "") }
    isFollowPath() { return this.api.mode == 1 }

    close() {
        for (var o in this.observers) this.observers[o].close()
        this.observers = {}
    }
    get(property) {
        return this.api.get(property)
    }
    call(name, ...args) {
        return this.api.call(name, args)
    }

    set(property, value) {
        this.api.set(property, value)
    }
    observe(property, callback) {
        if (this.observers[property]) return
        this.observers[property] = new ApiObserver(this.api, property, callback)
    }
    unobserve(property) {
        if (!this.observers[property]) return
        this.observers[property].close()
        delete this.observers[property]
    }

    getInfo() {
        if (!this.getId()) return null
        var info = {
            key: this.key,
            id: this.getId(),
            path: this.api.unquotedpath,
            type: this.api.type,
            description: undefined,
            properties: [],
            functions: [],
            children: [],
            childs: [],
        }
        this.api.info.split("\n").forEach(line => {
            var kv = ssplit(line, " ", 2)
            switch (kv[0]) {
                case "child": info.childs.push(kv[1]); break
                case "children": info.children.push(kv[1]); break
                case "description": info.description = kv[1]; break
                case "property": info.properties.push(kv[1]); break
                case "function": info.functions.push(kv[1]); break
            }
        })

        return JSON.stringify(info)
    }
}

var api_keys = 0
var jsApis = {}

export class ApiClient {
    infoapi: JsApi;

    createApi(path, followPath = false) {
        var api = new JsApi(path, followPath)
        if (!api.exists()) return null
        var key = ++api_keys;
        api.setKey(key)
        jsApis[key] = api
        return api
    }

    getInfoApi() {
        if (!this.infoapi) this.infoapi = new JsApi("live_set")
        return this.infoapi
    }

    getApiByKey(key) {
        return jsApis[key]
    }

    getInfo(path) {
        this.getInfoApi().setPath(path)
        return this.getInfoApi().getInfo()
    }

    destroy(apikey) {
        var api = jsApis[apikey]
        if (!api) return
        api.close()
        delete jsApis[apikey]
    }

    close() {
        for (var a in jsApis) jsApis[a].close()
        jsApis = {}
    }
}