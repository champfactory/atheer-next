export const avatarUrl = 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/7G27NF7X15XTBJGT825EP5VSJF.jpg';
export const primaryTabs = ['Equipment', 'Training', 'Parts', 'Finder', 'Workflows'];

export const sidebarItems = [
  { label: 'Home', icon: 'home', shape: null, subtitle: null },
  { label: 'Planning', icon: 'planning', shape: 'triangle', subtitle: 'Lindgren cert expires tomorrow' },
  { label: 'Forms', icon: 'forms', shape: 'square', subtitle: 'Safety step skipped · #4042' },
  { label: 'Jobs', icon: 'jobs', shape: 'triangle', subtitle: 'Rework flagged · #4021' },
  { label: 'Content', icon: 'content', shape: null, subtitle: null },
  { label: 'Sessions', icon: 'sessions', shape: 'square', subtitle: 'Lindgren + Reeves need guidance' },
  { label: 'Assets', icon: 'assets1', shape: 'square', subtitle: '1 asset down at Meridian' },
  { label: 'Assets', icon: 'assets2', shape: null, subtitle: 'Rework rate up 40% this week' },
  { label: 'Tickets', icon: 'tickets', shape: null, subtitle: null },
  { label: 'Settings', icon: 'settings', shape: null, subtitle: null },
];

export const equipmentData = [
  {
    name: 'Arctos 48', make: 'Arctos', model: 'UC-248F', year: '2022',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS5VDF9FVBQ4VWB1EE1G0PS.jpg', width: 129, height: 129, left: 49, top: 21 },
    people: ['Elena Vasquez', 'Raj Patel'],
    resources: ["UC-248F Owner's Manual", 'R-404A Refrigerant SDS'],
    workflows: ['Quarterly Coolant Check'],
  },
  {
    name: 'Vortaire MX', make: 'Vortaire', model: 'MX-5200', year: '2021',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS5ZEA8AENM05KGP1QA692E.jpg', width: 73, height: 129, left: 77, top: 21 },
    people: ['James Whitfield', 'Dana Kowalski'],
    resources: ['MX-5200 Service Manual'],
    workflows: ['Replace Agitator Seals', 'Align Impeller Assembly', 'CIP Vessel Flush'],
  },
  {
    name: 'Polaris 72', make: 'Polaris', model: 'PR-72T3SS', year: '2019',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS625QZ7R2E96V6V5CDJTNJ.jpg', width: 129, height: 129, left: 49, top: 21 },
    people: ['Marcus Chen'],
    resources: ['PR-72T3SS Spec Sheet', 'Compressor Parts Catalog'],
    workflows: ['Defrost Heater Replacement'],
  },
  {
    name: 'Brimstone Pro', make: 'Brimstone', model: 'HP-636N', year: '2020',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS64CP6WVCWG544BE5M5V9V.jpg', width: 129, height: 129, left: 49, top: 21 },
    people: ['Sofia Reyes'],
    resources: [],
    workflows: ['Inspect Gas Supply Lines', 'Replace Thermocouple', 'Calibrate Burner Valves', 'Re-seat Pilot Assembly', 'Clean Burner Ports', 'Test Flame Safeguard', 'Annual Gas Leak Check', 'Season Cast Iron Grates', 'Vent Hood Flow Verification'],
  },
];

export const trainingTabs = ['Welcome', 'Job Aids', 'SOP', 'Onboarding'];
export const trainingFilters = ['A-Z', 'Recently', 'Unread'];

export const trainingData = {
  Welcome: {
    workflows: ['Burner Calibration Walkthrough', 'Commercial Kitchen Equipment 101', 'EPA 608 Prep Course', 'Gas Appliance Safety Basics', 'Refrigeration Systems Overview'],
    resources: ['Arctos UC Series Field Guide', 'Employee Handbook', 'Field Service Standards v3.1', 'Lockout/Tagout for Kitchen Equipment'],
    people: ['Marcus Chen'],
  },
  'Job Aids': {
    workflows: [],
    resources: [],
    people: ['Raj Patel'],
  },
  SOP: {
    workflows: ['Arctos UC-248F Compressor LOTO', 'Brimstone HP-636N Gas Isolation', 'Vortaire MX-5200 Seal Replacement SOP'],
    resources: ['Field Service Standards v3.1', 'Incident & Near Miss Reporting', 'R-404A Refrigerant Handling Guide'],
    people: ['Elena Vasquez', 'James Whitfield'],
  },
  Onboarding: {
    workflows: ['Company Introduction Training', 'First Service Call Observation', 'New Technician Onboarding Checklist', 'Tool & Equipment Orientation'],
    resources: ['Company Vision & Mission', 'Employee Handbook'],
    people: ['Dana Kowalski', 'Sofia Reyes'],
  },
};

export const workflowsData = {
  workflows: [
    'Align Impeller Assembly', 'Annual Gas Leak Check', 'Arctos UC-248F Compressor LOTO',
    'Brimstone HP-636N Gas Isolation', 'Burner Calibration Walkthrough', 'Calibrate Burner Valves',
    'CIP Vessel Flush', 'Clean Burner Ports', 'Commercial Kitchen Equipment 101',
    'Company Introduction Training', 'Defrost Heater Replacement', 'EPA 608 Prep Course',
    'First Service Call Observation', 'Gas Appliance Safety Basics', 'Inspect Gas Supply Lines',
    'New Technician Onboarding Checklist', 'Quarterly Coolant Check', 'Refrigeration Systems Overview',
    'Replace Agitator Seals', 'Replace Thermocouple', 'Re-seat Pilot Assembly',
    'Season Cast Iron Grates', 'Test Flame Safeguard', 'Tool & Equipment Orientation',
    'Vent Hood Flow Verification', 'Vortaire MX-5200 Seal Replacement SOP',
  ],
  resources: [
    'Arctos UC Series Field Guide', 'Company Vision & Mission', 'Compressor Parts Catalog',
    'Employee Handbook', 'Field Service Standards v3.1', 'Incident & Near Miss Reporting',
    'Lockout/Tagout for Kitchen Equipment', 'MX-5200 Service Manual', 'PR-72T3SS Spec Sheet',
    'R-404A Refrigerant Handling Guide', 'R-404A Refrigerant SDS', "UC-248F Owner's Manual",
  ],
  people: ['Dana Kowalski', 'Elena Vasquez', 'James Whitfield', 'Marcus Chen', 'Raj Patel', 'Sofia Reyes'],
};

export const finderRow1 = [
  { name: 'Compressor Kit', partNumber: '991172', price: '$485', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSAQAY8DK5BTS9NZ3B2PA2V.jpg', make: 'True / Tecumseh', model: 'AE4440Y-AA1A', year: '2022', resource: null },
  { name: 'Evaporator Fan Motor', partNumber: '800401', price: '$89', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSARPT5QCVKHKFK0VFY2KN4.webp', make: 'True', model: '9W Shaded-Pole', year: '2021', resource: null },
  { name: 'Planetary Gear', partNumber: '00-437692', price: '$312', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSATFTVRR2J5E7AYTCP0BSX.webp', make: 'Hobart', model: '59-Tooth Ring', year: '2023', resource: 'HS Series Belt Guide' },
  { name: 'Planetary Oil Seal', partNumber: '00-024651', price: '$24', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSATV2T9V8ZE6JF1V4GB9P4.webp', make: 'Hobart', model: 'H600/M802', year: '2023', resource: 'HS Seres Gear Box' },
];

export const finderRow2 = [
  { name: 'Door Hinge Kit', partNumber: '870837', price: '$67', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB4TNBMB1XB2SJPDT4B52Z.webp', make: 'True', model: 'Spring Cartridge', year: '2022', resource: 'Polaris 72 Hinge Guide' },
  { name: 'Shelf Clips', partNumber: '920158', price: '$18', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB5KRR9YJ0Q8F2MRV7G7AF.webp', make: 'True', model: 'SS Dovetail', year: '2022', resource: 'Polaris 72 Shelf Guide' },
  { name: 'Burner Valve', partNumber: '00-710121', price: '$142', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB8SC55A0AXWW547K1GKXA.webp', make: 'Vulcan', model: '1/4" MPT Inlet', year: '2023', resource: 'Brimstone Valve Guide' },
  { name: 'Burner Ignitor', partNumber: '00-423754', price: '$93', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB9A6A8E5DTZBJRAPF4V0K.jpg', make: 'Vulcan / Fenwal', model: '3-Probe Assembly', year: '2023', resource: null },
];

export const homeStats = [
  'Fri Mar 3 2026',
  '3 Jobs Scheduled',
  '1 of 3 In Progress',
  '5.5 Hrs Remain',
  '1 Certification Gap',
];

export const homeSubTabs = ['Current Job', 'Certifications', 'Quick Actions'];

export const jobCards = [
  {
    id: '#4042', status: 'triangle', company: 'Harborview Hotel', time: '8am · Main Kitchen',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/4897K3FN3NG91X0MCE3YE3VJNB.jpg',
    equipment: ['Quarterly Coolant Check', 'Arctos 48', 'UC-248F'],
    progress: ['Step 3 of 8', '2hr Estimate', '1.5hr Elapsed'],
    links: [{ icon: 'study', label: 'Study' }, { icon: 'list', label: 'Continue Workflow' }, { icon: 'hand', label: 'Request Help' }],
  },
  {
    id: '#4049', status: 'circle', company: 'Lennox Catering', time: '10am · Prep Kitchen',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/75PGDGM8902XB6T7536BMYHQXY.jpg',
    equipment: ['Replace Agitator Seals', 'Vortaire MX', 'MX-5200'],
    progress: ['Step 1 Awaits', '4hr Estimate'],
    links: [{ icon: 'study', label: 'Study' }, { icon: 'list', label: 'Start Workflow' }],
  },
  {
    id: '#4056', status: 'circle', company: 'Pinnacle Dining', time: '2pm · Banquet Hall',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/3PMC01AEP72G4ZWJZ8BQHEZQ6H.jpg',
    equipment: ['Calibrate Burner Valves', 'Brimstone Pro', 'HP-636N'],
    progress: ['Step 1 Awaits', '2hr Estimate'],
    links: [{ icon: 'study', label: 'Study' }, { icon: 'certBadge', label: 'Certification' }, { icon: 'list', label: 'Start Workflow' }],
  },
];

export const certRows = [
  { icon: 'warningFilled', text: 'EPA 608 Certification Expires Tomorrow', link: 'Renew' },
  { icon: 'shieldCheck', text: 'Gas Appliance Type 1', link: null },
  { icon: 'shieldCheck', text: 'OSHA Electrical Safety', link: null },
  { icon: 'shieldCheck', text: 'ServSafe Equipment Hygiene', link: null },
];

export const quickActions = [
  { icon: 'wind', label: 'Order Replacement Parts' },
  { icon: 'clipboardLight', label: 'Report Equipment Issue' },
  { icon: 'gearLight', label: 'Start Remote Assist' },
  { icon: 'creditCard', label: 'Submit Inspection Report' },
  { icon: 'compass', label: 'View Service Procedures' },
];

export const settingsProfile = [
  'Display Name',
  'Email Address',
  'Phone Number',
  'Profile Photo',
  'Preferred Language',
];

export const settingsWork = [
  'Home Region',
  'Shift Schedule',
  'Dispatch Preference',
  'Parts Authorization Limit',
  'Vehicle Assignment',
  'Service Specialties',
  'Tool Inventory',
];

export const settingsNotifications = [
  'Job Assignments',
  'Schedule Changes',
  'Certification Alerts',
  'Safety Bulletins',
  'Team Messages',
  'Customer Feedback',
];
