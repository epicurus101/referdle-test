

Array.prototype.randomItem = function random() {
    let item = this[Math.floor(Math.random() * this.length)];
    return item;
}

Array.prototype.matches = function matches(x) {
    if (this.length != x.length) { return false } 
    for (let i = 0; i < this.length; i++) {
        if (this[i] != x[i]) {
            return false
        }
    }
    return true;
}

Set.prototype.randomItem = function random() {
    return Array.from(this).randomItem();
}

Set.prototype.filter = function filter(f) {
    var newSet = new Set();
    for (var v of this) if(f(v)) newSet.add(v);
    return newSet;
}

Set.prototype.remove = function remove(x) {
    this.forEach ((item) => {
        if (item == x) {
          this.delete(item);
        }
      });
}

String.prototype.uniqueChars = function uniqueChars() {
    const arr = Array.from(this);
    const set = new Set(arr);
    const chars = set.size;
    return chars;
}


