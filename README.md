
# Φυτά Εντός

Ένα μοντέρνο blog για φυτά εσωτερικού χώρου, γραμμένο με [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), και [Flowbite](https://flowbite.com/). Εδώ θα βρείτε άρθρα, οδηγούς και συμβουλές για τη φροντίδα, διακόσμηση και επιλογή φυτών εσωτερικού χώρου.

## 🌱 Περιγραφή

Το "Φυτά Εντός" είναι μια πλατφόρμα για λάτρεις των φυτών εσωτερικού χώρου. Στόχος μας είναι να παρέχουμε αξιόπιστη πληροφόρηση, πρακτικές συμβουλές και έμπνευση για να μεταμορφώσετε το σπίτι ή το γραφείο σας με πράσινο.

### Βασικά Χαρακτηριστικά
- Blog με άρθρα για δεκάδες φυτά (στα ελληνικά και αγγλικά)
- Αναζήτηση άρθρων και φιλτράρισμα ανά ετικέτα (tag)
- Ημερολόγιο ποτίσματος (watering scheduler)
- Responsive σχεδιασμός με Tailwind CSS & Flowbite
- SSR (Server-side rendering) & έτοιμο για Netlify

## 📁 Δομή Έργου

```text
/
├── public/
│   └── images/, scripts/
├── src/
│   ├── components/   # Επαναχρησιμοποιήσιμα UI components
│   ├── content/      # Blog posts (Markdown)
│   ├── layouts/      # Layouts για σελίδες
│   ├── pages/        # Σελίδες (routes)
│   ├── constants.ts  # Σταθερές τιμές
│   └── utils.ts      # Βοηθητικές συναρτήσεις
├── astro.config.mjs  # Ρυθμίσεις Astro
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

## 🚀 Εκκίνηση

Όλες οι εντολές εκτελούνται από τον root φάκελο του project:

| Εντολή                | Ενέργεια                                               |
| :-------------------- | :----------------------------------------------------- |
| `npm install`         | Εγκαθιστά τις εξαρτήσεις                                |
| `npm run dev`         | Εκκινεί τοπικό dev server στο `localhost:4321`         |
| `npm run build`       | Δημιουργεί production build στο `./dist/`              |
| `npm run preview`     | Προεπισκόπηση του build τοπικά                         |
| `npm run astro ...`   | Εκτελεί CLI εντολές Astro (π.χ. `astro add`, `check`)  |

## 🛠️ Τεχνολογίες

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Netlify](https://www.netlify.com/) (deployment)

## 📚 Περιεχόμενο

Τα άρθρα βρίσκονται στον φάκελο `src/content/blog/` σε μορφή Markdown. Κάθε άρθρο περιλαμβάνει μεταδεδομένα (title, image, pubDate, tags, slug).

## 👥 Ομάδα

Δείτε περισσότερα στη σελίδα [Σχετικά](/about).

## 📄 Άδεια

MIT License

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
