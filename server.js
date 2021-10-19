const main = function () {
  console.log("Hello Main")
}

  if (!module.parent) main()
else module.exports = main
