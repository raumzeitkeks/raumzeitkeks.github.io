// Data
import yaml from 'js-yaml';

// Plugins
import {
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';
import PugPlugin from "@11ty/eleventy-plugin-pug";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/**/*');

  // Layouts
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
