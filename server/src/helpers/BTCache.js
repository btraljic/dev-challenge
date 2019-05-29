// ***** (8) Ubrzavanje fetch specifične JSON files baze
// ***** Kreirao sam ovaj Cache, nisam htio koristiti dataloader
// ***** Mislim da je ajbolje rješenje (mogao sam jedino koristiti neki gotov package)
class BTCache {
  // --------------------------------------------------------------------------
  constructor(getDataFunction, secondsToLive = 300) {
    console.log('BTCache constructor')
    this.getDataFunction = getDataFunction;
    this.millisecondsToLive = secondsToLive * 1000;

    this.cache = {};
    this.size = 0;
  }

  // --------------------------------------------------------------------------
  exists = (key) => {
    return this.cache[key] !== undefined;
  }

  // --------------------------------------------------------------------------
  set = async (key, path) => {
    const record = {};
    const oldRecord = this.cache[key];
    const value = await this.getDataFunction(path);

    if (oldRecord) {
      clearTimeout(oldRecord.iAmLive);
    } else {
      this.size++;
    }

    record.path = path;
    record.iAmLive = setTimeout(() => this.clear(key), this.millisecondsToLive);
    record.value = value;

    this.cache[key] = record;

    return value;
  }

  // --------------------------------------------------------------------------
  get = (key, path) => {
    if (this.exists(key)) {
      const { value } = this.cache[key];

      return Promise.resolve(value);
    }

    return this.set(key, path);
  }

  // --------------------------------------------------------------------------
  clear = (key) => {
    const oldRecord = this.cache[key];

    if (oldRecord) {
      clearTimeout(oldRecord.iAmLive);
      this.size--;

      delete this.cache[key];
    }
  }

  // --------------------------------------------------------------------------
  reset = () => {}
}

export default BTCache;
