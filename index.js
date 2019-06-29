const DotObject = require("dot-object");

DotObject.prototype.pick = function(path, obj, remove) {
    var i;
    var keys;
    var val;
    var key;
    var cp;

    function _process(v, mod) {
        var i;
        var r;

        if (typeof mod === "function") {
            r = mod(v);
            if (r !== undefined) {
                v = r;
            }
        } else if (Array.isArray(mod)) {
            for (i = 0; i < mod.length; i++) {
                r = mod[i](v);
                if (r !== undefined) {
                    v = r;
                }
            }
        }

        return v;
    }

    function parseKey(key, val) {
        // detect negative index notation
        if (key[0] === "-" && Array.isArray(val) && /^-\d+$/.test(key)) {
            return val.length + parseInt(key, 10);
        }
        return key;
    }

    function isIndex(k) {
        return /^\d+$/.test(k);
    }

    function isObject(val) {
        return Object.prototype.toString.call(val) === "[object Object]";
    }

    function isArrayOrObject(val) {
        return Object(val) === val;
    }

    function isEmptyObject(val) {
        return Object.keys(val).length === 0;
    }

    function parsePath(path, sep) {
        if (path.indexOf("[") >= 0) {
            path = path.replace(/\[/g, ".").replace(/]/g, "");
        }
        return path.split(sep);
    }
    keys = parsePath(path, this.separator);
    for (i = 0; i < keys.length; i++) {
        key = parseKey(keys[i], obj);
        if (obj && typeof obj === "object" && key in obj) {
            if (i === keys.length - 1) {
                if (remove) {
                    val = obj[key];
                    delete obj[key];
                    if (Array.isArray(obj)) {
                        cp = keys.slice(0, -1).join(".");
                        if (this.cleanup.indexOf(cp) === -1) {
                            this.cleanup.push(cp);
                        }
                    }
                    return val;
                } else {
                    return obj[key];
                }
            } else {
                obj = obj[key];
            }
        } else if (Array.isArray(obj)) {
            return obj.map(o => this.pick(keys.filter((_thing, index) => index >= i).join("."), o));
        } else {
            return undefined;
        }
    }
    if (remove && Array.isArray(obj)) {
        obj = obj.filter(n => n !== undefined);
    }
    return obj;
};

module.exports = DotObject;
