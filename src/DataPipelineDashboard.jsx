import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  BarChart, Bar, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart,
} from 'recharts';
import {
  FaDatabase, FaClipboardCheck, FaCopy, FaMagic, FaClock, FaExclamationTriangle,
  FaChartLine, FaFilter, FaSearch, FaSyncAlt, FaDownload, FaUpload, FaUsersCog,
  FaNetworkWired, FaCogs, FaServer, FaCloudUploadAlt,
  FaChartBar
} from 'react-icons/fa';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { AlertTriangle, TrendingUp, List } from 'lucide-react';
import { Activity, RefreshCw } from 'lucide-react';
import { FaCog } from 'react-icons/fa';



const dummyDataIngestion = [
  { name: 'File A', records: 1200, size: 450, processingTime: 30, errorRate: 0.5 },
  { name: 'File B', records: 800, size: 300, processingTime: 20, errorRate: 0.3 },
  { name: 'File C', records: 1500, size: 600, processingTime: 40, errorRate: 0.7 },
  { name: 'File D', records: 1000, size: 400, processingTime: 25, errorRate: 0.4 },
  { name: 'File E', records: 2000, size: 800, processingTime: 50, errorRate: 0.6 },
  { name: 'File F', records: 1800, size: 700, processingTime: 45, errorRate: 0.5 },
  { name: 'File G', records: 2200, size: 850, processingTime: 55, errorRate: 0.8 },
  { name: 'File H', records: 1600, size: 550, processingTime: 35, errorRate: 0.4 },
];

const dummyDataVolume = [
  { date: '2023-01-01', volume: 5000, forecast: 5200, anomaly: false },
  { date: '2023-01-02', volume: 5500, forecast: 5400, anomaly: false },
  { date: '2023-01-03', volume: 4800, forecast: 5100, anomaly: true },
  { date: '2023-01-04', volume: 6000, forecast: 5800, anomaly: false },
  { date: '2023-01-05', volume: 5200, forecast: 5300, anomaly: false },
  { date: '2023-01-06', volume: 5800, forecast: 5600, anomaly: false },
  { date: '2023-01-07', volume: 6200, forecast: 5900, anomaly: true },
];

const dummyDataSourceDistribution = [
  { name: 'Source A', value: 400, growth: 5, reliability: 95 },
  { name: 'Source B', value: 300, growth: -2, reliability: 88 },
  { name: 'Source C', value: 300, growth: 8, reliability: 92 },
  { name: 'Source D', value: 200, growth: 3, reliability: 90 },
  { name: 'Source E', value: 250, growth: 1, reliability: 93 },
  { name: 'Source F', value: 180, growth: -1, reliability: 87 },
];

const dummyDataDuplicates = [
  { source: 'Source A', duplicates: 50, percentage: 5, falsePositives: 2, detectionAccuracy: 98 },
  { source: 'Source B', duplicates: 30, percentage: 3, falsePositives: 1, detectionAccuracy: 99 },
  { source: 'Source C', duplicates: 40, percentage: 4, falsePositives: 3, detectionAccuracy: 97 },
  { source: 'Source D', duplicates: 20, percentage: 2, falsePositives: 1, detectionAccuracy: 99 },
  { source: 'Source E', duplicates: 35, percentage: 3.5, falsePositives: 2, detectionAccuracy: 98 },
  { source: 'Source F', duplicates: 25, percentage: 2.5, falsePositives: 1, detectionAccuracy: 99 },
];

const dummyDataDuplicateResolution = [
  { name: 'Exact Match', value: 60, efficiency: 95, processingTime: 0.5 },
  { name: 'Fuzzy Match', value: 30, efficiency: 85, processingTime: 1.2 },
  { name: 'Manual Review', value: 10, efficiency: 99, processingTime: 5 },
];

const dummyDataDeduplication = [
  { name: 'Before', records: 10000, uniqueRecords: 9500, dataSizeGB: 5, processingTimeMin: 0 },
  { name: 'After', records: 9700, uniqueRecords: 9700, dataSizeGB: 4.85, processingTimeMin: 15 },
];

const dummyDataMasteredRecords = [
  { date: '2023-01-01', records: 8000, confidence: 85, completeness: 90, accuracy: 88 },
  { date: '2023-01-02', records: 8500, confidence: 87, completeness: 92, accuracy: 90 },
  { date: '2023-01-03', records: 9000, confidence: 90, completeness: 94, accuracy: 93 },
  { date: '2023-01-04', records: 9200, confidence: 92, completeness: 95, accuracy: 94 },
  { date: '2023-01-05', records: 9500, confidence: 94, completeness: 97, accuracy: 96 },
  { date: '2023-01-06', records: 9800, confidence: 95, completeness: 98, accuracy: 97 },
  { date: '2023-01-07', records: 10000, confidence: 96, completeness: 99, accuracy: 98 },
];

const dummyDataAttributeCompletion = [
  { name: 'Name', before: 95, after: 100, improvement: 5, criticality: 'High' },
  { name: 'Email', before: 80, after: 95, improvement: 15, criticality: 'High' },
  { name: 'Phone', before: 70, after: 90, improvement: 20, criticality: 'Medium' },
  { name: 'Address', before: 60, after: 85, improvement: 25, criticality: 'Medium' },
  { name: 'Date of Birth', before: 75, after: 92, improvement: 17, criticality: 'Low' },
  { name: 'Customer ID', before: 100, after: 100, improvement: 0, criticality: 'Critical' },
];

const dummyDataQualityImprovement = [
  { attribute: 'Completeness', before: 70, after: 95, impact: 'High' },
  { attribute: 'Consistency', before: 60, after: 90, impact: 'Medium' },
  { attribute: 'Accuracy', before: 75, after: 95, impact: 'High' },
  { attribute: 'Timeliness', before: 80, after: 100, impact: 'Low' },
  { attribute: 'Validity', before: 65, after: 92, impact: 'Medium' },
  { attribute: 'Uniqueness', before: 85, after: 98, impact: 'High' },
];

const dummyDataProcessingTime = [
  { stage: 'Ingestion', time: 120, optimizedTime: 90, bottleneck: 'I/O' },
  { stage: 'Cleaning', time: 180, optimizedTime: 150, bottleneck: 'CPU' },
  { stage: 'Deduplication', time: 90, optimizedTime: 75, bottleneck: 'Memory' },
  { stage: 'Mastering', time: 150, optimizedTime: 120, bottleneck: 'CPU' },
  { stage: 'Validation', time: 60, optimizedTime: 45, bottleneck: 'I/O' },
];

const dummyDataThroughput = [
  { time: '00:00', throughput: 100, capacity: 150, queueLength: 10 },
  { time: '04:00', throughput: 120, capacity: 150, queueLength: 5 },
  { time: '08:00', throughput: 80, capacity: 150, queueLength: 30 },
  { time: '12:00', throughput: 150, capacity: 150, queueLength: 0 },
  { time: '16:00', throughput: 130, capacity: 150, queueLength: 8 },
  { time: '20:00', throughput: 110, capacity: 150, queueLength: 15 },
];

const dummyDataResourceUtilization = [
  { time: '00:00', cpu: 50, memory: 60, io: 30, network: 40 },
  { time: '04:00', cpu: 70, memory: 65, io: 40, network: 55 },
  { time: '08:00', cpu: 60, memory: 70, io: 35, network: 50 },
  { time: '12:00', cpu: 80, memory: 75, io: 50, network: 70 },
  { time: '16:00', cpu: 75, memory: 80, io: 45, network: 65 },
  { time: '20:00', cpu: 65, memory: 70, io: 40, network: 60 },
];

const dummyDataErrorCounts = [
  { type: 'Ingestion Errors', count: 50, impact: 'Medium', resolutionTime: 30 },
  { type: 'Processing Errors', count: 30, impact: 'High', resolutionTime: 60 },
  { type: 'Validation Errors', count: 20, impact: 'Low', resolutionTime: 15 },
  { type: 'System Errors', count: 10, impact: 'Critical', resolutionTime: 120 },
  { type: 'Data Format Errors', count: 15, impact: 'Medium', resolutionTime: 45 },
  { type: 'Timeout Errors', count: 5, impact: 'High', resolutionTime: 90 },];

const dummyDataErrorTrends = [
  { date: '2023-01-01', errors: 25, resolved: 20, openIssues: 5 },
  { date: '2023-01-02', errors: 20, resolved: 18, openIssues: 7 },
  { date: '2023-01-03', errors: 30, resolved: 25, openIssues: 12 },
  { date: '2023-01-04', errors: 15, resolved: 15, openIssues: 12 },
  { date: '2023-01-05', errors: 22, resolved: 20, openIssues: 14 },
  { date: '2023-01-06', errors: 18, resolved: 16, openIssues: 16 },
  { date: '2023-01-07', errors: 28, resolved: 24, openIssues: 20 },
];

const dummyDataFailedRecords = [
  { id: 1, recordId: 'REC001', errorMessage: 'Invalid format', stage: 'Ingestion', timestamp: '2023-01-01 10:30:00', severity: 'High' },
  { id: 2, recordId: 'REC002', errorMessage: 'Missing required field', stage: 'Cleaning', timestamp: '2023-01-01 11:45:00', severity: 'Medium' },
  { id: 3, recordId: 'REC003', errorMessage: 'Duplicate entry', stage: 'Deduplication', timestamp: '2023-01-02 09:15:00', severity: 'Low' },
  { id: 4, recordId: 'REC004', errorMessage: 'Data inconsistency', stage: 'Mastering', timestamp: '2023-01-02 14:20:00', severity: 'High' },
  { id: 5, recordId: 'REC005', errorMessage: 'Validation failed', stage: 'Processing', timestamp: '2023-01-03 16:10:00', severity: 'Medium' },
  { id: 6, recordId: 'REC006', errorMessage: 'Timeout error', stage: 'Ingestion', timestamp: '2023-01-03 18:30:00', severity: 'High' },
  { id: 7, recordId: 'REC007', errorMessage: 'Data type mismatch', stage: 'Cleaning', timestamp: '2023-01-04 11:05:00', severity: 'Low' },
  { id: 8, recordId: 'REC008', errorMessage: 'Incomplete record', stage: 'Mastering', timestamp: '2023-01-04 13:40:00', severity: 'Medium' },
];

// Color constants
const COLORS = ['#00796B', '#26A69A', '#4DB6AC', '#80CBC4', '#B2DFDB', '#E0F2F1'];
const ACCENT_COLORS = ['#FFC107', '#FF9800', '#FF5722', '#F44336', '#E91E63', '#9C27B0'];

// Utility functions


const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMM dd, yyyy');
};
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const useAnimatedValue = (targetValue, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;
      if (progress < 1) {
        setValue(Math.min(targetValue * progress, targetValue));
        requestAnimationFrame(animate);
      } else {
        setValue(targetValue);
      }
    };
    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  return value;
};
// Enhanced KPI Card component
const KPICard = ({ icon, title, value, description, trend, trendValue }) => {
  const animatedValue = useAnimatedValue(parseFloat(value.replace(/,/g, '')));
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
  }, [value, controls]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-2 border-teal-400 hover:border-teal-600 transition-colors duration-300"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      animate={controls}
    >
      <div className="text-teal-600 text-5xl bg-teal-100 p-4 rounded-full">{icon}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <motion.p
          className="text-3xl font-extrabold text-teal-600 mb-1"
          key={value}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {typeof value === 'number' ? formatNumber(Math.round(animatedValue)) : value}
        </motion.p>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        {trend && (
          <motion.div
            className="text-sm text-teal-600 font-semibold flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {trend === 'up' ? '▲' : '▼'}
            <span className="ml-1">{trendValue}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const DataPipelineHeader = () => {
  return (
    // <motion.div
    //   initial={{ opacity: 0, y: -50 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8 }}
    //   className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white p-8 rounded-2xl shadow-2xl overflow-hidden relative"
    // >
    //   <div className="absolute inset-0 bg-teal-500 opacity-10">
    //     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    //       <defs>
    //         <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
    //           <circle cx="20" cy="20" r="1.5" fill="#fff" />
    //         </pattern>
    //       </defs>
    //       <rect width="100%" height="100%" fill="url(#pattern)" />
    //     </svg>
    //   </div>

    <div className="relative z-10">
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center space-x-4">
          <img
            src="/favicon.ico"  // This points to the logo in the public folder
            alt="Logo"
            className="h-20 w-auto"  // Adjust the height to be slightly smaller
          />
        </div>


        {/* <motion.h1 
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200"
          >
            Data Pipeline Dashboard
          </motion.h1> */}
        {/* <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-teal-300 text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 hover:bg-white/20"
            >
              <FaSyncAlt className="inline-block mr-2" /> Refresh Data
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-teal-300 text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 hover:bg-white/20"
            >
              <FaDownload className="inline-block mr-2" /> Export Report
            </motion.button>
          </div> */}
      </div>

      {/* <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-teal-100 mb-10 font-light"
        >
          Unveiling the power of your data processing journey.
        </motion.p> */}

      {/* <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-teal-400/30 p-8 rounded-xl shadow-inner"
        >
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <FaDatabase className="text-teal-200 h-12 w-12" />
              <FaChartLine className="text-teal-200 h-12 w-12" />
              <FaCog className="text-teal-200 h-12 w-12 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">The Data Odyssey</h2>
              <p className="text-teal-100 text-lg">Embark on a journey from raw data to actionable insights.</p>
            </div>
          </div>
        </motion.div> */}
    </div>
    // </motion.div>
  );
};



const DateRangeSelect = ({ handleDateRangeChange }) => {
  return (
    <div className="mb-8 mt-4  flex justify-end">
      <div className="relative inline-block">
        <select
          className="appearance-none bg-teal-50 border-2 border-teal-500 rounded-lg shadow-sm px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-teal-800 font-medium transition duration-150 ease-in-out hover:bg-teal-100"
          onChange={(e) => handleDateRangeChange(JSON.parse(e.target.value))}
        >
          <option value={JSON.stringify({ start: '2023-01-01', end: '2023-01-07' })}>Last 7 days</option>
          <option value={JSON.stringify({ start: '2023-01-01', end: '2023-01-31' })}>Last 30 days</option>
          <option value={JSON.stringify({ start: '2023-01-01', end: '2023-03-31' })}>Last 90 days</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-700">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};
// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 border border-teal-400 max-w-xs"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-lg">{label}</h3>
          <Sparkles className="text-yellow-300" size={20} />
        </div>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <motion.div
              key={`item-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white bg-opacity-20 rounded-md p-2"
            >
              <span className="text-teal-100 font-medium">{entry.name}</span>
              <span className="text-white font-bold">{entry.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
  return null;
};
const TabItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${isActive ? 'text-teal-900' : 'text-teal-700 hover:text-teal-900'
      }`}
  >
    <div className="flex items-center space-x-2">
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-full"
        layoutId="activeTab"
        initial={false}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    )}
  </button>
);
const DataPipelineTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: 'Overview', icon: FaChartBar },
    // { label: 'Data Ingestion', icon: FaCloudUploadAlt },
    // { label: 'Data Cleaning', icon: FaFilter },
    // { label: 'Deduplication', icon: FaCopy },
    // { label: 'Data Mastering', icon: FaClipboardCheck },
    // { label: 'Performance', icon: FaChartLine },
    // { label: 'Errors', icon: FaExclamationTriangle },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-100 to-teal-200 p-1 rounded-xl shadow-lg mb-4">
      <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-2 flex space-x-2 overflow-x-auto">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="p-3 mt-10">
      <div className="bg-teal-600 rounded-full p-2 flex items-center justify-between shadow-lg border-4 border-teal-800">
        <div className="flex items-center space-x-3 ml-4">
          <div className="bg-white p-2 rounded-full">
            <Activity className="h-5 w-5 text-teal-600" />
          </div>
          <span className="font-bold text-white text-sm">Data Pipeline Dashboard
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-teal-700 py-1 px-3 rounded-full">
          <RefreshCw className="h-4 w-4 text-teal-200 animate-spin" />
          <span className="text-xs text-teal-100">Updated: {new Date().toLocaleTimeString()}</span>
        </div>

        <div className="text-xs text-teal-100 mr-4">
          © 2024 Data Pipeline Dashboard
        </div>
      </div>
    </footer>
  );
};

const MovingDots = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 184, 166, 0.5)'; // Teal color with transparency
        ctx.fill();
      });
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};
// Main Dashboard component
export default function Component() {
  const [activeTab, setActiveTab] = useState(0);
  // eslint-disable-next-line 
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-01-07' });


  return (
    <div className="p-8 bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
      <DataPipelineHeader />

      {/* Date Range Selector */}
      <DateRangeSelect />

      {/* KPI Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={<FaDatabase />}
          title="Total Records Processed"
          value="1,234,567"
          description="Across all pipeline stages"
          trend="up"
          trendValue="5.2%"
        />
        <KPICard
          icon={<FaClipboardCheck />}
          title="Pipeline Status"
          value="Running"
          description="Current processing status"
          color="green"
        />
        <KPICard
          icon={<FaCopy />}
          title="Duplicates Removed"
          value="12,345"
          description="Total duplicates identified and removed"
          trend="down"
          trendValue="2.1%"
          color="blue"
        />
        <KPICard
          icon={<FaMagic />}
          title="Mastered Records"
          value="987,654"
          description="Total number of mastered records created"
          trend="up"
          trendValue="3.7%"
          color="purple"
        />
        <KPICard
          icon={<FaClock />}
          title="Avg. Processing Time"
          value="2h 34m"
          description="Average time for end-to-end processing"
          trend="down"
          trendValue="5 min"
          color="orange"
        />
        <KPICard
          icon={<FaExclamationTriangle />}
          title="Total Errors"
          value="1,234"
          description="Errors encountered across all stages"
          trend="down"
          trendValue="0.8%"
          color="red"
        />
        <KPICard
          icon={<FaChartLine />}
          title="Data Quality Score"
          value="92%"
          description="Overall data quality after processing"
          trend="up"
          trendValue="1.5%"
          color="green"
        />
        <KPICard
          icon={<FaFilter />}
          title="Filtered Records"
          value="45,678"
          description="Records filtered out during processing"
          trend="up"
          trendValue="0.3%"
          color="yellow"
        />
        <KPICard
          icon={<FaSearch />}
          title="Unique Entities"
          value="789,012"
          description="Total unique entities after deduplication"
          trend="up"
          trendValue="2.8%"
        />
        <KPICard
          icon={<FaSyncAlt />}
          title="Data Refresh Rate"
          value="15 min"
          description="Frequency of data updates"
          color="blue"
        />
        <KPICard
          icon={<FaDownload />}
          title="Data Volume"
          value="500 GB"
          description="Total data processed"
          trend="up"
          trendValue="50 GB"
          color="purple"
        />
        <KPICard
          icon={<FaUpload />}
          title="Data Sources"
          value="25"
          description="Number of active data sources"
          trend="up"
          trendValue="2"
          color="green"
        />
        <KPICard
          icon={<FaUsersCog />}
          title="User Interactions"
          value="5,678"
          description="Total user interactions with the pipeline"
          trend="up"
          trendValue="12%"
          color="orange"
        />
        <KPICard
          icon={<FaNetworkWired />}
          title="API Calls"
          value="1.2M"
          description="Total API calls to the pipeline"
          trend="up"
          trendValue="8%"
          color="teal"
        />
        <KPICard
          icon={<FaCogs />}
          title="Automation Rate"
          value="95%"
          description="Percentage of automated processes"
          trend="up"
          trendValue="2%"
          color="blue"
        />
        <KPICard
          icon={<FaServer />}
          title="Server Load"
          value="65%"
          description="Average server utilization"
          trend="down"
          trendValue="5%"
          color="red"
        />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={<FaDatabase />}
          title="Total Records Processed"
          value="1,234,567"
          description="Across all pipeline stages"
          trend="up"
          trendValue="5.2%"
        />
        <KPICard
          icon={<FaCopy />}
          title="Duplicates Removed"
          value="12,345"
          description="Total duplicates identified and removed"
          trend="down"
          trendValue="2.1%"
          color="blue"
        />
        <KPICard
          icon={<FaMagic />}
          title="Mastered Records"
          value="987,654"
          description="Total number of mastered records created"
          trend="up"
          trendValue="3.7%"
          color="purple"
        />
        <KPICard
          icon={<FaExclamationTriangle />}
          title="Total Errors"
          value="1,234"
          description="Errors encountered across all stages"
          trend="down"
          trendValue="0.8%"
          color="red"
        />
      </div>


      {/* Tabs for different sections */}
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <DataPipelineTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabPanel>
              <OverviewTab dateRange={dateRange} />
            </TabPanel>
            {/* <TabPanel>
              <DataIngestionTab dateRange={dateRange} />
            </TabPanel>
            <TabPanel>
              <DataCleaningTab dateRange={dateRange} />
            </TabPanel>
            <TabPanel>
              <DeduplicationTab dateRange={dateRange} />
            </TabPanel>
            <TabPanel>
              <DataMasteringTab dateRange={dateRange} />
            </TabPanel>
            <TabPanel>
              <PerformanceTab dateRange={dateRange} />
            </TabPanel>
            <TabPanel>
              <ErrorsTab dateRange={dateRange} />
            </TabPanel> */}
          </motion.div>
        </AnimatePresence>
      </Tabs>
      <Footer />
    </div>
  );
}
const dummyDataNewPlot = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 150000 },
  { name: 'Mar', value: 200000 },
  { name: 'Apr', value: 250000 },
  { name: 'May', value: 300000 },
  { name: 'Jun', value: 350000 },
  { name: 'Jul', value: 400000 },
  { name: 'Aug', value: 450000 },
  { name: 'Sep', value: 500000 },
];
const dummyDataPieChart = [
  { name: 'Ingestion', value: 40 },
  { name: 'Validation', value: 25 },
  { name: 'Cleaning', value: 20 },
  { name: 'Deduplication', value: 10 },
  { name: 'Mastering', value: 5 },
];

const dummyDataScatterPlot = [
  { x: 100, y: 0.8 },
  { x: 200, y: 0.6 },
  { x: 300, y: 0.9 },
  { x: 400, y: 0.7 },
  { x: 500, y: 0.85 },
  { x: 600, y: 0.65 },
  { x: 700, y: 0.95 },
];

const dummyDataLineChart = [
  { month: 'Jan', growth: 10 },
  { month: 'Feb', growth: 15 },
  { month: 'Mar', growth: 20 },
  { month: 'Apr', growth: 25 },
  { month: 'May', growth: 30 },
  { month: 'Jun', growth: 35 },
  { month: 'Jul', growth: 40 },
  { month: 'Aug', growth: 45 },
  { month: 'Sep', growth: 50 },
];

// Overview Tab
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);
const PipelineProcessingStatus = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const stages = [
    { name: 'Data Ingestion', completed: true },
    { name: 'Data Cleaning', completed: true },
    { name: 'Deduplication', completed: true },
    { name: 'Record Mastering', completed: false },
    { name: 'Error Handling', completed: false }
  ];

  return (
    <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Pipeline Processing Status</h2>
        <div className="mb-4">
          <Progress value={75} className="h-2" />
        </div>
        <div className="flex justify-between text-sm text-teal-700">
          <span>75% Complete</span>
          <span>Estimated: 2h 15m</span>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition duration-300 shadow-md"
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2"
          >
            {stages.map((stage, index) => (
              <div
                key={index}
                className="flex items-center p-2 rounded-lg bg-white bg-opacity-60 backdrop-blur-sm"
              >
                <span
                  className={`text-2xl font-bold mr-2 ${stage.completed ? 'text-teal-600' : 'text-gray-400'
                    }`}
                >
                  {stage.completed ? <CheckIcon /> : <MinusIcon />}
                </span>
                <span className="text-teal-800 flex-1">{stage.name}</span>
                <span
                  className={`text-sm font-medium ${stage.completed ? 'text-teal-600' : 'text-gray-500'
                    }`}
                >
                  {stage.completed ? 'Completed' : 'Remaining'}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </Card>
  );
};

// Simple Progress component
const Progress = ({ value, className, indicatorClassName }) => (
  <div className={`w-full bg-teal-200 rounded-full ${className}`}>
    <div
      className={`bg-teal-600 rounded-full h-full ${indicatorClassName}`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
);
// const OverviewTab = ({ dateRange }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 0.5 }}
//     className="grid grid-cols-1 md:grid-cols-3 gap-8"
//   >
//     {/* Pipeline Processing Status */}
//     <PipelineProcessingStatus />

//     {/* Summary Statistics */}
//     <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 overflow-hidden">
//       <div className="p-6 relative">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Summary Statistics</h2>
//         <div className="space-y-4 relative z-10">
//           {[
//             { label: "Total Records Ingested", value: "1,500,000" },
//             { label: "Records After Cleaning", value: "1,450,000" },
//             { label: "Duplicates Removed", value: "50,000" },
//             { label: "Mastered Records Created", value: "1,400,000" },
//             { label: "Total Errors Encountered", value: "5,000", error: true }
//           ].map((item, index) => (
//             <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-white bg-opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md">
//               <span className="text-teal-700">{item.label}</span>
//               <span className={`font-semibold ${item.error ? 'text-red-600' : 'text-teal-600'}`}>{item.value}</span>
//             </div>
//           ))}
//         </div>
//         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 rounded-full filter blur-3xl opacity-20 -z-10"></div>
//       </div>
//     </Card>

//     {/* Processing Time by Stage */}
//     <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Processing Time by Stage</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={dummyDataProcessingTime}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="stage" tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <YAxis tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="time" name="Current Time" fill="#38b2ac" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Data Quality Improvement */}
//     <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Data Quality Improvement</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <RadarChart outerRadius={90} data={dummyDataQualityImprovement}>
//             <PolarGrid stroke="#CBD5E0" />
//             <PolarAngleAxis dataKey="attribute" tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <Radar name="Before" dataKey="before" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//             <Radar name="After" dataKey="after" stroke="#4fd1c5" fill="#4fd1c5" fillOpacity={0.6} />
//             <Legend />
//             <Tooltip content={<CustomTooltip />} />
//           </RadarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Overall Pipeline Performance */}
//     <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Overall Pipeline Performance</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <ComposedChart data={dummyDataMasteredRecords}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <YAxis yAxisId="left" orientation="left" stroke="#38b2ac" tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <YAxis yAxisId="right" orientation="right" stroke="#4fd1c5" tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar yAxisId="left" dataKey="records" name="Mastered Records" fill="#38b2ac" />
//             <Line yAxisId="right" type="monotone" dataKey="confidence" name="Confidence (%)" stroke="#4fd1c5" />
//             <Area yAxisId="right" type="monotone" dataKey="completeness" name="Completeness (%)" fill="#81e6d9" stroke="#4fd1c5" />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Records Growth Over Time */}
//     <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Records Growth Over Time</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={dummyDataNewPlot}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="name" tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <YAxis tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="value" name="Records" fill="#38b2ac" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
// <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Pipeline Stage Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={dummyDataPieChart}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={100}
//               fill="#8884d8"
//               paddingAngle={5}
//               dataKey="value"
//             >
//               {dummyDataPieChart.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Data Quality vs. Record Count */}
//     <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Data Quality vs. Record Count</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//             <CartesianGrid />
//             <XAxis type="number" dataKey="x" name="Record Count" unit="k" />
//             <YAxis type="number" dataKey="y" name="Quality Score" unit="" />
//             <ZAxis type="number" dataKey="x" range={[60, 400]} name="Processing Time" unit="s" />
//             <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
//             <Scatter name="Data Quality" data={dummyDataScatterPlot} fill="#38b2ac" />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Monthly Growth Trend */}
//     <Card className="border border-teal-200">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Monthly Growth Trend</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={dummyDataLineChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Line type="monotone" dataKey="growth" stroke="#38b2ac" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   </motion.div>

// );

const OverviewTab = ({ dateRange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    {/* Pipeline Processing Status */}
    <PipelineProcessingStatus />

    {/* Summary Statistics */}
    <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 overflow-hidden ring-1 ring-teal-300">
      <div className="p-6 relative">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Summary Statistics</h2>
        <div className="space-y-4 relative z-10">
          {[
            { label: "Total Records Ingested", value: "1,500,000" },
            { label: "Records After Cleaning", value: "1,450,000" },
            { label: "Duplicates Removed", value: "50,000" },
            { label: "Mastered Records Created", value: "1,400,000" },
            { label: "Total Errors Encountered", value: "5,000", error: true }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-white bg-opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md">
              <span className="text-teal-700">{item.label}</span>
              <span className={`font-semibold ${item.error ? 'text-red-600' : 'text-teal-600'}`}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </div>
    </Card>



    {/* Records and File Size Distribution */}
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200 ring-1 ring-teal-300">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Records and File Size Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataIngestion}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="records" name="Records" fill="#00796B" />
          <Bar yAxisId="right" dataKey="size" name="File Size (KB)" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Data Source Distribution */}
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200 ring-1 ring-teal-300">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Data Source Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dummyDataSourceDistribution}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {dummyDataSourceDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Records Before and After Cleaning */}
    <ChartCard title="Records Before and After Cleaning" className="ring-1 ring-teal-300">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataCleaning}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="records" name="Records" fill="#00796B" />
          <Bar yAxisId="right" dataKey="dataQuality" name="Data Quality (%)" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* Data Quality Issues Found */}
    <ChartCard title="Data Quality Issues Found" className="ring-1 ring-teal-300">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataQualityIssues} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="count" name="Issue Count" fill="#00796B">
            {dummyDataQualityIssues.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>


    {/* Number of Duplicates Found */}
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-teal-200 ring-1 ring-teal-300">
      <h2 className="text-3xl font-semibold text-teal-800 mb-6">Number of Duplicates Found</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dummyDataDuplicates}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="duplicates" name="Duplicates" fill="#00796B" />
          <Bar yAxisId="right" dataKey="percentage" name="Percentage (%)" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </div>


    {/* Records Before and After Deduplication */}
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-teal-200 ring-1 ring-teal-300">
      <h2 className="text-3xl font-semibold text-teal-800 mb-6">Records Before and After Deduplication</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dummyDataDeduplication}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="records" name="Total Records" fill="#00796B" />
          <Bar dataKey="uniqueRecords" name="Unique Records" fill="#4DB6AC" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* Processing Time by Stage */}
    <Card className="border border-teal-200 ring-1 ring-teal-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Processing Time by Stage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyDataProcessingTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="stage" tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <YAxis tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="time" name="Current Time" fill="#38b2ac" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>

    {/* Pipeline Stage Distribution */}
    <Card className="border border-teal-200 ring-1 ring-teal-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Pipeline Stage Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dummyDataPieChart}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dummyDataPieChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
    {/* Error Counts by Type */}
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300 ring-1 ring-teal-300 col-span-2">
      <h2 className="text-3xl font-semibold text-red-800 mb-6">Error Trends Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dummyDataErrorCounts}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FED7D7" />
          <XAxis dataKey="type" stroke="#9B2C2C" />
          <YAxis stroke="#9B2C2C" />
          <Tooltip contentStyle={{ backgroundColor: '#FFF5F5', border: '1px solid #FC8181' }} />
          <Legend />
          <Bar dataKey="count" name="Error Count" fill="#FC8181" radius={[8, 8, 0, 0]}>
            {dummyDataErrorCounts.map((entry, index) => (
              <motion.rect
                key={`bar-${index}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

  </motion.div>
);

const dummyDataQuality = [
  { date: '2023-01-01', completeness: 95, accuracy: 98, consistency: 92 },
  { date: '2023-02-01', completeness: 97, accuracy: 99, consistency: 95 },
  { date: '2023-03-01', completeness: 94, accuracy: 97, consistency: 93 },
  { date: '2023-04-01', completeness: 98, accuracy: 99, consistency: 96 },
  { date: '2023-05-01', completeness: 96, accuracy: 98, consistency: 94 },
];

const dummyDataProcessingTimes = [
  { name: 'ETL', time: 30 },
  { name: 'Validation', time: 15 },
  { name: 'Indexing', time: 20 },
  { name: 'Aggregation', time: 25 },
];

const dummyDataErrorRate = [
  { date: '2023-01-01', rate: 2.5 },
  { date: '2023-02-01', rate: 2.2 },
  { date: '2023-03-01', rate: 1.8 },
  { date: '2023-04-01', rate: 1.5 },
  { date: '2023-05-01', rate: 1.2 },
];

// Data Ingestion Tab
const DataIngestionTab = ({ dateRange }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Records and File Size Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataIngestion}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="records" name="Records" fill="#00796B" />
          <Bar yAxisId="right" dataKey="size" name="File Size (KB)" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Data Volume Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyDataVolume}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="volume" name="Actual Volume" stroke="#00796B" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="forecast" name="Forecast Volume" stroke="#FFC107" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Data Source Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dummyDataSourceDistribution}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {dummyDataSourceDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Data Source Growth Rates</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataSourceDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="growth" name="Growth (%)" fill="#00796B">
            {dummyDataSourceDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.growth > 0 ? '#4CAF50' : '#F44336'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Ingestion Performance Scatter</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="size" name="File Size (KB)" unit="KB" />
          <YAxis dataKey="processingTime" name="Processing Time" unit="s" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Files" data={dummyDataIngestion} fill="#00796B" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Data Source Reliability Radar</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={dummyDataSourceDistribution}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Reliability" dataKey="reliability" stroke="#00796B" fill="#00796B" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Data Quality Metrics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dummyDataQuality}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="completeness" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="accuracy" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="consistency" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Processing Time Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataProcessingTimes} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" name="Time (seconds)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">Error Rate Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyDataErrorRate}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="rate" name="Error Rate (%)" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
const dummyDataCleaning = [
  { name: 'Dataset A', records: 1000, dataQuality: 75 },
  { name: 'Dataset B', records: 1500, dataQuality: 82 },
  { name: 'Dataset C', records: 800, dataQuality: 68 },
  { name: 'Dataset D', records: 1200, dataQuality: 79 },
];

const dummyDataQualityIssues = [
  { name: 'Missing Values', count: 150, impact: 8, severity: 'High', resolutionTime: 2.5 },
  { name: 'Duplicate Records', count: 80, impact: 6, severity: 'Medium', resolutionTime: 1.5 },
  { name: 'Inconsistent Formats', count: 120, impact: 7, severity: 'High', resolutionTime: 3 },
  { name: 'Outliers', count: 50, impact: 5, severity: 'Low', resolutionTime: 1 },
  { name: 'Invalid Data', count: 90, impact: 7, severity: 'Medium', resolutionTime: 2 },
];

const dummyDataErrorRates = [
  { date: '2023-01-01', rate: 5.2, threshold: 3, criticalErrors: 12, warningErrors: 28 },
  { date: '2023-02-01', rate: 4.8, threshold: 3, criticalErrors: 10, warningErrors: 25 },
  { date: '2023-03-01', rate: 4.1, threshold: 3, criticalErrors: 8, warningErrors: 22 },
  { date: '2023-04-01', rate: 3.7, threshold: 3, criticalErrors: 7, warningErrors: 20 },
  { date: '2023-05-01', rate: 3.2, threshold: 3, criticalErrors: 5, warningErrors: 18 },
];


const dummyDataCleaningMethods = [
  { name: 'Manual Review', efficiency: 75, timeSpent: 20 },
  { name: 'Automated Scripts', efficiency: 90, timeSpent: 5 },
  { name: 'Machine Learning', efficiency: 85, timeSpent: 10 },
  { name: 'Data Validation Rules', efficiency: 80, timeSpent: 15 },
];

const dummyDataSourceReliability = [
  { name: 'Source A', reliability: 90 },
  { name: 'Source B', reliability: 75 },
  { name: 'Source C', reliability: 85 },
  { name: 'Source D', reliability: 70 },
];

const dummyDataCostSavings = [
  { month: 'Jan', savings: 5000 },
  { month: 'Feb', savings: 7000 },
  { month: 'Mar', savings: 6500 },
  { month: 'Apr', savings: 8000 },
  { month: 'May', savings: 9500 },
];

const DataCleaningTab = ({ dateRange }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <ChartCard title="Records Before and After Cleaning">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataCleaning}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="records" name="Records" fill="#00796B" />
          <Bar yAxisId="right" dataKey="dataQuality" name="Data Quality (%)" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Data Quality Issues Found">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataQualityIssues} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="count" name="Issue Count" fill="#00796B">
            {dummyDataQualityIssues.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Error Rates Over Time">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyDataErrorRates}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="rate" name="Error Rate (%)" stroke="#00796B" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="threshold" name="Threshold" stroke="#FFC107" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Data Quality Issue Severity">
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="count" name="Issue Count" />
          <YAxis dataKey="impact" name="Impact Score" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Data Quality Issues" data={dummyDataQualityIssues} fill="#00796B">
            {dummyDataQualityIssues.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.severity === 'High' ? '#F44336' : entry.severity === 'Medium' ? '#FFC107' : '#4CAF50'} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Data Cleaning Impact">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={dummyDataCleaning}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Before Cleaning" dataKey="dataQuality" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="After Cleaning" dataKey="completeness" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Data Cleaning Efficiency">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={dummyDataQualityIssues}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="count" name="Issue Count" fill="#00796B" />
          <Line yAxisId="right" type="monotone" dataKey="resolutionTime" name="Resolution Time (h)" stroke="#FFC107" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Cleaning Methods Comparison">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dummyDataCleaningMethods}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="efficiency" name="Efficiency (%)" stroke="#00796B" fill="#00796B" />
          <Area type="monotone" dataKey="timeSpent" name="Time Spent (h)" stroke="#FFC107" fill="#FFC107" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Data Source Reliability">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dummyDataSourceReliability}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="reliability"
            label={({ name, reliability }) => `${name}: ${reliability}%`}
          >
            {dummyDataSourceReliability.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Cost Savings from Data Cleaning">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dummyDataCostSavings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="savings" name="Cost Savings ($)" stroke="#00796B" fill="#00796B" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

const dummyDataTimeEfficiency = [
  { name: 'Method A', timeSeconds: 120, efficiencyPercentage: 85 },
  { name: 'Method B', timeSeconds: 90, efficiencyPercentage: 92 },
  { name: 'Method C', timeSeconds: 150, efficiencyPercentage: 78 },
  { name: 'Method D', timeSeconds: 60, efficiencyPercentage: 95 },
];


const ChartCard = ({ title, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border border-teal-200 ${className}`}>
    <h2 className="text-2xl font-semibold text-teal-800 mb-4">{title}</h2>
    {children}
  </div>
);

const DeduplicationTab = ({ dateRange }) => (
  <div className="grid grid-cols-3 gap-4">
    <ChartCard title="Number of Duplicates Found">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataDuplicates}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="duplicates" name="Duplicates" fill="#00796B" />
          <Bar yAxisId="right" dataKey="percentage" name="Percentage (%)" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Duplicate Resolution Methods">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dummyDataDuplicateResolution}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {dummyDataDuplicateResolution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Records Before and After Deduplication">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyDataDeduplication}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="records" name="Total Records" fill="#00796B" />
          <Bar dataKey="uniqueRecords" name="Unique Records" fill="#4DB6AC" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Efficiency">
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" name="Number of Records" />
          <YAxis dataKey="efficiency" name="Efficiency (%)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Deduplication Methods" data={dummyDataDuplicateResolution} fill="#00796B">
            {dummyDataDuplicateResolution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Impact on Data Size">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dummyDataDeduplication}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="dataSizeGB" name="Data Size (GB)" stroke="#00796B" fill="#00796B" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Processing Time">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={dummyDataDuplicateResolution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="value" name="Records Processed" fill="#00796B" />
          <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency (%)" stroke="#FFC107" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Accuracy by Source">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={dummyDataDuplicates}>
          <PolarGrid />
          <PolarAngleAxis dataKey="source" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Detection Accuracy" dataKey="detectionAccuracy" stroke="#00796B" fill="#00796B" fillOpacity={0.6} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Time vs Efficiency">
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeSeconds" name="Time (seconds)" />
          <YAxis dataKey="efficiencyPercentage" name="Efficiency (%)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Deduplication Methods" data={dummyDataTimeEfficiency} fill="#00796B">
            {dummyDataTimeEfficiency.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Trend Over Time">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyDataDeduplication}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="records" name="Total Records" stroke="#00796B" />
          <Line type="monotone" dataKey="uniqueRecords" name="Unique Records" stroke="#4DB6AC" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

// Data Mastering Tab
const DataMasteringTab = ({ dateRange }) => (
  <div className="grid grid-cols-3 gap-4">
    {/* 1. Mastered Records Created */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Mastered Records Created</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dummyDataMasteredRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="records" name="Mastered Records" stroke="#00796B" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="confidence" name="Confidence (%)" stroke="#FFC107" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* 2. Attribute Completion Rate */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Attribute Completion Rate</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dummyDataAttributeCompletion}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="before" name="Before Mastering" fill="#26A69A" />
          <Bar dataKey="after" name="After Mastering" fill="#00796B" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* 3. Data Quality Improvement */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Data Quality Improvement</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart outerRadius={90} data={dummyDataQualityImprovement}>
          <PolarGrid />
          <PolarAngleAxis dataKey="attribute" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Before Mastering" dataKey="before" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="After Mastering" dataKey="after" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>

    {/* 4. Mastering Confidence Distribution */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Mastering Confidence Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dummyDataMasteredRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="confidence" name="Confidence (%)" stroke="#00796B" fill="#00796B" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* 5. Attribute Improvement Impact */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Attribute Improvement Impact</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="improvement" name="Improvement (%)" />
          <YAxis dataKey="after" name="Completion Rate (%)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Attributes" data={dummyDataAttributeCompletion} fill="#00796B">
            {dummyDataAttributeCompletion.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.criticality === 'High' ? '#F44336' : entry.criticality === 'Medium' ? '#FFC107' : '#4CAF50'} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>

    {/* 6. Data Mastering Accuracy */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Data Mastering Accuracy</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={dummyDataMasteredRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="records" name="Mastered Records" fill="#00796B" />
          <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke="#FFC107" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>

    {/* 7. Data Quality Dimensions */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Data Quality Dimensions</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart outerRadius={90} data={dummyDataMasteredRecords}>
          <PolarGrid />
          <PolarAngleAxis dataKey="date" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Completeness" dataKey="completeness" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Accuracy" dataKey="accuracy" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Radar name="Confidence" dataKey="confidence" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>

    {/* 8. Data Mastering Progress */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Data Mastering Progress</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dummyDataMasteredRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="records" name="Mastered Records" stroke="#00796B" fill="#00796B" fillOpacity={0.3} />
          <Area type="monotone" dataKey="completeness" name="Completeness (%)" stroke="#FFC107" fill="#FFC107" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* 9. Attribute Criticality vs Improvement */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Attribute Criticality vs Improvement</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="improvement" name="Improvement (%)" />
          <YAxis dataKey="after" name="Final Completion Rate (%)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Attributes" data={dummyDataAttributeCompletion}>
            {dummyDataAttributeCompletion.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const queueLengthData = [
  { time: '00:00', queueLength: 10, processingSpeed: 5 },
  { time: '04:00', queueLength: 15, processingSpeed: 6 },
  { time: '08:00', queueLength: 20, processingSpeed: 7 },
  { time: '12:00', queueLength: 25, processingSpeed: 5 },
  { time: '16:00', queueLength: 30, processingSpeed: 4 },
  { time: '20:00', queueLength: 20, processingSpeed: 6 },
];

// Updated dummy data for Performance Improvement Trends
const performanceImprovementData = [
  { month: 'Jan', optimization: 20, bugFixes: 15, newFeatures: 5 },
  { month: 'Feb', optimization: 25, bugFixes: 10, newFeatures: 8 },
  { month: 'Mar', optimization: 30, bugFixes: 8, newFeatures: 12 },
  { month: 'Apr', optimization: 35, bugFixes: 5, newFeatures: 15 },
  { month: 'May', optimization: 40, bugFixes: 3, newFeatures: 18 },
];

// Performance Tab
const PerformanceTab = ({ dateRange }) => (
  <div className="grid grid-cols-3 gap-4">
    {/* Row 1 */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Processing Time per Stage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dummyDataProcessingTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="time" name="Current Time (s)" fill="#00796B" />
          <Bar dataKey="optimizedTime" name="Optimized Time (s)" fill="#4DB6AC" />
          <Bar dataKey="bottleneck" name="Bottleneck" fill="#FF9800" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Throughput Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dummyDataThroughput}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="throughput" name="Throughput" stroke="#00796B" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="capacity" name="Capacity" stroke="#FFC107" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="queueLength" name="Queue Length" stroke="#F44336" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Resource Utilization</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dummyDataResourceUtilization}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="cpu" name="CPU" stroke="#00796B" fill="#00796B" fillOpacity={0.3} />
          <Area type="monotone" dataKey="memory" name="Memory" stroke="#26A69A" fill="#26A69A" fillOpacity={0.3} />
          <Area type="monotone" dataKey="io" name="I/O" stroke="#4DB6AC" fill="#4DB6AC" fillOpacity={0.3} />
          <Area type="monotone" dataKey="network" name="Network" stroke="#80CBC4" fill="#80CBC4" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Row 2 */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Performance Optimization</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" name="Current Processing Time (s)" />
          <YAxis dataKey="optimizedTime" name="Potential Optimized Time (s)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />
          <Scatter name="Processing Stages" data={dummyDataProcessingTime} fill="#00796B">
            {dummyDataProcessingTime.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Queue Length and Processing Speed</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={queueLengthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="queueLength" name="Queue Length" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="processingSpeed" name="Processing Speed" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Throughput vs Capacity</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={dummyDataThroughput}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="throughput" name="Throughput" fill="#00796B" />
          <Line type="monotone" dataKey="capacity" name="Capacity" stroke="#FFC107" strokeDasharray="5 5" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>

    {/* Row 3 */}
    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Resource Utilization Radar</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart outerRadius={90} data={dummyDataResourceUtilization}>
          <PolarGrid />
          <PolarAngleAxis dataKey="time" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="CPU" dataKey="cpu" stroke="#00796B" fill="#00796B" fillOpacity={0.6} />
          <Radar name="Memory" dataKey="memory" stroke="#26A69A" fill="#26A69A" fillOpacity={0.6} />
          <Radar name="I/O" dataKey="io" stroke="#4DB6AC" fill="#4DB6AC" fillOpacity={0.6} />
          <Radar name="Network" dataKey="network" stroke="#80CBC4" fill="#80CBC4" fillOpacity={0.6} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Performance Improvement Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={performanceImprovementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="optimization" name="Optimization" stackId="a" fill="#8884d8" />
          <Bar dataKey="bugFixes" name="Bug Fixes" stackId="a" fill="#82ca9d" />
          <Bar dataKey="newFeatures" name="New Features" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800 mb-2">Performance Metrics Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={[
              { name: 'CPU Usage', value: 65 },
              { name: 'Memory Usage', value: 20 },
              { name: 'I/O Usage', value: 10 },
              { name: 'Network Usage', value: 5 },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {[
              { name: 'CPU Usage', value: 65 },
              { name: 'Memory Usage', value: 20 },
              { name: 'I/O Usage', value: 10 },
              { name: 'Network Usage', value: 5 },
            ].map((entry, index) => (
              <Cell key={`cell-${index}`} fill={ACCENT_COLORS[index % ACCENT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);



const ErrorsTab = ({ dateRange }) => {
  const [activeTab, setActiveTab] = useState('errorCounts');

  const TabButton = ({ id, icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full ${activeTab === id ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
        } transition-all duration-300 ease-in-out`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );

  return (
    <div className="p-8 bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
      <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">Error Analysis Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <TabButton id="errorCounts" icon={<AlertTriangle size={20} />} label="Error Counts" />
        <TabButton id="errorTrends" icon={<TrendingUp size={20} />} label="Error Trends" />
        <TabButton id="failedRecords" icon={<List size={20} />} label="Failed Records" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'errorCounts' && (
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300">
            <h2 className="text-3xl font-semibold text-red-800 mb-6">Error Counts by Type</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dummyDataErrorCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FED7D7" />
                <XAxis dataKey="type" stroke="#9B2C2C" />
                <YAxis stroke="#9B2C2C" />
                <Tooltip contentStyle={{ backgroundColor: '#FFF5F5', border: '1px solid #FC8181' }} />
                <Legend />
                <Bar dataKey="count" name="Error Count" fill="#FC8181" radius={[8, 8, 0, 0]}>
                  {dummyDataErrorCounts.map((entry, index) => (
                    <motion.rect key={`bar-${index}`} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'errorTrends' && (
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300">
            <h2 className="text-3xl font-semibold text-red-800 mb-6">Error Trends Over Time</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dummyDataErrorTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FED7D7" />
                <XAxis dataKey="date" stroke="#9B2C2C" tickFormatter={(value) => formatDate(value)} />
                <YAxis stroke="#9B2C2C" />
                <Tooltip contentStyle={{ backgroundColor: '#FFF5F5', border: '1px solid #FC8181' }} />
                <Legend />
                <Line type="monotone" dataKey="errors" name="Errors" stroke="#FC8181" strokeWidth={3} dot={{ fill: '#FC8181', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#68D391" strokeWidth={3} dot={{ fill: '#68D391', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="openIssues" name="Open Issues" stroke="#F6AD55" strokeWidth={3} dot={{ fill: '#F6AD55', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'failedRecords' && (
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300">
            <h2 className="text-3xl font-semibold text-red-800 mb-6">Failed Records Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-red-100">
                    <th className="py-3 px-4 font-semibold text-red-800">Record ID</th>
                    <th className="py-3 px-4 font-semibold text-red-800">Error Message</th>
                    <th className="py-3 px-4 font-semibold text-red-800">Stage</th>
                    <th className="py-3 px-4 font-semibold text-red-800">Timestamp</th>
                    <th className="py-3 px-4 font-semibold text-red-800">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyDataFailedRecords.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      className="border-b border-red-100 hover:bg-red-50 transition-colors duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4">{record.recordId}</td>
                      <td className="py-3 px-4">{record.errorMessage}</td>
                      <td className="py-3 px-4">{record.stage}</td>
                      <td className="py-3 px-4">{record.timestamp}</td>
                      <td className={`py-3 px-4 font-semibold ${record.severity === 'High' ? 'text-red-600' :
                        record.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                        {record.severity}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};