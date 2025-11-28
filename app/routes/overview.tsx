import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Overview - Clyra.ai || Next Gen AI Assistant' },
    { name: 'description', content: 'Discover how Clyra.ai empowers developers to build intelligent applications with cutting-edge AI technology.' },
  ];
};

export const loader = () => json({});

export default function Overview() {
  return (
    <PageLayout 
      title="Welcome to Clyra.ai" 
      description="Empowering developers to build intelligent applications with cutting-edge AI technology"
    >
      {/* What is Clyra.ai */}
      <section className="mb-20">
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-3xl border border-cyan-500/20 p-8 lg:p-12 shadow-xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="i-ph:sparkle text-2xl text-white"></span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">What is Clyra.ai?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Clyra.ai is a next-generation AI development platform that enables developers to seamlessly integrate advanced AI capabilities into their applications. Built on cutting-edge technology, Clyra.ai provides a comprehensive suite of tools for code generation, natural language processing, and intelligent automation.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you're building a chatbot, automating workflows, or creating intelligent SaaS applications, Clyra.ai gives you the power to innovate faster and smarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-400/30">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Connect Your API</h3>
            <p className="text-gray-400 leading-relaxed">
              Integrate Clyra.ai with your application using our simple SDK or REST API. Get started in minutes with comprehensive documentation and code examples.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-400/30">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Build with AI</h3>
            <p className="text-gray-400 leading-relaxed">
              Leverage powerful AI models for code generation, chat completions, content creation, and more. Our platform handles the complexity while you focus on innovation.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-400/30">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Deploy & Scale</h3>
            <p className="text-gray-400 leading-relaxed">
              Ship your AI-powered application with confidence. Clyra.ai scales automatically to handle your growing user base with enterprise-grade reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Why Developers Love It */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Developers Love Clyra.ai</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <span className="i-ph:lightning text-xl text-cyan-400"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Get responses in milliseconds with our optimized infrastructure and intelligent caching.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <span className="i-ph:shield-check text-xl text-cyan-400"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-gray-400">Built with security first. SOC 2 compliant with end-to-end encryption and data privacy.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <span className="i-ph:code text-xl text-cyan-400"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Developer Friendly</h3>
                <p className="text-gray-400">Simple APIs, comprehensive docs, and SDKs in all major languages. Start coding in minutes.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <span className="i-ph:chart-line text-xl text-cyan-400"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Scalable by Default</h3>
                <p className="text-gray-400">From prototype to production, our infrastructure grows with you. No configuration needed.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <span className="i-ph:users text-xl text-cyan-400"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Active Community</h3>
                <p className="text-gray-400">Join thousands of developers building the future. Get help, share ideas, and collaborate.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <span className="i-ph:wallet text-xl text-cyan-400"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Flexible Pricing</h3>
                <p className="text-gray-400">Pay only for what you use. Free tier available. No hidden fees or surprise charges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-3xl border border-cyan-500/20 p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build the Future?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using Clyra.ai to create intelligent applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/docs"
              className="px-8 py-4 bg-black/40 backdrop-blur-md text-white font-bold rounded-xl border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-200"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
