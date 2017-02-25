define('second', ['third'], (third) => {
  console.log(third)
  return (arr) => arr.map(a => a * third).join(' - ')
})