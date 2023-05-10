## Conv

Convert data to integers, floating-point numbers, boolean, or JSON.

```
import { toBool, stringifyByte } from '@heyooo-inc/utils'

toBool(1)      // => true
toInteger('1') // => 1
toFloat('3.2') // => 3.2
toJSON('[1]')  // => [1]
```