# ORB prompt share

A self-contained chat prompt for six-direction exploration and two Spiral Course script styles:

- ORB Learn — Spiral Audio Course
- ORB Feel & Experience — Guided Audio Journey

The public entry is `index.html`. The canonical prompt is `orb-prompt.txt`; `build.py` embeds it into the preview so copy and preview do not need a network fetch. After editing the prompt or `page-template.html`, run `python build.py`. Publish the resulting HTML together with `app.js`, `style.css`, `favicon.svg`, `orb-clouds.jpg`, and `orb-prompt.txt`.

This is a prompt-sharing page, not a hosted AI service or an audio player. It makes no AI requests and stores no user topic. A receiving chat supplies its own model, tools, permissions, and context limits. No local media profile, account credential, voice, or image model is distributed here.

## September 2026 review

The earlier prompt imposed ten branches on every reply, promised indefinite route memory, described pasting as installation, and omitted the six-direction compass, knowledge floor, and current course styles. Its clipboard fallback could report success even when copying failed. The revision removes those claims and adds explicit scope for research, scripts, audio, HTML, and publishing.

The prompt was manually reviewed against the current ORB navigation and Spiral Course contracts for these scenarios: topic supplied with initial paste; no topic supplied; numeric selection; back versus backward; switching ordinary conversation and navigation; map IDs versus compass numbers; missing conversation history; unsupported research; reaching a knowledge floor; learning-course authoring; relaxation-only storytelling; and a requested artifact without the required tools. This is an instruction review, not a claim of independent live testing in every AI product. Individual models can still miss instructions.

Browser checks passed for actual clipboard content (normalizing Windows line endings), both copy buttons, an intentionally blocked clipboard with manual selection, the successful legacy-copy branch, text download, a preview matching the canonical text, motion pause/resume, reduced-motion preference, keyboard skip navigation, 1440/390/320-pixel layouts without horizontal overflow, and reading/downloading with JavaScript disabled. Desktop and mobile screenshots were inspected. No JavaScript runtime errors occurred during those tests. The legacy success/failure branches were simulated; modern clipboard copying was exercised against the browser's actual clipboard.

The page does not guarantee permanent memory, automatic research, a generated recording, a clickable chat widget, or a deployed ORB simply from pasting text. Availability of those features is explicitly conditional on the receiving host.

The share page retains the ORB steel-sphere-above-clouds artwork from the archive, with a silver-blue palette and optional gentle motion. Desktop/mobile framing, actual copying, motion pause, and reduced-motion behavior were checked after the theme update.
