import * as React from "react"

import { Button, Text, Table, Flex, Spacing } from "@porsche/ui-kit-react"

import * as styles from "./stream.scss"

export interface StreamProps {
    title: string
    onButtonClick: () => void
}

export class Stream extends React.PureComponent<StreamProps, {}> {

    handleClick = () => {
        this.props.onButtonClick()
    }

    render() {
        return (
            <div className={styles.streamContainer}>
                <Text type="2-thin">
                    {this.props.title}
                </Text>
                <Spacing marginTop={30}>
                    <Button onClick={this.handleClick}>
                        Test
                    </Button>
                </Spacing>
            </div>
        )
    }

}
