import React from 'react';
import styled from "styled-components"
import { types, getSnapshot } from "mobx-state-tree"
import { observable, runInAction } from 'mobx';
import { Observer, observer } from "mobx-react"
import loadable from "@loadable/component"

import replace from "./replace"

const loaded = observable.map({});

var choose = observable.box(false)

const loadDisplay = (model, display) => {
  var Component = loadable(() => import(`./models/${model}/${display}`))

  if (!loaded.get(model)) loaded.set(model, observable.map({}))
  loaded.get(model).set(display, Component)
};

const render = (self, model, display) => (
  <Observer>{() => {
    var ready = false;
    try {
      ready = loaded.get(model).get(display)
    } catch (e) {
      ready = false;
    }

    return (
      ready
      ?
      React.createElement(
        loaded.get(model).get(display),
        { self, key: `${self.$treenode.path}:${display}` },
      )

      : null
    )
  }}</Observer>
)

var loadDisplays = (model) => {
  const displays = require
    .context('./models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./${model.name}/(.+).js$`).exec(file);
      return module && module[1];
    })
    .filter((file) => file !== 'index')
    .filter((module) => module !== null);

  displays.forEach((display) => loadDisplay(model.name, display));

  var displayable = types
    .model({ _display: 'primary' })
    .views(self => {
      var views = {}

      displays.forEach(display => {
        views[display] = () => render(self, model.name, display)
      })

      views.display = () => {
        if(typeof(self[self._display]) === 'function') {
          if(choose.get())
            return (
              <Choose
                key={`${self.$treenode.path}:choose`}
                onClick={() => window.model.choose(self.key) }
              >
                {self[self._display]()}
              </Choose>
            )
          else
            return self[self._display]()
        }
        else
          return (
            <NoDisplay
              self={self}
              key={`${self.$treenode.path}:no_display`}
            />
          )
      }

      return views
    })

  return types.compose(model.name, model, displayable)
};

var NoDisplay = observer(({ self }) => (
  <>
  No display: {self._display}.<br/>
  Model:<pre>{JSON.stringify(getSnapshot(self))}</pre>
  </>
))

var Choose = styled.div`
border: 1px solid black;
display: inline-block;
`

document.addEventListener('keydown', (e) => {
  if(e.code === "Space") {
    e.preventDefault()
    runInAction(() => choose.set(true))
  }
})

document.addEventListener('keyup', (e) => {
  if(e.code === "Space") {
    runInAction(() => choose.set(false))
  }
})

export default loadDisplays
