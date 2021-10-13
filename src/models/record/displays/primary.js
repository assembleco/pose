import React from "react"
import { observer } from "mobx-react"
import { Icon } from "@iconify/react"

export default observer(({ model }) => {
  return (
    <div>
      {model.pages.map((page) => page.display())}
    </div>
  )
})
