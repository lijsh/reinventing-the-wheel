// have bugs

const module = {}
const head = document.getElementsByTagName('head')[0]
const base = '.'

const loadScript = (url, cb) => {
  const script = document.createElement('script')
  script.src = url
  script.onload = cb
  head.appendChild(script)
}

const define = (name, deps, callback) => {
  if (module[name]) {
    throw new Error(`module ${name} has been defined`)
  } else {
    let count = 0
    const loading = []
    const loadingDeps = deps.filter((dep) => !module[dep])
    if (loadingDeps.length === 0) {
      module[name] = callback(...deps.map(dep => module[dep]))
    } else {
      loadingDeps.forEach((dep) => {
        count += 1
        loadScript(`${base}/${dep}.js`, () => {
          count -= 1
          if (count === 0) {
            module[name] = callback(...deps.map(dep => module[dep]))
          }
        })
      })
    }
  }
}