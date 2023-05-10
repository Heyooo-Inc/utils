/** @type {import('tsup').Options} */
module.exports = {
  target: 'esnext',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
}
