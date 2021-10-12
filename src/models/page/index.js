// Loose relacion. Mainly range based.
// Examples:
// 1-3, 4-6, 12

// Only keep measure basename in [codebase]

import { types } from "mobx-state-tree"

import Record from "../record"

import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Schema = types

var Model =
  Schema.model('Page',
    {
      range: '',
      key: Schema.identifierNumber,
      record: Record,
    })

export default changeable(loadDisplays(Model), 'changing')
