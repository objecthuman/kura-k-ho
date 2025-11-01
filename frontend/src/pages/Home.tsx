import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, Newspaper, MessageSquare, Shield, Sparkles, ArrowRight, Zap, Star } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Decorative shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-cyan-400 border-4 border-black rotate-12 -z-10" />
          <div className="absolute bottom-10 left-20 w-24 h-24 bg-pink-400 border-4 border-black -rotate-6 -z-10" />

          <div className="text-center relative">
            <div className="inline-block mb-6 px-6 py-2 bg-yellow-300 border-4 border-black rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-sm font-black uppercase tracking-wider">AI-Powered Truth</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="inline-block bg-white border-4 border-black px-6 py-4 -rotate-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-4">
                VERIFY
              </span>
              <br />
              <span className="inline-block bg-cyan-400 border-4 border-black px-6 py-4 rotate-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                NEWS.
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-bold mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop falling for fake news! Your AI-powered sidekick for fact-checking, summarizing, and staying WOKE (actually informed).
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup">
                <button className="group px-8 py-4 bg-pink-500 border-4 border-black font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Get Started
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/chat">
                <button className="px-8 py-4 bg-white border-4 border-black font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-3">
                  <MessageSquare className="w-6 h-6" />
                  Try Chat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-black" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />

        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase">
            SUPERPOWERS
          </h2>
          <div className="text-center mb-16">
            <div className="inline-block w-32 h-2 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-300" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-green-300 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all h-full">
                <div className="bg-black border-4 border-black p-3 inline-block mb-6 rotate-3">
                  <CheckCircle2 className="w-12 h-12 text-green-300" />
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Fact Checking</h3>
                <p className="text-lg font-bold mb-6 leading-relaxed">
                  Call BS on fake news! AI-powered verification backed by REAL sources.
                </p>
                <ul className="space-y-3 text-base font-bold">
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Instant verification
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Confidence scores
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Source citations
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Deep explanations
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-cyan-300 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all h-full">
                <div className="bg-black border-4 border-black p-3 inline-block mb-6 -rotate-3">
                  <FileText className="w-12 h-12 text-cyan-300" />
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Smart Summaries</h3>
                <p className="text-lg font-bold mb-6 leading-relaxed">
                  TL;DR everything! Get the juice without the fluff.
                </p>
                <ul className="space-y-3 text-base font-bold">
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Quick summaries
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Key points only
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Sentiment analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Save time
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-yellow-300 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all h-full">
                <div className="bg-black border-4 border-black p-3 inline-block mb-6 rotate-3">
                  <Newspaper className="w-12 h-12 text-yellow-300" />
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Your Feed</h3>
                <p className="text-lg font-bold mb-6 leading-relaxed">
                  News that actually matters to YOU. Personalized & verified.
                </p>
                <ul className="space-y-3 text-base font-bold">
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Custom categories
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Regional filters
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Multi-language
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    Verified sources
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-pink-100 relative overflow-hidden">
        <div className="absolute top-40 right-0 w-40 h-40 bg-yellow-300 border-4 border-black -rotate-12 -z-10" />
        <div className="absolute bottom-20 left-0 w-32 h-32 bg-cyan-400 border-4 border-black rotate-12 -z-10" />

        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase">
            How It Works
          </h2>
          <p className="text-center text-2xl font-bold mb-16">3 EASY STEPS TO TRUTH</p>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="bg-pink-500 text-white w-24 h-24 border-4 border-black flex items-center justify-center text-5xl font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3">
                  1
                </div>
                <Star className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <h3 className="font-black mb-3 text-2xl uppercase">Sign Up</h3>
              <p className="text-lg font-bold leading-relaxed">
                Create your account & tell us what you care about
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="bg-cyan-500 text-white w-24 h-24 border-4 border-black flex items-center justify-center text-5xl font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-3">
                  2
                </div>
                <Star className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <h3 className="font-black mb-3 text-2xl uppercase">Ask Away</h3>
              <p className="text-lg font-bold leading-relaxed">
                Chat with AI to verify claims & summarize articles
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="bg-green-500 text-white w-24 h-24 border-4 border-black flex items-center justify-center text-5xl font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3">
                  3
                </div>
                <Star className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <h3 className="font-black mb-3 text-2xl uppercase">Stay Sharp</h3>
              <p className="text-lg font-bold leading-relaxed">
                Get verified news in your personalized feed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-300" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block mb-8 p-4 bg-yellow-300 border-4 border-white -rotate-2">
            <Shield className="w-20 h-20 text-black" />
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase leading-tight">
            FIGHT FAKE NEWS!
          </h2>

          <p className="text-2xl font-bold mb-12 leading-relaxed max-w-2xl mx-auto">
            Join the movement! Thousands already use AI-powered fact-checking to stay informed.
          </p>

          <Link to="/signup">
            <button className="group px-12 py-6 bg-gradient-to-r from-pink-500 to-pink-600 border-4 border-white font-black text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-4 mx-auto">
              Start Now
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-wider text-gray-400">
            No credit card required • Free to start
          </p>
        </div>
      </section>
    </div>
  );
}
