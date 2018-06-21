import * as React from "react"
import { RouteComponentProps } from "react-router-dom"

import { Stream } from "src/stream/Stream"
import { ApplicationState } from "src/redux/ApplicationState"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { loadTitle } from "src/stream/redux/actions/loadTitle"

export interface StreamContainerStateProps {
    title: string
}

export interface StreamContainerDispatchProps {
    loadTitle: typeof loadTitle
}

export interface StreamContainerComponentProps {}

export interface StreamContainerProps
    extends StreamContainerStateProps,
        StreamContainerDispatchProps,
        StreamContainerComponentProps,
        RouteComponentProps<any> {}

class StreamContainerComponent extends React.PureComponent<StreamContainerProps, {}> {
    handleClick = () => {
        this.props.loadTitle("Test!")
    }

    render() {
        return <Stream title={this.props.title} onButtonClick={this.handleClick} />
    }
}

function mapStateToProps(state: ApplicationState, props: StreamContainerComponentProps): StreamContainerStateProps {
    return {
        title: state.stream.title
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): StreamContainerDispatchProps {
    return bindActionCreators(
        {
            loadTitle
        },
        dispatch
    )
}

export const StreamContainer = connect<StreamContainerStateProps, {}, StreamContainerComponentProps>(
    mapStateToProps,
    mapDispatchToProps
)(StreamContainerComponent)
