define('first', ['second'], (second) => {
  console.log(second)
  const arr = [1, 2, 3, 4]
  document.body.innerHTML = second
})