export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: 'var(--ink)', paper: 'var(--paper)', muted: 'var(--muted)', accent: 'var(--accent)' },
      fontFamily: { display: ['Space Grotesk', 'sans-serif'], mono: ['IBM Plex Mono', 'monospace'] },
      spacing: { section: 'var(--space-section)', gutter: 'var(--gutter)' },
      fontSize: { display: ['clamp(3.5rem, 8.9vw, 9rem)', { lineHeight: '0.98', letterSpacing: '-0.065em' }] },
    },
  },
  plugins: [],
};
