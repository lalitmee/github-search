# Toolchain Refresh (axios 1.x + react-scripts 5) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the CRA app build and run on Node 24, remove the axios 25-advisory exposure, and shrink a 1307-vuln `yarn audit` — in two dependency-bump commits instead of 21 stale Dependabot PRs.

**Architecture:** Two vertical dependency bumps against a frozen app. No app-code changes expected: axios usage is plain `import axios from 'axios'` in 7 action files (no CancelToken/interceptors/defaults), and react-scripts is only invoked via scripts. The lint stack (eslint 5 + airbnb 17 + prettier 1) is deliberately frozen; react-scripts 5 brings its own nested eslint 8 used only at build time.

**Tech Stack:** CRA (react-scripts), React 16.8.6, Redux + thunk, axios, semantic-ui-react, yarn 1.22.22 on Node 24.9.0.

**Spec:** Audit findings from this session: 21 stale/conflicting Dependabot PRs closed; `react-paginate` + `sweetalert2-react` removed; `eslint@^5.16.0` + `babel-eslint@^10.0.1` declared (commit `0313fd1`). Remaining spec: axios → 1.x, react-scripts → 5.0.1 (fixes `ERR_OSSL_EVP_UNSUPPORTED` on Node 24), then fresh Dependabot set regenerates.

## Global Constraints

- Node 24.9.0, yarn 1.22.22; build must pass **without** `NODE_OPTIONS=--openssl-legacy-provider`.
- Lint stack frozen at eslint ^5.16.0 / eslint-config-airbnb ^17.1.1 / prettier ^1.18.2 — do not migrate to eslint 8/airbnb 19 in this plan.
- Do NOT bump react, react-dom, react-router-dom, redux, semantic-ui-* — intentionally deferred.
- Repo has zero test files (`yarn test` is not a usable gate). Gates are: `CI=true yarn build`, `yarn lint`, browser smoke.
- `yarn lint` baseline: 15 problems (4 errors, 11 warnings) — regressions beyond that are failures.
- Keep `homepage` gh-pages field and deploy scripts untouched.
- One commit per task.

## Review Focus

1. **react-scripts 5 build-time ESLint errors** — CRA 5 runs eslint-config-react-app during `build`; pre-existing code smells could fail `CI=true yarn build`. Expected: build passes or fails only on real errors. Pinned in Task 2 Step 4 (exact decision rule given).
2. **axios 1.x behavior against the live GitHub API** — response shape/params serialization changes. Expected: users/repos/issues/commits searches return rendered results. Pinned in Task 1 Step 5 (browser smoke).
3. **Dev server on webpack-dev-server 4 + React 16.8.6** — Fast Refresh needs React ≥16.9, so live-reload-only is expected, not a bug. Pinned in Task 2 Step 5 (smoke expectation noted).
4. **Lockfile integrity after big churn** — react-scripts 3→5 rewrites most of yarn.lock. Expected: `yarn install --frozen-lockfile` passes after each task. Pinned in both tasks' verify steps.
5. **gh-pages deploy path still works** — `predeploy: npm run build` runs the same build. Expected: `build/index.html` emitted. Pinned in Task 2 Step 6.

---

### Task 1: Bump axios to ^1.20.0

**Files:**
- Modify: `package.json` (dependencies.axios)
- Modify: `yarn.lock` (via yarn install)

**Interfaces:**
- Consumes: commit `0313fd1` state (deps pruned, eslint declared).
- Produces: `axios@^1.20.0` resolved in yarn.lock; app code unchanged.

- [ ] **Step 1: Edit package.json**

Change `"axios": "^0.19.0"` → `"axios": "^1.20.0"` in `dependencies`.

- [ ] **Step 2: Install and sync lockfile**

Run: `yarn install --no-progress`
Expected: succeeds, "Saved lockfile"; peer warnings OK, hard failure not OK.
Then: `yarn install --frozen-lockfile --no-progress` → must print success.

- [ ] **Step 3: Verify build**

Run: `CI=true yarn build`
Expected: exit 0, creates `build/index.html`, no OpenSSL errors.

- [ ] **Step 4: Browser smoke — axios against live GitHub API**

Run `yarn start`, open the app, run a search:
- Users tab renders result cards with avatars/names
- Switch to Repositories tab, renders results
- Open a repo's Issues or Commits tab, renders results

Expected: all tabs load real data (axios 1.x responses parsed); no blank screens or console errors related to axios.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock
git commit -m "fix(deps): bump axios to ^1.20.0

- clears 25 advisories incl. 2025 CVEs (credential leak, header injection, ReDoS, NO_PROXY bypass)
- no code changes: plain default-import usage in src/store/actions/*
```

---

### Task 2: Bump react-scripts 3.0.1 → 5.0.1

**Files:**
- Modify: `package.json` (dependencies.react-scripts)
- Modify: `yarn.lock` (large churn expected)
- Modify (only if Step 4 demands): `src/**/*.js` lint-error fixes

**Interfaces:**
- Consumes: Task 1 state (axios 1.x).
- Produces: Node-24-compatible webpack 5 build; audit drop from react-scripts tree.

- [ ] **Step 1: Edit package.json**

Change `"react-scripts": "3.0.1"` → `"react-scripts": "5.0.1"` (exact, no caret — CRA convention).

- [ ] **Step 2: Install**

Run: `yarn install --no-progress`
Expected: succeeds with "Saved lockfile". Peer-dependency warnings are acceptable; `ERESOLVE`-style hard failures are not (yarn 1 doesn't hard-fail peers anyway — just record unusual errors).

- [ ] **Step 3: Frozen lockfile check**

Run: `yarn install --frozen-lockfile --no-progress` → success.

- [ ] **Step 4: Build on Node 24 with build-time lint**

Run: `CI=true yarn build`
Decision rule:
- Exit 0 → Step 5.
- Fails on eslint-config-react-app **errors** → fix them in `src/` (one commit: `fix: resolve lint errors for react-scripts 5 build`), re-run until exit 0.
- Fails only on stylistic/pre-existing noise you cannot map to a real defect (>10 errors) → set `"build": "DISABLE_ESLINT_PLUGIN=true react-scripts build"` as a documented fallback, note it in the task report.
- Fails on OpenSSL/webpack errors → unexpected; stop and report (means webpack <5.61 leaked in).

Expected final: exit 0, no `ERR_OSSL_EVP_UNSUPPORTED`, no legacy-provider workaround.

- [ ] **Step 5: Lint baseline + dev-server smoke**

Run: `yarn lint` → ≤15 problems (4 errors, 11 warnings); any increase is a regression.
Run `yarn start` → compiles without errors; page renders; run one search. Note: hot-reload may be plain live-reload (React 16.8.6 < 16.9 has no Fast Refresh) — expected, not a failure.

- [ ] **Step 6: Deploy-path artifact check**

Run: `CI=true yarn build` again and confirm `build/index.html` + `build/static/` assets exist (this is what `gh-pages -d build` publishes).

- [ ] **Step 7: Audit delta + commit**

Run: `yarn audit --groups dependencies 2>&1 | tail -5` → record before/after totals in commit body (before: 1307 vulns / 1430 packages).

```bash
git add package.json yarn.lock src
git commit -m "fix(deps): upgrade react-scripts 3.0.1 → 5.0.1

- webpack 5 fixes ERR_OSSL_EVP_UNSUPPORTED build failure on Node 24
- drops transitive-vuln tree from the 2019 CRA toolchain (see audit delta)
- lint stack stays on eslint 5 + airbnb 17 (react-scripts nests its own eslint 8)
```

---

### Task 3: Final verification + report

**Files:** none modified.

- [ ] **Step 1: Full gate run**

- `yarn install --frozen-lockfile --no-progress` → success
- `CI=true yarn build` → exit 0, artifacts present
- `yarn lint` → ≤15 problems

- [ ] **Step 2: Record leftovers**

Run: `yarn outdated` → save the list; react 16 / react-router 5 / semantic-ui / prettier are **deferred by design** (Global Constraints).

- [ ] **Step 3: Report**

Summarize for the user: audit before/after, both commits' SHAs, deferred-upgrade list, and note that Dependabot (GitHub-native) will regenerate a fresh, mergeable PR set on the new lockfile — no `.github/` config exists to port.

## Self-review notes

- Coverage: every spec item → Task 1 (axios), Task 2 (react-scripts/Node 24), Task 3 (audit/Dependabot report). Pruned-deps + declared-eslint already done in `0313fd1`.
- No test files exist, so TDD steps are replaced by build/lint/smoke gates (repo reality, noted in Global Constraints).
- Decision left open on purpose: Task 2 Step 4's exact lint-error handling rule — fixed inline, since the errors don't exist yet.
