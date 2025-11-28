import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'A section dedicated to articles, announcements, updates, and tutorials. The blog keeps users informed about new features, releases, improvements, and important news about the product or company.' },
  ];
};

export const loader = () => json({});

const blogPosts = [
  {
    id: 'introducing-clyra-2',
    title: 'Introducing Clyra 2.0: The Next Generation of AI Development',
    excerpt: 'Discover our revolutionary new features that make AI development faster, more intuitive, and more powerful than ever before.',
    image: '/api/placeholder/600/400',
    date: '2024-11-15',
    author: 'Sarah Chen',
    readTime: '5 min read',
    category: 'Product Updates',
    featured: true
  },
  {
    id: 'ai-best-practices',
    title: 'Best Practices for Building Production AI Applications',
    excerpt: 'Learn from our experience building scalable AI systems that handle millions of requests while maintaining reliability.',
    image: '/api/placeholder/600/400',
    date: '2024-11-10',
    author: 'Michael Rodriguez',
    readTime: '8 min read',
    category: 'Engineering'
  },
  {
    id: 'future-of-ai',
    title: 'The Future of AI: Trends Shaping 2025',
    excerpt: 'Explore the emerging trends and technologies that will define the next era of artificial intelligence and machine learning.',
    image: '/api/placeholder/600/400',
    date: '2024-11-05',
    author: 'Dr. Emily Watson',
    readTime: '6 min read',
    category: 'Industry Insights'
  },
  {
    id: 'optimizing-prompts',
    title: 'Advanced Prompt Engineering: Getting the Most from AI Models',
    excerpt: 'Master the art and science of prompt engineering with proven techniques and real-world examples.',
    image: '/api/placeholder/600/400',
    date: '2024-10-28',
    author: 'Alex Thompson',
    readTime: '10 min read',
    category: 'Tutorials'
  },
  {
    id: 'security-focus',
    title: 'Security First: How We Protect Your AI Applications',
    excerpt: 'Deep dive into our security architecture and the measures we take to keep your data and applications safe.',
    image: '/api/placeholder/600/400',
    date: '2024-10-20',
    author: 'Security Team',
    readTime: '7 min read',
    category: 'Security'
  },
  {
    id: 'community-stories',
    title: 'Community Spotlight: Amazing Projects Built with Clyra',
    excerpt: 'Celebrate the incredible innovations our community has created using the Clyra platform.',
    image: '/api/placeholder/600/400',
    date: '2024-10-15',
    author: 'Community Team',
    readTime: '4 min read',
    category: 'Community'
  }
];

const categories = ['All', 'Product Updates', 'Engineering', 'Industry Insights', 'Tutorials', 'Security', 'Community'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <PageLayout 
      title="Blog" 
      description="A section dedicated to articles, announcements, updates, and tutorials. The blog keeps users informed about new features, releases, improvements, and important news about the product or company."
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
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-black/40 backdrop-blur-md text-gray-300 hover:text-white border border-gray-700/50 hover:border-cyan-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && (
        <div className="mb-12">
          <article className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl border border-cyan-500/20 overflow-hidden shadow-xl backdrop-blur-md">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold rounded-full shadow-md shadow-cyan-500/20">
                    Featured
                  </span>
                  <span className="text-sm text-gray-400">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{featuredPost.author}</p>
                      <p className="text-sm text-gray-400">{featuredPost.date}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{featuredPost.readTime}</span>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200"
                >
                  Read More
                  <span className="i-ph:arrow-right"></span>
                </Link>
              </div>
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-gray-700/50">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.date}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
              
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Read More
                <span className="i-ph:arrow-right"></span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-black/40 backdrop-blur-md text-white font-semibold rounded-xl border border-gray-700/50 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-blue-500/10 transition-all duration-200">
          Load More Articles
        </button>
      </div>
    </PageLayout>
  );
}

// Add useState import
import { useState } from 'react';
