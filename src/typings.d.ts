// typings.d.ts

// Extend the Window interface to include fbAsyncInit and FB
interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
  