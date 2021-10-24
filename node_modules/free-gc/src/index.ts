export function gcEnabled()
{
  return (typeof global !== 'undefined' && typeof global.gc === 'function')
}

export function freeGC()
{
  return gcEnabled() && global.gc()
}

export default freeGC
