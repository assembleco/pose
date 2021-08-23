import React from "react"
import { observer } from "mobx-react"
import { applyPatch } from "mobx-state-tree"
import { Icon } from "@iconify/react"

export default observer(({ self }) => {
  var [changed, change] = React.useState(null)
  var record = () => {
    applyPatch(self, {
      op: "replace",
      path: "./label",
      value: changed,
    })
    change(null)
  }

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
            onKeyDown={(e) => { if(e.key === "Enter") record() }}
          />
          <Icon
            icon="ci:check"
            onClick={record}
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
