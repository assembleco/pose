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

      <input
        type="text"
        value={self._change.label}
        onChange={(e) => replace(self, './_change/label', e.target.value)}
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
