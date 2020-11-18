# mdx-yaml-full

## Description

A plugin for `gatsby-transformer-yaml-full` to parse MDX strings into MDX.

## Installation

Run `npm install --save mdx-yaml-full` or `yarn add mdx-yaml-full`

## Configuration

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-transformer-yaml-full',
      options: {
        plugins: [`mdx-yaml-full`]
      }
    }
    // ...
  ]
};
```

## Usage

**YAML File**:

```yaml
- name: 'Thing'
  content: !mdx |
    # Hello world

    I am MDX!

    - Much wow
    - Such **cool**
```

With the following GraphQL:

```graphql
{
  # Depends on file name
  allFileYaml {
    nodes {
      name
      content
    }
  }
}
```

Results in the following data:

```json
{
  "data": {
    "allRemoveYaml": {
      "nodes": [
        {
          "name": "Thing",
          "content": "function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n/* @jsxRuntime classic */\n\n/* @jsx mdx */\nvar layoutProps = {};\nvar MDXLayout = \"wrapper\";\nreturn function MDXContent(_ref) {\n  var components = _ref.components,\n      props = _objectWithoutProperties(_ref, [\"components\"]);\n\n  return mdx(MDXLayout, _extends({}, layoutProps, props, {\n    components: components,\n    mdxType: \"MDXLayout\"\n  }), mdx(\"h1\", null, \"Hello world\"), mdx(\"p\", null, \"I am MDX!\"), mdx(\"ul\", null, mdx(\"li\", {\n    parentName: \"ul\"\n  }, \"Much wow\"), mdx(\"li\", {\n    parentName: \"ul\"\n  }, \"Such \", mdx(\"strong\", {\n    parentName: \"li\"\n  }, \"cool\"))));\n}\n;\nMDXContent.isMDXComponent = true;"
        }
      ]
    }
  },
  "extensions": {}
}
```

Where `content` can be piped into the `children` of the `MDXRenderer`!

```jsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const Example = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allFileYaml {
          nodes {
            name
            content
          }
        }
      }
    `
  );

  const { name, content } = data.allFileYaml.nodes[0];

  return (
    <>
      <h1>{name}</h1>
      <MDXRenderer>{content}</MDXRenderer>
    </>
  );
};
```

## License

This project is licensed using the [MIT license](LICENSE).
