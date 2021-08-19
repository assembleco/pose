import { observer } from "mobx-react"
import { applyPatch } from "mobx-state-tree"

export default observer(({ self }) => (
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
  </div>
))
