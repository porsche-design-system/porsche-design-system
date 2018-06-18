import { dest, series, src, watch } from "gulp"

import path from "path"
import log from "fancy-log"
import plumber from "gulp-plumber"
import gulpReactDocgen from "../plugins/gulp-react-docgen"

// ----------------------------------------
// Build
// ----------------------------------------

function docgenBuild(cb) {
    src([
        path.resolve(__dirname, "../../../../../node_modules/@porsche/ui-kit-react/src/components/**/*.tsx"),
        "!**/index.tsx"
    ])
        // do not remove the function keyword
        // we need "this" scope here
        .pipe(
            plumber(function handleError(err) {
                log(err.toString())
                this.emit("end")
            })
        )
        .pipe(gulpReactDocgen())
        .pipe(dest(path.resolve(__dirname, "../../src/app")))
        .on("end", cb)
}

// ----------------------------------------
// Watch
// ----------------------------------------

function docgenWatch(cb) {
    // rebuild doc info
    watch(
        path.resolve(__dirname, "../../../../../node_modules/@porsche/ui-kit-react/src/components/**/*.tsx"),
        series(docgenBuild)
    )

    cb()
}

module.exports = {
    docgenBuild,
    docgenWatch
}
