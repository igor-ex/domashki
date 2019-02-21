
function ex(val, comment) {
    comment = typeof comment !== 'undefined' ? comment + ' =' : '';
    return console.log(comment, val);
}


function Alist() {

    this.arr = [];
    this.length = 0;

    const removeMultiple = function(ind, num) {//num - кол-во удаляемых элементов
        const len = this.arr.length;
        num = (typeof num) !== 'undefined' ? num : 1;
        if (!len) {
            return [];
        }
        if (ind > this.length - 1) {
            return void 0;
        }

        //get values of elements to remove
        const removed = [];
        const stop = num > len - ind ? len : ind + num;
        for (let i = ind; i < stop; i++) {
            removed.push(this.arr[i]);
        }
        //shift elements
        const removedNum = stop - ind;

        for (let i = ind + removedNum; i < len; i++) {
            this.arr[i- removedNum] = this.arr[i];
        }

        this.arr.length = this.arr.length - removedNum;
        this.length = this.length - removedNum;
        return removed;
    }.bind(this);
}


Alist.prototype.push = function() {
    if (!arguments.length) {
        return this.arr.length;
    }
    for (var i = 0; i < arguments.length; i++) {
        this.arr[this.arr.length] = arguments[i];
        this.length++;
    }
    return this.arr.length;
}

Alist.prototype.pop = function() {
    if(!this.arr.length){
        return;
    }
    var val = this.arr[this.arr.length-1];
    this.arr.length--;
    this.length--;
    return val;
}

Alist.prototype.shift = function() {
    if (!this.arr.length)
        return;
    var val = this.arr[0];
    for(var i = 1; i < this.arr.length; i++) {
        this.arr[i-1] = this.arr[i];
    }
    this.arr.length--;
    this.length--
    return val;
}

Alist.prototype.unshift = function() {
    const len = arguments.length;
    if (!len) {
        return this.arr.length;
    }
    for(let i = this.arr.length - 1; i >= 0; i--) {
        this.arr[i + len] = this.arr[i];
    }
    for (let i = 0; i < len; i++) {
        this.arr[i] = arguments[i];
        this.length++;
    }
    return this.arr.length;
}

Alist.prototype.isArray = function() {
    return true;
}

Alist.prototype.some = function(func) {
    for (let i = 0, l = this.arr.length; i < l; i++) {
        if (func(this.arr[i]) === true) {
            return true;
        }
    }
    return false;
}

Alist.prototype.every = function(func) {
    for (let i = 0, l = this.arr.length; i < l; i++) {
        if (func(this.arr[i]) === false) {
            return false;
        }
    }
    return true;
}

Alist.prototype.getEl = function (ind) {
    if (ind > this.arr.length-1) {
        return void 0;
    }
    return this.arr[ind];
}

Alist.prototype.remove = function (ind) {
    if (ind > this.length - 1) {
        return void 0;
    }
    const val = this.arr[ind];
    for (let l = this.arr.length, i = ind; i < l-1; i++) {
        this.arr[i] = this.arr[i + 1];
    }
    this.arr.length--;
    this.length--;
    return val;
}

Alist.prototype.splice = function() {
    const argLen = arguments.length;
    if (!argLen) {
        return [];
    }
    if (argLen === 1) {//если передали один аргумент (индекс) значит надо удалить один элемент
        return removemultiple(arguments[0]);
    }
    if (argLen === 2) {//передано два аргумента, значит, возможно, нужно удалить более одного элемента
        return removemultiple(arguments[0], arguments[1]);
    } else {
        const returned = removemultiple(arguments[0], arguments[1]);
        const added = [];
        const ind = arguments[1];
        for (let i = 2; i < argLen; i++) {
            added.push(arguments[i]);
        }
        for(let i = this.arr.length - 1; i >= ind; i--) {
            this.arr[i + added.length] = this.arr[i];
        }
        ex(this.arr, 'this arr')
        return;
        for (let i = ind; i < added.length; i++) {
            this.arr[i] = added[i];
            this.length++;
        }
        return returned;
    }
}



;(function () {
    A = function() {
        this.setB = function(val){
            b = val;
        }
        this.getB = function () {
            return b;
        }
    }
    var b = 10;
}());
var a = new A;
var b = new A;
a.setB('hello');
ex(a.getB(), 'a');
ex(b.getB(), 'b');