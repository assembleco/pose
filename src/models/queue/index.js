// Only keep measure basename in [codebase]

import { types } from "mobx-state-tree"

import Record from "../record"

import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Schema = types

var Model =
  Schema.model('Queue',
    {
      name: '',
      range: '',
      source: Schema.string,
      key: Schema.identifierNumber,
    })
  .actions(model => ({
    afterCreate: () => {
      console.log(model.source)
      debugger
    }
  }))

export default loadDisplays(Model)
