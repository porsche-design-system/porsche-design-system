import * as React from "react"

import { Redirect, Route, Switch } from "react-router"

import { Application } from "src/Application"
import { ApplicationState } from "src/redux/ApplicationState"
import { StreamContainer } from "src/stream/StreamContainer"
import { connect } from "react-redux"

export namespace ApplicationContainer {
    export interface StateProps {}

    export interface DispatchProps {}

    export interface ComponentProps {}

    export interface Props extends StateProps, DispatchProps, ComponentProps {}
}

class ApplicationContainerComponent extends React.PureComponent<ApplicationContainer.Props, {}> {
    render() {
        return (
            <Application>
                <div>
                    <Switch>
                        <Route path={"/stream"} component={StreamContainer} />
                        <Route render={this.renderRedirect} />
                    </Switch>
                </div>
            </Application>
        )
    }

    private renderRedirect = () => {
        return <Redirect to="/stream" />
    }
}

function mapStateToProps(
    state: ApplicationState,
    props: ApplicationContainer.ComponentProps
): ApplicationContainer.StateProps {
    return {}
}

export const ApplicationContainer = connect<ApplicationContainer.StateProps, {}, ApplicationContainer.ComponentProps>(
    mapStateToProps
)(ApplicationContainerComponent)
