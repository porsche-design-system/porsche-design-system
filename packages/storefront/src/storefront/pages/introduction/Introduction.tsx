import React from "react"
import { prefix } from "@porscheui/porsche-ui-kit"
import Background from "../../assets/img/bg.png"
import "./introduction.scss"

export const Introduction: React.FunctionComponent = () => {
  return (
    <div className={prefix("introduction")}>
      <header className={prefix("introduction__header")} />
      <main className={prefix("introduction__stage")}>
        <h1>Porsche UI Kit</h1>
        <img className={prefix("introduction__stage-img")} src={Background} alt="" />
      </main>
    </div>
  )
}
