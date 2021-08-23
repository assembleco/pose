import React from "react"
import { observer } from "mobx-react"
import { applyPatch } from "mobx-state-tree"
import { Icon } from "@iconify/react"

export default observer(({ self }) => {
  var [changed, change] = React.useState(null)

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

      {changed
        ?
        <>
          <input
            type="text"
            value={changed}
            onChange={(e) => change(e.target.value)}
          />
          <Icon
            icon="ci:check"
            onClick={() => {
              applyPatch(self, {
                op: "replace",
                path: "./label",
                value: changed,
              })
              change(null)
            }}
          />

          <Icon
            icon="iconoir:cancel"
            onClick={() => change(null)}
          />
        </>

        :
        <>
          {self.label}
          <Icon
            icon="ci:edit"
            onClick={() => change(self.label)}
          />
        </>

      }
    </div>
  )
})
