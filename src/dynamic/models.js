import React from 'react';
import styled from "styled-components"
import { types, getSnapshot, applySnapshot } from "mobx-state-tree"
import { observable, runInAction } from 'mobx';
import { Observer, observer } from "mobx-react"

const loaded = observable.map({});

var choose = observable.box(false)

const loadModel = (model_name) => {
  var model = import(`../models/${model_name}`)

  loaded.set(model_name, model)
};

const realize = (self, model, base = {}) => {
  var ready = false;
  try { ready = loaded.get(model) }
  catch (e) { ready = false }

  return (
    ready
    ? loaded.get(model).base(model, base)
    : null
  )
}

var loadModels = () => {
  const models = require
    .context('../models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./(.+)/index.js$`).exec(file);
      return module && module[1];
    })
    .filter((module) => module !== null)

  models.forEach((model) => loadModel(model));

  /*
  var riggable = types
    .model({ _rig: 'primary' })
    .actions(self => ({
      base: (base) => {
        return applySnapshot(self, base)
      }
    }))

  return types.compose(model, model, riggable)
  */
};

document.addEventListener('keydown', (e) => {
  if(e.code === "m") {
    e.preventDefault()
    runInAction(() => choose.set(true))
  }
})

document.addEventListener('keyup', (e) => {
  if(e.code === "m") {
    runInAction(() => choose.set(false))
  }
})

export default loadModels
