import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'A complete collection of documentation explaining how your project, app, or platform works. It includes tutorials, setup guides, code examples, troubleshooting steps, and best practices for developers and users.' },
  ];
};

export const loader = () => json({});

const navigationItems = [
  { id: 'introduction', label: 'Introduction', icon: '📖' },
  { id: 'setup', label: 'Setup', icon: '⚙️' },
  { id: 'authentication', label: 'Authentication', icon: '🔐' },
  { id: 'chat-api', label: 'Chat API', icon: '💬' },
  { id: 'error-handling', label: 'Error Handling', icon: '⚠️' },
];

const docContent = {
  introduction: {
    title: 'Introduction to Clyra.ai',
    content: `
      <h2>Welcome to Clyra.ai</h2>
      
      <p>Clyra.ai is a powerful AI development platform that enables you to build intelligent applications with ease. Our API provides access to state-of-the-art language models and tools for creating next-generation AI experiences.</p>
      
      <h3>Key Features</h3>
      
      <ul>
        <li>🚀 Fast and reliable API responses</li>
        <li>🧠 Multiple AI model support</li>
        <li>🛠️ Comprehensive development tools</li>
        <li>📊 Real-time collaboration features</li>
        <li>🔒 Enterprise-grade security</li>
      </ul>
      
      <h3>Getting Started</h3>
      
      <p>This documentation will guide you through everything you need to know to integrate Clyra.ai into your applications. From basic setup to advanced features, we've got you covered.</p>
    `
  },
  setup: {
    title: 'Setup Guide',
    content: `
      <h2>Setting up Clyra.ai</h2>
      
      <p>Follow these steps to get started with Clyra.ai in your project.</p>
      
      <h3>1. Create an Account</h3>
      
      <p>Sign up for a free account at <a href="#">clyra.ai</a> to get your API keys.</p>
      
      <h3>2. Install the SDK</h3>
      
      <pre><code>npm install @clyra-ai/sdk
# or
yarn add @clyra-ai/sdk</code></pre>
      
      <h3>3. Initialize the Client</h3>
      
      <pre><code>import { ClyraAI } from '@clyra-ai/sdk';

const client = new ClyraAI({
  apiKey: 'your-api-key-here'
});</code></pre>
      
      <h3>4. Make Your First Request</h3>
      
      <pre><code>const response = await client.chat.completions.create({
  model: 'clyra-gpt',
  messages: [{ role: 'user', content: 'Hello, Clyra!' }]
});</code></pre>
    `
  },
  authentication: {
    title: 'Authentication',
    content: `
      <h2>Securing Your API Requests</h2>
      
      <p>Clyra.ai uses API keys to authenticate requests. Keep your API keys secure and never expose them in client-side code.</p>
      
      <h3>API Key Types</h3>
      
      <ul>
        <li><strong>Public Keys:</strong> For client-side applications with limited permissions</li>
        <li><strong>Secret Keys:</strong> For server-side applications with full permissions</li>
        <li><strong>Webhook Keys:</strong> For verifying webhook signatures</li>
      </ul>
      
      <h3>Using API Keys</h3>
      
      <p>Include your API key in the Authorization header:</p>
      
      <pre><code>curl -X POST https://api.clyra.ai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "clyra-gpt", "messages": [{"role": "user", "content": "Hello!"}]}'</code></pre>
      
      <h3>Best Practices</h3>
      
      <ul>
        <li>Store API keys in environment variables</li>
        <li>Use secret keys for server-side operations</li>
        <li>Rotate keys regularly</li>
        <li>Monitor key usage and set up alerts</li>
      </ul>
    `
  },
  'chat-api': {
    title: 'Chat API Reference',
    content: `
      <h2>Chat Completions API</h2>
      
      <p>The Chat API allows you to have conversational interactions with AI models.</p>
      
      <h3>Endpoint</h3>
      
      <p><code>POST /v1/chat/completions</code></p>
      
      <h3>Request Parameters</h3>
      
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>model</td>
            <td>string</td>
            <td>Yes</td>
            <td>The model to use</td>
          </tr>
          <tr>
            <td>messages</td>
            <td>array</td>
            <td>Yes</td>
            <td>List of messages in the conversation</td>
          </tr>
          <tr>
            <td>temperature</td>
            <td>number</td>
            <td>No</td>
            <td>Controls randomness (0-2)</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Example Response</h3>
      
      <pre><code>{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you today?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}</code></pre>
    `
  },
  'error-handling': {
    title: 'Error Handling',
    content: `
      <h2>Handling API Errors</h2>
      
      <p>Proper error handling is crucial for building robust applications with Clyra.ai.</p>
      
      <h3>Error Response Format</h3>
      
      <p>All API errors follow a consistent format:</p>
      
      <pre><code>{
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid request format",
    "code": "invalid_format"
  }
}</code></pre>
      
      <h3>Common Error Types</h3>
      
      <ul>
        <li><strong>invalid_request_error:</strong> Request parameters are invalid</li>
        <li><strong>authentication_error:</strong> API key is missing or invalid</li>
        <li><strong>permission_error:</strong> Insufficient permissions</li>
        <li><strong>rate_limit_error:</strong> Too many requests</li>
        <li><strong>api_error:</strong> Internal server error</li>
      </ul>
      
      <h3>HTTP Status Codes</h3>
      
      <ul>
        <li><code>400</code> - Bad Request</li>
        <li><code>401</code> - Unauthorized</li>
        <li><code>403</code> - Forbidden</li>
        <li><code>429</code> - Too Many Requests</li>
        <li><code>500</code> - Internal Server Error</li>
      </ul>
      
      <h3>Best Practices</h3>
      
      <ul>
        <li>Always check the HTTP status code</li>
        <li>Implement exponential backoff for rate limits</li>
        <li>Log errors for debugging</li>
        <li>Provide user-friendly error messages</li>
      </ul>
    `
  }
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState('introduction');

  const currentContent = docContent[activeSection as keyof typeof docContent];

  return (
    <PageLayout 
      title="Documentation" 
      description="A complete collection of documentation explaining how your project, app, or platform works. It includes tutorials, setup guides, code examples, troubleshooting steps, and best practices for developers and users."
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="sticky top-24 bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20'
                        : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 hover:text-white border border-gray-700/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <article className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-lg hover:border-cyan-400/30 transition-colors">
            <h2 className="text-3xl font-bold text-white mb-6">
              {currentContent.title}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-gray-300 
                prose-headings:text-white prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-8 first:prose-headings:mt-0
                prose-h2:text-2xl prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:my-6 prose-ul:space-y-2 prose-li:my-2
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline 
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-cyan-400 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6
                prose-table:my-6 prose-table:border-collapse
                prose-th:border prose-th:border-gray-700/50 prose-th:bg-gray-800/30 prose-th:p-3
                prose-td:border prose-td:border-gray-700/50 prose-td:p-3"
              dangerouslySetInnerHTML={{ __html: currentContent.content }}
            />
          </article>
        </div>
      </div>
    </PageLayout>
  );
}
