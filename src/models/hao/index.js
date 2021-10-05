// Only keep measure basename in [codebase]

import { types } from "mobx-state-tree"
import Page from "../page"
import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Schema = types

// `Model` is ...
var Model =
  Schema.model('Hao',
    {
      pages: Schema.array(Page),
    })

export default changeable(loadDisplays(Model), 'changing')
