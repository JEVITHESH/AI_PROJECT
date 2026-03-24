import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { AIChat } from './pages/AIChat';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminPanel } from './pages/AdminPanel';
import { Achievements } from './pages/Achievements';
import { useEffect } from 'react';

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return null;
};

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <ScrollToHash />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </Layout>
      </Router>
    </PortfolioProvider>
  );
}
