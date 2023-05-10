## Object

### Deep clone a object

```
import { cloneDeep } from '@heyooo-inc/utils'

const obj = {
  x: 1
}

const cloned = cloneDeep(obj)

cloned !== obj     // => true
cloned.x === obj.x // => true
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
