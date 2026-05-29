import type { ProcessedPrompt } from './cms-client.js';
import { t } from './i18n.js';

const MAX_PROMPTS_TO_DISPLAY = 100;

export interface LanguageConfig {
  code: string;
  name: string;
  readmeFileName: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', readmeFileName: 'README.md' },
  { code: 'zh', name: '简体中文', readmeFileName: 'README_zh.md' },
  { code: 'zh-TW', name: '繁體中文', readmeFileName: 'README_zh-TW.md' },
  { code: 'ja-JP', name: '日本語', readmeFileName: 'README_ja-JP.md' },
  { code: 'ko-KR', name: '한국어', readmeFileName: 'README_ko-KR.md' },
  { code: 'th-TH', name: 'ไทย', readmeFileName: 'README_th-TH.md' },
  { code: 'vi-VN', name: 'Tiếng Việt', readmeFileName: 'README_vi-VN.md' },
  { code: 'hi-IN', name: 'हिन्दी', readmeFileName: 'README_hi-IN.md' },
  { code: 'es-ES', name: 'Español', readmeFileName: 'README_es-ES.md' },
  { code: 'es-419', name: 'Español (Latinoamérica)', readmeFileName: 'README_es-419.md' },
  { code: 'de-DE', name: 'Deutsch', readmeFileName: 'README_de-DE.md' },
  { code: 'fr-FR', name: 'Français', readmeFileName: 'README_fr-FR.md' },
  { code: 'it-IT', name: 'Italiano', readmeFileName: 'README_it-IT.md' },
  { code: 'pt-BR', name: 'Português (Brasil)', readmeFileName: 'README_pt-BR.md' },
  { code: 'pt-PT', name: 'Português', readmeFileName: 'README_pt-PT.md' },
  { code: 'tr-TR', name: 'Türkçe', readmeFileName: 'README_tr-TR.md' },
];

const LANG_BADGES: Record<string, string> = {
  en: '![English](https://img.shields.io/badge/lang-English-blue)',
  zh: '![中文](https://img.shields.io/badge/lang-中文-red)',
  ja: '![日本語](https://img.shields.io/badge/lang-日本語-green)',
  ko: '![한국어](https://img.shields.io/badge/lang-한국어-orange)',
};

/**
 * Convert locale to URL language prefix
 */
function getLocalePrefix(locale: string): string {
  if (locale === 'en') return 'en-US';
  if (locale === 'zh') return 'zh-CN';
  return locale;
}

function formatDate(iso?: string): string {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/**
 * Video URL mapping: prompt ID → GitHub user-attachment URL
 */
export type VideoUrlMap = Record<string, string>;

export function generateReadme(prompts: ProcessedPrompt[], locale: string = 'en', videoUrls: VideoUrlMap = {}, totalDocs?: number): string {
  const now = new Date().toISOString().split('T')[0];
  const localePrefix = getLocalePrefix(locale);
  const galleryUrl = `https://youmind.com/${localePrefix}/gemini-omni-prompts`;

  let md = '';

  // Language navigation
  md += generateLanguageNavigation(locale);

  // Header
  md += `# 🎬 ${t('title', locale)}

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![GitHub stars](https://img.shields.io/github/stars/YouMind-OpenLab/awesome-gemini-omni?style=social)](https://github.com/YouMind-OpenLab/awesome-gemini-omni)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/YouMind-OpenLab/awesome-gemini-omni/pulls)

${t('subtitle', locale)}

> ⚠️ ${t('copyright', locale)}

---

`;

  // TOC
  md += `## 📖 ${t('toc', locale)}

- [🌐 ${t('viewInGallery', locale)}](#-${slugify(t('viewInGallery', locale))})
- [🤔 ${t('whatIs', locale)}](#-${slugify(t('whatIs', locale))})
- [📊 ${t('stats', locale)}](#-${slugify(t('stats', locale))})
- [⭐ ${t('featuredPrompts', locale)}](#-${slugify(t('featuredPrompts', locale))})
- [🎬 ${t('allPrompts', locale)}](#-${slugify(t('allPrompts', locale))})
- [🤝 ${t('howToContribute', locale)}](#-${slugify(t('howToContribute', locale))})
- [📄 ${t('license', locale)}](#-${slugify(t('license', locale))})
- [🙏 ${t('acknowledgements', locale)}](#-${slugify(t('acknowledgements', locale))})
- [⭐ ${t('starHistory', locale)}](#-${slugify(t('starHistory', locale))})

---

`;

  // Gallery CTA
  md += `## 🌐 ${t('viewInGallery', locale)}

**[${t('browseGallery', locale)}](${galleryUrl})**

${t('galleryFeatures', locale)}

| Feature | ${t('githubReadme', locale)} | ${t('youmindGallery', locale)} |
|---------|--------------|---------------------|
| 🎬 ${t('visualLayout', locale)} | ${t('linearList', locale)} | ${t('masonryGrid', locale)} |
| 🔍 ${t('search', locale)} | ${t('ctrlFOnly', locale)} | ${t('fullTextSearch', locale)} |
| 🤖 ${t('languages', locale)} | - | ${t('aiRecommendation', locale)} |
| 📱 ${t('mobile', locale)} | ${t('basic', locale)} | ${t('fullyResponsive', locale)} |

---

`;

  // What is Gemini Omni
  md += `## 🤔 ${t('whatIs', locale)}

${t('whatIsIntro', locale)}

**Key Features:**
- ${t('textToVideo', locale)}
- ${t('imageToVideo', locale)}
- ${t('videoToVideo', locale)}
- ${t('audioDriven', locale)}
- ${t('highResolution', locale)}
- ${t('autoDubbing', locale)}

---

`;

  // Separate featured and regular
  const featured = prompts.filter(p => p.featured);
  const regular = prompts.filter(p => !p.featured);

  // Stats
  md += `## 📊 ${t('stats', locale)}

| ${t('metric', locale)} | ${t('count', locale)} |
|--------|-------|
| 📝 ${t('totalPrompts', locale)} | **${totalDocs ?? prompts.length}** |
| ⭐ ${t('featuredPrompts', locale)} | **${featured.length}** |
| 🔄 ${t('lastUpdated', locale)} | **${now}** |

---

`;

  // Featured section
  if (featured.length > 0) {
    md += `## 🔥 ${t('featuredPrompts', locale)}

> ⭐ ${t('featuredDesc', locale)}

`;
    featured.forEach((p, i) => {
      md += generateFeaturedPromptBlock(p, i + 1, locale, galleryUrl, videoUrls);
    });
    md += `---\n\n`;
  }

  // Regular prompts
  const displayedPrompts = regular.slice(0, MAX_PROMPTS_TO_DISPLAY);
  const hiddenCount = regular.length - displayedPrompts.length;

  md += `## 🎬 ${t('allPrompts', locale)}

> 📝 ${t('sortedByDate', locale)}

`;

  for (const p of displayedPrompts) {
    md += generatePromptBlock(p, locale, galleryUrl, false, videoUrls);
  }

  // Show More section when truncated
  if (hiddenCount > 0) {
    md += `---

## 📚 ${t('morePrompts', locale)}

<div align="center">

### 🎯 ${hiddenCount} ${t('morePromptsDesc', locale)}

Due to GitHub's content length limitations, we can only display the first ${MAX_PROMPTS_TO_DISPLAY} prompts in this README.

**[${t('viewAll', locale)}](${galleryUrl})**

${t('galleryFeature1', locale)}

${t('galleryFeature2', locale)}

${t('galleryFeature3', locale)}

${t('galleryFeature4', locale)}

</div>

---

`;
  }

  // Contributing
  md += `
## 🤝 ${t('howToContribute', locale)}

${t('welcomeContributions', locale)}

1. ${t('forkRepo', locale)}
2. ${t('addPrompt', locale)}
3. ${t('submitPR', locale)}

---

`;

  // License
  md += `## 📄 ${t('license', locale)}

${t('licensedUnder', locale)}

---

`;

  // Acknowledgements
  md += `## 🙏 ${t('acknowledgements', locale)}

- [Google DeepMind](https://deepmind.google/) for developing Gemini Omni
- [YouMind](https://youmind.com) for the prompt gallery and community
- All prompt contributors

---

`;

  // Star History
  md += `## ⭐ ${t('starHistory', locale)}

[![Star History Chart](https://api.star-history.com/svg?repos=YouMind-OpenLab/awesome-gemini-omni&type=Date)](https://star-history.com/#YouMind-OpenLab/awesome-gemini-omni&Date)

---

<div align="center">

**[🌐 ${t('viewInGallery', locale)}](${galleryUrl})** •
**[📝 ${t('submitPrompt', locale)}](https://github.com/YouMind-OpenLab/awesome-gemini-omni/pulls)** •
**[⭐ ${t('starRepo', locale)}](https://github.com/YouMind-OpenLab/awesome-gemini-omni)**

<sub>🤖 ${t('autoGenerated', locale)} ${new Date().toISOString()}</sub>

</div>
`;

  return md;
}

/**
 * Featured prompt card — rich layout matching nano-banana-pro style.
 * Uses numbered heading, dedicated Description / Prompt / Video / Details sections,
 * and center-aligned media.
 */
function generateFeaturedPromptBlock(
  p: import('./cms-client.js').ProcessedPrompt,
  index: number,
  locale: string,
  galleryUrl: string,
  videoUrls: VideoUrlMap = {},
): string {
  const langBadge = LANG_BADGES[p.language] || `![${p.language}](https://img.shields.io/badge/lang-${p.language}-grey)`;
  const authorLink = p.author?.link || '#';
  const authorName = p.author?.name || 'Unknown';
  const publishedDate = p.sourcePublishedAt
    ? new Date(p.sourcePublishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';
  const title = sanitizeGeminiOmniText(p.title);
  const promptContent = sanitizeGeminiOmniText(p.translatedContent || p.content);
  const displayImage = p.referenceImages?.[0] || p.mediaImages?.[0] || p.thumbnail;
  const tryLink = `${galleryUrl}?id=${p.id}`;
  const videoUrl = videoUrls[String(p.id)];
  const watchVideoLink = `**[${t('watchVideo', locale)}](${tryLink})**`;

  let md = `### No. ${index}: ${title}\n\n`;
  md += `${langBadge}\n`;
  md += `![Featured](https://img.shields.io/badge/⭐-Featured-gold)\n\n`;

  if (p.description) {
    md += `#### 📖 ${t('description', locale)}\n\n${sanitizeGeminiOmniText(p.description)}\n\n`;
  }

  md += `#### 📝 ${t('prompt', locale)}\n\n\`\`\`\n${promptContent}\n\`\`\`\n\n`;

  // Video / thumbnail embed (center-aligned)
  md += `#### 🎬 ${t('video', locale)}\n\n`;
  md += `<div align="center">\n\n`;
  if (videoUrl && videoUrl.includes('user-attachments/assets/')) {
    md += `${videoUrl}\n\n`;
    md += `${watchVideoLink}\n\n`;
  } else if (videoUrl && displayImage) {
    md += `<a href="${videoUrl}">\n`;
    md += `<img src="${displayImage}" width="700" alt="${title}">\n`;
    md += `</a>\n\n`;
    md += `📥 *${t('clickToPlay', locale)}* | ${watchVideoLink}\n\n`;
  } else {
    md += `<img src="${displayImage}" width="700" alt="${title}">\n\n`;
    md += `${watchVideoLink}\n\n`;
  }
  md += `</div>\n\n`;

  md += `#### 📌 ${t('details', locale)}\n\n`;
  md += `- **${t('author', locale)}:** [${authorName}](${authorLink})\n`;
  if (p.sourceLink) md += `- **${t('source', locale)}:** [Twitter Post](${p.sourceLink})\n`;
  md += `- **${t('published', locale)}:** ${publishedDate}\n\n`;

  md += `**[👉 ${t('tryItNow', locale)}](${tryLink})**\n\n`;
  md += `---\n\n`;

  return md;
}

function generatePromptBlock(p: import('./cms-client.js').ProcessedPrompt, locale: string, galleryUrl: string, isFeatured: boolean, videoUrls: VideoUrlMap = {}): string {
  const langBadge = LANG_BADGES[p.language] || `![${p.language}](https://img.shields.io/badge/lang-${p.language}-grey)`;
  const title = sanitizeGeminiOmniText(p.title);
  const desc = p.description ? `\n> ${sanitizeGeminiOmniText(p.description)}\n` : '';
  const authorLine = p.author
    ? p.author.link
      ? `**${t('author', locale)}:** [${p.author.name}](${p.author.link})`
      : `**${t('author', locale)}:** ${p.author.name}`
    : '';
  const sourceLine = p.sourceLink ? ` | **${t('source', locale)}:** [Link](${p.sourceLink})` : '';
  const dateLine = p.sourcePublishedAt ? ` | **${t('published', locale)}:** ${formatDate(p.sourcePublishedAt)}` : '';
  const tryLink = `${galleryUrl}?id=${p.id}`;
  const promptContent = sanitizeGeminiOmniText(p.translatedContent || p.content);
  const displayImage = (p.referenceImages?.[0]) || (p.mediaImages?.[0]) || p.thumbnail;
  const imgWidth = isFeatured ? '700' : '600';
  const featuredBadge = isFeatured ? `![Featured](https://img.shields.io/badge/⭐-Featured-gold)\n` : '';

  // Check if we have a video URL from the mapping
  const videoUrl = videoUrls[String(p.id)];
  let mediaEmbed: string;
  const watchVideoLink = `**[${t('watchVideo', locale)}](${tryLink})**`;
  if (videoUrl && videoUrl.includes('user-attachments/assets/')) {
    // GitHub auto-renders user-attachments URLs as inline video players
    mediaEmbed = `${videoUrl}\n\n${watchVideoLink}`;
  } else if (videoUrl && displayImage) {
    // Fallback: release assets URL — use clickable thumbnail (GitHub won't auto-embed these)
    mediaEmbed = `<a href="${videoUrl}"><img src="${displayImage}" width="${imgWidth}" alt="${title}"></a>\n\n📥 *${t('clickToPlay', locale)}* | ${watchVideoLink}`;
  } else {
    mediaEmbed = `<img src="${displayImage}" width="${imgWidth}" alt="${title}">\n\n${watchVideoLink}`;
  }

  return `### ${title}

${featuredBadge}${langBadge}
${desc}
#### 📝 ${t('prompt', locale)}

\`\`\`
${promptContent}
\`\`\`

${mediaEmbed}

${authorLine}${sourceLine}${dateLine}

---
`;
}

function sanitizeGeminiOmniText(text: string): string {
  return text
    .replace(/Seedance\s*2(?:\.0)?/gi, 'Gemini Omni')
    .replace(/Seedance/gi, 'Gemini Omni');
}

function generateLanguageNavigation(currentLocale: string): string {
  const badges = SUPPORTED_LANGUAGES.map(lang => {
    const isCurrent = lang.code === currentLocale;
    const color = isCurrent ? 'brightgreen' : 'lightgrey';
    const text = isCurrent ? 'Current' : 'Click%20to%20View';
    const safeName = encodeURIComponent(lang.name);
    return `[![${lang.name}](https://img.shields.io/badge/${safeName}-${text}-${color})](${lang.readmeFileName})`;
  });

  return badges.join(' ') + '\n\n---\n\n';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
