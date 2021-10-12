// Only keep measure basename in [codebase]

import { types } from "mobx-state-tree"

import Block from "../block"
import Page from "../page"

import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Schema = types

var Model =
  Schema.model('Mark',
    {
      page: Schema.reference(Page),
      blocks: Schema.array(Block),
    })

export default changeable(loadDisplays(Model), 'changing')
