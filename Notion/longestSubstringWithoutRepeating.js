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

