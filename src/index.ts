// plugins/mdx-yaml-full/index.js
// from: https://github.com/gatsbyjs/gatsby/issues/21789

import mdx from '@mdx-js/mdx';
import * as babel from '@babel/core';
import * as objRestSpread from '@babel/plugin-proposal-object-rest-spread';
import * as BabelPluginPluckImports from 'gatsby-plugin-mdx/utils/babel-plugin-pluck-imports';
import * as htmlAttrToJSXAttr from 'gatsby-plugin-mdx/utils/babel-plugin-html-attr-to-jsx-attr';
import * as removeExportKeywords from 'gatsby-plugin-mdx/utils/babel-plugin-remove-export-keywords';

export = ({ node }: any) => ({
  tag: '!mdx',
  options: {
    kind: 'scalar',
    construct: async (data) => {
      const code = await mdx(data);
      const instance = new BabelPluginPluckImports();

      // lifted straight from this section:
      // https://github.com/gatsbyjs/gatsby/blob/cd150b5e5264a5a75f2abc27e3430c55bfcd4e41/packages/gatsby-plugin-mdx/utils/gen-mdx.js#L138
      const result = babel.transform(code, {
        configFile: false,
        plugins: [
          instance.plugin,
          objRestSpread,
          htmlAttrToJSXAttr,
          removeExportKeywords
        ],
        presets: [
          require(`@babel/preset-react`),
          [
            require(`@babel/preset-env`),
            {
              useBuiltIns: `entry`,
              corejs: 3,
              modules: false
            }
          ]
        ]
      });

      // TODO: be more sophisticated about these replacements
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const body = result!
        .code!.replace(
          /export\s*default\s*function\s*MDXContent\s*/,
          `return function MDXContent`
        )
        .replace(
          /export\s*{\s*MDXContent\s+as\s+default\s*};?/,
          `return MDXContent;`
        );

      return { body: body };
    }
  }
});
