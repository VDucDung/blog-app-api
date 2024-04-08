const NodeCache = require('node-cache');

class CacheService {
  constructor() {
    this.cache = new NodeCache();
  }

  set(key, value, ttl = 60) {
    this.cache.set(key, value, ttl);
  }

  mset(data) {
    this.cache.mset(data);
  }

  del(key) {
    this.cache.del(key);
  }

  mdel(keys) {
    this.cache.del(keys);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  // take = get + del
  take(key) {
    return this.cache.take(key);
  }

  keys() {
    return this.cache.keys();
  }

  getAndSetTTL(key, ttl = 60) {
    const value = this.get(key);
    if (value) {
      this.cache.ttl(key, ttl);
      return value;
    }
    return null;
  }
}

const cacheService = new CacheService();

module.exports = cacheService;
