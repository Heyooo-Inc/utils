## Store

Optimizing the use of localStorage.

```
import { Store } from '@heyooo-inc/utils'

const store = new Store(window.localStorage)
// or
const store = Store.localStorage

store.set('key', 1)
store.get('key') // => 1
```