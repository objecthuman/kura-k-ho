import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-black text-white border-t-4 border-black mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-black text-xl uppercase mb-4 text-yellow-300">Kura K Ho</h3>
              <p className="font-bold text-sm leading-relaxed">
                Fighting fake news with AI-powered fact-checking. Stay informed, stay sharp!
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-black text-sm uppercase mb-4 text-cyan-400">Product</h4>
              <ul className="space-y-2 font-bold text-sm">
                <li><a href="/chat" className="hover:text-yellow-300 transition-colors">Chat</a></li>
                <li><a href="/preferences" className="hover:text-yellow-300 transition-colors">Preferences</a></li>
                <li><a href="#features" className="hover:text-yellow-300 transition-colors">Features</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase mb-4 text-pink-400">Company</h4>
              <ul className="space-y-2 font-bold text-sm">
                <li><a href="#about" className="hover:text-yellow-300 transition-colors">About</a></li>
                <li><a href="#team" className="hover:text-yellow-300 transition-colors">Team</a></li>
                <li><a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-black text-sm uppercase mb-4 text-yellow-300">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-white border-3 border-white hover:bg-yellow-300 transition-colors">
                  <Twitter className="w-5 h-5 text-black" />
                </a>
                <a href="#" className="p-2 bg-white border-3 border-white hover:bg-cyan-400 transition-colors">
                  <Github className="w-5 h-5 text-black" />
                </a>
                <a href="#" className="p-2 bg-white border-3 border-white hover:bg-pink-400 transition-colors">
                  <Mail className="w-5 h-5 text-black" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t-2 border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-bold text-sm flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> by the Kura K Ho team
              </p>
              <p className="font-bold text-sm text-gray-400">
                © 2025 Kura K Ho. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
