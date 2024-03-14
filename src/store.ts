import { toJSON } from './conv'
import { isValid, isNil, isType } from './validator'

let localStorageStore: Store | null = null
let sessionStorageStore: Store | null = null

export class Store {
  private readonly storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  static get localStorage() {
    if (!localStorageStore) {
      localStorageStore = new Store(window.localStorage)
    }

    return localStorageStore
  }

  static get sessionStorage() {
    if (!sessionStorageStore) {
      sessionStorageStore = new Store(window.sessionStorage)
    }

    return sessionStorageStore
  }

  get length() {
    return this.storage.length
  }

  setItem<T>(key: string, value: T) {
    if (isNil(value) || (isType(value, 'number') && isNaN(value as unknown as number))) {
      this.removeItem(key)
    } else {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getItem<T>(key: string, defaults?: T): T | undefined {
    const text = this.storage.getItem(key)

    return toJSON<any>(text, defaults)
  }

  removeItem(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }

  keys(): string[] {
    const keys: string[] = []

    for (let index = 0; index < this.length; index++) {
      const key = this.storage.key(index)

      if (isValid(key)) {
        keys.push(key!)
      }
    }

    return keys
  }
}
