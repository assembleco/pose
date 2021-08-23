import React from "react"
import { observer } from "mobx-react"
import { applyPatch } from "mobx-state-tree"
import { Icon } from "@iconify/react"

export default observer(({ self }) => {
  var [editing, setEditing] = React.useState(false)

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

      {editing
        ?
        <>
          <input
            type="text"
            value={self.label}
            onChange={(e) => applyPatch(self, {
              op: "replace",
              path: "./label",
              value: e.target.value,
            })}
          />
          <Icon
            icon="ci:check"
            onClick={() => setEditing(false)}
          />
        </>

        :
        <>
          {self.label}
          <Icon
            icon="ci:edit"
            onClick={() => setEditing(true)}
          />
        </>

      }
    </div>
  )
})
