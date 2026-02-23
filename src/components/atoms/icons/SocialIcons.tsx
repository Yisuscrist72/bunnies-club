// IG - stroke (líneas)
export const IconInstagram = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Instagram"
  >
    <title>Instagram</title>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// SPOTIFY - fill (relleno)
export const IconSpotify = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    role="img"
    aria-label="Spotify"
  >
    <title>Spotify</title>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.179-.779.539-.899 4.62-1.02 8.52-.6 11.64 1.32.36.24.48.66.24 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.44-.48.18-1.02-.06-1.2-.54-.18-.48.06-1.02.54-1.2 4.32-1.32 9.84-.6 13.56 1.62.42.24.6.78.3 1.26zm.12-3.42C15.18 8.04 8.76 7.8 5.1 8.88c-.6.18-1.2-.18-1.38-.78-.18-.6.18-1.2.78-1.38 4.2-1.2 11.28-.96 15.96 1.8.54.3.72 1.02.42 1.56-.3.6-1.02.78-1.56.48z" />
  </svg>
);

// X (Twitter) - fill
export const IconX = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    role="img"
    aria-label="X"
  >
    <title>X (Twitter)</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// FACEBOOK - fill
export const IconFacebook = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    role="img"
    aria-label="Facebook"
  >
    <title>Facebook</title>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
