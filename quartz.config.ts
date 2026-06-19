import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "highfence devlog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "highfence.github.io",
    ignorePatterns: ["private", "templates", ".obsidian", "drafts"],
    defaultDateType: "published",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: {
          name: "Press Start 2P",
          weights: [400],
          includeItalic: false,
        },
        header: {
          name: "IBM Plex Sans KR",
          weights: [400, 600, 700],
          includeItalic: false,
        },
        body: {
          name: "IBM Plex Sans KR",
          weights: [400, 600, 700],
          includeItalic: false,
        },
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#EFEAE0",
          lightgray: "#D8D0C2",
          gray: "#736657",
          darkgray: "#1C1813",
          dark: "#1C1813",
          secondary: "#D9603B",
          tertiary: "#B9492B",
          highlight: "#ECE5D8",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161310",
          lightgray: "#352E25",
          gray: "#9B8F7E",
          darkgray: "#ECE6DB",
          dark: "#ECE6DB",
          secondary: "#E87A4F",
          tertiary: "#F09A73",
          highlight: "#2A241C",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
