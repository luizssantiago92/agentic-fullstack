# Specialist catalog index

Generated from `catalog/` pinned to [jeffallan/claude-skills@0.4.16](https://github.com/Jeffallan/claude-skills/releases/tag/v0.4.16) (`882ef55`).

**Load policy:** after the Floors layer manual, pick **at most one** specialist whose domain is allowed for the active Floor. Open **≤2** `references/`. Never on `/verify`.

Do **not** chain multiple specialists in one Execute turn (unlike upstream multi-skill workflows).

Regenerate: `node scripts/sync-catalog-from-upstream.mjs --from <upstream> --write-index`

## api-architecture

Allowed Floors: `backend`

| Skill | Notes |
| --- | --- |
| `api-designer` | Use when designing REST or GraphQL APIs, creating OpenAPI specifications, or planning API architecture. Invoke for re… |
| `architecture-designer` | Use when designing new high-level system architecture, reviewing existing designs, or making architectural decisions.… |
| `graphql-architect` | Use when designing GraphQL schemas, implementing Apollo Federation, or building real-time subscriptions. Invoke for s… |
| `mcp-developer` | Use when building, debugging, or extending MCP servers or clients that connect AI systems with external tools and dat… |
| `microservices-architect` | Designs distributed system architectures, decomposes monoliths into bounded-context services, recommends communicatio… |
| `websocket-engineer` | Use when building real-time communication systems with WebSockets or Socket.IO. Invoke for bidirectional messaging, h… |

## backend

Allowed Floors: `backend`

| Skill | Notes |
| --- | --- |
| `django-expert` | "Use when building Django web applications or REST APIs with Django REST Framework. Invoke when working with settings… |
| `django-storages-s3` | "Use when configuring Django to store static and media files on AWS S3 with django-storages. Invoke when working with… |
| `dotnet-core-expert` | Use when building .NET 8 applications with minimal APIs, clean architecture, or cloud-native microservices. Invoke fo… |
| `fastapi-expert` | "Use when building high-performance async Python APIs with FastAPI and Pydantic V2. Invoke to create REST endpoints, … |
| `laravel-specialist` | Build and configure Laravel 10+ applications, including creating Eloquent models and relationships, implementing Sanc… |
| `nestjs-expert` | Creates and configures NestJS modules, controllers, services, DTOs, guards, and interceptors for enterprise-grade Typ… |
| `rails-expert` | Rails 7+ specialist that optimizes Active Record queries with includes/eager_load, implements Turbo Frames and Turbo … |
| `spring-boot-engineer` | Generates Spring Boot 3.x configurations, creates REST controllers, implements Spring Security 6 authentication flows… |

## data-ml

Allowed Floors: `data, analytics, datascience`

| Skill | Notes |
| --- | --- |
| `fine-tuning-expert` | "Use when fine-tuning LLMs, training custom models, or adapting foundation models for specific tasks. Invoke for conf… |
| `ml-pipeline` | "Designs and implements production-grade ML pipeline infrastructure: configures experiment tracking with MLflow or We… |
| `pandas-pro` | Performs pandas DataFrame operations for data analysis, manipulation, and transformation. Use when working with panda… |
| `prompt-engineer` | Writes, refactors, and evaluates prompts for LLMs — generating optimized prompt templates, structured output schemas,… |
| `rag-architect` | Designs and implements production-grade RAG systems by chunking documents, generating embeddings, configuring vector … |
| `spark-engineer` | Use when writing Spark jobs, debugging performance issues, or configuring cluster settings for Apache Spark applicati… |

## devops

Allowed Floors: `backend, data`

| Skill | Notes |
| --- | --- |
| `chaos-engineer` | Designs chaos experiments, creates failure injection frameworks, and facilitates game day exercises for distributed s… |
| `cli-developer` | Use when building CLI tools, implementing argument parsing, or adding interactive prompts. Invoke for parsing flags a… |
| `devops-engineer` | Creates Dockerfiles, configures CI/CD pipelines, writes Kubernetes manifests, and generates Terraform/Pulumi infrastr… |
| `monitoring-expert` | Configures monitoring systems, implements structured logging pipelines, creates Prometheus/Grafana dashboards, define… |
| `sre-engineer` | Defines service level objectives, creates error budget policies, designs incident response procedures, develops capac… |

## frontend

Allowed Floors: `frontend`

| Skill | Notes |
| --- | --- |
| `angular-architect` | Generates Angular 17+ standalone components, configures advanced routing with lazy loading and guards, implements NgR… |
| `flutter-expert` | Use when building cross-platform applications with Flutter 3+ and Dart. Invoke for widget development, Riverpod/Bloc … |
| `nextjs-developer` | "Use when building Next.js 14+ applications with App Router, server components, or server actions. Invoke to configur… |
| `react-expert` | Use when building React 18+ applications in .jsx or .tsx files, Next.js App Router projects, or create-react-app setu… |
| `react-native-expert` | Builds, optimizes, and debugs cross-platform mobile applications with React Native and Expo. Implements navigation hi… |
| `vue-expert` | Builds Vue 3 components with Composition API patterns, configures Nuxt 3 SSR/SSG projects, sets up Pinia stores, scaf… |
| `vue-expert-js` | Creates Vue 3 components, builds vanilla JS composables, configures Vite projects, and sets up routing and state mana… |

## infrastructure

Allowed Floors: `backend, data`

| Skill | Notes |
| --- | --- |
| `cloud-architect` | Designs cloud architectures, creates migration plans, generates cost optimization recommendations, and produces disas… |
| `database-optimizer` | Optimizes database queries and improves performance across PostgreSQL and MySQL systems. Use when investigating slow … |
| `kubernetes-specialist` | Use when deploying or managing Kubernetes workloads. Invoke to create deployment manifests, configure pod security po… |
| `postgres-pro` | Use when optimizing PostgreSQL queries, configuring replication, or implementing advanced database features. Invoke f… |
| `terraform-engineer` | Use when implementing infrastructure as code with Terraform across AWS, Azure, or GCP. Invoke for module development … |

## language

Allowed Floors: `frontend, backend, data, analytics, datascience`

| Skill | Notes |
| --- | --- |
| `cpp-pro` | Writes, optimizes, and debugs C++ applications using modern C++20/23 features, template metaprogramming, and high-per… |
| `csharp-developer` | "Use when building C# applications with .NET 8+, ASP.NET Core APIs, or Blazor web apps. Builds REST APIs using minima… |
| `golang-pro` | Implements concurrent Go patterns using goroutines and channels, designs and builds microservices with gRPC or REST, … |
| `java-architect` | Use when building, configuring, or debugging enterprise Java applications with Spring Boot 3.x, microservices, or rea… |
| `javascript-pro` | Writes, debugs, and refactors JavaScript code using modern ES2023+ features, async/await patterns, ESM module systems… |
| `kotlin-specialist` | Provides idiomatic Kotlin implementation patterns including coroutine concurrency, Flow stream handling, multiplatfor… |
| `php-pro` | Use when building PHP applications with modern PHP 8.3+ features, Laravel, or Symfony frameworks. Invokes strict typi… |
| `python-pro` | Use when building Python 3.11+ applications requiring type safety, async programming, or robust error handling. Gener… |
| `rust-engineer` | Writes, reviews, and debugs idiomatic Rust code with memory safety and zero-cost abstractions. Implements ownership p… |
| `sql-pro` | Optimizes SQL queries, designs database schemas, and troubleshoots performance issues. Use when a user asks why their… |
| `swift-expert` | Builds iOS/macOS/watchOS/tvOS applications, implements SwiftUI views and state management, designs protocol-oriented … |
| `typescript-pro` | Implements advanced TypeScript type systems, creates custom type guards, utility types, and branded types, and config… |

## platform

Allowed Floors: `frontend, backend`

| Skill | Notes |
| --- | --- |
| `atlassian-mcp` | Integrates with Atlassian products to manage project tracking and documentation via MCP protocol. Use when querying J… |
| `salesforce-developer` | Writes and debugs Apex code, builds Lightning Web Components, optimizes SOQL queries, implements triggers, batch jobs… |
| `shopify-expert` | Builds and debugs Shopify themes (.liquid files, theme.json, sections), develops custom Shopify apps (shopify.app.tom… |
| `wordpress-pro` | Develops custom WordPress themes and plugins, creates and registers Gutenberg blocks and block patterns, configures W… |

## quality

Allowed Floors: `frontend, backend, data, analytics, datascience`

| Skill | Notes |
| --- | --- |
| `code-documenter` | Generates, formats, and validates technical documentation — including docstrings, OpenAPI/Swagger specs, JSDoc annota… |
| `code-reviewer` | Analyzes code diffs and files to identify bugs, security vulnerabilities (SQL injection, XSS, insecure deserializatio… |
| `debugging-wizard` | Parses error messages, traces execution flow through stack traces, correlates log entries to identify failure points,… |
| `playwright-expert` | "Use when writing E2E tests with Playwright, setting up test infrastructure, or debugging flaky browser tests. Invoke… |
| `test-master` | Generates test files, creates mocking strategies, analyzes code coverage, designs test architectures, and produces te… _(adapted: verify-forbidden)_ |

## security

Allowed Floors: `frontend, backend`

| Skill | Notes |
| --- | --- |
| `fullstack-guardian` | Builds security-focused full-stack web applications by implementing integrated frontend and backend components with l… _(adapted: verify-forbidden)_ |
| `secure-code-guardian` | Use when implementing authentication/authorization, securing user input, or preventing OWASP Top 10 vulnerabilities —… _(adapted: verify-forbidden)_ |
| `security-reviewer` | Identifies security vulnerabilities, generates structured audit reports with severity ratings, and provides actionabl… |

## specialized

Allowed Floors: `frontend, backend, data, analytics, datascience`

| Skill | Notes |
| --- | --- |
| `embedded-systems` | Use when developing firmware for microcontrollers, implementing RTOS applications, or optimizing power consumption. I… |
| `game-developer` | "Use when building game systems, implementing Unity/Unreal Engine features, or optimizing game performance. Invoke to… |
| `legacy-modernizer` | Designs incremental migration strategies, identifies service boundaries, produces dependency maps and migration roadm… |

## workflow

Allowed Floors: `frontend, backend, data, analytics, datascience`

| Skill | Notes |
| --- | --- |
| `feature-forge` | Conducts structured requirements workshops to produce feature specifications, user stories, EARS-format functional re… _(adapted: verify-forbidden)_ |
| `spec-miner` | "Reverse-engineering specialist that extracts specifications from existing codebases. Use when working with legacy or… |
| `the-fool` | Use when challenging ideas, plans, decisions, or proposals using structured critical reasoning. Invoke to play devil'… _(adapted: verify-forbidden)_ |
