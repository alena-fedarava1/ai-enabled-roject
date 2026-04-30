Reviewing current navigation spec and component locators to identify flaky and maintenance issues.

Analyzed files: 
tests/navigation.spec.ts
components/navigationPanel.ts

## Review Summary

`tests/navigation.spec.ts` does not fully match the manual test case expectations.

### Key gaps vs manual test case
- Manual requirement: verify `Docs`, `API`, `Community` are visible, accessible by role+name, and navigate correctly.
- Current test:
  - only checks visibility
  - only `API` and `Community` use role-based locators
  - does not verify navigation behavior for any link
  - includes a hard sleep (`waitForTimeout(2000)`)

---

## Issues that increase flakiness or maintenance cost

### 1. Selector quality
- navigationPanel.ts
  - `docsLink = page.locator('#docs')`
  - This is not role-based and is brittle if markup changes
  - It does not validate accessibility semantics
- `apiLink` and `communityLink`
  - good role-based locators, but `docsLink` is inconsistent

### 2. Synchronization / flakiness
- `tests/navigation.spec.ts`
  - `await page.waitForTimeout(2000);`
  - Arbitrary delay is fragile and slows tests
  - It may hide real timing issues instead of waiting for a reliable state

### 3. Accessibility coverage
- `docsLink` is not accessed via role+name
- The test should use `getByRole('link', { name: /Docs/i })` consistently
- Without this, the test may pass even if the visible link is not actually accessible

### 4. Coverage gaps
- No navigation verification
  - The manual case explicitly expects navigation buttons to work
  - The test never clicks `Docs`, `API`, or `Community`
  - It does not assert page changes, URLs, or destination content
- No assertion on link text or accessible names beyond visibility

### 5. Readability / reuse
- The test mixes direct locator assertions and low-level `isVisible()` call
- `expect(await navigationPanel.docsLink.isVisible()).toBe(true)` is less idiomatic than `await expect(...).toBeVisible()`
- The component should encapsulate page actions, not just locators

### 6. Duplication / future maintenance risk
- Hard-coded URL in `openHomePage()` duplicates behavior from other pages
- If the docs navigation panel is reused elsewhere, there is no helper to click items or verify target pages
- Missing abstraction for actions such as `clickDocs()`, `clickApi()`, `clickCommunity()`

---

## Prioritized checklist

1. **High priority**
   - Replace `#docs` locator with a role-based locator in navigationPanel.ts
   - Remove `waitForTimeout(2000)` and replace with a deterministic wait/assertion
   - Add navigation assertions for at least one link (Docs/API/Community) to confirm correctness

2. **Medium priority**
   - Standardize locator style across all navigation links
   - Convert `expect(await locator.isVisible()).toBe(true)` to `await expect(locator).toBeVisible()`
   - Add explicit tests for accessible link names, not just visibility

3. **Lower priority**
   - Add component methods for actions:
     - `clickDocs()`
     - `clickApi()`
     - `clickCommunity()`
   - Add a shared navigation panel helper if used in more than one test
   - Consider validating the navigation panel container or aria role if needed

---

## Recommended fix categories

- `selector quality`
- `synchronization`
- `accessibility`
- `coverage`
- `readability / reuse`

These are the categories to address first in the next refactor. No code changes applied in Chapter 2.