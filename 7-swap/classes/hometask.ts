import crypto from 'crypto';

type MapItem = {
  value: string,
  next: null | MapItem,
};

interface MapStore {
  [ key: string ]: MapItem,
};

class Map {
  constructor(
    private store: MapStore = {}
  ) {}

  private hash(value: string): string {
      return crypto.createHash('sha256').update(value).digest('hex').substr(0, 8);
  }

  set(value: string): void {
    const hash = this.hash(value);
    let node = this.store[hash];

    if (!node) {
      this.store[hash] = { value, next: null };
      return;
    }

    while (node) {
      if (!node.next) {
        node.next = { value, next: null };
        return;
      }
      node = node.next
    }
  }

  get(value: string): string | undefined {
    const hash = this.hash(value);
    let node = this.store[hash];

    if (!node) {
      return;
    }

    while (node) {
      if (node.value === value) {
        return node.value;
      }

      if (!node.next) {
        return undefined;
      }

      node = node.next;
    }
    
    return undefined;
  }

  delete(value: string): void {
    const hash = this.hash(value);
    let node = this.store[hash];
  
    if (!node) {
      return;
    }
  
    if (node.value === value) {
      if (!node.next) {
        delete this.store[hash];
      } else {
        this.store[hash] = node.next;
      }
      return;
    }
  
    while (node.next !== null) {
      if (node.next.value === value) {
        node.next = node.next.next;
        return;
      }
      node = node.next;
    }
  }

  clear(): void {
    this.store = {};
  }
}
