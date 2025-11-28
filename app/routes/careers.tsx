import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'A page listing open job positions, internships, and hiring opportunities. It includes company culture, benefits, and information about how candidates can apply.' },
  ];
};

export const loader = () => json({});

const jobCategories = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations', 'Research'];

const jobListings = [
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    category: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    department: 'Engineering',
    experience: '5+ years',
    salary: '$150k - $200k',
    posted: '2 days ago',
    featured: true,
    description: 'We are looking for a Senior Frontend Engineer to join our team and help build the future of AI development tools.',
    requirements: [
      '5+ years of experience with React, TypeScript, and modern frontend frameworks',
      'Strong understanding of UI/UX principles and design systems',
      'Experience with AI/ML interfaces and developer tools',
      'Excellent problem-solving skills and attention to detail',
      'Ability to work in a fast-paced, collaborative environment'
    ],
    responsibilities: [
      'Lead frontend development for our AI platform',
      'Collaborate with design and product teams to create intuitive user experiences',
      'Mentor junior engineers and contribute to technical decisions',
      'Optimize application performance and ensure cross-browser compatibility',
      'Participate in code reviews and maintain high code quality standards'
    ]
  },
  {
    id: 'ml-research-scientist',
    title: 'ML Research Scientist',
    category: 'Research',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'AI Research',
    experience: 'PhD + 2 years',
    salary: '$180k - $250k',
    posted: '1 week ago',
    featured: true,
    description: 'Join our AI research team to push the boundaries of what is possible with large language models and AI systems.',
    requirements: [
      'PhD in Computer Science, Machine Learning, or related field',
      'Strong publication record in top AI conferences',
      'Experience with large language models and deep learning',
      'Proficiency in Python and ML frameworks (PyTorch, TensorFlow)',
      'Excellent research and communication skills'
    ],
    responsibilities: [
      'Conduct cutting-edge research in AI and machine learning',
      'Develop novel algorithms and techniques for AI systems',
      'Collaborate with engineering teams to implement research findings',
      'Publish research papers and present at conferences',
      'Contribute to our AI model development and optimization'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    department: 'Product',
    experience: '3-5 years',
    salary: '$130k - $170k',
    posted: '3 days ago',
    description: 'We are seeking a Product Manager to drive the development of our AI platform and ensure we deliver value to our users.',
    requirements: [
      '3-5 years of product management experience',
      'Experience with B2B SaaS or developer tools',
      'Strong analytical and problem-solving skills',
      'Excellent communication and stakeholder management',
      'Understanding of AI/ML technologies and trends'
    ],
    responsibilities: [
      'Define product roadmap and strategy for AI platform features',
      'Work closely with engineering, design, and marketing teams',
      'Conduct user research and gather feedback to inform product decisions',
      'Analyze market trends and competitive landscape',
      'Manage product lifecycle from conception to launch'
    ]
  },
  {
    id: 'ux-designer',
    title: 'Senior UX Designer',
    category: 'Design',
    location: 'Remote',
    type: 'Full-time',
    department: 'Design',
    experience: '4+ years',
    salary: '$120k - $160k',
    posted: '5 days ago',
    description: 'Join our design team to create beautiful and intuitive experiences for AI developers and users.',
    requirements: [
      '4+ years of UX design experience',
      'Strong portfolio demonstrating design process and impact',
      'Proficiency in Figma, Sketch, or similar design tools',
      'Experience with developer tools or technical products',
      'Understanding of AI/ML user interfaces and interactions'
    ],
    responsibilities: [
      'Lead UX design for our AI platform and tools',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and engineers',
      'Contribute to our design system and design guidelines'
    ]
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    category: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'Engineering',
    experience: '3+ years',
    salary: '$140k - $180k',
    posted: '1 week ago',
    description: 'Help us build scalable backend systems to power our AI platform and serve millions of API requests.',
    requirements: [
      '3+ years of backend development experience',
      'Strong proficiency in Python, Go, or similar languages',
      'Experience with cloud platforms (AWS, GCP, Azure)',
      'Knowledge of databases, caching, and message queues',
      'Understanding of microservices architecture'
    ],
    responsibilities: [
      'Design and implement scalable backend services',
      'Optimize API performance and reliability',
      'Work with databases and data storage systems',
      'Implement monitoring and alerting systems',
      'Collaborate with frontend and ML teams'
    ]
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    department: 'Operations',
    experience: '4+ years',
    salary: '$130k - $170k',
    posted: '2 weeks ago',
    description: 'Join our operations team to ensure our AI platform runs smoothly and efficiently at scale.',
    requirements: [
      '4+ years of DevOps or SRE experience',
      'Experience with Kubernetes and container orchestration',
      'Strong knowledge of CI/CD pipelines and automation',
      'Proficiency in infrastructure as code (Terraform, CloudFormation)',
      'Understanding of monitoring and observability tools'
    ],
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage Kubernetes clusters and cloud infrastructure',
      'Implement monitoring, logging, and alerting systems',
      'Optimize system performance and reliability',
      'Respond to incidents and improve system resilience'
    ]
  },
  {
    id: 'content-marketer',
    title: 'Content Marketing Manager',
    category: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    department: 'Marketing',
    experience: '3+ years',
    salary: '$90k - $120k',
    posted: '1 week ago',
    description: 'Help us tell the story of Clyra.ai and create compelling content for developers and businesses.',
    requirements: [
      '3+ years of content marketing experience',
      'Excellent writing and editing skills',
      'Experience with B2B tech or developer marketing',
      'Knowledge of SEO and content optimization',
      'Understanding of AI/ML technologies and trends'
    ],
    responsibilities: [
      'Create blog posts, case studies, and whitepapers',
      'Develop content strategy and editorial calendar',
      'Work with subject matter experts to produce technical content',
      'Optimize content for search engines and social media',
      'Measure and report on content performance'
    ]
  },
  {
    id: 'sales-engineer',
    title: 'Sales Engineer',
    category: 'Sales',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'Sales',
    experience: '2-4 years',
    salary: '$110k - $150k + commission',
    posted: '3 days ago',
    description: 'Join our sales team to help customers understand and implement our AI solutions.',
    requirements: [
      '2-4 years of sales engineering or technical sales experience',
      'Strong technical background and communication skills',
      'Experience with APIs or developer tools',
      'Ability to explain complex technical concepts to non-technical audiences',
      'Willingness to travel for customer meetings'
    ],
    responsibilities: [
      'Provide technical expertise during sales process',
      'Conduct product demonstrations and proof-of-concepts',
      'Create technical proposals and solution designs',
      'Support customers with implementation and onboarding',
      'Collaborate with product and engineering teams'
    ]
  }
];

const benefits = [
  {
    title: 'Health & Wellness',
    description: 'Comprehensive medical, dental, and vision insurance for you and your family',
    icon: '🏥'
  },
  {
    title: 'Flexible Work',
    description: 'Remote-first culture with flexible hours and unlimited PTO',
    icon: '🏠'
  },
  {
    title: 'Growth & Development',
    description: 'Annual learning stipend, conference budget, and mentorship programs',
    icon: '📚'
  },
  {
    title: 'Equity',
    description: 'Competitive equity package to share in our success',
    icon: '📈'
  },
  {
    title: 'Retirement',
    description: '401(k) plan with company matching and financial planning resources',
    icon: '💰'
  },
  {
    title: 'Perks',
    description: 'Home office stipend, wellness allowance, and team events',
    icon: '🎁'
  }
];

function JobCard({ job }: { job: typeof jobListings[0] }) {
  return (
    <div className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-accent-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      job.featured ? 'ring-2 ring-[#4DA8FF]/50' : ''
    }`}>
      {job.featured && (
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white text-sm font-semibold rounded-full">
            Featured
          </span>
          <span className="text-sm text-bolt-elements-textSecondary">
            Posted {job.posted}
          </span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-bolt-elements-textPrimary mb-2">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-bolt-elements-textSecondary mb-3">
            <span className="flex items-center gap-1">
              <span className="i-ph:map-pin"></span>
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <span className="i-ph:briefcase"></span>
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <span className="i-ph:currency-dollar"></span>
              {job.salary}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-bolt-elements-textSecondary mb-4">
        {job.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-accent-100 dark:bg-accent-800 text-bolt-elements-textSecondary text-xs font-medium rounded">
            {job.category}
          </span>
          <span className="text-xs text-bolt-elements-textSecondary">
            {job.experience} experience
          </span>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200">
          Apply Now
        </button>
      </div>
    </div>
  );
}

function BenefitCard({ benefit }: { benefit: typeof benefits[0] }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-4">{benefit.icon}</div>
      <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-2">
        {benefit.title}
      </h3>
      <p className="text-sm text-bolt-elements-textSecondary">
        {benefit.description}
      </p>
    </div>
  );
}

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredJobs = selectedCategory === 'All' 
    ? jobListings 
    : jobListings.filter(job => job.category === selectedCategory);

  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);

  return (
    <PageLayout 
      title="Careers" 
      description="A page listing open job positions, internships, and hiring opportunities. It includes company culture, benefits, and information about how candidates can apply."
    >
      {/* Hero Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-br from-[#4DA8FF]/10 to-[#2C8CFF]/10 rounded-3xl border border-accent-200/60 p-8 lg:p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-bolt-elements-textPrimary mb-6">
            Build the Future of AI with Us
          </h2>
          <p className="text-xl text-bolt-elements-textSecondary max-w-3xl mx-auto leading-relaxed mb-8">
            Join a passionate team of engineers, researchers, and creators working on the cutting edge of artificial intelligence. Together, we're building tools that empower developers to create the next generation of intelligent applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
              View Open Positions
            </button>
            <button className="px-8 py-3 bg-white/80 dark:bg-gray-900/80 text-bolt-elements-textPrimary font-semibold rounded-xl border border-accent-200/60 hover:border-[#4DA8FF] transition-all duration-200">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-bolt-elements-textPrimary text-center mb-8">
          Why Work at Clyra.ai
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>

      {/* Job Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {jobCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white shadow-md'
                  : 'bg-white/80 dark:bg-gray-900/80 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary border border-accent-200/60 hover:border-[#4DA8FF]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Stats */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-accent-200/60 p-6 mb-8 text-center">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold text-[#4DA8FF] mb-1">
              {filteredJobs.length}
            </div>
            <p className="text-sm text-bolt-elements-textSecondary">Open Positions</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#4DA8FF] mb-1">
              50+
            </div>
            <p className="text-sm text-bolt-elements-textSecondary">Team Members</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#4DA8FF] mb-1">
              15+
            </div>
            <p className="text-sm text-bolt-elements-textSecondary">Countries</p>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">
            Featured Opportunities
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}

      {/* All Jobs */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">
          All Open Positions ({regularJobs.length})
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {regularJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* No Positions */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-bolt-elements-textPrimary mb-2">
            No positions found
          </h3>
          <p className="text-bolt-elements-textSecondary mb-4">
            There are currently no open positions in this category.
          </p>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="px-6 py-2 bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200"
          >
            View All Positions
          </button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] rounded-3xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Don't See the Right Fit?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for AI. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-[#4DA8FF] font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
              Send Resume
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
              Join Talent Network
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-12 text-center text-sm text-bolt-elements-textSecondary">
        <p>Questions about careers at Clyra.ai?</p>
        <p>Contact us at careers@clyra.ai</p>
      </div>
    </PageLayout>
  );
}
