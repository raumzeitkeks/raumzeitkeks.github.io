// Plugins
import {
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';

// Pug
import pug, { compile }	from 'pug'

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

  // Data
  eleventyConfig.setDataFileBaseName('_data');

  // Assets
  eleventyConfig.addPassthroughCopy({
    'src/_favicon': '/',
    'src/_assets': '/',
  });

  // Pug
  eleventyConfig.addTemplateFormats('pug');
	eleventyConfig.addExtension("pug", {
    compileOptions: {
      cache: false,
    },
		compile: async (inputContent, inputPath) => {
      return async (data) => {
        const render = pug.compile(inputContent, {
          basedir: data.eleventy.directories.includes,
          filename: inputPath,
        });
        return render(data);
      };
		},
	});

  return {
    dir: {
      input: 'src',
      output: '_site',
      data: '_data',
      layouts: '_layouts',
      includes: '_includes',
    }
  };
}
