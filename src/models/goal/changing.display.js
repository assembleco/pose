import React from "react"
import { observer } from "mobx-react"
import { Icon } from "@iconify/react"

import replace from "../../replace"

export default observer(({ model }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={model.done === 'yes'}
        onChange={(e) => replace(model, './done',
          model.done === 'yes'
          ? 'no'
          : 'yes'
        )}
      />

      <input
        type="text"
        value={model._change.label}
        onChange={(e) => replace(model, './_change/label', e.target.value)}
        onKeyDown={(e) => { if(e.key === "Enter") model.record() }}
      />

      <Icon
        icon="ci:check"
        onClick={model.record}
      />

      <Icon
        icon="iconoir:cancel"
        onClick={model.cancel}
      />
    </div>
  )
})
