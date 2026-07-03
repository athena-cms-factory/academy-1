import React, { useState, useEffect } from 'react';
import { StyleInjector } from './components/StyleInjector';

// 🔱 Athena v33 Modular Sync Bridge for Academy-1
function App({ data: initialData }) {
  const [data, setData] = useState(initialData || {});
  const [sectionOrder, setSectionOrder] = useState(
    initialData?.section_order || 
    initialData?.Section_Order || 
    initialData?.SectionOrder || []
  );
  const [loading, setLoading] = useState(!initialData || Object.keys(initialData).length === 0);

  const refreshData = async () => {
    if (!import.meta.env.DEV) {
      setLoading(false);
      return;
    }
    try {
      const orderRes = await fetch(`${import.meta.env.BASE_URL}src/data/section_order.json?v=${Date.now()}`);
      const order = await orderRes.json();
      setSectionOrder(order);

      const files = ['site_settings', 'cursussen', 'docenten', 'reviews', 'style_config'];
      const loadedData = {};
      for (const file of files) {
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}src/data/${file}.json?v=${Date.now()}`);
          loadedData[file] = await res.json();
        } catch (e) { loadedData[file] = []; }
      }
      setData(loadedData);
      setLoading(false);
    } catch (err) {
      console.error("🔱 Athena Sync Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('message', (event) => {
      if (event.data.type === 'DATA_UPDATED') refreshData();
    });
  }, []);

  if (loading) return <div className="bg-slate-900 min-h-screen flex items-center justify-center text-blue-400 font-black animate-pulse">ACADEMY LOADING...</div>;

  return (
    <div className="academy-root font-sans">
      <StyleInjector config={data.style_config?.[0] || {}} />
      
      {sectionOrder.map((sectionId, index) => {
        // Map sectionId to component file
        let compName = 'Lijst';
        if (sectionId === 'hero') compName = 'Hero';
        
        const Component = React.lazy(() => import(`./components/sections/${compName}.jsx`));
        return (
          <React.Suspense key={index} fallback={<div className="h-40 bg-slate-800/20"></div>}>
            <Component 
              id={sectionId}
              data={data[sectionId] || data.site_settings?.[0]} 
              settings={data.site_settings?.[0]} 
            />
          </React.Suspense>
        );
      })}

      <footer className="relative bg-slate-950 text-slate-300 pt-20 pb-10 overflow-hidden border-t border-indigo-900/30 mt-20">
        {/* Glow effects for modern academy tech feel */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight" data-dock-type="text" data-dock-bind="site_settings.0.bedrijfsnaam">
                {data.site_settings?.[0]?.bedrijfsnaam || 'Academy-1'}
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-sm font-light">
                Ontwikkel je vaardigheden met cutting-edge cursussen en word de expert van de toekomst.
              </p>
            </div>

            <div>
              <h4 className="text-indigo-400 font-semibold mb-6 uppercase tracking-wider text-sm">Opleidingen</h4>
              <ul className="space-y-3 text-slate-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Tech & Code</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Design & Creatie</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Business & AI</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-indigo-400 font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-4 text-slate-400 font-light">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <a href="mailto:info@academy-1.nl" className="hover:text-white transition-colors">info@academy-1.nl</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span>Amsterdam, NL</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {data.site_settings?.[0]?.bedrijfsnaam || 'Academy-1'}. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Voorwaarden</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
