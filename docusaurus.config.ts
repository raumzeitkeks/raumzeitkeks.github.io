import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ruoc.co',
  tagline: 'Calvin & Giulia',
  favicon: 'img/favicon.ico',

  url: 'https://ruoc.co',
  baseUrl: '/',

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ruoc.co',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'recipesSidebar',
          position: 'left',
          label: 'Rezepte',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Wir',
          items: [
            {
              label: 'contact@ruoc.co',
              href: 'mailto:contact@ruoc.co',
            },
          ],
        },
        {
          title: 'Calvin',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Raumzeitkeks',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/calvin-ruocco/',
            },
          ],
        },
        {
          title: 'Giulia',
          items: [
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Calvin Ruocco & Giulia Ruocco`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
