import { hot } from "react-hot-loader"

import * as React from "react"
import * as ReactDOM from "react-dom"

import { History, createBrowserHistory } from "history"
import { IntlProvider, addLocaleData } from "react-intl"
import { Store, Provider as StoreProvider } from "react-redux"

import { ConnectedRouter } from "react-router-redux"
import { Route } from "react-router"

import * as de from "react-intl/locale-data/de"

import { ApplicationContainer } from "src/ApplicationContainer"
import { ApplicationState } from "src/redux/ApplicationState"
import { createStore } from "src/createStore"

class BootstrapComponent extends React.PureComponent<{}, {}> {

    private history: History = createBrowserHistory()
    private store: Store<ApplicationState> = createStore(this.history)

    componentWillMount() {
        addLocaleData([...de])
    }

    render() {
        return (
            <StoreProvider store={this.store}>
                <IntlProvider locale="de">
                    <ConnectedRouter history={this.history}>
                        <Route component={ApplicationContainer} />
                    </ConnectedRouter>
                </IntlProvider>
            </StoreProvider>
        )
    }
}

export const Bootstrap = hot(module)(BootstrapComponent)
