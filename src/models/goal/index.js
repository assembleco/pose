import { types } from "mobx-state-tree"

import changeable from "../../change"
import loadDisplays from "../../dynamic/displays"

var Model = types.model('goal', {
  key: types.identifierNumber,
  label: types.string,
  done: types.string,
})

export default changeable(loadDisplays(Model), 'changing')
