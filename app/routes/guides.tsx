import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { useState } from 'react';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Guides - Clyra.ai || Next Gen AI Assistant' },
    { name: 'description', content: 'Step-by-step guides and tutorials to help you master Clyra.ai and build amazing AI-powered applications.' },
  ];
};

export const loader = () => json({});

const guides = [
  {
    id: 'gemini-setup',
    title: 'Setting Up Your Gemini API Key',
    description: 'Learn how to obtain and configure your Google Gemini API key for use with Clyra.ai',
    difficulty: 'Beginner',
    duration: '5 min',
    icon: 'i-ph:key',
    category: 'Setup',
    steps: [
      'Visit Google AI Studio and sign in with your Google account',
      'Navigate to the API Keys section in the dashboard',
      'Click "Create API Key" and copy your new key',
      'In Clyra.ai, go to Settings > API Configuration',
      'Paste your Gemini API key and click Save',
      'Test the connection by sending a test prompt'
    ]
  },
  {
    id: 'supabase-integration',
    title: 'Connecting Supabase to Your Project',
    description: 'Integrate Supabase for authentication, database, and storage in your Clyra.ai project',
    difficulty: 'Intermediate',
    duration: '15 min',
    icon: 'i-ph:database',
    category: 'Integration',
    steps: [
      'Create a new project in your Supabase dashboard',
      'Copy your project URL and anon key from Settings > API',
      'In Clyra.ai, navigate to Integrations > Supabase',
      'Enter your Supabase URL and API key',
      'Configure your database schema and enable Row Level Security',
      'Test the connection with a simple query'
    ]
  },
  {
    id: 'ai-prompts',
    title: 'Building Apps with AI Prompts',
    description: 'Master prompt engineering to generate high-quality code and content with Clyra.ai',
    difficulty: 'Beginner',
    duration: '10 min',
    icon: 'i-ph:magic-wand',
    category: 'Development',
    steps: [
      'Understand the basics of effective prompt structure',
      'Use descriptive language and provide clear context',
      'Break complex requests into smaller, specific prompts',
      'Leverage system prompts for consistent behavior',
      'Iterate and refine prompts based on results',
      'Save successful prompts as templates for reuse'
    ]
  },
  {
    id: 'deployment-guide',
    title: 'Deploying Your Clyra.ai Application',
    description: 'Deploy your AI-powered application to production with Vercel, Netlify, or other platforms',
    difficulty: 'Intermediate',
    duration: '20 min',
    icon: 'i-ph:rocket-launch',
    category: 'Deployment',
    steps: [
      'Prepare your application for production',
      'Set up environment variables securely',
      'Connect your GitHub repository',
      'Configure build settings and deployment options',
      'Deploy and verify your application',
      'Set up custom domains and SSL certificates'
    ]
  },
  {
    id: 'real-time-chat',
    title: 'Creating a Real-time Chat Application',
    description: 'Build a production-ready chat app with streaming responses and conversation history',
    difficulty: 'Advanced',
    duration: '30 min',
    icon: 'i-ph:chats-circle',
    category: 'Development',
    steps: [
      'Set up your project with the Chat API',
      'Implement streaming responses for real-time updates',
      'Add conversation history and context management',
      'Handle errors and edge cases gracefully',
      'Implement user authentication and sessions',
      'Deploy and scale your chat application'
    ]
  },
  {
    id: 'code-generation',
    title: 'Automated Code Generation Workflow',
    description: 'Use AI to generate components, functions, and entire features from descriptions',
    difficulty: 'Intermediate',
    duration: '15 min',
    icon: 'i-ph:code',
    category: 'Development',
    steps: [
      'Define your project requirements clearly',
      'Use structured prompts for code generation',
      'Review and test generated code',
      'Refine prompts for better results',
      'Integrate generated code into your project',
      'Set up automated testing for generated code'
    ]
  }
];

const categories = ['All', 'Setup', 'Integration', 'Development', 'Deployment'];

export default function Guides() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const filteredGuides = selectedCategory === 'All' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'from-green-500 to-emerald-600';
      case 'Intermediate':
        return 'from-yellow-500 to-orange-600';
      case 'Advanced':
        return 'from-red-500 to-rose-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <PageLayout 
      title="Developer Guides" 
      description="Step-by-step tutorials to help you build powerful AI applications"
    >
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md'
                  : 'bg-black/40 backdrop-blur-md text-gray-300 hover:text-white border border-gray-700/50 hover:border-cyan-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getDifficultyColor(guide.difficulty)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`${guide.icon} text-2xl text-white`}></span>
                </div>
                <span className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(guide.difficulty)} text-white text-xs font-bold rounded-full`}>
                  {guide.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {guide.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {guide.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700/50">
                <span className="flex items-center gap-1">
                  <span className="i-ph:clock"></span>
                  {guide.duration}
                </span>
                <span className="flex items-center gap-1">
                  <span className="i-ph:tag"></span>
                  {guide.category}
                </span>
              </div>

              <button
                onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                className="w-full px-4 py-3 bg-gray-800/30 text-cyan-400 font-bold rounded-lg hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:text-white transition-all duration-200 border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                {expandedGuide === guide.id ? 'Hide Steps' : 'View Steps'}
              </button>
            </div>

            {expandedGuide === guide.id && (
              <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                  <h4 className="text-sm font-bold text-cyan-400 mb-3">Step-by-Step Guide:</h4>
                  <ol className="space-y-3">
                    {guide.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="w-6 h-6 bg-cyan-400/10 rounded-full flex items-center justify-center flex-shrink-0 text-cyan-400 font-bold text-xs border border-cyan-400/30">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-3xl border border-cyan-500/20 p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">Need Additional Help?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Check out our full documentation or join our community for personalized assistance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/docs"
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 transform hover:scale-105"
          >
            Read Documentation
          </Link>
          <a
            href="#"
            className="px-8 py-4 bg-black/40 backdrop-blur-md text-white font-bold rounded-xl border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-200"
          >
            Join Discord
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
