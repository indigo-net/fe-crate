interface UpgradeCallback {
  (db: IDBDatabase, oldVersion: number, newVersion: number | null): void;
}

interface DBConfig {
  name: string;
  version: number;
  onUpgrade: UpgradeCallback;
}

class IndexedDBManager {
  private static dbPromise: Promise<IDBDatabase> | null = null;
  private static config: DBConfig | null = null;
  private static fallbackStore: Map<string, Map<string, unknown>> = new Map();
  private static useFallback = false;

  static open(config: DBConfig): Promise<IDBDatabase> {
    this.config = config;

    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      try {
        const request = indexedDB.open(config.name, config.version);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          config.onUpgrade(db, event.oldVersion, event.newVersion);
        };

        request.onsuccess = (event) => {
          resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = () => {
          this.useFallback = true;
          this.dbPromise = null;
          reject(request.error);
        };
      } catch {
        this.useFallback = true;
        this.dbPromise = null;
        reject(new Error('IndexedDB not available'));
      }
    });

    return this.dbPromise;
  }

  static async get<T>(storeName: string, key: string): Promise<T | undefined> {
    if (this.useFallback) {
      return this.fallbackStore.get(storeName)?.get(key) as T | undefined;
    }

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result as T | undefined);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async put<T>(storeName: string, key: string, value: T): Promise<void> {
    if (this.useFallback) {
      if (!this.fallbackStore.has(storeName)) {
        this.fallbackStore.set(storeName, new Map());
      }
      this.fallbackStore.get(storeName)!.set(key, value);
      return;
    }

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(value, key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async delete(storeName: string, key: string): Promise<void> {
    if (this.useFallback) {
      this.fallbackStore.get(storeName)?.delete(key);
      return;
    }

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async getAll<T>(storeName: string): Promise<T[]> {
    if (this.useFallback) {
      const storeMap = this.fallbackStore.get(storeName);
      if (!storeMap) {
        return [];
      }
      return Array.from(storeMap.values()) as T[];
    }

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async clear(storeName: string): Promise<void> {
    if (this.useFallback) {
      this.fallbackStore.get(storeName)?.clear();
      return;
    }

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private static async getDB(): Promise<IDBDatabase> {
    if (!this.dbPromise || !this.config) {
      throw new Error('IndexedDBManager.open() must be called before any operation');
    }
    return this.dbPromise;
  }
}

export default IndexedDBManager;
