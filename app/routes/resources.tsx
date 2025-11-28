import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Resources - Clyra.ai || Next Gen AI Assistant' },
    { name: 'description', content: 'Access comprehensive resources including documentation, SDKs, templates, and learning materials for Clyra.ai.' },
  ];
};

export const loader = () => json({});

const resources = [
  {
    category: 'Documentation',
    icon: 'i-ph:book-open-fill',
    gradient: 'from-cyan-500 to-blue-600',
    items: [
      { title: 'Getting Started', description: 'Quick start guide to integrate Clyra.ai', link: '/docs#setup', icon: 'i-ph:rocket-launch' },
      { title: 'API Reference', description: 'Complete API documentation and endpoints', link: '/docs#api-reference', icon: 'i-ph:code' },
      { title: 'Best Practices', description: 'Learn how to build production-ready apps', link: '/docs#best-practices', icon: 'i-ph:lightbulb' },
      { title: 'Troubleshooting', description: 'Common issues and how to resolve them', link: '/docs#troubleshooting', icon: 'i-ph:wrench' }
    ]
  },
  {
    category: 'SDKs & Libraries',
    icon: 'i-ph:package-fill',
    gradient: 'from-blue-500 to-purple-600',
    items: [
      { title: 'JavaScript/TypeScript', description: 'npm install @clyra-ai/sdk', link: '#', icon: 'i-ph:file-js' },
      { title: 'Python SDK', description: 'pip install clyra-ai', link: '#', icon: 'i-ph:file-py' },
      { title: 'Go Client', description: 'go get github.com/clyra-ai/sdk', link: '#', icon: 'i-ph:file-go' },
      { title: 'React Components', description: 'Pre-built UI components for React', link: '#', icon: 'i-ph:atom' }
    ]
  },
  {
    category: 'Templates',
    icon: 'i-ph:layout-fill',
    gradient: 'from-purple-500 to-pink-600',
    items: [
      { title: 'Chat Application', description: 'Full-featured chat app template', link: '#', icon: 'i-ph:chats-circle' },
      { title: 'SaaS Starter', description: 'Complete SaaS boilerplate', link: '#', icon: 'i-ph:rocket' },
      { title: 'AI Dashboard', description: 'Analytics and monitoring dashboard', link: '#', icon: 'i-ph:chart-line' },
      { title: 'Content Generator', description: 'AI content creation platform', link: '#', icon: 'i-ph:file-text' }
    ]
  },
  {
    category: 'Learning Materials',
    icon: 'i-ph:graduation-cap-fill',
    gradient: 'from-pink-500 to-rose-600',
    items: [
      { title: 'Video Tutorials', description: 'Step-by-step video guides', link: '#', icon: 'i-ph:play-circle' },
      { title: 'Code Examples', description: 'Real-world implementation examples', link: '#', icon: 'i-ph:code-block' },
      { title: 'Blog Posts', description: 'Technical articles and insights', link: '/blog', icon: 'i-ph:article' },
      { title: 'Case Studies', description: 'Learn from successful implementations', link: '#', icon: 'i-ph:briefcase' }
    ]
  },
  {
    category: 'Community',
    icon: 'i-ph:users-three-fill',
    gradient: 'from-rose-500 to-orange-600',
    items: [
      { title: 'Discord Server', description: 'Join 10,000+ developers', link: '#', icon: 'i-ph:discord-logo' },
      { title: 'GitHub Discussions', description: 'Ask questions and share ideas', link: '#', icon: 'i-ph:github-logo' },
      { title: 'Stack Overflow', description: 'Get help from the community', link: '#', icon: 'i-ph:stack' },
      { title: 'Community Showcase', description: 'See what others have built', link: '/gallery', icon: 'i-ph:star' }
    ]
  },
  {
    category: 'Tools & Integrations',
    icon: 'i-ph:puzzle-piece-fill',
    gradient: 'from-orange-500 to-yellow-600',
    items: [
      { title: 'VS Code Extension', description: 'Code with Clyra.ai in your IDE', link: '#', icon: 'i-ph:code-simple' },
      { title: 'CLI Tool', description: 'Manage projects from terminal', link: '#', icon: 'i-ph:terminal' },
      { title: 'Postman Collection', description: 'Test APIs with Postman', link: '#', icon: 'i-ph:api' },
      { title: 'Webhooks', description: 'Real-time event notifications', link: '#', icon: 'i-ph:webhook' }
    ]
  }
];

export default function Resources() {
  return (
    <PageLayout 
      title="Resource Hub" 
      description="Everything you need to learn, build, and succeed with Clyra.ai"
    >
      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link
          to="/docs"
          className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-xl border border-cyan-500/20 p-6 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 group"
        >
          <span className="i-ph:book-open text-4xl text-cyan-400 mb-3 block group-hover:scale-110 transition-transform"></span>
          <h3 className="text-white font-bold mb-1">Documentation</h3>
          <p className="text-gray-400 text-sm">Complete guides</p>
        </Link>

        <Link
          to="/guides"
          className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-md rounded-xl border border-blue-500/20 p-6 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 group"
        >
          <span className="i-ph:compass text-4xl text-blue-400 mb-3 block group-hover:scale-110 transition-transform"></span>
          <h3 className="text-white font-bold mb-1">Guides</h3>
          <p className="text-gray-400 text-sm">Step-by-step</p>
        </Link>

        <a
          href="#"
          className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 group"
        >
          <span className="i-ph:github-logo text-4xl text-purple-400 mb-3 block group-hover:scale-110 transition-transform"></span>
          <h3 className="text-white font-bold mb-1">GitHub</h3>
          <p className="text-gray-400 text-sm">Open source</p>
        </a>

        <a
          href="#"
          className="bg-gradient-to-br from-pink-500/10 to-rose-600/10 backdrop-blur-md rounded-xl border border-pink-500/20 p-6 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300 group"
        >
          <span className="i-ph:discord-logo text-4xl text-pink-400 mb-3 block group-hover:scale-110 transition-transform"></span>
          <h3 className="text-white font-bold mb-1">Discord</h3>
          <p className="text-gray-400 text-sm">Community</p>
        </a>
      </div>

      {/* Resource Categories */}
      <div className="space-y-12">
        {resources.map((category, categoryIndex) => (
          <section key={categoryIndex}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center`}>
                <span className={`${category.icon} text-2xl text-white`}></span>
              </div>
              <h2 className="text-2xl font-bold text-white">{category.category}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.link}
                  className="bg-black/40 backdrop-blur-md rounded-xl border border-gray-700/50 p-5 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 group flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/10 transition-colors">
                    <span className={`${item.icon} text-xl text-gray-400 group-hover:text-cyan-400 transition-colors`}></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="i-ph:arrow-right text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0"></span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-3xl border border-cyan-500/20 p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Our support team is here 24/7 to help you succeed with Clyra.ai
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 transform hover:scale-105"
          >
            Contact Support
          </a>
          <a
            href="#"
            className="px-8 py-4 bg-black/40 backdrop-blur-md text-white font-bold rounded-xl border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-200"
          >
            Join Community
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
