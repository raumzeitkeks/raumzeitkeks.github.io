// Plugins
import {
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';
import PugPlugin from "@11ty/eleventy-plugin-pug";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/**/*');

  // Layouts
  eleventyConfig.addGlobalData('layout', 'base');
  eleventyConfig.addLayoutAlias('html', 'html.pug');
  eleventyConfig.addLayoutAlias('base', 'base.pug');

  // Collections
  eleventyConfig.addCollection('rezepte', collection => {
    return collection.getFilteredByGlob('./src/rezepte/*').sort((a, b) => {
      return a.data.title.localeCompare(b.data.title);
    });
  });

  // Plugins
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(PugPlugin);

  // Data
  eleventyConfig.setDataFileBaseName('_data');

  // Assets
  eleventyConfig.addPassthroughCopy({
    'src/_favicon': '/',
    'src/_assets': '/',
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: '_data',
      layouts: '_layouts',
      includes: '_includes',
    }
  };
}
