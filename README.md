# Awesome Gemini Omni

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/YouMind-OpenLab/awesome-gemini-omni/pulls)

A curated index of Gemini Omni resources, guides, workflows, and community research.

Gemini Omni is Google's multimodal generative media model family announced at Google I/O 2026. The first model, Gemini Omni Flash, starts with video generation and editing from text, images, video, and voice references.

> This repository is not affiliated with Google. It is maintained by YouMind OpenLab as a community resource index.

## Table of Contents

- [Official Resources](#official-resources)
- [What is Gemini Omni?](#what-is-gemini-omni)
- [Prompting Notes](#prompting-notes)
- [Community Guides](#community-guides)
- [Related Tools and Surfaces](#related-tools-and-surfaces)
- [Competitive Landscape](#competitive-landscape)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## Official Resources

- [Google I/O 2026 announcements](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-collection/) - Google's top-level I/O 2026 announcement collection.
- [100 things announced at Google I/O 2026](https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/) - Includes Gemini Omni availability, input modalities, SynthID, and product surfaces.
- [Introducing Gemini Omni](https://blog.google/products-and-platforms/products/gemini/) - Google Gemini news index with the Gemini Omni launch entry.
- [Gemini Omni prompt guide](https://deepmind.google/models/gemini-omni/prompt-guide/) - Official prompting guidance from Google DeepMind.
- [Gemini app subscriptions](https://gemini.google/about?hl=en) - Gemini app and Google Flow plan details.
- [Google Flow updates](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates/) - Gemini Omni Flash in Google Flow and Flow Music.

## What is Gemini Omni?

Gemini Omni is designed to create media from multimodal input, starting with video. Google positions it as a model that combines Gemini's reasoning and world understanding with generative media capabilities.

Key points from Google's launch materials:

- Starts with video output through Gemini Omni Flash.
- Accepts references across text, images, video, and voice, with broader audio input support planned.
- Supports conversational video creation and editing in the Gemini app.
- Is available through Google Flow for creative workflows.
- Is rolling out in YouTube Shorts Remix and YouTube Create.
- Uses SynthID watermarking for generated videos.

## Prompting Notes

These are high-level patterns from Google's prompt guide and early community testing. This repo intentionally does not mirror or republish prompt collections.

- Treat prompts like short directing briefs: subject, action, camera, lighting, location, style, and timing.
- Use camera language when motion matters: locked-off shot, push in, dolly zoom, close-up, wide shot, handheld, or one continuous shot.
- Provide references when identity, product consistency, or a specific visual style matters.
- For edits, state what should stay unchanged before describing the change.
- Keep temporal instructions explicit when the clip needs multiple beats.
- Avoid contradictory style or motion instructions in the same prompt.

## Community Guides

- [Gemini Omni prompt guide by GemiOmni](https://www.gemiomni.net/docs/gemini-omni-prompt-guide/)
- [Gemini Omni prompts guide by Gemini Omni Video](https://www.geminiomnivideo.io/gemini-omni-prompts)
- [Gemini Omni guide by Gemini Omni AI](https://geminiomniai.co/guide)
- [Gemini Omni Flash generator notes](https://www.geminiomniflash.io/)
- [Gemini Omni Flash workspace notes](https://www.gemini-omni.studio/gemini-omni-flash)

## Related Tools and Surfaces

- [Gemini app](https://gemini.google/)
- [Google Flow](https://labs.google/fx/tools/flow)
- [YouTube Create](https://www.youtube.com/create)
- [YouTube Shorts](https://www.youtube.com/shorts)

## Competitive Landscape

Gemini Omni sits in the fast-moving AI video generation and editing category. Relevant adjacent models and tools include:

- Google Veo
- OpenAI Sora
- ByteDance Seedance
- Kuaishou Kling
- Runway
- Pika
- Luma Dream Machine

## How to Contribute

Pull requests are welcome for:

- Official links and release notes
- High-quality tutorials or workflow writeups
- Model behavior observations with clear examples
- Tooling around Gemini Omni workflows
- Translations of this README

Please do not submit copied prompt packs, scraped prompt dumps, or copyrighted content. Link to original sources instead.

## License

This repository is released under the [Creative Commons Attribution 4.0 International License](LICENSE).
