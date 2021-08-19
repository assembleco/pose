import React from 'react';
import { applyPatch } from 'mobx-state-tree';
import moment from 'moment-timezone';

const templates = {};

const loadTemplate = (modelName, templateName) => {
  if (!templates[modelName]) templates[modelName] = {};

  import(`./models/${modelName}/${templateName}`)
    .then((module) => {
      templates[modelName][templateName] = module.default;

      applyPatch(window.model, {
        op: 'replace',
        path: `/_templates/${modelName}/${templateName}`,
        value: moment(),
      });
    });
};

const template = (self, templateName) => {
  let available = false;
  const modelName = self.$treenode.type.name;

  try {
    const timestamp = self.$treenode.root.value._templates[modelName][templateName];

    available = (
      timestamp
      && !timestamp.invalid
      && templates[modelName][templateName]
    );
  } catch (e) {
    available = false;
  }

  return available
    ? React.createElement(
      templates[modelName][templateName],
      { self, key: `${self.$treenode.path}:${templateName}` },
    )
    : null;
};

export default (self) => () => {
  const modelName = self.$treenode.type.name;

  const templateNames = require
    .context('./models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./${modelName}/(.+).js$`).exec(file);
      return module && module[1];
    })
    .filter((file) => file !== 'index')
    .filter((module) => module !== null);

  console.log(templateNames)

  templateNames.forEach((templateName) => {
    loadTemplate(modelName, templateName);

    Object.defineProperty(self, templateName, {
      get: () => template(self, templateName),
    });
  });
};
