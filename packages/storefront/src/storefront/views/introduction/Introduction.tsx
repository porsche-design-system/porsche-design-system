import React, { Component } from "react"
import cx from "classnames"
import { prefix, Logo } from "@porscheui/porsche-ui-kit"
import Background from "../../assets/img/bg.png"
import "./introduction.scss"

class Introduction extends Component {
  render() {
    return (
      <div className={cx(prefix("introduction"))}>
        <header className={cx(prefix("introduction__header"))}>
          <Logo />
        </header>
        <main className={cx(prefix("introduction__stage"))}>
          <h1>Porsche UI Kit</h1>
          <img className={cx(prefix("introduction__stage-img"))} src={Background} alt="" />
        </main>
      </div>
    )
  }
}

export default Introduction
