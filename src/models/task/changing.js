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

      <input
        type="text"
        value={self._change.label}
        onChange={(e) => applyPatch(self, {
          op: "replace",
          path: "./_change/label",
          value: e.target.value,
        })}
        onKeyDown={(e) => { if(e.key === "Enter") self.record() }}
      />

      <Icon
        icon="ci:check"
        onClick={self.record}
      />

      <Icon
        icon="iconoir:cancel"
        onClick={self.cancel}
      />
    </div>
  )
})
