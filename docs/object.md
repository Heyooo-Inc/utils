## Object

### Deep clone a object

```
import { deepClone } from '@heyooo-inc/utils'

const obj = {
  x: 1
}

const cloned = deepClone(obj)

cloned !== obj     // => true
cloned.x === obj.x // => true
```

### Deep merge objects

```
import { deepMerge } from '@heyooo-inc/utils'

const obj = {
  x: 1,
  y: {
    a: true
  }
}

const merged = deepMerge(obj, { x: 3 })

merged !== obj      // => true
merged.x === 3      // => true
merged.y.a === true // => true
```

### Pick some properties from a object

```
import { pickObject } from '@heyooo-inc/utils'

const obj = {
  x: 1,
  y: 2,
  z: 3
}

pickObject(obj, ['y', 'z']) // => { y: 2, z：3 }
```
