> **Note:** This repository contains Anthropic's implementation of skills for Claude. For information about the Agent Skills standard, see [agentskills.io](http://agentskills.io).

[![skills.sh](https://skills.sh/b/anthropics/skills)](https://skills.sh/anthropics/skills)

## Genation Workspace: size rule for skills

**SKILL.md ≤ 35 KiB, each reference ≤ 45 KiB; the engine truncates tool output at 50 KiB.** Sizes are UTF-8 bytes with LF line ends (non-ASCII text, such as accented Vietnamese names, is multi-byte). Also at most 2,000 lines per file and 2,000 characters per line (the engine's `read` cuts longer lines).

The app's agent engine (OpenCode 2.0.14) keeps only the first 50 KiB (51,200 bytes) or 2,000 lines of any tool output, and loading a skill or reading one of its files is a tool output. The rest goes to the engine's overflow folder; since desktop 0.4.14 the assistant may read it (AGENTS.md "Long tool results"), but that costs extra turns and the model may work without the cut part. The engine also prints the skill's base directory *after* SKILL.md, so a long SKILL.md loses it too. Keep SKILL.md to the scope, the routing table, the per-document procedure and the safety rules; move long, situational sections to `references/` and say exactly when to read each one. Reads under the skill's own folder are allowed without a prompt.

Check before every push (exit 1 when a file is over a limit):

```
node scripts/check-skill-size.mjs
```

## Genation Workspace: static checks (E0)

`node scripts/check-skills.mjs` runs the same static checks as the desktop app's skills lint (`host/test/helpers/skill-lint.ts`, research of 24/10/2026 §6). It fails when:
- a description is over 1,024 characters, or names a tool;
- a skill names a tool that does not exist: every `guroos_…`, `genation-workspace_…` and `monday_…` name, and every backticked `<resource>_<verb>` of the backend (such as `deals_find`), must be in `scripts/tools-manifest.json`;
- `SKILL.md` never says when to read one of its `references/` files (a routing table row, or a line with a condition such as "when", "if", "before", "unsure").

It warns, without failing, when a description is outside 300–700 characters, mentions `tmp/`, or lacks "Use when" or "Not for" (the new descriptions of step P1-9 fix these), and when a reference over 100 lines has no table of contents.

`scripts/tools-manifest.json` is a copy of the desktop repository's `host/eval/tools/tools-manifest.json` (the app's own tools, the backend's tools and the Monday tools the app allows). Refresh it there with `npm run host:eval:tools`, then copy it here.

# Skills
Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks. Skills teach Claude how to complete specific tasks in a repeatable way, whether that's creating documents with your company's brand guidelines, analyzing data using your organization's specific workflows, or automating personal tasks.

For more information, check out:
- [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [How to create custom skills](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [Equipping agents for the real world with Agent Skills](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

# About This Repository

This repository contains skills that demonstrate what's possible with Claude's skills system. These skills range from creative applications (art, music, design) to technical tasks (testing web apps, MCP server generation) to enterprise workflows (communications, branding, etc.).

Each skill is self-contained in its own folder with a `SKILL.md` file containing the instructions and metadata that Claude uses. Browse through these skills to get inspiration for your own skills or to understand different patterns and approaches.

Many skills in this repo are open source (Apache 2.0). We've also included the document creation & editing skills that power [Claude's document capabilities](https://www.anthropic.com/news/create-files) under the hood in the [`skills/docx`](./skills/docx), [`skills/pdf`](./skills/pdf), [`skills/pptx`](./skills/pptx), and [`skills/xlsx`](./skills/xlsx) subfolders. These are source-available, not open source, but we wanted to share these with developers as a reference for more complex skills that are actively used in a production AI application.

## Disclaimer

**These skills are provided for demonstration and educational purposes only.** While some of these capabilities may be available in Claude, the implementations and behaviors you receive from Claude may differ from what is shown in these skills. These skills are meant to illustrate patterns and possibilities. Always test skills thoroughly in your own environment before relying on them for critical tasks.

# Skill Sets
- [./skills](./skills): Skill examples for Creative & Design, Development & Technical, Enterprise & Communication, and Document Skills
- [./spec](./spec): The Agent Skills specification
- [./template](./template): Skill template

# Try in Claude Code, Claude.ai, and the API

## Claude Code
You can register this repository as a Claude Code Plugin marketplace by running the following command in Claude Code:
```
/plugin marketplace add anthropics/skills
```

Then, to install a specific set of skills:
1. Select `Browse and install plugins`
2. Select `anthropic-agent-skills`
3. Select `document-skills` or `example-skills`
4. Select `Install now`

Alternatively, directly install either Plugin via:
```
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

After installing the plugin, you can use the skill by just mentioning it. For instance, if you install the `document-skills` plugin from the marketplace, you can ask Claude Code to do something like: "Use the PDF skill to extract the form fields from `path/to/some-file.pdf`"

## Claude.ai

These example skills are all already available to paid plans in Claude.ai. 

To use any skill from this repository or upload custom skills, follow the instructions in [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude#h_a4222fa77b).

## Claude API

You can use Anthropic's pre-built skills, and upload custom skills, via the Claude API. See the [Skills API Quickstart](https://docs.claude.com/en/api/skills-guide#creating-a-skill) for more.

# Creating a Basic Skill

Skills are simple to create - just a folder with a `SKILL.md` file containing YAML frontmatter and instructions. You can use the **template-skill** in this repository as a starting point:

```markdown
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Add your instructions here that Claude will follow when this skill is active]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2
```

The frontmatter requires only two fields:
- `name` - A unique identifier for your skill (lowercase, hyphens for spaces)
- `description` - A complete description of what the skill does and when to use it

The markdown content below contains the instructions, examples, and guidelines that Claude will follow. For more details, see [How to create custom skills](https://support.claude.com/en/articles/12512198-creating-custom-skills).

# Partner Skills

Skills are a great way to teach Claude how to get better at using specific pieces of software. As we see awesome example skills from partners, we may highlight some of them here:

- **Notion** - [Notion Skills for Claude](https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0)
