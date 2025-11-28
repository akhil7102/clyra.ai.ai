import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'A visual showcase of screenshots, UI previews, themes, templates, demo videos, or user-created content. This section helps users understand the design, capabilities, and style of your product.' },
  ];
};

export const loader = () => json({});

const galleryProjects = [
  {
    id: 'ai-chatbot',
    title: 'Advanced Customer Support Bot',
    description: 'Intelligent chatbot with multi-language support and sentiment analysis',
    image: '/api/placeholder/400/300',
    category: 'Chatbots',
    author: 'TechCorp Solutions',
    likes: 234,
    views: 1520,
    featured: true
  },
  {
    id: 'content-generator',
    title: 'AI Content Generator',
    description: 'Automated blog post and social media content creation platform',
    image: '/api/placeholder/400/500',
    category: 'Content Creation',
    author: 'Creative AI Labs',
    likes: 189,
    views: 980
  },
  {
    id: 'code-assistant',
    title: 'Smart Code Assistant',
    description: 'IDE plugin that suggests code completions and optimizations',
    image: '/api/placeholder/400/350',
    category: 'Development Tools',
    author: 'DevTools Inc',
    likes: 312,
    views: 2100
  },
  {
    id: 'data-analyzer',
    title: 'Business Intelligence Dashboard',
    description: 'Real-time data analysis and visualization platform',
    image: '/api/placeholder/400/400',
    category: 'Analytics',
    author: 'DataPro Analytics',
    likes: 156,
    views: 890
  },
  {
    id: 'e-learning',
    title: 'Personalized Learning Platform',
    description: 'Adaptive educational content based on student performance',
    image: '/api/placeholder/400/450',
    category: 'Education',
    author: 'EduTech Solutions',
    likes: 278,
    views: 1650
  },
  {
    id: 'health-monitor',
    title: 'Health Monitoring Assistant',
    description: 'AI-powered health tracking and recommendation system',
    image: '/api/placeholder/400/320',
    category: 'Healthcare',
    author: 'MedTech Innovations',
    likes: 423,
    views: 2890,
    featured: true
  },
  {
    id: 'finance-advisor',
    title: 'Personal Finance Advisor',
    description: 'Intelligent financial planning and investment recommendations',
    image: '/api/placeholder/400/380',
    category: 'Finance',
    author: 'FinTech Solutions',
    likes: 198,
    views: 1200
  },
  {
    id: 'image-processor',
    title: 'AI Image Enhancement Tool',
    description: 'Automated image editing and enhancement using computer vision',
    image: '/api/placeholder/400/420',
    category: 'Media',
    author: 'Pixel Perfect AI',
    likes: 367,
    views: 1980
  },
  {
    id: 'translation-app',
    title: 'Real-time Translation App',
    description: 'Multi-language translation with context awareness',
    image: '/api/placeholder/400/360',
    category: 'Communication',
    author: 'Global Connect',
    likes: 245,
    views: 1340
  }
];

const categories = ['All', 'Chatbots', 'Content Creation', 'Development Tools', 'Analytics', 'Education', 'Healthcare', 'Finance', 'Media', 'Communication'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  
  const filteredProjects = selectedCategory === 'All' 
    ? galleryProjects 
    : galleryProjects.filter(project => project.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <PageLayout 
      title="Gallery" 
      description="A visual showcase of screenshots, UI previews, themes, templates, demo videos, or user-created content. This section helps users understand the design, capabilities, and style of your product."
    >
      {/* Submit Project CTA */}
      <div className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Built something amazing?</h3>
          <p className="text-gray-400">Share your project with the Clyra.ai community</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
          Submit Project
        </button>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-black/40 backdrop-blur-md text-gray-300 hover:text-white border border-gray-700/50 hover:border-cyan-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 bg-black/40 backdrop-blur-md rounded-xl p-1 border border-gray-700/50">
          <button
            onClick={() => setViewMode('masonry')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'masonry'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Masonry
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="group relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-2xl border border-cyan-500/20 overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <div className="relative h-64">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold rounded-full shadow-md shadow-cyan-500/20">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-gray-700/50">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-white font-medium">
                      by {project.author}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer">
                        <span className="i-ph:heart"></span>
                        {project.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="i-ph:eye"></span>
                        {project.views}
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Projects */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          All Projects ({regularProjects.length})
        </h3>
        
        <div className={
          viewMode === 'masonry' 
            ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        }>
          {regularProjects.map((project) => (
            <div 
              key={project.id}
              className={`group bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 ${
                viewMode === 'masonry' ? 'break-inside-avoid' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full object-cover"
                  style={{ height: viewMode === 'masonry' ? 'auto' : '200px' }}
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-gray-700/50">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-white font-medium truncate">
                    {project.author}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer">
                      <span className="i-ph:heart text-xs"></span>
                      {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="i-ph:eye text-xs"></span>
                      {project.views}
                    </span>
                  </div>
                </div>
                
                <button className="w-full px-3 py-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 text-cyan-400 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 hover:text-white transition-all duration-200 border border-cyan-400/30">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 bg-black/40 backdrop-blur-md text-white font-semibold rounded-xl border border-gray-700/50 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-blue-500/10 transition-all duration-200">
          Load More Projects
        </button>
      </div>
    </PageLayout>
  );
}
