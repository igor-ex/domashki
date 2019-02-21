function LList() {
    this.root = null;
    this.last = null;
    this.length = 0;
}

function Entry(val) {
    this.val = val
    this.prev = null;
    this.next = null;
}


LList.prototype.pushSingle = function (val) {
    var e = new Entry(val);
    if (this.last) {
        this.last.next = e;
        e.prev = this.last;
    } else {
        this.root = e;
    }
    this.last = e;
    this.length++;
    return this.length;
}

LList.prototype.unshiftSingle = function (val) {
    var e = new Entry(val);
    if (this.root) {
        this.root.prev = e;
        e.next = this.root;
    } else {
        this.last = e;
    }
    this.root = e;
    this.length++;
    return this.length;
}

LList.prototype.push = function (val) {
    if (!arguments.length) {
        return this.length;
    }
    for (var i = 0; i < arguments.length; i++) {
        this.pushSingle(arguments[i])
    }
    return this.length;
}

LList.prototype.unshift = function (val) {
    if (!arguments.length) {
        return this.length;
    }
    for (var i = arguments.length-1; i >= 0; i--) {
        this.unshiftSingle(arguments[i])
    }
    return this.length;
}

LList.prototype.getEl = function (ind) {
    if (ind > this.length-1) {
        return void 0;
    }
    let current = this.root;
    for (let i = 0; i < ind; i++) {
        current = current.next;
    }
    return current.val;
}

LList.prototype.pop = function () {
    if (!this.last) {
        return;
    }
    const e = this.last;
    const currentLast = e.prev;
    if (currentLast) {
        this.last = currentLast;
        currentLast.next = null;
    } else {
        this.last = null;
        this.root = null
    }
    this.length--;
    return e.val;
}

LList.prototype.shift = function () {
    if (!this.root) {
        return;
    }
    const e = this.root;
    const newRoot = e.next;
    if (newRoot) {
        this.root = newRoot;
        newRoot.prev = null;
    } else {
        this.root = null;
        this.last = null;
    }
    this.length--;
    return e.val;
}

LList.prototype.isArray = function () {
    return true;
}

LList.prototype.some = function(func) {
    if (!this.length) {
        return false;
    }
    let current = this.root;
    do {
        if (func(current.val) === true) {
            return true;
        }
    } while (current = current.next)
    return false;
}

LList.prototype.every = function(func) {
    if (!this.length) {
        return false;
    }
    let current = this.root;
    do {
        if (func(current.val) === false) {
            return false;
        }
    } while (current = current.next)
    return true;
}

LList.prototype.iterate = function(func) {
    if (!this.length) {
        return;
    }
    let current = this.root;
    do {
        func(current.val);
    } while (current = current.next)
}

LList.prototype.remove = function(ind) {
    if (ind > this.length - 1) {
        return void 0;
    }
    let current = this.root;
    for (let i = 0; i < ind; i++) {
        current = current.next;
    }
    const prev = current.prev;
    const next = current.next;
    if (prev) {
        if (next) {
            prev.next = next;
        } else {
            prev.next = null;
        }
    } else {
        if (next) {
            this.root = next;
        } else {
            this.root = null;
        }
    }
    if (next) {
        if (prev) {
            next.prev = prev;
        } else {
            next.prev = null;
        }
    } else {
        if (prev) {
            this.last = prev;
        } else {
            this.last = null;
        }
    }

    this.length--;
    return current.val;
}

