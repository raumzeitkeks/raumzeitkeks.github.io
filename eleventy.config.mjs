// Data
import yaml from 'js-yaml';

// Plugins
import {
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/**/*');

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.html');

  // Collections
  eleventyConfig.addCollection('nav', collection => {
    return collection.getFilteredByGlob('./src/nav/*');
  });
  eleventyConfig.addCollection('rezepte', collection => {
    return collection.getFilteredByGlob('./src/rezepte/*');
  });

  // Plugins
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  // Data
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Assets
  eleventyConfig.addPassthroughCopy({
    'src/_favicon': '/',
    'src/_assets': '/',
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
}
