const glob = require("glob")
const fs = require("fs")
const path = require("path")
const reactDocgenTypescript = require("react-docgen-typescript")

const transformType = require("./transformType")

glob("../workshop/src/components/**/*.tsx", {}, function(error, files) {
  if (error) {
    console.log(error)
    return
  }

  const docs = {}

  const components = files.filter((file) => !file.endsWith(".test.tsx"))
  components.forEach((component) => {
    const parsed = parseComponent(component)
    cleanupFileName(parsed)
    cleanupType(parsed)
    docs[parsed.displayName] = parsed
  })

  const sortedDocs = {}
  Object.keys(docs)
    .sort()
    .forEach(function(key) {
      sortedDocs[key] = docs[key]
    })

  const result = JSON.stringify(sortedDocs, null, 2)
  fs.writeFileSync(path.join(__dirname, `../src/jsdoc.json`), result)
})

function parseComponent(component) {
  const parsed = reactDocgenTypescript.parse(component)[0]
  parsed.fileName = component
  return parsed
}

function cleanupFileName(obj) {
  transform(obj, "fileName", (value) => value.replace(/^.*\/workshop\/src\//g, ""))
}

function cleanupType(obj) {
  transform(obj, "type", (value) => transformType(value))
}

function transform(obj, key, callback) {
  for (var k in obj) {
    if (k === key) {
      obj[k] = callback(obj[k])
    } else if (typeof obj[k] == "object" && obj[k] !== null) {
      transform(obj[k], key, callback)
    }
  }
}
