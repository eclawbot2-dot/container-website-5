import { LanguageProvider } from '@/components/LanguageProvider';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Lineup } from '@/components/Lineup';
import { Visit } from '@/components/Visit';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Lineup />
        <Visit />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
