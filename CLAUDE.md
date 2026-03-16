# Atheer — Design Workspace

Product design exploration for Atheer, an industrial workforce management platform.

---

## Paper ↔ Code Fidelity Protocol

Maintain exact visual fidelity between Paper and code in both directions.

### Match Standard

A section matches when the same CSS values are applied in both Paper and code, producing the same visual result to a human eye at 1x scale.

This means:
- Same font-family, font-size, font-weight, color values → match even if sub-pixel rendering differs between engines
- Same padding, gap, dimension values → match even if browsers and Paper round 0.5px differently
- Same content, same hierarchy, same visual weight → match

This does not mean pixel-identity between screenshots. Paper and a browser are different renderers. The standard is value-level fidelity confirmed by visual inspection — not bitmap diffing.

### Absolute Constraints

These rules are never violated.

1. Always assess the full page before beginning work.
2. Always divide the page into sections before editing.
3. Only one section may be active at a time.
4. Never advance to another section until the current section passes inspection.
5. Never reconstruct code from memory. Always re-read the source.
6. Code must be pulled directly from the source and copied exactly.
7. Never translate, interpret, approximate, or conceptualize code.
8. Visual inspection is mandatory after every section.
9. A passed section is locked. Locked sections are never modified.
10. If a locked section drifts, stop all work and restore it before continuing.
11. Maximum 3 fix-and-recheck cycles per section. Then stop and report.
12. If source code cannot be located or a value is ambiguous: stop and report. Never guess.

### Section Model

**What a section is:**
A visually distinct region that can be built and verified independently. Typically a direct child of the root layout or a major sub-region. Examples: sidebar, page header, sub-tab bar, card grid, table, footer.

A section is both a visual region and a bounded code region. Both boundaries must be identified before editing begins.

**What a section is not:**
Individual repeated elements within a group. A 4-card grid is one section, not four sections. A nav list is one section, not ten.

**Ordering:**
Outside in, top to bottom. Build containers before children. This prevents later sections from disrupting earlier ones.

**States:**

```
unmapped → mapped → in_progress → inspection_pending → passed → locked
```

If inspection fails: `inspection_pending → in_progress` (fix and retry, up to 3 cycles).
No other transitions are permitted.

**Ownership:**
A section may only modify code it directly owns: its container, its children, its styles. It may not modify parent wrappers, sibling sections, locked sections, or shared code without explicit instruction.

**Boundary conflict:**
If a required change crosses section boundaries: stop work, report the conflict, request expanded scope. Never silently expand.

**Reuse-first rule:**
If a section maps to an inventoried component (see Component Inventory), duplicate the source node via `duplicate_nodes`, then modify with `update_styles` and `set_text_content`. Only fall back to `write_html` when no inventory match exists or when the structural difference is large enough that modifying the duplicate would take more work than writing fresh. State the decision in one line before building each section.

### Source Baseline Rule

When transferring Code → Paper, a Playwright screenshot of the running source page is **mandatory before any building begins**. This screenshot is the visual ground truth for the entire transfer. Without it, inspection can only verify internal consistency within Paper — it cannot verify fidelity to the actual source rendering.

**Why this exists:**
Computed styles and source code reading capture explicit values, but they miss inherited styles, browser defaults, composited backgrounds, and rendering context that only a screenshot reveals. A content area may appear white in code (no explicit background) but render as `#F8F7F7` because of inheritance. The only way to catch this is to look at the actual rendered page.

**Requirements:**
1. Take a Playwright screenshot of the source page at the target viewport (1440px wide) before reading any code or building any section.
2. Save it as the **source baseline**. This image is referenced during every section's inspection gate (Pass 3).
3. If the source page is not running or not accessible, stop and report. Do not proceed from code alone — the screenshot is non-negotiable.
4. During each section's Pass 3 (Visual comparison), compare the Paper section against the corresponding region of the source baseline — not against assumptions about what the code should produce.

### Processing Loop

```
1. Capture source baseline (Playwright screenshot of running page at target viewport)
2. Assess page (source baseline + hierarchy read)
3. Check component inventory (read COMPONENT-INVENTORY.md)
4. Divide into sections (print numbered list, note inventory matches)
5. For each section:
   a. Map boundaries (visual region + code region)
   b. Read source (pull all values directly — see Source Reading Rules)
   c. Implement section (duplicate from inventory if matched, otherwise write fresh)
   d. Run inspection gate (Pass 3 compares against source baseline, not assumptions)
   e. If fail → fix, re-inspect (max 3 cycles, then stop and report)
   f. If pass → lock section, print one-line confirmation
6. After all sections locked:
   a. Full-page screenshot of Paper result
   b. Side-by-side comparison against source baseline
   c. Cross-section verification (lane alignment, spacing rhythm, boundary seams)
   d. If issues found → fix, re-verify
   e. Update COMPONENT-INVENTORY.md with any new reusable structures
   f. Print "Transfer complete" with both screenshots
```

### Source Reading Rules

**Paper → Code:**

1. `get_jsx` on the section's node — this is the primary source
2. `get_computed_styles` on specific nodes to verify ambiguous values
3. `get_fill_image` for image assets
4. Write React component using exact returned values

**Code → Paper:**

1. Read the React source file for the section
2. Read any imported components or shared constants
3. Resolve dynamic values (variables, ternaries, function calls) to concrete output
4. Write `write_html` using resolved values

**Both directions:**

Always:
- Re-read the source immediately before writing each value
- Reproduce values exactly: same strings, same hex codes, same pixel numbers, same SVG path data
- Extract exact SVG `d` path data from source — never redraw, simplify, or approximate

Never:
- Write a value from memory — even if you read it 10 seconds ago
- Approximate (`#584F4D` is not `#555`, `15px` is not `16px`, `0.02em` is not `0`)
- Substitute (no emoji for icons, no hand-drawn SVG replacements, no "similar" components)
- Infer missing code — if it can't be read, stop and report

### Inspection Gate

Inspection is mandatory after every section. No editing during inspection.

**Pass 1 — Structural check:**
- Read destination structure (`get_tree_summary` for Paper, read JSX for code)
- Confirm node count, nesting depth, and element types match source

**Pass 2 — Value spot-check:**
- Pick 3–5 representative nodes (heading, body text, container, border, icon)
- Read computed styles from destination
- Compare against source: font-family, font-size, font-weight, color, padding, border, background-color, letter-spacing, line-height, text-transform

**Pass 3 — Visual comparison:**
- Screenshot the section in Paper (`get_screenshot`)
- Screenshot the same section in code (Playwright)
- Compare against the match standard, checking:
  1. Text content — identical words, no omissions or additions
  2. Typography — same family, weight, size
  3. Colors — backgrounds, text, borders, icons
  4. Spacing — padding and gaps produce identical layout
  5. Alignment — horizontal and vertical positioning
  6. Borders and dividers — style, weight, color, position
  7. Icons and images — shape, color, size, position
  8. Overflow — clipping and extension behavior identical

**On failure:**
- List every discrepancy
- Fix all of them
- Re-run all three passes from scratch (fixes can introduce regressions)
- Maximum 3 cycles. If still failing: stop work, report what remains broken, wait for instruction

**On pass:**
- Lock the section. It is now read-only.

### Communication

- **After assessment:** print the numbered section list
- **During a section:** work silently — do not narrate individual tool calls or value lookups
- **On section pass:** one line — `Section N (name) — passed`
- **On section fail after 3 cycles:** report discrepancies and wait
- **On STOP WORK:** describe the problem, what was attempted, and wait
- **On completion:** present both full-page screenshots and confirm transfer complete

---

## Component Inventory

Reusable node structures are tracked in `COMPONENT-INVENTORY.md` at the project root.

### What a component is in this context

A recurring Paper node tree that appears across pages. Not a design system primitive — a concrete, built structure that can be duplicated and modified for a new page. Examples: a sidebar with nav items, a header with tab navigation, a card layout with labeled sections.

### Inventory format

Each entry records:
- **Name** — what it is
- **Source** — page name and node ID where the canonical version lives
- **Structure** — what the node tree contains (one line)
- **Configurable** — what changes between uses (content, active states, colors, counts)

### When to update

After every page transfer, before calling `finish_working_on_nodes`, review the completed page for structures that are likely to recur. Add new entries or update existing ones. Do not inventory one-off structures that are unlikely to appear on other pages.

### How reuse works

1. `duplicate_nodes` from the source node ID
2. `update_styles` to change colors, active states, dimensions
3. `set_text_content` to change labels, data, copy
4. The duplicated section still goes through the full inspection gate — reuse does not skip verification

### Limitations

- Duplicated nodes are independent copies. Changing the source does not update copies.
- If the source node is later modified or deleted, the inventory entry becomes stale. Update the entry to point to the best surviving instance.
- Structural differences (different number of children, different nesting) may make duplication slower than writing fresh. Assess per-section.

---

## Cross-Page Pattern Consistency Rule

When a visual pattern (component, layout structure, container) appears across multiple pages, every instance must be structurally complete. If a pattern appears populated on some pages and empty on others, that is a gap — not an intentional design choice.

**Examples of gaps to flag:**
- An image container (mat/envelope) that holds product photos on Equipment and Finder but is empty on Home
- A card layout that has icon links on some pages but missing icons on others
- A section header that has a subtitle on 3 pages but is bare on a 4th

**Required behavior:**
1. When building a page, cross-reference every recurring pattern against other pages where it appears.
2. If an instance is missing children, content, or structure that all other instances have, **stop and report** — do not silently reproduce the incomplete version.
3. Treat the most complete instance as the canonical version. An empty container is not "correct by design" unless the user explicitly confirms it.

This rule applies in both directions: Code → Paper and Paper → Code. Incomplete patterns propagate silently and compound across builds if not caught.

---

## Paper-Specific Rules

These address known behaviors in Paper's HTML parser.

- `padding-block`, `padding-inline`, and `gap` are **silently dropped**. Always use physical properties: `padding-top`, `padding-bottom`, `padding-left`, `padding-right`. Use explicit spacing on children instead of `gap`.
- Build incrementally: one visual group per `write_html` call.
- Large sections may need multiple `write_html` calls. Create the container first, then insert children into it.

---

## Project Configuration

**Typography:**
- Primary font: Dazzed-TRIAL (Displaay foundry)
  - Medium: `"Dazzed-TRIAL-Medium", "Dazzed-TRIAL", system-ui, sans-serif`
  - Regular: `"Dazzed-TRIAL-Regular", "Dazzed-TRIAL", system-ui, sans-serif`
  - SemiBold: `"Dazzed-TRIAL-SemiBold", "Dazzed-TRIAL", system-ui, sans-serif`
- Title text: -0.01em letter-spacing
- All other text: 0 letter-spacing

**Stack:**
React + Vite. No Tailwind. Inline styles only (matches Paper's HTML model).

**Dev server:** `npm run dev` → localhost:5173

**Boundaries:**
- Work only inside this project directory
- Do not restructure without instruction
- Do not commit or push without being asked
