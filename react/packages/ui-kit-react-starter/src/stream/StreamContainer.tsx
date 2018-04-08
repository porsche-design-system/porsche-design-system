import * as React from "react"
import { RouteComponentProps } from "react-router-dom"

import { Stream } from "src/stream/Stream"
import { ApplicationState } from "src/redux/ApplicationState"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { loadTitle } from "src/stream/redux/actions/loadTitle"

export namespace StreamContainer {

    export interface StateProps {
        title: string
    }

    export interface DispatchProps {
        loadTitle: typeof loadTitle
    }

    export interface ComponentProps {

    }

    export interface Props extends StateProps, DispatchProps, ComponentProps, RouteComponentProps<any> {

    }

}

class StreamContainerComponent extends React.PureComponent<StreamContainer.Props, {}> {

    handleClick = () => {
        this.props.loadTitle("Test!")
    }

    render() {
        return (
            <Stream title={this.props.title} onButtonClick={this.handleClick}/>
        )
    }

}

function mapStateToProps(state: ApplicationState, props: StreamContainer.ComponentProps): StreamContainer.StateProps {
    return {
        title: state.stream.title
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): StreamContainer.DispatchProps {
    return bindActionCreators(
        {
            loadTitle
        },
        dispatch
    )
}

export const StreamContainer = connect<StreamContainer.StateProps, {}, StreamContainer.ComponentProps>
    (mapStateToProps, mapDispatchToProps)
    (StreamContainerComponent)
