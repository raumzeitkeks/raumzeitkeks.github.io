export default {
  lang: 'de',
  scripts: [
    'rezept.js',
  ],
  styles: [
    'rezept.css',
  ],
  parent: '/rezepte',
	eleventyComputed: {
		htmlTitle: data => `${data.title} | Rezepte`,
	},
};
