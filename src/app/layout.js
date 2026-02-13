import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CommandWheel from '@/components/CommandWheel';
import PixelOverlay from '@/components/PixelOverlay';
import DynamicBackground from '@/components/DynamicBackground';
import BodyLoader from '@/components/BodyLoader';

export const metadata = {
  title: 'GODAEON - Red Line Nation',
  description: 'Creating grounded, cinematic, and intelligent game worlds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="text-white is-loading">
        <BodyLoader />
        <DynamicBackground />
        <PixelOverlay />
        <CommandWheel />
        {children}
      </body>
    </html>
  );
}
