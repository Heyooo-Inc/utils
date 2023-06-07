import { createAxiosClient } from '../src/axios'

describe('axios', () => {
  test('should override timeout', () => {
    const axios = createAxiosClient({
      timeout: 5_000
    })

    expect(axios.defaults.timeout).toBe(5_000)
  })
})
