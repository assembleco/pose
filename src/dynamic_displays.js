import React from 'react';
import styled from "styled-components"
import { types, getSnapshot } from "mobx-state-tree"
import { observable, runInAction } from 'mobx';
import { Observer, observer } from "mobx-react"
import loadable from "@loadable/component"

const loaded = observable.map({});

var choose = observable.box(false)

const loadDisplay = (model, display) => {
  var Component = loadable(() => import(`./models/${snake_case(model)}/displays/${display}`))

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
        { model: self, key: `${self.$treenode.path}:${display}` },
      )

      : null
    )
  }}</Observer>
)

var snake_case = (str) => (
  str && str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(s => s.toLowerCase())
  .join('_');
)

var loadDisplays = (model) => {
  const displays = require
    .context('./models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./${snake_case(model.name)}/displays/(.+).js$`).exec(file);
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
                onClick={(e) => {
                  e.stopPropagation()
                  window.model.choose(self.key)
                }}
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
  <Red>
  No display: {self.$treenode.type.name}:{self._display}.<br/>
  Model:<pre>{JSON.stringify(getSnapshot(self), null, 2)}</pre>
  </Red>
))

var Red = styled.div`
  border: 2px solid #c91515;
  color: #c91515;
  background: #edb1b1;
  width: 40vw;
`

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
