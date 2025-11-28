import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'A brief explanation of your company, project, or mission. This section tells the story behind the product, your goals, values, and team.' },
  ];
};

export const loader = () => json({});

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former AI researcher at Google with 10+ years of experience in machine learning and natural language processing.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Experienced software architect from Microsoft, specializing in scalable distributed systems and cloud infrastructure.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Head of AI Research',
    bio: 'PhD in Computer Science from Stanford, published author of 25+ papers on deep learning and neural networks.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Alex Thompson',
    role: 'VP of Engineering',
    bio: 'Former senior engineer at Amazon Web Services, expert in DevOps and infrastructure optimization.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Jessica Park',
    role: 'Head of Design',
    bio: 'Award-winning designer from Apple, passionate about creating intuitive and beautiful user experiences.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'David Kim',
    role: 'VP of Product',
    bio: 'Product strategist with experience leading teams at Slack and Zoom, focused on user-centric innovation.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  }
];

const values = [
  {
    title: 'Innovation First',
    description: 'We push the boundaries of what\'s possible with AI, constantly exploring new technologies and approaches.',
    icon: '🚀'
  },
  {
    title: 'User-Centric',
    description: 'Every decision we make starts with our users. Your success is our success.',
    icon: '👥'
  },
  {
    title: 'Transparency',
    description: 'We believe in open communication and being honest about our capabilities and limitations.',
    icon: '🔍'
  },
  {
    title: 'Excellence',
    description: 'We strive for the highest quality in everything we build, from code to customer support.',
    icon: '⭐'
  }
];

const stats = [
  { number: '10M+', label: 'API Calls per Day' },
  { number: '99.9%', label: 'Uptime' },
  { number: '50K+', label: 'Active Developers' },
  { number: '150+', label: 'Countries Served' }
];

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-accent-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20 group-hover:border-[#4DA8FF]/30 transition-colors duration-300"
          />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-[#4DA8FF] to-[#2C8CFF] rounded-full flex items-center justify-center">
            <span className="i-ph:check text-white text-sm"></span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-bolt-elements-textPrimary mb-1">
          {member.name}
        </h3>
        <p className="text-[#4DA8FF] font-semibold mb-3">
          {member.role}
        </p>
      </div>
      
      <p className="text-bolt-elements-textSecondary text-sm mb-6 text-center">
        {member.bio}
      </p>
      
      <div className="flex justify-center gap-3">
        <a 
          href={member.linkedin}
          className="w-10 h-10 bg-accent-100 dark:bg-accent-800 rounded-full flex items-center justify-center text-bolt-elements-textSecondary hover:bg-gradient-to-r hover:from-[#4DA8FF] hover:to-[#2C8CFF] hover:text-white transition-all duration-200"
        >
          <span className="i-ph:linkedin-logo text-lg"></span>
        </a>
        <a 
          href={member.twitter}
          className="w-10 h-10 bg-accent-100 dark:bg-accent-800 rounded-full flex items-center justify-center text-bolt-elements-textSecondary hover:bg-gradient-to-r hover:from-[#4DA8FF] hover:to-[#2C8CFF] hover:text-white transition-all duration-200"
        >
          <span className="i-ph:twitter-logo text-lg"></span>
        </a>
      </div>
    </div>
  );
}

function ValueCard({ value }: { value: typeof values[0] }) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-accent-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <div className="text-4xl mb-4">{value.icon}</div>
      <h3 className="text-xl font-bold text-bolt-elements-textPrimary mb-3">
        {value.title}
      </h3>
      <p className="text-bolt-elements-textSecondary">
        {value.description}
      </p>
    </div>
  );
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] bg-clip-text text-transparent mb-2">
        {stat.number}
      </div>
      <p className="text-bolt-elements-textSecondary font-medium">
        {stat.label}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <PageLayout 
      title="About Clyra.ai" 
      description="A brief explanation of your company, project, or mission. This section tells the story behind the product, your goals, values, and team."
    >
      {/* Mission Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-br from-[#4DA8FF]/10 to-[#2C8CFF]/10 rounded-3xl border border-accent-200/60 p-8 lg:p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-bolt-elements-textPrimary mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-bolt-elements-textSecondary max-w-3xl mx-auto leading-relaxed">
            To democratize AI development and empower creators worldwide with intelligent tools that transform ideas into reality. We believe AI should be accessible, powerful, and aligned with human values.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Vision Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-bolt-elements-textPrimary text-center mb-8">
          Our Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg text-bolt-elements-textSecondary mb-6 leading-relaxed">
              We envision a world where AI amplifies human creativity and productivity across every industry. Our platform serves as the bridge between cutting-edge AI research and practical applications that solve real-world problems.
            </p>
            <p className="text-lg text-bolt-elements-textSecondary mb-6 leading-relaxed">
              By providing developers with intuitive tools and powerful APIs, we're accelerating the adoption of AI and enabling the next generation of intelligent applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4DA8FF] to-[#2C8CFF] rounded-xl flex items-center justify-center">
                  <span className="i-ph:rocket-launch text-white text-xl"></span>
                </div>
                <div>
                  <p className="font-semibold text-bolt-elements-textPrimary">Fast Innovation</p>
                  <p className="text-sm text-bolt-elements-textSecondary">Rapid development cycles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4DA8FF] to-[#2C8CFF] rounded-xl flex items-center justify-center">
                  <span className="i-ph:shield-check text-white text-xl"></span>
                </div>
                <div>
                  <p className="font-semibold text-bolt-elements-textPrimary">Secure & Reliable</p>
                  <p className="text-sm text-bolt-elements-textSecondary">Enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Our Vision"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#4DA8FF] to-[#2C8CFF] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              AI+
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-bolt-elements-textPrimary text-center mb-8">
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-bolt-elements-textPrimary text-center mb-4">
          Meet Our Team
        </h2>
        <p className="text-lg text-bolt-elements-textSecondary text-center mb-12 max-w-2xl mx-auto">
          We're a diverse team of engineers, researchers, and designers passionate about building the future of AI.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] rounded-3xl p-8 lg:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Join Us in Shaping the Future
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for AI and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-[#4DA8FF] font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
              View Open Positions
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
