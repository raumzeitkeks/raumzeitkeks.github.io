// Data
import yaml from 'js-yaml';

// Plugins
import {
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
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
    'src/assets/images/favicon/*': '/',
    'src/assets/fonts/': 'assets/fonts/',
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
}
