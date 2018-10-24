import PropTypes from "prop-types"
import React from "react"
import AceEditor from "react-ace"
import ace from "brace"
import "brace/ext/language_tools"
import "brace/mode/jsx"
import "brace/mode/html"
import "brace/theme/tomorrow"
import { getStories } from "src/app/stories"

// Set up custom completers by using a ace extension
// https://github.com/thlorenz/brace/issues/19
const languageTools = ace.acequire("ace/ext/language_tools")

const componentCompleter = {
    getCompletions(editor, session, pos, prefix, callback) {
        const completions = []

        getStories.forEach((story) => {
            completions.push({ caption: story.name, value: story.name, meta: "Component" })
        })
        callback(null, completions)
    }
}

languageTools.addCompleter(componentCompleter)

function Editor(props) {
    const { id, mode, value, ...rest } = props

    return (
        <AceEditor
            name={id}
            mode={mode}
            theme="tomorrow"
            width="100%"
            height="100px"
            value={value}
            enableBasicAutocompletion
            enableLiveAutocompletion
            editorProps={{ $blockScrolling: Infinity }}
            highlightActiveLine={false}
            maxLines={Infinity}
            showGutter={false}
            showPrintMargin={false}
            tabSize={4}
            {...rest}
        />
    )
}

Editor.propTypes = {
    id: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(["html", "jsx"]),
    value: PropTypes.string.isRequired
}

Editor.defaultProps = {
    mode: "jsx"
}

export default Editor
