import React from 'react';
import { types, getSnapshot } from "mobx-state-tree"
import { observable } from 'mobx';
import { Observer, observer } from "mobx-react"
import loadable from "@loadable/component"

const loaded = observable.map({});

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
        if(typeof(self[self._display]) === 'function')
          return self[self._display]()
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

  return types.compose(model, displayable)
};

var NoDisplay = observer(({ self }) => (
  <>
  No display: {self._display}.<br/>
  Model:<pre>{JSON.stringify(getSnapshot(self))}</pre>
  </>
))

export default loadDisplays