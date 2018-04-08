import React, { Component } from "react"
import { getComponentGroup, getSeeItems } from "src/app/utils"

import PropTypes from "prop-types"
import docInfo from "src/app/docgenInfo.json"

const withDocInfo = (ChildComponent) => {
    return class extends Component {
  static propTypes = {
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
      type: PropTypes.string
  }

  constructor(props) {
      super(props)

      this.state = this.computeProps(props)
  }

  componentWillReceiveProps(nextProps) {
      this.setState(this.computeProps(nextProps))
  }

  computeProps = ({ name, parent, type }) => {
      const { docBlock, path } = docInfo[name]
      const { description } = docBlock

      return {
          description,
          path,
          componentGroup: getComponentGroup(docInfo, name),
          componentName: name,
          seeItems: getSeeItems(docInfo, name)
      }
  }

  render() {
      return <ChildComponent {...this.state} />
  }
    }
}

export default withDocInfo
