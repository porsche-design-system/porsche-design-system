import { task } from "gulp"

import * as build from "./gulp/tasks/build"

task("build:docgen", build.docgenBuild)
task("watch:docgen", build.docgenWatch)
