# Security Policy

## Supported Versions

Security fixes are provided for the latest code on the `main` branch. If you use this repository as a project template, keep your generated project updated with upstream security fixes where practical.

## Reporting a Vulnerability

Please report suspected security vulnerabilities privately. Do not open a public GitHub issue for sensitive findings.

Send a report to:

- GitHub Security Advisories for this repository, if available
- The repository owner through a private contact channel

Include as much detail as possible:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Affected package, app, endpoint, or configuration
- Expected impact and any known exploit conditions
- Relevant logs, screenshots, proof-of-concept code, or dependency versions

## Response Expectations

We aim to acknowledge valid reports within 3 business days and provide follow-up as the issue is triaged. Confirmed vulnerabilities will be fixed as quickly as practical based on severity, exploitability, and release risk.

When a fix is available, we may publish a security advisory, release notes, or upgrade guidance depending on the scope of the issue.

## Safe Testing Guidelines

When testing, please:

- Use only your own local environment or systems you are authorized to test
- Avoid accessing, modifying, or deleting data that does not belong to you
- Avoid service disruption, denial-of-service testing, spam, or social engineering
- Stop testing and report immediately if you discover sensitive data exposure

## Security Checks

This project uses automated checks including dependency audits and CI security workflows. You can run local checks with:

```bash
pnpm audit --audit-level=high
```

Security automation helps catch known issues, but it does not replace responsible disclosure for application, configuration, or business-logic vulnerabilities.
