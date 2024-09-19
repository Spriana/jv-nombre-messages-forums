export function assert(condition) {
  if (!condition) {
    throw TypeError('assert failed')
  }
}
