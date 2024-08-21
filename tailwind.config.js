/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        mainAccent: 'var(--main-accent)', // not needed for shadcn components
        overlay: 'var(--overlay)', // background color overlay for alert dialogs, modals, etc.

        // light mode
        bg: 'var(--bg-color)',
        text: 'var(--text-color)',
        border: 'var(--border-color)',
        secondaryBlack: 'var(--secondary-black)',
      },
      borderRadius: {
        base: '5px',
      },
      boxShadow: {
        base: 'var(--box-shadow)',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '4px',
        reverseBoxShadowX: '-4px',
        reverseBoxShadowY: '-4px',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
