import React from "react"
import cx from "classnames"
import { prefix } from "@porscheui/porsche-ui-kit"
import Background from "../../assets/img/bg.png"
import "./introduction.scss"

export const Introduction: React.FunctionComponent = () => {
  return (
    <div className={cx(prefix("introduction"))}>
      <header className={cx(prefix("introduction__header"))} />
      <main className={cx(prefix("introduction__stage"))}>
        <h1>Porsche UI Kit</h1>
        <img className={cx(prefix("introduction__stage-img"))} src={Background} alt="" />
      </main>
    </div>
  )
}
