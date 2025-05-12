//LRU cache
/**
 * @param {number} capacity
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Array();
  }

  get = function (key) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === key) {
        let temp = this.cache.splice(i, 1)[0];
        this.cache.push(temp);
        console.log(this.cache, "shifting");
        return temp[1];
      }
    }
    return -1;
  };

  put = function (key, value) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === key) {
        this.cache.splice(i, 1);
        this.cache.push([key, value]);
        return;
      }
    }
    if (this.cache.length === this.capacity) {
      this.cache.shift();
    }
    this.cache.push([key, value]);
    console.log(this.cache, "cache");
  };
}

var obj = new LRUCache(2);
//var param_1 = obj.get(key)
obj.put(1, 1);
obj.put(2, 2);
console.log(obj.get(1));
obj.put(3, 3);
