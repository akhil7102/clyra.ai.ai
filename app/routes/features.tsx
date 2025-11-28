import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Features - Clyra.ai || Next Gen AI Assistant' },
    { name: 'description', content: 'Explore the powerful features that make Clyra.ai the ultimate AI development platform.' },
  ];
};

export const loader = () => json({});

const features = [
  {
    id: 'code-generation',
    title: 'AI Code Generation',
    description: 'Generate production-ready code from natural language descriptions. Support for 20+ programming languages.',
    icon: 'i-ph:code-fill',
    gradient: 'from-cyan-500 to-blue-600',
    capabilities: [
      'Full-stack code generation',
      'Intelligent code completion',
      'Bug detection and fixes',
      'Code refactoring suggestions'
    ]
  },
  {
    id: 'saas-builder',
    title: 'SaaS Builder',
    description: 'Build complete SaaS applications with AI-powered scaffolding, authentication, and deployment.',
    icon: 'i-ph:app-window-fill',
    gradient: 'from-blue-500 to-purple-600',
    capabilities: [
      'Instant project scaffolding',
      'Built-in authentication',
      'Database integration',
      'One-click deployment'
    ]
  },
  {
    id: 'gemini-integration',
    title: 'Gemini API Integration',
    description: 'Leverage Google Gemini advanced AI models with seamless integration and optimized performance.',
    icon: 'i-ph:sparkle-fill',
    gradient: 'from-purple-500 to-pink-600',
    capabilities: [
      'Multi-modal AI support',
      'Context-aware responses',
      'Real-time streaming',
      'Advanced reasoning'
    ]
  },
  {
    id: 'ui-builder',
    title: 'Visual UI Builder',
    description: 'Design beautiful interfaces with our AI-powered UI builder. Generate React, Vue, or vanilla components.',
    icon: 'i-ph:paint-brush-fill',
    gradient: 'from-pink-500 to-rose-600',
    capabilities: [
      'Drag-and-drop interface',
      'Component library',
      'Responsive design',
      'Export to any framework'
    ]
  },
  {
    id: 'prompt-enhancement',
    title: 'Prompt Enhancement',
    description: 'Automatically optimize your prompts for better results using advanced prompt engineering techniques.',
    icon: 'i-ph:magic-wand-fill',
    gradient: 'from-rose-500 to-orange-600',
    capabilities: [
      'Smart prompt suggestions',
      'Context preservation',
      'Multi-turn conversations',
      'Prompt templates'
    ]
  },
  {
    id: 'real-time-collab',
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. Share projects, review code, and collaborate seamlessly.',
    icon: 'i-ph:users-three-fill',
    gradient: 'from-orange-500 to-yellow-600',
    capabilities: [
      'Live editing',
      'Team workspaces',
      'Version control',
      'Comment and review'
    ]
  }
];

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <PageLayout 
      title="Powerful Features" 
      description="Everything you need to build intelligent applications, all in one platform"
    >
      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="group bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:-translate-y-1"
            onClick={() => setSelectedFeature(feature.id === selectedFeature ? null : feature.id)}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <span className={`${feature.icon} text-2xl text-white`}></span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {feature.title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed mb-4">
              {feature.description}
            </p>

            {selectedFeature === feature.id && (
              <div className="mt-4 pt-4 border-t border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-300">
                <h4 className="text-sm font-bold text-cyan-400 mb-2">Key Capabilities:</h4>
                <ul className="space-y-2">
                  {feature.capabilities.map((capability, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="i-ph:check-circle text-cyan-400 flex-shrink-0 mt-0.5"></span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex items-center text-sm text-cyan-400 font-medium group-hover:gap-2 transition-all">
              <span>{selectedFeature === feature.id ? 'Show less' : 'Learn more'}</span>
              <span className={`i-ph:caret-down transition-transform ${selectedFeature === feature.id ? 'rotate-180' : ''}`}></span>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">How We Compare</h2>
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left p-4 text-gray-400 font-medium">Feature</th>
                  <th className="text-center p-4 text-cyan-400 font-bold">Clyra.ai</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Code Generation', clyra: true, others: true },
                  { feature: 'Real-time Collaboration', clyra: true, others: false },
                  { feature: 'UI Builder', clyra: true, others: false },
                  { feature: 'Gemini Integration', clyra: true, others: false },
                  { feature: 'Prompt Enhancement', clyra: true, others: true },
                  { feature: 'SaaS Builder', clyra: true, others: false },
                  { feature: 'Free Tier', clyra: true, others: true },
                  { feature: '24/7 Support', clyra: true, others: false }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 text-gray-300">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.clyra ? (
                        <span className="i-ph:check-circle-fill text-2xl text-cyan-400"></span>
                      ) : (
                        <span className="i-ph:x-circle-fill text-2xl text-gray-600"></span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.others ? (
                        <span className="i-ph:check-circle-fill text-2xl text-gray-600"></span>
                      ) : (
                        <span className="i-ph:x-circle-fill text-2xl text-gray-600"></span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-3xl border border-cyan-500/20 p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">Experience All Features Free</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Start building with Clyra.ai today. No credit card required.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 transform hover:scale-105">
          Start Free Trial
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </PageLayout>
  );
}
