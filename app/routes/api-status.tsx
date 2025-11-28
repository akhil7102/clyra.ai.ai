import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';
import { useState, useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'A live status page showing the real-time health of your backend services and APIs. It displays uptime, downtime, maintenance notices, and performance metrics. Users can quickly see if the system is running normally.' },
  ];
};

export const loader = () => json({});

interface Service {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  description: string;
  responseTime?: number;
  uptime: number;
  lastChecked: Date;
}

interface Incident {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  startTime: Date;
  endTime?: Date;
  description: string;
  updates: Array<{
    time: Date;
    message: string;
  }>;
}

const mockServices: Service[] = [
  {
    name: 'Chat API',
    status: 'operational',
    description: 'Core chat completion and conversation API',
    responseTime: 145,
    uptime: 99.9,
    lastChecked: new Date()
  },
  {
    name: 'Authentication',
    status: 'operational',
    description: 'User authentication and authorization services',
    responseTime: 89,
    uptime: 99.95,
    lastChecked: new Date()
  },
  {
    name: 'File Processing',
    status: 'degraded',
    description: 'File upload, processing, and storage services',
    responseTime: 342,
    uptime: 99.7,
    lastChecked: new Date()
  },
  {
    name: 'Database',
    status: 'operational',
    description: 'Primary database and caching services',
    responseTime: 23,
    uptime: 99.99,
    lastChecked: new Date()
  },
  {
    name: 'Model Inference',
    status: 'operational',
    description: 'AI model inference and processing',
    responseTime: 567,
    uptime: 99.8,
    lastChecked: new Date()
  },
  {
    name: 'Webhook Delivery',
    status: 'operational',
    description: 'Webhook delivery and event processing',
    responseTime: 78,
    uptime: 99.85,
    lastChecked: new Date()
  }
];

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'File Processing Delays',
    status: 'monitoring',
    severity: 'medium',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    description: 'We are experiencing slower than usual file processing times. Our team is investigating the issue.',
    updates: [
      {
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
        message: 'Investigating reports of delayed file processing'
      },
      {
        time: new Date(Date.now() - 1 * 60 * 60 * 1000),
        message: 'Identified the issue with storage backend performance'
      },
      {
        time: new Date(Date.now() - 30 * 60 * 1000),
        message: 'Implemented mitigation measures, monitoring performance'
      }
    ]
  },
  {
    id: '2',
    title: 'Scheduled Maintenance Complete',
    status: 'resolved',
    severity: 'low',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    endTime: new Date(Date.now() - 22 * 60 * 60 * 1000),
    description: 'Completed scheduled maintenance on database infrastructure.',
    updates: [
      {
        time: new Date(Date.now() - 24 * 60 * 60 * 1000),
        message: 'Starting scheduled database maintenance'
      },
      {
        time: new Date(Date.now() - 22 * 60 * 60 * 1000),
        message: 'Maintenance completed successfully'
      }
    ]
  }
];

function StatusIndicator({ status }: { status: 'operational' | 'degraded' | 'down' }) {
  const config = {
    operational: {
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800',
      label: 'Operational',
      icon: 'i-ph:check-circle-fill'
    },
    degraded: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      label: 'Degraded Performance',
      icon: 'i-ph:warning-fill'
    },
    down: {
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800',
      label: 'Service Outage',
      icon: 'i-ph:x-circle-fill'
    }
  };

  const statusConfig = config[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}`}>
      <span className={statusConfig.icon}></span>
      <span className="text-sm font-medium">{statusConfig.label}</span>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl border border-accent-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-1">
            {service.name}
          </h3>
          <p className="text-sm text-bolt-elements-textSecondary">
            {service.description}
          </p>
        </div>
        <StatusIndicator status={service.status} />
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-bolt-elements-textSecondary mb-1">Response Time</p>
          <p className="text-bolt-elements-textPrimary font-semibold">
            {service.responseTime ? `${service.responseTime}ms` : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-bolt-elements-textSecondary mb-1">Uptime (30d)</p>
          <p className="text-bolt-elements-textPrimary font-semibold">
            {service.uptime}%
          </p>
        </div>
        <div>
          <p className="text-bolt-elements-textSecondary mb-1">Last Checked</p>
          <p className="text-bolt-elements-textPrimary font-semibold">
            {new Date(service.lastChecked).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  const severityConfig = {
    low: { color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30', label: 'Low' },
    medium: { color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'Medium' },
    high: { color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30', label: 'High' },
    critical: { color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30', label: 'Critical' }
  };

  const statusConfig = {
    investigating: { color: 'text-blue-500', label: 'Investigating' },
    identified: { color: 'text-yellow-500', label: 'Identified' },
    monitoring: { color: 'text-orange-500', label: 'Monitoring' },
    resolved: { color: 'text-green-500', label: 'Resolved' }
  };

  const severity = severityConfig[incident.severity];
  const status = statusConfig[incident.status];

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl border border-accent-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-2">
            {incident.title}
          </h3>
          <p className="text-sm text-bolt-elements-textSecondary mb-3">
            {incident.description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${severity.bgColor} ${severity.color}`}>
          {severity.label} Severity
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.label}
        </span>
        <span className="text-xs text-bolt-elements-textSecondary">
          Started {new Date(incident.startTime).toLocaleString()}
        </span>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-bolt-elements-textPrimary">Updates</h4>
        {incident.updates.map((update, index) => (
          <div key={index} className="border-l-2 border-accent-200 dark:border-accent-700 pl-4">
            <p className="text-xs text-bolt-elements-textSecondary mb-1">
              {new Date(update.time).toLocaleString()}
            </p>
            <p className="text-sm text-bolt-elements-textPrimary">
              {update.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ApiStatus() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Randomly update response times
      setServices(prev => prev.map(service => ({
        ...service,
        responseTime: service.responseTime ? 
          Math.max(50, service.responseTime + Math.floor(Math.random() * 40 - 20)) : 
          undefined,
        lastChecked: new Date()
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const overallStatus = services.some(s => s.status === 'down') ? 'down' :
                       services.some(s => s.status === 'degraded') ? 'degraded' : 'operational';

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');

  return (
    <PageLayout 
      title="API Status" 
      description="A live status page showing the real-time health of your backend services and APIs. It displays uptime, downtime, maintenance notices, and performance metrics. Users can quickly see if the system is running normally."
    >
      {/* Overall Status */}
      <div className="mb-8">
        <div className={`bg-gradient-to-r ${
          overallStatus === 'operational' ? 'from-green-500/20 to-green-600/20 border-green-200/60' :
          overallStatus === 'degraded' ? 'from-yellow-500/20 to-yellow-600/20 border-yellow-200/60' :
          'from-red-500/20 to-red-600/20 border-red-200/60'
        } rounded-2xl border p-6 text-center`}>
          <StatusIndicator status={overallStatus} />
          <p className="text-lg text-bolt-elements-textPrimary mt-2">
            {overallStatus === 'operational' ? 'All systems operational' :
             overallStatus === 'degraded' ? 'Some systems experiencing issues' :
             'Major system outage'}
          </p>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">
            Active Incidents ({activeIncidents.length})
          </h3>
          <div className="space-y-6">
            {activeIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </div>
      )}

      {/* Services Status */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">
          Service Status
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>

      {/* Past Incidents */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">
          Past Incidents
        </h3>
        <div className="space-y-6">
          {incidents.filter(i => i.status === 'resolved').map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>

      {/* Uptime Statistics */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl border border-accent-200/60 p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bolt-elements-textPrimary mb-6">
          Uptime Statistics (Last 30 Days)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">99.9%</div>
            <p className="text-sm text-bolt-elements-textSecondary">Overall Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">142ms</div>
            <p className="text-sm text-bolt-elements-textSecondary">Avg Response Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">0</div>
            <p className="text-sm text-bolt-elements-textSecondary">Outages</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">2</div>
            <p className="text-sm text-bolt-elements-textSecondary">Incidents</p>
          </div>
        </div>
      </div>

      {/* Subscribe to Updates */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-[#4DA8FF]/10 to-[#2C8CFF]/10 rounded-2xl border border-accent-200/60 p-8">
          <h3 className="text-xl font-bold text-bolt-elements-textPrimary mb-4">
            Subscribe to Status Updates
          </h3>
          <p className="text-bolt-elements-textSecondary mb-6">
            Get notified about service disruptions and scheduled maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-accent-200/60 bg-white/80 dark:bg-gray-900/80 text-bolt-elements-textPrimary placeholder-bolt-elements-textSecondary focus:outline-none focus:border-[#4DA8FF]"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
