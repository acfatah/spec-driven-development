# Spec-driven Development and Specifications (DRAFT)

This repository outlines my implementation of spec-driven development.

<p>
  <a href="https://github.com/acfatah/spec-driven-development/commits/main">
    <img
      alt="GitHub last commit (by committer)"
      src="https://img.shields.io/github/last-commit/acfatah/spec-driven-development?display_timestamp=committer&style=flat-square"></a>
</p>

> [!IMPORTANT]
> Still in draft

## Usage

Create a new directory, `cd` into it, and run:

```bash
bunx --bun tiged acfatah/spec-driven-development/templates/starter
```

## Directory Structure

```
.
├── guide                    # contains the guide on how to write specs
│   ├── 00-requirements.md
│   ├── 01-design.md
│   ├── 02-tasks.md
│   ├── 03-deployment.md
│   └── 04-monitoring.md
├── templates
│   └── starter
│       ├── CHANGELOG.md     # optionaly generate changelog using script
│       ├── LICENSE          # optionaly define license
│       ├── package.json
│       ├── apps             # contains applications or modules
│       │   ├── client
│       │   ├── docs
│       │   ├── server
│       │   └── web
│       ├── data             # contains hard-coded data files or database related stuff 
│       ├── packages         # contains shared packages or libraries
│       │   └── shared
│       ├── res              # contains all the non-code resources
│       ├── scripts          # contains tasks or automation scripts
│       └── specs            # contains the specification documents
├── README.md
└── CHANGELOG.md
```

Read more detail from the `guide` directory.

## Goals

- Promote a spec-first workflow that drives test generation, acceptance criteria,
    and contract tests
- Standardize specification formats, linting rules, and validation to reduce
    ambiguity and onboarding friction
- Foster collaboration by offering review workflows, contribution templates, and
    clear roles for authors, reviewers, and maintainers
- Accelerate development velocity by providing reusable specification templates, 
    automated scaffolding, and CI/CD-ready artifacts to minimize setup time and 
    shorten iteration cycles
- Offer automation hooks (scaffolders, code-generation, test runners) to reduce
    manual effort and prevent divergence between spec and implementation
- Enable AI-assisted maintenance to keep specifications and documentation current 
    through automated updates and reviews

## Resources

- https://siliconangle.com/2025/07/16/agentic-aws-spec-driven-development-kiro-agentcore-aicloudleaders
- EARS format (Easy Approach to Requirements Syntax)  
  https://alistairmavin.com/ears
- https://choosealicense.com
- https://github.com/github/spec-kit

<!-- video abou spec-kit -->
- https://www.youtube.com/watch?v=em3vIT9aUsg&ab_channel=BetterStack
