// Only keep measure basename in [codebase]

import { types } from "mobx-state-tree"
import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Schema = types

var Model =
  Schema.model('Block',
    {
      name: '',
      code: '',
      parser: '',
    })

export default changeable(loadDisplays(Model), 'changing')
