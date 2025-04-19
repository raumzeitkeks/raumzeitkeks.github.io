export default {
	eleventyComputed: {
		htmlTitle: data => data.htmlTitle || data.title,
	},
};
