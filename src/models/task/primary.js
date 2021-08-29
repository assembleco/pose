import React from "react"
import { observer } from "mobx-react"
import { applyPatch } from "mobx-state-tree"
import { Icon } from "@iconify/react"

export default observer(({ self }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={self.done}
        onChange={(e) => applyPatch(self, {
          op: "replace",
          path: `./done`,
          value: !self.done,
        })}
      />

      {self.label}

      <Icon
        icon="ci:edit"
        onClick={self.change}
      />
    </div>
  )
})
