import Link from 'next/link'
import { Flame, ArrowRight, Code2, Zap, Shield, TrendingUp } from 'lucide-react'
import PhoenixLogo from '@/components/PhoenixLogo'
import UploadZone from '@/components/UploadZone'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-ash-900 via-ash-800 to-ash-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background flames */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-phoenix-500 rounded-full blur-3xl animate-flame" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-phoenix-600 rounded-full blur-3xl animate-flame" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PhoenixLogo size={40} />
            <span className="text-2xl font-bold text-white">CodePhoenix</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="https://github.com/yourusername/CodePhoenix" target="_blank" className="text-ash-300 hover:text-white transition">
              GitHub
            </Link>
            <a href="#upload" className="text-ash-300 hover:text-white transition">
              Get Started
            </a>
            <button onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 bg-phoenix-600 hover:bg-phoenix-700 text-white rounded-lg transition animate-glow">
              Upload Code
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="mb-8 flex justify-center">
            <PhoenixLogo size={120} animated />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Resurrect Your
            <span className="text-phoenix-500"> Legacy Code</span>
          </h1>
          
          <p className="text-xl text-ash-300 mb-12 max-w-3xl mx-auto">
            AI-powered platform that transforms ancient COBOL, VB6, and legacy codebases 
            into modern, cloud-native applications. Rise from the ashes.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-ash-800/50 backdrop-blur-sm p-6 rounded-xl border border-ash-700">
              <div className="text-4xl font-bold text-phoenix-500 mb-2">$85B</div>
              <div className="text-ash-400">Technical Debt Crisis</div>
            </div>
            <div className="bg-ash-800/50 backdrop-blur-sm p-6 rounded-xl border border-ash-700">
              <div className="text-4xl font-bold text-phoenix-500 mb-2">6-18mo</div>
              <div className="text-ash-400">Time Saved per Migration</div>
            </div>
            <div className="bg-ash-800/50 backdrop-blur-sm p-6 rounded-xl border border-ash-700">
              <div className="text-4xl font-bold text-phoenix-500 mb-2">$500k+</div>
              <div className="text-ash-400">ROI per Company</div>
            </div>
          </div>

          {/* Upload Zone */}
          <div id="upload" className="max-w-4xl mx-auto">
            <UploadZone />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Code2,
              title: 'Upload Dead Code',
              description: 'Drop your COBOL, VB6, or legacy PHP files. We support code from the 70s to 2000s.',
            },
            {
              icon: Flame,
              title: 'AI Analysis',
              description: 'Our AI scans business logic, maps dependencies, and identifies security vulnerabilities.',
            },
            {
              icon: Zap,
              title: 'Transformation',
              description: 'Automatically converts to TypeScript, React, or Next.js while maintaining exact logic.',
            },
            {
              icon: TrendingUp,
              title: 'Modern Export',
              description: 'Download containerized, cloud-ready code with migration roadmap and documentation.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-ash-800/50 backdrop-blur-sm p-8 rounded-xl border border-ash-700 hover:border-phoenix-600 transition group"
            >
              <feature.icon className="w-12 h-12 text-phoenix-500 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-ash-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Languages */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Supported Legacy Languages
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {['COBOL', 'Fortran', 'VB6', 'Visual Basic', 'Old PHP', 'Perl', 'Pascal', 'Delphi', 'PowerBuilder', 'FoxPro', 'Classic ASP', 'ColdFusion'].map((lang) => (
            <div
              key={lang}
              className="bg-ash-800/50 backdrop-blur-sm p-6 rounded-xl border border-ash-700 text-center hover:border-phoenix-600 transition"
            >
              <div className="text-ash-300 font-semibold">{lang}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-phoenix-600 to-phoenix-700 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Rise from the Ashes?
          </h2>
          <p className="text-xl text-phoenix-100 mb-8 max-w-2xl mx-auto">
            Join enterprises saving millions by modernizing their legacy systems with AI.
          </p>
          <button className="px-8 py-4 bg-white text-phoenix-600 font-bold rounded-lg hover:bg-ash-100 transition inline-flex items-center space-x-2">
            <span>Start Transforming Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-ash-800 py-12">
        <div className="container mx-auto px-6 text-center text-ash-500">
          <p>&copy; 2025 CodePhoenix. Built for Kiroween Hackathon.</p>
          <p className="mt-2 text-sm">Powered by Kiro AI • Resurrection Category</p>
        </div>
      </footer>
    </main>
  )
}
