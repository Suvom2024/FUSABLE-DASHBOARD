import React, { useState, useEffect, useRef,useMemo } from 'react';
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
  FaNetworkWired, FaCogs, FaServer, FaLayerGroup ,
  FaChartBar
} from 'react-icons/fa';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { AlertTriangle, TrendingUp, List } from 'lucide-react';
import { Activity, RefreshCw } from 'lucide-react';
import Select from 'react-select';
import { FaCog, FaCloudUploadAlt } from 'react-icons/fa';
const COLORS = ['#00796B', '#26A69A', '#4DB6AC', '#80CBC4', '#B2DFDB', '#E0F2F1'];
const ACCENT_COLORS = ['#FFC107', '#FF9800', '#FF5722', '#F44336', '#E91E63', '#9C27B0'];

// Utility functions
// const dummyData = {
//   '15010647232': [
//     { sourceName: 'RigDig', sourceRecordId: '11066098', name: 'Winey BICE Inc', address: '8246 w mineral king ave visalia ca 93291 us', secondaryName: '', secondaryAddress: '' },
//     { sourceName: 'UCCDebtor', sourceRecordId: '5561215_d1', name: 'WINEY-BICE, INC', address: 'po box 2629 visalia ca 93279 us', secondaryName: '', secondaryAddress: 'p o box 2629 visalia ca 93279 2629 us' },
//     { sourceName: 'EDABuyer', sourceRecordId: 'J202774', name: 'WINEY BICE INC', address: '93279 2629 us', secondaryName: '', secondaryAddress: '' },
//   ],
//   '15010647233': [
//     { sourceName: 'SourceA', sourceRecordId: 'A123', name: 'Company A', address: '123 Main St, City A, State A', secondaryName: 'A Corp', secondaryAddress: 'PO Box 123, City A' },
//     { sourceName: 'SourceB', sourceRecordId: 'B456', name: 'Company A Inc', address: '123 Main Street, City A, ST', secondaryName: '', secondaryAddress: '' },
//     { sourceName: 'SourceC', sourceRecordId: 'C789', name: 'A Company', address: 'Main St, City A', secondaryName: '', secondaryAddress: '' },
//   ],
// };

const dummyDataMasteredRecords = [
  { date: '2024-01-01', records: 150000, confidence: 92, completeness: 88 },
  { date: '2024-02-01', records: 180000, confidence: 93, completeness: 90 },
  { date: '2024-03-01', records: 220000, confidence: 94, completeness: 91 },
  { date: '2024-04-01', records: 280000, confidence: 95, completeness: 93 },
  { date: '2024-05-01', records: 350000, confidence: 96, completeness: 94 },
  { date: '2024-06-01', records: 420000, confidence: 97, completeness: 95 }
];

// For Data Ingestion Tab
const dummyDataSourceDistribution = [
  { name: 'Customer Data', value: 35, growth: 12, reliability: 95 },
  { name: 'Transaction Data', value: 25, growth: 8, reliability: 98 },
  { name: 'Product Data', value: 20, growth: -3, reliability: 92 },
  { name: 'Vendor Data', value: 15, growth: 15, reliability: 90 },
  { name: 'Location Data', value: 5, growth: 5, reliability: 94 }
];

const dummyDataIngestion = [
  { size: 100, processingTime: 5, efficiency: 95 },
  { size: 250, processingTime: 8, efficiency: 92 },
  { size: 500, processingTime: 12, efficiency: 88 },
  { size: 750, processingTime: 15, efficiency: 85 },
  { size: 1000, processingTime: 20, efficiency: 82 }
];

const dummyDataQuality = [
  { date: '2024-01-01', completeness: 85, accuracy: 90, consistency: 88 },
  { date: '2024-02-01', completeness: 87, accuracy: 91, consistency: 89 },
  { date: '2024-03-01', completeness: 90, accuracy: 93, consistency: 91 },
  { date: '2024-04-01', completeness: 92, accuracy: 94, consistency: 92 },
  { date: '2024-05-01', completeness: 94, accuracy: 95, consistency: 93 },
  { date: '2024-06-01', completeness: 95, accuracy: 96, consistency: 94 }
];

const dummyDataProcessingTimes = [
  { name: 'Data Validation', time: 12 },
  { name: 'Data Cleaning', time: 25 },
  { name: 'Data Transform', time: 18 },
  { name: 'Data Loading', time: 15 },
  { name: 'Quality Check', time: 10 }
];

// For Data Cleaning Tab
const dummyDataErrorRates = [
  { date: '2024-01-01', rate: 4.5, threshold: 5.0 },
  { date: '2024-02-01', rate: 4.2, threshold: 5.0 },
  { date: '2024-03-01', rate: 3.8, threshold: 5.0 },
  { date: '2024-04-01', rate: 3.5, threshold: 5.0 },
  { date: '2024-05-01', rate: 3.2, threshold: 5.0 },
  { date: '2024-06-01', rate: 2.8, threshold: 5.0 }
];

const dummyDataQualityIssues = [
  { name: 'Missing Values', count: 150 },
  { name: 'Invalid Format', count: 280 },
  { name: 'Duplicate Records', count: 420 },
  { name: 'Inconsistent Data', count: 180 },
  { name: 'Out of Range', count: 300 },
  { name: 'Invalid References', count: 220 }
];

const dummyDataCleaning = [
  { name: 'Completeness', dataQuality: 75, completeness: 95 },
  { name: 'Accuracy', dataQuality: 82, completeness: 94 },
  { name: 'Consistency', dataQuality: 78, completeness: 92 },
  { name: 'Timeliness', dataQuality: 85, completeness: 96 },
  { name: 'Validity', dataQuality: 80, completeness: 93 }
];

// For Performance Tab
const dummyDataResourceUtilization = [
  { time: '00:00', cpu: 45, memory: 60, io: 30, network: 25 },
  { time: '04:00', cpu: 35, memory: 55, io: 25, network: 20 },
  { time: '08:00', cpu: 65, memory: 70, io: 45, network: 40 },
  { time: '12:00', cpu: 85, memory: 80, io: 60, network: 55 },
  { time: '16:00', cpu: 75, memory: 75, io: 50, network: 45 },
  { time: '20:00', cpu: 55, memory: 65, io: 35, network: 30 }
];

const queueLengthData = [
  { time: '00:00', queueLength: 1200, processingSpeed: 350 },
  { time: '04:00', queueLength: 800, processingSpeed: 400 },
  { time: '08:00', queueLength: 2500, processingSpeed: 280 },
  { time: '12:00', queueLength: 3800, processingSpeed: 250 },
  { time: '16:00', queueLength: 2200, processingSpeed: 320 },
  { time: '20:00', queueLength: 1500, processingSpeed: 380 }
];

const dummData = {
  '15011293834_197': [
    {
      sourceName: 'UCCDebtor',
      sourceRecordId: '9189193_d1',
      name: 'EIDEN INC',
      address: '1111 santa monica blvd ste 1840 los angeles ca 90025 us',
      secondaryName: '',
      secondaryAddress: ''
    },
    {
      sourceName: 'UCCDebtor',
      sourceRecordId: '21488451_d1',
      name: 'EIDEN INC',
      address: '11111 santa monica blvd ste 1840 los angeles ca 90025 us',
      secondaryName: '',
      secondaryAddress: ''
    }
  ],
  '15010647231_197': [
    {
      sourceName: 'UCCDebtor',
      sourceRecordId: '22732699_d1',
      name: 'SHAKLEE CORP',
      address: '4747 billow rd pleasanton ca 945882763 us',
      secondaryName: '',
      secondaryAddress: ''
    },
    {
      sourceName: 'UCCDebtor',
      sourceRecordId: '30630704_d1',
      name: 'SHAKLEE CORP',
      address: '4747 willow rd pleasanton ca 94588 us',
      secondaryName: '',
      secondaryAddress: ''
    },
    {
      sourceName: 'EDABuyer',
      sourceRecordId: 'J367011',
      name: 'Shaklee Corp',
      address: '4747 willow rd pleasanton ca 94588 us',
      secondaryName: '',
      secondaryAddress: '6920 koll center pkwy pleasanton ca 94566 us'
    }
  ],
};

const FusableRecordsMerger = () => {
  const [selectedFusableId, setSelectedFusableId] = useState(null);
  const fusableIdOptions = useMemo(() => 
    Object.keys(dummData).map(id => ({ value: id, label: id })),
    []
  );

  const handleFusableIdChange = (selectedOption) => {
    setSelectedFusableId(selectedOption);
  };

  const mergedRecords = selectedFusableId ? dummData[selectedFusableId.value] : [];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#4DB6AC',
      '&:hover': {
        borderColor: '#26A69A',
      },
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#00796B' : state.isFocused ? '#B2DFDB' : null,
      color: state.isSelected ? 'white' : '#00796B',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#00796B',
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg shadow-lg border border-teal-200"
    >
      <h2 className="text-3xl font-bold text-teal-800 mb-6">Fusable Records Merger</h2>
      <div className="mb-6 relative">
        <Select
          value={selectedFusableId}
          onChange={handleFusableIdChange}
          options={fusableIdOptions}
          styles={customStyles}
          placeholder="Search or select a Fusable ID"
          isClearable
          isSearchable
        />
      </div>
      <AnimatePresence>
        {mergedRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto bg-white rounded-lg shadow-inner"
          >
            <table className="min-w-full divide-y divide-teal-200">
              <thead className="bg-teal-600">
                <tr>
                  {['Source Name', 'Source Record Id', 'Name', 'Address', 'Secondary Name', 'Secondary Address'].map((header) => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-teal-50 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-teal-100">
                {mergedRecords.map((record, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-teal-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">{record.sourceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">{record.sourceRecordId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">{record.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">{record.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">{record.secondaryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">{record.secondaryAddress}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const dummyData = {
  totalRecordsProcessed: 4091837,
  masteredRecords: 646775,
  duplicatesRemoved: 1995725,
  averageClusterSize: 3.1,
  UniqueRecords: 2091175,
  sourceData: [
    { name: 'Carrier', totalRows: 173774, rowsProcessed: 173750, errorRows: 24, duplicatesFound: 172740 },
    { name: 'EDABuyer', totalRows: 353711, rowsProcessed: 353711, errorRows: 0, duplicatesFound: 143556 },
    { name: 'IronDealers', totalRows: 986, rowsProcessed: 985, errorRows: 1, duplicatesFound: 332 },
    { name: 'RigDig', totalRows: 483477, rowsProcessed: 483448, errorRows: 29, duplicatesFound: 473755 },
    { name: 'UCCSecuredParty', totalRows: 136066, rowsProcessed: 136066, errorRows: 0, duplicatesFound: 79703 },
    { name: 'USFarm', totalRows: 72694, rowsProcessed: 72693, errorRows: 1, duplicatesFound: 25936 },
    { name: 'UCCDebtor', totalRows: 909394, rowsProcessed: 806394, errorRows: 81, duplicatesFound: 642890 },
    { name: 'USDOT', totalRows: 464654, rowsProcessed: 464596, errorRows: 58, duplicatesFound: 456813 },
  ],
  processingTimes: [
    { stage: "Ingestion", time: 154 }, // 2h 34 mins = 154 mins
    { stage: "Data Mastering", time: 300 }, // 5 hours = 300 mins
    { stage: "Export", time: 120 }, // 2 hours = 120 mins
  ],
  ingestionData: [
    { name: 'Carrier', records: 173774, size: 52132 },
    { name: 'EDABuyer', records: 353711, size: 106113 },
    { name: 'IronDealers', records: 986, size: 296 },
    { name: 'RigDig', records: 483477, size: 145043 },
    { name: 'UCCSecuredParty', records: 136066, size: 40820 },
    { name: 'USFarm', records: 72694, size: 21808 },
    { name: 'UCCDebtor', records: 947521, size: 721943 },
    { name: 'USDOT', records: 464654, size: 139396 },
  ],
  cleaningData: [
    { name: 'Carrier', beforeRecords: 173774, afterRecords: 173750, dataQuality: 99.99 },
    { name: 'EDABuyer', beforeRecords: 353711, afterRecords: 353711, dataQuality: 100 },
    { name: 'IronDealers', beforeRecords: 986, afterRecords: 985, dataQuality: 99.90 },
    { name: 'RigDig', beforeRecords: 483477, afterRecords: 483448, dataQuality: 99.99 },
    { name: 'UCCSecuredParty', beforeRecords: 136066, afterRecords: 136066, dataQuality: 100 },
    { name: 'USFarm', beforeRecords: 72694, afterRecords: 72693, dataQuality: 100 },
    { name: 'UCCDebtor', beforeRecords: 842678, afterRecords: 641235, dataQuality: 100 },
    { name: 'USDOT', beforeRecords: 464654, afterRecords: 464596, dataQuality: 99.99 },
  ],
  qualityIssues :  [
    { name: 'Invalid/Parsing Failure', count: 194 },
    { name: 'Duplicates', count: 6725 },
    { name: 'Missing Required Fields', count: 3562 },
    { name: 'Out of Range Values', count: 2189 },
    { name: 'Inconsistent Formatting', count: 5731 },
    { name: 'Data Type Mismatch', count: 1847 },
    { name: 'Invalid Date/Time', count: 983 },
    { name: 'Unexpected Null Values', count: 4215 }
  ],
  
  deduplicationData: [
    { name: 'Carrier', beforeRecords: 173750, afterRecords: 1010, duplicates: 172740 },
    { name: 'EDABuyer', beforeRecords: 353711, afterRecords: 210155, duplicates: 143556 },
    { name: 'IronDealers', beforeRecords: 985, afterRecords: 653, duplicates: 332 },
    { name: 'RigDig', beforeRecords: 483448, afterRecords: 9693, duplicates: 473755 },
    { name: 'UCCSecuredParty', beforeRecords: 136066, afterRecords: 56363, duplicates: 79703 },
    { name: 'USFarm', beforeRecords: 72693, afterRecords: 46757, duplicates: 25936 },
    { name: 'UCCDebtor', beforeRecords: 942786, afterRecords: 796125, duplicates: 642890 },
    { name: 'USDOT', beforeRecords: 464596, afterRecords: 7783, duplicates: 456813 },
  ],
  pipelineStageDistribution: [
    { name: 'Ingestion', time: 154 },
    { name: 'Data Mastering', time: 300 },
    { name: 'Export', time: 120 },
  ],
};

const dummyDataPieChart = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 200 },
  { name: 'Category D', value: 100 },
];

const dummyDataErrorRate = [
  { date: '2023-06-01', rate: 2.5 },
  { date: '2023-06-02', rate: 2.2 },
  { date: '2023-06-03', rate: 2.8 },
  { date: '2023-06-04', rate: 2.1 },
  { date: '2023-06-05', rate: 1.9 },
];

const dummyDataSourceReliability = [
  { source: 'Source A', reliability: 95 },
  { source: 'Source B', reliability: 88 },
  { source: 'Source C', reliability: 92 },
  { source: 'Source D', reliability: 85 },
];

const dummyDataCostSavings = [
  { month: 'Jan', savings: 5000 },
  { month: 'Feb', savings: 6200 },
  { month: 'Mar', savings: 7500 },
  { month: 'Apr', savings: 8100 },
  { month: 'May', savings: 9000 },
];
const deduplicationData = [
  { name: 'Customer Records', before: 50000, after: 42500, reduction: 15 },
  { name: 'Transaction Data', before: 100000, after: 89200, reduction: 10.8 },
  { name: 'Product Catalog', before: 20000, after: 18600, reduction: 7 },
  { name: 'Marketing List', before: 30000, after: 25800, reduction: 14 }
];

const deduplicationImpactData = [
  { stage: 'Raw Data', size: 1250 },
  { stage: 'After Validation', size: 1180 },
  { stage: 'After Cleaning', size: 1050 },
  { stage: 'After Deduplication', size: 785 },
  { stage: 'Final Mastered', size: 750 }
];

const deduplicationTimeEfficiency = [
  { batchSize: '10K', timeSeconds: 45, efficiency: 99.2 },
  { batchSize: '50K', timeSeconds: 185, efficiency: 98.8 },
  { batchSize: '100K', timeSeconds: 340, efficiency: 98.5 },
  { batchSize: '500K', timeSeconds: 1250, efficiency: 97.8 },
  { batchSize: '1M', timeSeconds: 2400, efficiency: 97.2 }
];
const dummyDataNewPlot = [
  { name: 'Jan', value: 125000 },
  { name: 'Feb', value: 148000 },
  { name: 'Mar', value: 156000 },
  { name: 'Apr', value: 172000 },
  { name: 'May', value: 189000 },
  { name: 'Jun', value: 195000 }
];

const dummyDataScatterPlot = [
  { x: 100, y: 95, z: 120 },  // Record Count (k), Quality Score, Processing Time
  { x: 150, y: 92, z: 180 },
  { x: 200, y: 88, z: 240 },
  { x: 250, y: 94, z: 300 },
  { x: 300, y: 91, z: 360 },
  { x: 350, y: 89, z: 420 },
  { x: 400, y: 93, z: 480 }
];

const dummyDataLineChart = [
  { month: 'Jan', growth: 15000 },
  { month: 'Feb', growth: 23000 },
  { month: 'Mar', growth: 28000 },
  { month: 'Apr', growth: 32000 },
  { month: 'May', growth: 45000 },
  { month: 'Jun', growth: 52000 }
];
const deduplicationTrendData = [
  { date: '2024-01', duplicateRate: 28.5, recordsProcessed: 980000 },
  { date: '2024-02', duplicateRate: 25.2, recordsProcessed: 1120000 },
  { date: '2024-03', duplicateRate: 22.8, recordsProcessed: 1350000 },
  { date: '2024-04', duplicateRate: 19.5, recordsProcessed: 1580000 },
  { date: '2024-05', duplicateRate: 17.2, recordsProcessed: 1750000 },
  { date: '2024-06', duplicateRate: 15.8, recordsProcessed: 1920000 }
];
const dummyDataTimeEfficiency = [
  { process: 'Data Cleaning', before: 100, after: 70 },
  { process: 'Data Integration', before: 120, after: 90 },
  { process: 'Data Validation', before: 80, after: 60 },
  { process: 'Report Generation', before: 60, after: 40 },
];

const performanceImprovementData = [
  { metric: 'Processing Speed', improvement: 35, category: 'High' },
  { metric: 'Memory Usage', improvement: -28, category: 'Medium' },
  { metric: 'Accuracy Rate', improvement: 12, category: 'High' },
  { metric: 'False Positives', improvement: -45, category: 'Critical' },
  { metric: 'Throughput', improvement: 25, category: 'Medium' }
];


const dummyDataVolume = [
  { date: '2023-06-01', volume: 120000, forecast: 125000, anomaly: false },
  { date: '2023-06-02', volume: 118000, forecast: 122000, anomaly: false },
  { date: '2023-06-03', volume: 95000, forecast: 120000, anomaly: true },
  { date: '2023-06-04', volume: 130000, forecast: 128000, anomaly: false },
  { date: '2023-06-05', volume: 122000, forecast: 126000, anomaly: false },
  { date: '2023-06-06', volume: 128000, forecast: 130000, anomaly: false },
  { date: '2023-06-07', volume: 140000, forecast: 132000, anomaly: true },
];



const dummyDataDuplicates = [
  { source: 'CRM System', duplicates: 1500, percentage: 4.3, falsePositives: 75, detectionAccuracy: 98 },
  { source: 'E-commerce Platform', duplicates: 840, percentage: 3, falsePositives: 42, detectionAccuracy: 99 },
  { source: 'Mobile App', duplicates: 660, percentage: 3, falsePositives: 33, detectionAccuracy: 98 },
  { source: 'Social Media API', duplicates: 540, percentage: 3, falsePositives: 27, detectionAccuracy: 97 },
  { source: 'IoT Devices', duplicates: 360, percentage: 3, falsePositives: 18, detectionAccuracy: 96 },
  { source: 'Legacy Database', duplicates: 400, percentage: 5, falsePositives: 20, detectionAccuracy: 95 },
];

const dummyDataDuplicateResolution = [
  { name: 'Exact Match', value: 2100, efficiency: 99, processingTime: 0.2 },
  { name: 'Fuzzy Match', value: 1050, efficiency: 92, processingTime: 0.8 },
  { name: 'Manual Review', value: 150, efficiency: 99.9, processingTime: 10 },
];

const dummyDataDeduplication = [
  { name: 'Customer Records', total: 50000, unique: 48500, duplicate: 15000 },
  { name: 'Transaction Data', total: 100000, unique: 99200, duplicate: 18000 },
  { name: 'Product Catalog', total: 20000, unique: 19600, duplicate: 40000 },
  { name: 'Marketing Contacts', total: 30000, unique: 28800, duplicate: 12000 },
];


const dummyDataAttributeCompletion = [
  { name: 'Full Name', before: 95, after: 99.5, improvement: 4.5, criticality: 'High' },
  { name: 'Email Address', before: 88, after: 98, improvement: 10, criticality: 'High' },
  { name: 'Phone Number', before: 75, after: 95, improvement: 20, criticality: 'Medium' },
  { name: 'Mailing Address', before: 70, after: 92, improvement: 22, criticality: 'Medium' },
  { name: 'Date of Birth', before: 80, after: 94, improvement: 14, criticality: 'Low' },
  { name: 'Customer ID', before: 100, after: 100, improvement: 0, criticality: 'Critical' },
];

const dummyDataQualityImprovement = [
  { attribute: 'Completeness', before: 82, after: 97, impact: 'High' },
  { attribute: 'Consistency', before: 75, after: 95, impact: 'Medium' },
  { attribute: 'Accuracy', before: 88, after: 98, impact: 'High' },
  { attribute: 'Timeliness', before: 90, after: 99, impact: 'Low' },
  { attribute: 'Validity', before: 78, after: 96, impact: 'Medium' },
  { attribute: 'Uniqueness', before: 92, after: 99.5, impact: 'High' },
];

const dummyDataProcessingTime = [
  { stage: 'Data Ingestion', time: 300, optimizedTime: 240, bottleneck: 'I/O' },
  { stage: 'Data Cleaning', time: 450, optimizedTime: 360, bottleneck: 'CPU' },
  { stage: 'Deduplication', time: 180, optimizedTime: 150, bottleneck: 'Memory' },
  { stage: 'Data Mastering', time: 360, optimizedTime: 300, bottleneck: 'CPU' },
  { stage: 'Data Validation', time: 120, optimizedTime: 90, bottleneck: 'I/O' },
];

const dummyDataThroughput = [
  { time: '00:00', throughput: 5000, capacity: 7500, queueLength: 500 },
  { time: '04:00', throughput: 6000, capacity: 7500, queueLength: 250 },
  { time: '08:00', throughput: 4000, capacity: 7500, queueLength: 1500 },
  { time: '12:00', throughput: 7500, capacity: 7500, queueLength: 0 },
  { time: '16:00', throughput: 6500, capacity: 7500, queueLength: 400 },
  { time: '20:00', throughput: 5500, capacity: 7500, queueLength: 750 },
];


const dummyDataErrorCounts = [
  { type: 'Data Format Errors', count: 250, impact: 'Medium', resolutionTime: 45 },
  { type: 'Missing Required Fields', count: 180, impact: 'High', resolutionTime: 60 },
  { type: 'Data Type Mismatches', count: 120, impact: 'Low', resolutionTime: 30 },
  { type: 'Integration Failures', count: 50, impact: 'Critical', resolutionTime: 120 },
  { type: 'Duplicate Records', count: 80, impact: 'Medium', resolutionTime: 40 },
  { type: 'Timeout Errors', count: 30, impact: 'High', resolutionTime: 90 },
];

const dummyDataErrorTrends = [
  { date: '2023-06-01', errors: 150, resolved: 135, openIssues: 15 },
  { date: '2023-06-02', errors: 120, resolved: 110, openIssues: 25 },
  { date: '2023-06-03', errors: 180, resolved: 160, openIssues: 45 },
  { date: '2023-06-04', errors: 90, resolved: 85, openIssues: 50 },
  { date: '2023-06-05', errors: 135, resolved: 120, openIssues: 65 },
  { date: '2023-06-06', errors: 105, resolved: 95, openIssues: 75 },
  { date: '2023-06-07', errors: 165, resolved: 140, openIssues: 100 },
];

const dummyDataFailedRecords = [
  { id: 1, recordId: 'CUST0012345', errorMessage: 'Invalid email format', stage: 'Data Validation', timestamp: '2023-06-07 10:30:00', severity: 'High' },
  { id: 2, recordId: 'PROD0067890', errorMessage: 'Missing required field: price', stage: 'Data Cleaning', timestamp: '2023-06-07 11:45:00', severity: 'Medium' },
  { id: 3, recordId: 'TRX0098765', errorMessage: 'Duplicate transaction ID', stage: 'Deduplication', timestamp: '2023-06-07 13:15:00', severity: 'Low' },
  { id: 4, recordId: 'ORD0054321', errorMessage: 'Inconsistent shipping address', stage: 'Data Mastering', timestamp: '2023-06-07 14:20:00', severity: 'High' },
  { id: 5, recordId: 'EMP0023456', errorMessage: 'Invalid date format for hire date', stage: 'Data Validation', timestamp: '2023-06-07 16:10:00', severity: 'Medium' },
  { id: 6, recordId: 'INV0087654', errorMessage: 'Integration timeout error', stage: 'Data Ingestion', timestamp: '2023-06-07 18:30:00', severity: 'High' },
  { id: 7, recordId: 'LEAD0034567', errorMessage: 'Incorrect data type for phone number', stage: 'Data Cleaning', timestamp: '2023-06-08 09:05:00', severity: 'Low' },
  { id: 8, recordId: 'SUPP0045678', errorMessage: 'Incomplete supplier information', stage: 'Data Mastering', timestamp: '2023-06-08 11:40:00', severity: 'Medium' },
];



const dummyDataCleaningMethods = [
  { name: 'Manual Review', efficiency: 85, timeSpent: 40 },
  { name: 'Automated Scripts', efficiency: 92, timeSpent: 25 },
  { name: 'Machine Learning', efficiency: 88, timeSpent: 35 },
  { name: 'Data Validation Rules', efficiency: 95, timeSpent: 20 },
  { name: 'Third-party Tools', efficiency: 90, timeSpent: 30 },
];

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
    { label: 'Data Ingestion', icon: FaCloudUploadAlt },
    { label: 'Data Cleaning', icon: FaFilter },
    { label: 'Deduplication', icon: FaCopy },
    { label: 'Data Mastering', icon: FaClipboardCheck },
    { label: 'Performance', icon: FaChartLine },
    { label: 'Errors', icon: FaExclamationTriangle },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-100 to-teal-200 mt-6 p-1 rounded-xl shadow-lg mb-4">
      <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg  p-2 flex space-x-2 overflow-x-auto">
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
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <KPICard
      icon={<FaDatabase />}
      title="Total Records Processed"
      value={dummyData.totalRecordsProcessed.toLocaleString()}
      description="Across all pipeline stages"
    />
    <KPICard
      icon={<FaChartBar />}
      title="Total Unique Records"
      value={dummyData.UniqueRecords.toLocaleString()}
      description="Total Unique Records"
    />
    <KPICard
      icon={<FaMagic />}
      title="Mastered Records"
      value={dummyData.masteredRecords.toLocaleString()}
      description="Total number of mastered records created"
    />
    <KPICard
      icon={<FaCopy />}
      title="Duplicates Removed"
      value={dummyData.duplicatesRemoved.toLocaleString()}
      description="Total duplicates identified and removed"
    />
    <KPICard
      icon={<FaLayerGroup />}
      title="Average Cluster Size"
      value={dummyData.averageClusterSize.toFixed(1)}
      description="Average number of records per cluster"
    />
    
      </div> */}


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
            <TabPanel>
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
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      <Footer />
    </div>
  );
}
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
    { name: 'Ingestion', completed: true },
    { name: 'Data Mastering', completed: true },
    { name: 'Export', completed: true }
  ];

  return (
    <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Pipeline Processing Status</h2>
        <div className="mb-4">
          <Progress value={100} className="h-2" />
        </div>
        <div className="flex justify-between text-sm text-teal-700">
          <span>100% Complete</span>
          <span>Estimated: 9h 34m</span>
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
const OverviewTab = ({ dateRange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-8"
  >
    {/* Pipeline Processing Status */}
    <PipelineProcessingStatus />

    {/* Summary Statistics */}
    <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 overflow-hidden">
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

    {/* Processing Time by Stage */}
    <Card className="border border-teal-200">
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

    {/* Data Quality Improvement */}
    <Card className="border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Data Quality Improvement</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} data={dummyDataQualityImprovement}>
            <PolarGrid stroke="#CBD5E0" />
            <PolarAngleAxis dataKey="attribute" tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <Radar name="Before" dataKey="before" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="After" dataKey="after" stroke="#4fd1c5" fill="#4fd1c5" fillOpacity={0.6} />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>

    {/* Overall Pipeline Performance */}
    <Card className="border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Overall Pipeline Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={dummyDataMasteredRecords}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <YAxis yAxisId="left" orientation="left" stroke="#38b2ac" tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#4fd1c5" tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="records" name="Mastered Records" fill="#38b2ac" />
            <Line yAxisId="right" type="monotone" dataKey="confidence" name="Confidence (%)" stroke="#4fd1c5" />
            <Area yAxisId="right" type="monotone" dataKey="completeness" name="Completeness (%)" fill="#81e6d9" stroke="#4fd1c5" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>

    {/* Records Growth Over Time */}
    <Card className="border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Records Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyDataNewPlot}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <YAxis tick={{ fill: '#4a5568', fontWeight: '500' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name="Records" fill="#38b2ac" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
<Card className="border border-teal-200">
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

    {/* Data Quality vs. Record Count */}
    <Card className="border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Data Quality vs. Record Count</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Record Count" unit="k" />
            <YAxis type="number" dataKey="y" name="Quality Score" unit="" />
            <ZAxis type="number" dataKey="x" range={[60, 400]} name="Processing Time" unit="s" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter name="Data Quality" data={dummyDataScatterPlot} fill="#38b2ac" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>

    {/* Monthly Growth Trend */}
    <Card className="border border-teal-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Monthly Growth Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyDataLineChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="growth" stroke="#38b2ac" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </motion.div>

);

// const OverviewTab = ({ dateRange }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 0.5 }}
//     className="grid grid-cols-1 md:grid-cols-2 gap-8"
//   >
    
//     <div className="col-span-2">
//       <FusableRecordsMerger />
//     </div>
//     {/* Pipeline Processing Status */}
//     <PipelineProcessingStatus />

//     {/* Summary Statistics */}
//     <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 overflow-hidden ring-1 ring-teal-300">
//   <div className="p-6 relative">
//     <h2 className="text-2xl font-bold text-teal-800 mb-4">Summary Statistics</h2>
//     <div className="space-y-4 relative z-10">
//       {[
//         { label: "Total Records Processed", value: "4,091,837" },
//         { label: "Mastered Records", value: "646,775" },
//         { label: "Duplicates Removed", value: "1,995,725" },
//         { label: "Average Cluster Size", value: "3.1" },
//         { label: "Max Cluster Size", value: "2,997" },
//         { label: "Error/Invalid/Parsing Failure Rows", value: "194", error: true }
//       ].map((item, index) => (
//         <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-white bg-opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md">
//           <span className="text-teal-700">{item.label}</span>
//           <span className={`font-semibold ${item.error ? 'text-red-600' : 'text-teal-600'}`}>{item.value}</span>
//         </div>
//       ))}
//     </div>
//     <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
//     <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 rounded-full filter blur-3xl opacity-20 -z-10"></div>
//   </div>
// </Card>

//     {/* Records and File Size Distribution */}
//     <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200 ring-1 ring-teal-300">
//       <h2 className="text-2xl font-bold text-teal-800 mb-4">Records and File Size Distribution</h2>
//       <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={dummyData.ingestionData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
//         <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar yAxisId="left" dataKey="records" name="Records" fill="#00796B" />
//         <Bar yAxisId="right" dataKey="size" name="File Size (KB)" fill="#FFC107" />
//       </BarChart>
//     </ResponsiveContainer>
//     </div>

//     {/* Data Source Distribution */}
//     <Card className="border border-teal-200 ring-1 ring-teal-300">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Data Source Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={dummyData.sourceData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="totalRows" name="Total Rows" fill="#00796B" />
//             <Bar dataKey="duplicatesFound" name="Duplicates Found" fill="#FFC107" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Records Before and After Cleaning */}
//     <ChartCard   title={<span className="text-2xl font-bold text-teal-800 mb-4">Records Before and After Cleaning</span>} 
//  className="ring-1 ring-teal-300">
//       <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={dummyData.cleaningData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
//         <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar yAxisId="left" dataKey="beforeRecords" name="Before Cleaning" fill="#00796B" />
//         <Bar yAxisId="left" dataKey="afterRecords" name="After Cleaning" fill="#4DB6AC" />
//         <Line yAxisId="right" type="monotone" dataKey="dataQuality" name="Data Quality (%)" stroke="#FFC107" />
//       </BarChart>
//     </ResponsiveContainer>
//     </ChartCard>

//     {/* Data Quality Issues Found */}
//     <ChartCard 
//   title={<span className="text-2xl font-bold text-teal-800 mb-4">Data Quality Issues Found (Sample Data)</span>} 
//   className="ring-1 ring-teal-300"
// >
// <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={dummyData.qualityIssues} layout="vertical">
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis type="number" />
//         <YAxis dataKey="name" type="category" width={150} />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar dataKey="count" name="Issue Count" fill="#00796B" />
//       </BarChart>
//     </ResponsiveContainer>
//     </ChartCard>


//     {/* Number of Duplicates Found */}
//     <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-teal-200 ring-1 ring-teal-300">
//     <h2 className="text-2xl font-bold text-teal-800 mb-4">Number of Duplicates Found</h2>
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={dummyData.deduplicationData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar dataKey="duplicates" name="Duplicates" fill="#00796B" />
//         <Bar dataKey="afterRecords" name="Unique Records" fill="#4DB6AC" />
//       </BarChart>
//     </ResponsiveContainer>
//     </div>


//     {/* Records Before and After Deduplication */}
//     <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-teal-200 ring-1 ring-teal-300"> 
//     <h2 className="text-2xl font-bold text-teal-800 mb-4">Records Before and After Deduplication</h2> 
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={dummyData.deduplicationData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar dataKey="beforeRecords" name="Before Deduplication" fill="#00796B" />
//         <Bar dataKey="afterRecords" name="After Deduplication" fill="#4DB6AC" />
//       </BarChart>
//     </ResponsiveContainer>
//       </div>
//     {/* Processing Time by Stage */}
//     <Card className="border border-teal-200 ring-1 ring-teal-300">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Processing Time by Stage</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={dummyData.processingTimes}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="stage" tick={{ fill: '#4a5568', fontWeight: '500' }} />
//             <YAxis 
//               tick={{ fill: '#4a5568', fontWeight: '500' }} 
//               label={{ value: 'Time (minutes)', angle: -90, position: 'insideLeft' }}
//             />
//             <Tooltip 
//               content={({ payload, label }) => {
//                 if (payload && payload.length) {
//                   const time = payload[0].value;
//                   const hours = Math.floor(time / 60);
//                   const minutes = time % 60;
//                   return (
//                     <div className="bg-white p-2 border border-gray-300 rounded shadow">
//                       <p className="font-bold">{label}</p>
//                       <p>{`${hours}h ${minutes}m`}</p>
//                     </div>
//                   );
//                 }
//                 return null;
//               }}
//             />
//             <Legend />
//             <Bar dataKey="time" name="Processing Time" fill="#38b2ac" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>

//     {/* Pipeline Stage Distribution */}
//     <Card className="border border-teal-200 ring-1 ring-teal-300">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-teal-800 mb-4">Pipeline Stage Distribution</h2>
//         <ResponsiveContainer width="100%" height={350}>
//       <PieChart>
//         <Pie
//           data={dummyData.pipelineStageDistribution}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           outerRadius={150}
//           fill="#8884d8"
//           dataKey="time"
//           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//         >
//           {dummyData.pipelineStageDistribution.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//       </div>
//     </Card>
//     {/* Error Counts by Type */}
//     <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300 ring-1 ring-teal-300 col-span-2">
//       <h2 className="text-3xl font-semibold text-red-800 mb-6">Error Trends Over Time</h2>
//       <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={dummyData.sourceData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="errorRows" name="Error Rows" fill="#F44336" />
//           </BarChart>
//         </ResponsiveContainer>
//     </div>
//   </motion.div>
// );

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
    <BarChart 
      data={dummyDataQualityIssues} 
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }} // Reduced left margin
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        type="number" 
        domain={[0, 600]} // Set explicit domain to match screenshot
        tickCount={7} // Control number of ticks
      />
      <YAxis 
        dataKey="name" 
        type="category" 
        width={100} // Reduced width
        axisLine={false} // Remove axis line
        tickLine={false} // Remove tick lines
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar 
        dataKey="count" 
        name="Issue Count" 
        barSize={20} // Control bar height
      >
        {dummyDataQualityIssues.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
          />
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
        <BarChart data={deduplicationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="before" name="Before" fill="#00796B" />
          <Bar dataKey="after" name="After" fill="#4DB6AC" />
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
        <AreaChart data={deduplicationImpactData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="size" 
            name="Data Size (GB)" 
            stroke="#00796B" 
            fill="#00796B" 
            fillOpacity={0.3} 
          />
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
          <XAxis 
            dataKey="timeSeconds" 
            name="Processing Time (seconds)" 
            type="number" 
          />
          <YAxis 
            dataKey="efficiency" 
            name="Efficiency (%)" 
            type="number" 
            domain={[95, 100]} 
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter 
            name="Batch Processing" 
            data={deduplicationTimeEfficiency} 
            fill="#00796B" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Deduplication Trend Over Time">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={deduplicationTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
          <YAxis yAxisId="right" orientation="right" stroke="#FFC107" />
          <Tooltip />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="recordsProcessed" 
            name="Records Processed" 
            fill="#00796B" 
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="duplicateRate" 
            name="Duplicate Rate (%)" 
            stroke="#FFC107" 
          />
        </ComposedChart>
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
    <LineChart 
      data={performanceImprovementData}
      margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis 
        dataKey="metric" 
        angle={-45}
        textAnchor="end"
        height={60}
      />
      <YAxis 
        tickFormatter={(value) => `${value}%`}
        domain={[-50, 50]}
      />
      <Tooltip
        content={({ active, payload, label }) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-white p-2 border border-gray-200 rounded shadow">
                <p className="font-semibold">{label}</p>
                <p className={`text-sm ${payload[0].value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {`Improvement: ${payload[0].value}%`}
                </p>
              </div>
            );
          }
          return null;
        }}
      />
      <Line 
        type="monotone" 
        dataKey="improvement" 
        stroke="#00796B" 
        strokeWidth={2}
        dot={{ 
          fill: '#00796B',
          stroke: '#00796B',
          strokeWidth: 2,
          r: 6 
        }}
        activeDot={{ 
          fill: '#00796B',
          stroke: '#fff',
          strokeWidth: 2,
          r: 8 
        }}
      />
    </LineChart>
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