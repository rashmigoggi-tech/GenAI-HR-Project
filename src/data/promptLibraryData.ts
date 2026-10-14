import { PromptItem } from '../types';

export const ALL_PROMPTS: PromptItem[] = [
  // ================= App Building (Lovable) =================
  {
    id: 'pr-lovable-1',
    title: 'Minimalist Single-Page Dashboard with Local Persistence',
    category: 'App Building',
    tool: 'lovable',
    purpose: 'Generate an interactive dashboard with stats, searchable table, modal form, and localStorage sync.',
    requiredInputs: ['App Domain (e.g., Client CRM)', 'Metrics to show (3-4 numbers)', 'Table columns'],
    promptTemplate:
      'Build a modern, responsive web application for [App Domain]. Layout specifications:\n1. Top stats bar showing: [Metric 1], [Metric 2], [Metric 3] with icon indicators.\n2. Header with search input, status filter dropdown, and "+ Add New" button.\n3. Interactive table showing [Columns List] with status badges and action buttons (Edit, Delete).\n4. Clicking "+ Add New" opens a slide-over modal with validated input fields.\n5. Store all records in localStorage so data persists on refresh. Style with light neutral background, crisp borders, and clean typography.',
    customizationTips:
      'Replace the bracketed variables with your domain. For recruitment: candidates, stage, applied date; for finance: expense name, amount, category.',
    expectedOutput:
      'A complete React application with working search filter, modal form state, and localStorage persistence.',
    limitations:
      'Does not connect to external multi-user databases out of the box unless Supabase or backend API is attached.',
    tags: ['Dashboard', 'CRUD', 'LocalStorage', 'Beginner'],
  },
  {
    id: 'pr-lovable-2',
    title: 'Recruitment Candidate Tracking Application',
    category: 'Recruitment',
    tool: 'lovable',
    purpose: 'Build a dedicated candidate review interface with stage pipeline filtering.',
    requiredInputs: ['Company Name', 'Initial Candidate Roles', 'Recruiter Names'],
    promptTemplate:
      'Build a Candidate Tracking Application in React. Features:\n1. Pipeline stage tabs: All, Screening, Interviewing, Offer, Closed.\n2. Candidate cards showing: Candidate Name, Role Applied, Match Rating (1-5 stars), Recruiter Assigned, and Next Follow-up Date.\n3. Quick action buttons on each card to advance to next stage or mark as closed.\n4. Search bar filtering by candidate name and skill tags.\nUse neutral light surfaces, rounded-xl cards, and indigo accent buttons. Populate with 6 synthetic candidate profiles.',
    customizationTips:
      'Specify exact roles (e.g. Frontend Engineer, Product Manager) to tailor synthetic records.',
    expectedOutput:
      'A visual candidate board with instant status updates and interactive stage filters.',
    limitations: 'All records are synthetic; human evaluation is required.',
    tags: ['Recruitment', 'HR', 'Pipeline', 'Cards'],
  },

  // ================= UI/UX Design (Google Stitch) =================
  {
    id: 'pr-stitch-1',
    title: 'Clean Executive Dashboard Layout Specification',
    category: 'UI/UX Design',
    tool: 'stitch',
    purpose: 'Generate a structured design brief and layout hierarchy for business dashboards.',
    requiredInputs: ['Screen Name', 'Key Metrics', 'Primary Chart / Table Area', 'Action Items'],
    promptTemplate:
      'Design a modern, light-theme UI for [Screen Name] following high-craft design principles:\n- Canvas Surface: Soft neutral (#F8FAFC) with pure white (#FFFFFF) container cards and subtle border (#E2E8F0).\n- Typography: Inter or SF Pro; 24px semi-bold header, 14px medium body, 12px muted metadata.\n- Layout Structure: 4 top metric cards (4-column grid), followed by a 70/30 split below. Left 70% is [Primary Data Table]; right 30% is [Action Items / Activity Feed].\n- Accent Color: Indigo (#4F46E5) reserved strictly for primary buttons and active indicators. Zero unnecessary pills or rainbow tags.',
    customizationTips: 'Keep color accents restrained to avoid visual clutter.',
    expectedOutput: 'A clean layout wireframe and component hierarchy specification ready for coding.',
    limitations: 'Focuses on visual layout and contrast; backend logic must be specified separately.',
    tags: ['Design System', 'Wireframe', 'Zero-Pill', 'Typography'],
  },
  {
    id: 'pr-stitch-2',
    title: 'Accessible Form & Multi-Step Wizard Interface',
    category: 'UI/UX Design',
    tool: 'stitch',
    purpose: 'Design a clean onboarding or intake form with high-contrast labels and error states.',
    requiredInputs: ['Form Title', 'Step 1 Fields', 'Step 2 Fields', 'Step 3 Fields'],
    promptTemplate:
      'Design a 3-step accessible intake wizard for [Form Title].\n- Step indicator showing: 1. Basic Details, 2. Experience & Preferences, 3. Review & Submit.\n- Form controls: Generous 44px tap targets, high contrast dark labels (#0F172A), subtle focus rings, and inline helper text.\n- Validation state: Amber warning for missing non-critical fields, red for invalid required formats.\n- Mobile-first responsiveness with single-column flow on small viewports.',
    customizationTips: 'Ideal for job applications, client onboarding, or survey questionnaires.',
    expectedOutput: 'Step-by-step UI wireframe with state variations.',
    limitations: 'Ensure all inputs adhere to WCAG 2.1 AA color contrast standards.',
    tags: ['Forms', 'Wizard', 'Accessibility', 'Mobile'],
  },

  // ================= Gemini Prompting (Google AI Studio) =================
  {
    id: 'pr-aistudio-1',
    title: 'Deterministic JSON Entity Extraction with Uncertainty Flagging',
    category: 'Gemini Prompting',
    tool: 'ai-studio',
    purpose: 'Extract structured attributes from unstructured text without hallucinations.',
    requiredInputs: ['Source Text', 'Target JSON Schema', 'Mandatory Fields'],
    promptTemplate:
      'System Instruction: You are a strict, objective data extraction engine. You extract ONLY facts explicitly stated in the provided text. Never extrapolate, guess, or assume missing details.\n\nTask: Extract information from the input text into this exact JSON schema:\n[INSERT JSON SCHEMA]\n\nCritical Guardrails:\n1. If a value is not explicitly mentioned, assign null and add the field name to the "uncertainOrMissing" array.\n2. Do NOT output conversational text, preamble, or markdown backticks.\n3. Return strictly valid raw JSON.',
    customizationTips:
      'Set temperature to 0.0 in Google AI Studio to achieve maximum repeatability and determinism.',
    expectedOutput: 'Pure valid JSON passing standard JSON parsers with zero invented data.',
    limitations: 'If the input text is completely garbled or missing, all fields will be null.',
    tags: ['JSON', 'Extraction', 'Anti-Hallucination', 'Strict'],
  },
  {
    id: 'pr-aistudio-2',
    title: 'Objective Job Description Generator with Anti-Bias Filter',
    category: 'Recruitment',
    tool: 'ai-studio',
    purpose: 'Generate an inclusive, professional job description from raw hiring notes.',
    requiredInputs: ['Role Title', 'Department', 'Years of Experience', 'Required Skills', 'Location'],
    promptTemplate:
      'System Instruction: You are an inclusive Talent Acquisition Director committed to fair, non-discriminatory hiring. Avoid gendered terms, aggressive idioms ("ninja", "crush it"), and arbitrary degree requirements unless legally required.\n\nGenerate a Job Description for:\nRole: [Role Title]\nDepartment: [Department]\nExperience: [Years]\nCore Skills: [Required Skills]\nLocation: [Location]\n\nStructure:\n1. About the Role & Team Mission\n2. Key Responsibilities (5-6 outcome-focused bullets starting with active verbs)\n3. Required Skills & Competencies (strictly essential)\n4. Preferred / Bonus Skills (realistic)\n5. Benefits & Workplace Environment\n6. Equal Opportunity & Human Review Guarantee',
    customizationTips: 'Review the output to ensure local labor law compliance.',
    expectedOutput: 'A complete, balanced, and attractive job description.',
    limitations: 'Must be verified by a human recruiter and department manager prior to posting.',
    tags: ['Recruitment', 'Job Description', 'Anti-Bias', 'HR'],
  },
  {
    id: 'pr-aistudio-3',
    title: 'STAR Behavioral Interview Rubric Generator',
    category: 'Recruitment',
    tool: 'ai-studio',
    purpose: 'Create structured interview questions with objective evaluation criteria.',
    requiredInputs: ['Role', 'Seniority Level', 'Target Competencies', 'Interview Round'],
    promptTemplate:
      'Generate 4 structured interview questions for a [Role] at [Seniority Level] assessing: [Target Competencies].\nFor each question provide:\n- The exact question text using the STAR framework (Situation, Task, Action, Result).\n- What competency this specifically evaluates.\n- Strong Answer Indicators (concrete green flags with specific evidence).\n- Weak / Incomplete Answer Indicators (red flags or superficial answers).\n- One targeted follow-up probing question.\nEnsure all questions strictly evaluate verifiable job skills and exclude any questions regarding personal lifestyle or protected traits.',
    customizationTips: 'Use during pre-interview briefing to align the hiring committee.',
    expectedOutput: 'A standardized interview scoring rubric.',
    limitations: 'Human interviewers must remain empathetic and allow candidates to ask questions.',
    tags: ['Interview', 'STAR Method', 'Evaluation', 'Rubrics'],
  },

  // ================= Notion Systems =================
  {
    id: 'pr-notion-1',
    title: 'Comprehensive Candidate Tracking Database Schema',
    category: 'Notion Systems',
    tool: 'notion',
    purpose: 'Blueprint for a complete recruitment operating database in Notion.',
    requiredInputs: ['Department Name', 'Hiring Quarter', 'Stages to Include'],
    promptTemplate:
      'Design a Notion Recruitment Database for [Department Name] for [Hiring Quarter]. Detail:\n1. 12 Database Properties with exact Notion types (Title, Select, Multi-select, Date, Person, Formula, URL, Rollup).\n2. Exact color palettes for the Stage property: New (Gray), Screening (Blue), Interview (Purple), Offer (Green), Closed (Default).\n3. 5 Essential Views with exact filter and sort rules:\n   - Active Board (Kanban grouped by Stage)\n   - All Candidates (Table sorted by Applied Date)\n   - Interviews This Week (Calendar by Interview Date)\n   - Action Needed (Table filtered where Next Action <= Today)\n   - Closed Archive (Table where Stage is Closed/Rejected)\n4. Internal page layout for candidate evaluation scorecards.',
    customizationTips: 'Directly copy the property names when building your Notion database.',
    expectedOutput: 'A full schema document ready to build in Notion.',
    limitations: 'Manual property creation required inside the Notion UI.',
    tags: ['Notion', 'Database', 'Recruitment', 'Kanban'],
  },

  // ================= n8n Automations =================
  {
    id: 'pr-n8n-1',
    title: 'Webhook to Notion & Email Notification Pipeline',
    category: 'n8n Automations',
    tool: 'n8n',
    purpose: 'Automate applicant intake, database insertion, and candidate confirmation email.',
    requiredInputs: ['Webhook Path', 'Notion Database ID', 'Email Provider'],
    promptTemplate:
      'Provide the complete n8n workflow node configuration for [Workflow Title]:\n1. Webhook Trigger Node: HTTP Method POST, path "/apply". Receives candidateName, email, role, resumeUrl.\n2. IF Node: Validate that email contains "@" and candidateName is not empty.\n3. Notion Node: Create page in Database [Notion Database ID] mapping JSON keys to properties.\n4. Email Node: Send personalized confirmation to candidate informing them their application was received.\n5. Team Alert Node: Send Slack or webhook notification to hiring channel.\n6. Error Handler: Route validation failures to a dedicated log node.\nProvide all node parameters and JSON expression references.',
    customizationTips: 'Test with sample test webhooks before setting to Production in n8n.',
    expectedOutput: 'A complete n8n workflow blueprint with expression strings.',
    limitations: 'Requires configuring credentials for Notion and SMTP/Email service inside n8n.',
    tags: ['n8n', 'Webhook', 'Automation', 'Email'],
  },

  // ================= Finance =================
  {
    id: 'pr-fin-1',
    title: 'Invoice Line-Item JSON Extractor with Tax Verification',
    category: 'Finance',
    tool: 'ai-studio',
    purpose: 'Extract vendor bill information into accounting JSON with automated mathematical verification.',
    requiredInputs: ['Invoice Raw Text'],
    promptTemplate:
      'Analyze the provided invoice text and extract into structured JSON:\n{\n  "invoiceNumber": string,\n  "vendorName": string,\n  "vendorAddress": string,\n  "invoiceDate": "YYYY-MM-DD",\n  "dueDate": "YYYY-MM-DD",\n  "lineItems": [\n    {"description": string, "quantity": number, "unitPrice": number, "total": number}\n  ],\n  "subtotal": number,\n  "taxRate": number,\n  "taxAmount": number,\n  "grandTotal": number,\n  "mathVerification": {\n    "lineItemsSum": number,\n    "discrepancyDetected": boolean,\n    "notes": string\n  }\n}\nVerify that sum of line item totals equals subtotal, and subtotal + tax equals grandTotal. If numbers differ, flag discrepancyDetected: true.',
    customizationTips: 'Never pass unredacted bank account numbers.',
    expectedOutput: 'Valid JSON with calculated math checks.',
    limitations: 'Human finance review is required before approving payment disbursements.',
    tags: ['Finance', 'Invoices', 'Math Check', 'JSON'],
  },

  // ================= Sales =================
  {
    id: 'pr-sales-1',
    title: 'Personalized 4-Sentence B2B Value Outreach Email',
    category: 'Sales',
    tool: 'ai-studio',
    purpose: 'Write an executive-ready, non-spammy sales cold email grounded in prospect context.',
    requiredInputs: ['Prospect Name & Role', 'Prospect Company', 'Specific Trigger Event', 'Value Proposition'],
    promptTemplate:
      'Write a 4-sentence B2B email to [Prospect Name], [Prospect Role] at [Prospect Company].\nContext: [Specific Trigger Event, e.g. recent product launch, funding, or hiring surge].\nValue: [How our solution directly addresses a common operational bottleneck in that phase].\nConstraints:\n- Exactly 4 concise sentences. Total word count < 80 words.\n- No spammy greetings ("I hope you are well", "Quick question").\n- Low-friction interest-based call to action (e.g., "Open to seeing a 2-minute breakdown?").\n- Include a note reminding the rep to verify company facts before sending.',
    customizationTips: 'Personalize sentence 1 with actual research from LinkedIn or company news.',
    expectedOutput: 'A concise, high-converting email draft.',
    limitations: 'Must comply with regional cold-outreach regulations (CAN-SPAM / GDPR).',
    tags: ['Sales', 'Outreach', 'B2B', 'Email'],
  },

  // ================= Productivity & Study =================
  {
    id: 'pr-prod-1',
    title: 'SOP Process Documentation Generator',
    category: 'Productivity',
    tool: 'ai-studio',
    purpose: 'Turn conversational voice notes or meeting recordings into clear SOP documentation.',
    requiredInputs: ['Process Name', 'Raw Notes or Voice Transcript', 'Responsible Role'],
    promptTemplate:
      'Transform these unstructured notes about [Process Name] into a standard operating procedure (SOP):\nFormat:\n1. Title & Document ID\n2. Purpose & Target Outcome\n3. Responsible Role: [Responsible Role]\n4. Tools & Permissions Needed\n5. Step-by-Step Instructions (numbered, concise, each starting with an imperative action verb)\n6. Quality Verification Checklist\n7. Troubleshooting & Escalation Contact\nRaw Notes: [Insert raw notes]',
    customizationTips: 'Great for onboarding new team members or standardizing client handoffs.',
    expectedOutput: 'A production-ready company documentation article.',
    limitations: 'Ensure the operational owner reviews the final procedure for accuracy.',
    tags: ['SOP', 'Operations', 'Documentation', 'Productivity'],
  },
];
