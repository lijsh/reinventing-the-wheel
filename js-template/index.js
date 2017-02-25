const template = (tpl = '', { sep = ['{{', '}}']}  = {}) => {
  const re = new RegExp(`${sep[0]}([\\s\\S]+?)${sep[1]}`, 'g')
  return data => tpl.replace(re, (_, exp) => new Function('data', `with(data) { return ${exp} }`)(data))
}