# Agent Instructions for Copilot or any other AI Assistant

## Project Purpose

This project implements a strongly-encapsulated global variable system called `StarVar` for TypeScript.  
The system provides controlled read/write access using named passes (ACL-style). It is designed to be:

- **Secure by default**: write access is only allowed if the caller holds a valid pass.
- **Encapsulated**: direct access to StarVar instances should be avoided outside the registry.
- **Modular and testable**: each helper is designed to be testable independently.

## Core Concepts

- `StarVar<T>` holds a value of type `T` and defines an internal write access control list.
- Access is done through a registry: `makeStarVarRegistry(...)`, based on config objects built with `makeStarVar(...)`.
- Read access is always allowed; write access must match an allowed pass name.
- Public interface exposes only high-level helpers like `defineStarVar`, `useStarVar`, etc.
- Prefer returning `Result<T, E>` types (with `{ ok: true, value } | { ok: false, error: "not_found" }`) instead of throwing errors.
- inpired by robot3 for decomposing process : make(config) => register(make(config)) => use(register(make(config)), pass)

## Style Guide

- Functional over imperative. 
- Never expose the internal `StarVar` instances directly.
- Avoid side effects except in controlled areas (like the registry).
- Use `as const` for inferencing var names.
- Type inference is critical: maintain strong autocomplete support for all registry and access layers.
- separe internal helper (extractPass) and public syntax sugar (exported in index.ts, the entry point)

## Do Not

- Do not mutate the registry or StarVar instances after initialization.
- Do not expose internal state outside helpers.
- Do not use `throw`, prefer `Result`-based error handling.

## Goals for AI Assistance

- Help write tests using Vitest.
- Suggest strongly-typed helper functions.
- Improve inference and registry ergonomics.
- Respect encapsulation and pass-based access control.
- Avoid polluting the auto-completion surface with raw `StarVar` instances.

