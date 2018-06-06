import PluginError from "plugin-error"
import _ from "lodash"
import path from "path"
import through from "through2"
const reactDocgenTypescript = require("react-docgen-typescript")

import { parseDefaultValue, parseDocBlock, parseType } from "./util/index"

export default (filename) => {
    const defaultFilename = "docgenInfo.json"
    const result = {}
    const pluginName = "gulp-react-docgen"
    let finalFile
    let latestFile

    function bufferContents(file, enc, cb) {
        latestFile = file

        if (file.isNull()) {
            cb(null, file)
            return
        }

        if (file.isStream()) {
            cb(new PluginError(pluginName, "Streaming is not supported"))
            return
        }

        try {
            const componentName = path.basename(file.path, path.extname(file.path))

            const parsed = reactDocgenTypescript.parse(file.path)[0] // TODO: Better array handling

            if (!parsed) {
                cb()
                return
            }

            // replace the component `description` string with a parsed doc block object
            parsed.docBlock = parseDocBlock(parsed.description)
            delete parsed.description

            // replace prop `description` strings with a parsed doc block object and updated `type`
            _.each(parsed.props, (propDef, propName) => {
                const { description, tags } = parseDocBlock(propDef.description)
                const { name, value } = parseType(propDef)

                parsed.props[propName] = {
                    ...propDef,
                    description,
                    tags,
                    value,
                    defaultValue: parseDefaultValue(propDef),
                    name: propName,
                    type: name
                }
            })

            parsed.path = file.path
                .replace(new RegExp(_.escapeRegExp(path.sep), "g"), "/")
                .replace(`${process.cwd()}/`, "")
            parsed.props = _.sortBy(parsed.props, "name")

            result[componentName] = parsed

            cb()
        } catch (err) {
            const pluginError = new PluginError(pluginName, err)
            pluginError.message += `\nFile: ${file.path}.`
            this.emit("error", pluginError)
        }
    }

    function endStream(cb) {
        finalFile = latestFile.clone({ contents: false })
        finalFile.path = path.join(latestFile.base, filename || defaultFilename)
        finalFile.contents = new Buffer(JSON.stringify(result, null, 2))
        this.push(finalFile)
        cb()
    }

    return through.obj(bufferContents, endStream)
}
