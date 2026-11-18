# Juan Machado — Portfolio

Personal portfolio built with Astro, Tailwind CSS 4, and a small set of accessible components from [astro-component-kit](https://astrocomponents.dev/). The site is bilingual (Spanish/English) and uses a dark green palette.

## Requirements

- Node.js 22.12 or newer
- npm

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run build` | Build the production site into `./dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
src/
├── components/     Page sections and UI pieces (Hero, Projects, Contact, ...)
├── i18n/           Translation strings
├── layouts/        Global document shell
├── pages/          Routes (index.astro)
└── styles/         Design tokens and global styles
odd/tasks/          Organic Driven Development feature documents
```

## Notes

### Language switching

`?lang=en` sets the initial language. The toggle in the header saves the choice to `localStorage` and updates every element marked with `data-i18n` or `data-i18n-placeholder`. Elements whose text comes from a kit component keep the translated string in a nested `<span data-i18n="...">`, because kit components do not forward arbitrary attributes to their root element.

### Component kit theming

Only selected components are imported from `astro-component-kit` (category imports such as `astro-component-kit/buttons` and `astro-component-kit/feedback`). The kit's `global.css` is intentionally **not** imported: its reset, external fonts, and 1400px container conflict with this project. Instead, the kit design tokens are aliased to the project palette in `src/styles/global.css` under `:root`. A few kit styles use literal indigo values, so those are remapped to `--accent` in the same stylesheet.

Before deploying, replace the `57TU_NUMERO` placeholder in `src/components/Contact.astro`. It is defined once as `whatsappNumber` and passed to the client script through `data-whatsapp-number`.
