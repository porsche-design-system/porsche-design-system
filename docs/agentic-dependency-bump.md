# Agentic Dependency Bump

Weekly automated workflow that bumps third-party npm dependencies, verifies `npm install`, and either opens a PR or loops an agent (up to 3 attempts) to resolve the root cause of an install failure before falling back to a draft PR plus a tracking issue for manual resolution.

See the workflow definition in [`.turbo-spec/workflows/dep-bump.yml`](../.turbo-spec/workflows/dep-bump.yml).

```mermaid
flowchart LR
    start(["Every Monday morning<br/>(scheduled)"]) -->|"attempts = 0"| install["Install dependencies<br/>in clean worktree"]
    install --> build["npm run build"]
    build --> bump["Bump package versions<br/>(syncpack update w/<br/>syncpack config)"]
    bump --> tryInstall["Try to install dependencies<br/>with updated versions"]
    tryInstall --> success{"npm install<br/>successful?"}
    success -->|Yes| pr(["Open PR"])
    success -->|No| check{"attempts &lt; 3?"}
    check -->|Yes| agent["Agent: resolve root cause<br/>of npm install failure"]
    agent -->|"attempts += 1"| tryInstall
    check -->|No| draft(["Open draft PR +<br/>create issue for<br/>manual resolution"])

    classDef terminator fill:#7ac142,stroke:#4a7a1f,color:#ffffff;
    classDef decision fill:#ffd54f,stroke:#c8a415,color:#000000;
    classDef agent fill:#5b8def,stroke:#2a5bbf,color:#ffffff;
    class start,pr,draft terminator;
    class success,check decision;
    class agent agent;
```
