import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'], // Only loading the weights actually used in the app
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'FORMS | Online Exhibition',
  description: "An online exhibition for the art series FORMS, inspired by Goethe's Theory of Color.",
  keywords: ['Art', 'Goethe', 'Theory of Color', 'Digital Exhibition', 'Forms', 'Generative Art'],
  authors: [{ name: 'FORMS Artist' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'FORMS | Online Exhibition',
    description: "An online exhibition for the art series FORMS, inspired by Goethe's Theory of Color.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORMS | Online Exhibition',
    description: "An online exhibition for the art series FORMS, inspired by Goethe's Theory of Color.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-[#fcfbf9] text-[#1a1a1a] antialiased selection:bg-[#1a1a1a] selection:text-[#fcfbf9] min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
