# Component Inventory

Reusable node structures built in Paper. See CLAUDE.md § Component Inventory for usage rules.

---

## Sidebar

- **Source:** Manager — Equipment / `IKC-1`
- **Structure:** 220px column — logo (SVG + Inter 15px bold text) + vertical nav list (icon + label + optional status shape + optional subtitle), active item has #CDF2FFA6 pill background
- **Configurable:** active item, nav item labels, subtitle text, status shapes (triangle/square/none), icon SVG paths

## PageHeader

- **Source:** Manager — Equipment / `IQL-1`
- **Structure:** 129px bar — avatar circle (48px, background-image) + name tab (inactive) + N primary tabs with 2.5px underline on active, all Dazzed-TRIAL-Medium 24px
- **Configurable:** avatar URL, name text, tab labels, active tab, tab count

## SubTabBar

- **Source:** Manager — Equipment / `IR0-1`
- **Structure:** horizontal bar — left group (content tabs, 15px) + right group (filter/sort tabs, 13px), both with 1.5px underline on active, Dazzed-TRIAL-Regular
- **Configurable:** tab labels, filter labels, active states, tab/filter count

## EquipmentCard

- **Source:** Manager — Equipment / `IRG-1`
- **Structure:** vertical column — title (Dazzed-TRIAL-Medium 15px) + image placeholder (4:3, #CCF2FF) + specs (make/model/year) + N labeled sections (uppercase label + link list) + context sparkle row
- **Configurable:** title, spec values, section labels, link items, section count, link count per section

## SectionLabel + LinkList

- **Source:** Manager — Equipment / `IRO-1` (People section within first card)
- **Structure:** uppercase label (Dazzed-TRIAL-Regular 10px #716E74 0.04em tracking) + column of "→ Name" links (#3D5AA4, 15px, capitalize, truncate)
- **Configurable:** label text, link items, link count

## ContextSparkle

- **Source:** Manager — Equipment / `IS2-1`
- **Structure:** horizontal row — sparkle SVG (12px, #FF0000) + "Context" text (Dazzed-TRIAL-Regular 15px #584F4D capitalize)
- **Configurable:** sparkle color

## PartCard

- **Source:** Manager — Finder / `KGN-1` (first card, row 1)
- **Structure:** vertical column (25% width, paddingInline 24px, border-right 0.5px dashed #35383D59 except last) — name/number/price group (19px Medium + 17px Medium + 15px Regular, all #584F4D) + image placeholder (4:3, #CCF2FF) + specs (make/model/year, 15px Regular) + ContextSparkle (#FF8500)
- **Configurable:** name, part number, price, spec values, sparkle color, border-right (removed on last card per row)

## ListRowColumn

- **Source:** Manager — Training / `JEP-1` (Digital Workflows column)
- **Structure:** vertical column (flex: 1, paddingLeft/Right 30px) — section label header (paddingTop/Bottom 8px, paddingLeft/Right 16px, SectionLabel inside) + N ListRows (border-top 0.5px solid #35383D59, paddingTop/Bottom 24px, paddingLeft/Right 20px, LinkItem inside)
- **Configurable:** section label text, list item labels, item count
