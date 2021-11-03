// Only keep measure basename in [codebase]

import { types } from "mobx-state-tree"

import Page from "../page"

import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Schema = types

var Model =
  Schema.model('Record',
    {
      pages: Schema.array(Schema.late(() => Page)),
    })

export default changeable(loadDisplays(Model), 'changing')