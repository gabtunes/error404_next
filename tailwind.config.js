/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
      colors: {
        "telegram-background": "var(--tg-theme-bg-color)",
        "telegram-button": "var(--tg-theme-button-color)",
        "telegram-button-text": "--tg-theme-button-text-color",
        "telegram-secondary-background": "var(--tg-theme-secondary-bg-color)",
        "telegram-text": "var(--tg-theme-text-color)",
        "telegram-section": "var(--tg-theme-section-bg-color)"
      }
    },
  }