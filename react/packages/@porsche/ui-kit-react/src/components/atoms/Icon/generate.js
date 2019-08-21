const fs = require("fs")
const snakeCase = require("lodash/snakeCase")

let imports = ""
let icons = ""

files = fs.readdirSync("icons")

files.forEach((file, index) => {
    const name = file.replace(".tsx", "")

    let icon
    if (name === "4Wd") {
        icon = "4WD"
    } else {
        icon = snakeCase(name)
    }

    const component = `Svg${name}`

    imports += `import ${component} from "./icons/${name}"\n`

    icons += `    "${icon}": ${component}`
    index < files.length - 1 ? (icons += ",\n") : (icons += "\n")
})

let content = ""

content += imports
content += "\n"
content += "export const icons = {\n"
content += icons
content += "}\n"

fs.writeFileSync("icons.ts", content)
