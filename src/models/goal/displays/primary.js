import React from "react"
import { observer } from "mobx-react"
import { Icon } from "@iconify/react"

import replace from "../../../replace"

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

      {model.label}

      <Icon
        icon="ci:edit"
        onClick={model.change}
      />
    </div>
  )
})
