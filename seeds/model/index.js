import { types } from "mobx-state-tree"

import loadDisplays from "../../dynamic/displays"

var Model = types.model('NAME', {
  label: '',
})

export default loadDisplays(Model)
