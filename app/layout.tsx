import type { Metadata } from 'next';
import { Fraunces, Inter, Amiri, Cairo } from 'next/font/google';
import './globals.css';

// Editorial serif display (Latin) + clean grotesk body
const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Elegant Arabic serif/naskh display + clean Arabic body
const arDisplay = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-ar-display',
  display: 'swap',
});

const arBody = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-ar-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Container — Jeddah · Red Sea Port',
  description:
    "Jeddah's industrial techno & house venue on the Red Sea port. Licensed live electronic-music events at Shams Container Terminal.",
  openGraph: {
    title: 'The Container — Jeddah · Red Sea Port',
    description:
      "Jeddah's industrial techno & house venue on the Red Sea port.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to EN/LTR; ContainerApp updates lang/dir on the client from localStorage.
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${display.variable} ${body.variable} ${arDisplay.variable} ${arBody.variable}`}
    >
      <head>
        {/* Set lang/dir before paint to avoid a FOUC for returning Arabic visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('container5.lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}}catch(e){}})();",
          }}
        />
      </head>
      <body className="grain min-h-screen antialiased">{children}</body>
    </html>
  );
}
