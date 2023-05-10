## Date

Date conversions methods.

### Unix timestamp

```
import { timestamp } from '@heyooo-inc/utils'

timestamp() // => 1600822237
```

### Parse date string to second number

```
import { toSeconds } from '@heyooo-inc/utils'

toSeconds('1m') // => 60
toSeconds('1h') // => 3600
```

### Format second number to string

```
import { formatSeconds } from '@heyooo-inc/utils'

formatSeconds(5 * 60 * 60) // => 5 hours
formatSeconds(86_400)      // => 1 day'
```

### Parse date string to milliseconds

```
import { toMilliseconds } from '@heyooo-inc/utils'

toMilliseconds('1m') // => 60_000
```