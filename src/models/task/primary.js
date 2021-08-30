import React from "react"
import { observer } from "mobx-react"
import { Icon } from "@iconify/react"

import replace from "../../replace"

export default observer(({ self }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={self.done}
        onChange={(e) => replace(self, './done', !self.done)}
      />

      {self.label}

      <Icon
        icon="ci:edit"
        onClick={self.change}
      />
    </div>
  )
})
