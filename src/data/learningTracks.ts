import { ToolTrack } from '../types';

export const TOOL_TRACKS: ToolTrack[] = [
  {
    id: 'lovable',
    name: 'Lovable',
    tagline: 'AI-Powered Web Application Development',
    description:
      'Turn natural language descriptions into full-stack, responsive web applications with interactive state, forms, tables, and backend connections without writing manual boilerplate code.',
    badge: 'App Builder',
    iconName: 'Layout',
    accentColor: '#3B82F6',
    freeTierDetails:
      'Lovable offers a free starter tier with complimentary project credits. You can build, test, and preview applications in browser sandboxes without paid plans or credit cards.',
    whatYouWillBuild: [
      'Personal portfolio website with project showcases',
      'AI study planner with task checkoffs',
      'Recruitment candidate management application',
      'Expense tracking dashboard with category filters',
      'Sales lead pipeline board',
    ],
    modules: [
      {
        id: 'lovable-m1',
        toolId: 'lovable',
        title: 'Module 1: Foundations of AI App Building',
        description: 'Understand how natural language prompts convert into working React components and databases.',
        lessons: [
          {
            id: 'lovable-l1',
            toolId: 'lovable',
            moduleId: 'lovable-m1',
            moduleTitle: 'Foundations of AI App Building',
            title: 'What Lovable Is & How AI Generates Code',
            description:
              'Learn how Lovable takes your text prompt, understands user flows, and generates clean code with components, styles, and data structures.',
            durationMinutes: 15,
            level: 'Beginner',
            concepts: [
              'No-Code vs Low-Code vs AI-Assisted Development',
              'The anatomy of a web application (UI, State, Backend)',
              'How Lovable interprets user intent from English sentences',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Access the Lovable Workspace',
                instruction: 'Open Lovable in your browser. Notice the central prompt bar and the live preview canvas.',
                tip: 'Think of Lovable as an experienced junior engineer who executes your written product specifications.',
              },
              {
                stepNumber: 2,
                title: 'Deconstruct a Product Idea',
                instruction:
                  'Before typing, list: 1) Who is the user? 2) What is the main action? 3) What data needs to be shown?',
                tip: 'Never start with vague prompts like "make an app". Always specify concrete screens and data.',
              },
              {
                stepNumber: 3,
                title: 'Inspect the Live Preview Window',
                instruction:
                  'Explore how changes update the UI in real time, and how you can switch between desktop and mobile viewport previews.',
              },
            ],
            samplePrompts: [
              {
                label: 'Beginner App Prompt',
                prompt:
                  'Build a clean, minimalist single-page Task & Study Planner. Include a title header with today’s date, an input form to add tasks (task title, subject tag, priority: Low/Medium/High), and an interactive task list where clicking a checkbox marks items complete. Style with modern indigo buttons and rounded white cards on a light gray background.',
                whyItWorks:
                  'It specifies the exact layout, fields, interaction (checkbox completion), and aesthetic guidelines.',
              },
            ],
            expectedResult:
              'A functional web application displaying a task creation form, interactive task rows, filter tabs (All, Active, Completed), and clean styling.',
            exercise: {
              task: 'Modify the prompt to add an estimated duration badge (e.g., 25 mins, 45 mins) next to each task row.',
              hint: 'In your prompt, add: "Add an estimated time selector (15m, 30m, 45m, 60m) to the form and display a clock icon badge on each task card."',
              solution:
                'Include "Add an estimated time dropdown in the task input form, and show a subtle pill badge with the duration on each task item."',
            },
            troubleshooting: [
              {
                issue: 'The generated UI looks too cluttered or packed together.',
                fix: 'Prompt: "Refactor the layout to use generous white space, padding: p-6, max-width: max-w-4xl, and clean borders instead of heavy drop shadows."',
              },
            ],
          },
          {
            id: 'lovable-l2',
            toolId: 'lovable',
            moduleId: 'lovable-m1',
            moduleTitle: 'Foundations of AI App Building',
            title: 'Writing Precision Application-Building Prompts',
            description:
              'Master the 4-part formula for high-accuracy app generation: Role, Page Structure, Data Schema, and User Interactions.',
            durationMinutes: 20,
            level: 'Beginner',
            concepts: [
              'The 4-part Prompt Formula for Software',
              'Defining Mock Data upfront to avoid generic placeholders',
              'Specifying empty states and error validations',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Draft the Data Schema First',
                instruction: 'Define the data attributes (e.g. Candidate: name, role, email, status, rating).',
                tip: 'Clear data entities prevent AI from guessing random fields.',
              },
              {
                stepNumber: 2,
                title: 'Specify Key User Interactions',
                instruction: 'Describe what happens on click, on submit, and on delete.',
              },
              {
                stepNumber: 3,
                title: 'Iterate Incrementally',
                instruction: 'Prompt one screen or one core feature at a time rather than 10 complex pages at once.',
              },
            ],
            samplePrompts: [
              {
                label: 'Candidate Tracker Prompt',
                prompt:
                  'Create a Recruitment Candidate Tracker. Include: 1) Stats bar showing Total Applied, In Review, Interviewing, and Offered. 2) Search bar and role filter dropdown. 3) A table listing candidates with columns: Name, Position, Applied Date, Stage (badge), and Action button (View Details). Populate with 5 realistic synthetic candidate rows.',
                whyItWorks:
                  'Explicitly requests synthetic realistic data and breaks down components into stats bar, search, and table.',
              },
            ],
            expectedResult:
              'A searchable table with status badges and filter controls that filter table rows based on user input.',
            exercise: {
              task: 'Add a "Quick Add Candidate" slide-over drawer or modal.',
              hint: 'Ask Lovable to add a "+ Add Candidate" button that opens an accessible modal with input fields.',
              solution:
                'Prompt: "Add a prominent + Add Candidate button in the top right. When clicked, open a slide-out modal with Name, Email, Role, and Stage inputs. Submitting adds the new candidate to the state."',
            },
            troubleshooting: [
              {
                issue: 'The table resets every time the page refreshes.',
                fix: 'Prompt: "Store the candidate list in browser localStorage so newly added records persist between page refreshes."',
              },
            ],
          },
        ],
      },
      {
        id: 'lovable-m2',
        toolId: 'lovable',
        title: 'Module 2: Layouts, Forms & State Management',
        description: 'Construct multi-page navigations, responsive forms, and stateful components.',
        lessons: [
          {
            id: 'lovable-l3',
            toolId: 'lovable',
            moduleId: 'lovable-m2',
            moduleTitle: 'Layouts, Forms & State Management',
            title: 'Building Interactive Data-Entry Applications',
            description: 'Learn how to handle user inputs, validations, error toasts, and responsive grid layouts.',
            durationMinutes: 25,
            level: 'Beginner',
            concepts: [
              'Form inputs, radio groups, and select dropdowns',
              'Validation messages (e.g., required fields, valid email)',
              'Feedback alerts and success notifications',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Structure the Form Grid',
                instruction: 'Use a two-column responsive grid on desktop and single column on mobile screens.',
              },
              {
                stepNumber: 2,
                title: 'Enforce Required Validation',
                instruction: 'Request clear inline error messages when a user attempts to submit an empty form.',
              },
            ],
            samplePrompts: [
              {
                label: 'Expense Intake Form',
                prompt:
                  'Build an Expense Logging Form with fields: Expense Name (text), Amount (number with currency prefix $), Category (dropdown: Travel, Meals, Software, Office), Date picker, and Notes. Add client-side validation that requires Amount > 0 and Name not empty. Display a success toast banner upon submission.',
                whyItWorks: 'Every field has an explicit type and validation constraint.',
              },
            ],
            expectedResult:
              'A validated form that computes a running total of submitted expenses in a summary card below.',
            exercise: {
              task: 'Add a category breakdown pie chart or progress bar showing spending by category.',
              hint: 'Prompt Lovable to calculate category totals dynamically and render visual percentage bars.',
              solution:
                'Prompt: "Under the summary card, render a breakdown showing the percentage spent per category with colored progress bars."',
            },
            troubleshooting: [
              {
                issue: 'Mobile inputs zoom or overflow horizontally.',
                fix: 'Prompt: "Ensure all form inputs have text-base on mobile to prevent iOS auto-zoom, and wrap forms in w-full max-w-md mx-auto."',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ai-studio',
    name: 'Google AI Studio',
    tagline: 'Gemini Models, AI Prompting & Prototyping',
    description:
      'Master Google AI Studio to experiment with Gemini models, write production-grade system prompts, configure temperature and top-P, extract structured data, and build functional AI prototypes.',
    badge: 'Gemini Expert',
    iconName: 'Sparkles',
    accentColor: '#4F46E5',
    freeTierDetails:
      'Google AI Studio provides generous free rate limits for developers and learners exploring Gemini models. You can test prompts, try multimodal inputs, and get API keys without upfront fees.',
    whatYouWillBuild: [
      'AI Job description draft generator with inclusive language audits',
      'Competency-based interview question generator with STAR rubrics',
      'Resume information extraction assistant for structured candidate profiles',
      'Interview feedback summarizer separating factual observations from summaries',
      'Customer feedback sentiment and urgency classifier',
    ],
    modules: [
      {
        id: 'aistudio-m1',
        toolId: 'ai-studio',
        title: 'Module 1: Foundations of Gemini & AI Studio',
        description: 'Understand Large Language Models, model parameters, and the AI Studio workspace.',
        lessons: [
          {
            id: 'aistudio-l1',
            toolId: 'ai-studio',
            moduleId: 'aistudio-m1',
            moduleTitle: 'Foundations of Gemini & AI Studio',
            title: 'Introduction to Gemini Models & Studio Interface',
            description:
              'Explore the AI Studio workspace: System Instructions, User Prompt box, Model selector, and Output pane.',
            durationMinutes: 15,
            level: 'Beginner',
            concepts: [
              'Tokens, Context Windows, and Temperature',
              'System Instructions vs User Prompts',
              'Gemini Model tiers (e.g. gemini-3.8-flash for speed and low cost)',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Open Google AI Studio',
                instruction: 'Navigate to aistudio.google.com and sign in with your Google account.',
                tip: 'Familiarize yourself with the temperature slider: 0.0 is strict and deterministic; 1.0 is creative.',
              },
              {
                stepNumber: 2,
                title: 'Set up System Instructions',
                instruction:
                  'Click the System Instructions field. Define who the AI is and what safety/format boundaries it must obey.',
              },
              {
                stepNumber: 3,
                title: 'Test First Generation',
                instruction:
                  'Enter a simple prompt in the user box, click Run, and inspect the response time and token count.',
              },
            ],
            samplePrompts: [
              {
                label: 'System Instruction for HR Assistant',
                prompt:
                  'System Instruction: You are an objective Talent Acquisition Specialist. Always format responses in clean Markdown with clear headings. Only use factual, job-related criteria. Never assume or infer candidate age, gender, race, or personal traits. If context is missing, ask clarifying questions instead of inventing information.',
                whyItWorks: 'Establishes persona, formatting rules, anti-bias guardrails, and anti-hallucination rules.',
              },
            ],
            expectedResult:
              'A consistently structured answer that adheres strictly to the defined persona and boundaries.',
            exercise: {
              task: 'Test the same prompt at temperature 0.0 vs temperature 1.0 and compare the outputs.',
              hint: 'Notice how 0.0 gives precise, repeatable answers while 1.0 introduces varied adjectives and styles.',
              solution: 'Document how lower temperature is preferred for extraction and higher for brainstorming.',
            },
            troubleshooting: [
              {
                issue: 'The model gives overly long, conversational fluff before the answer.',
                fix: 'In System Instruction, add: "Be direct and concise. Omit conversational preamble like \'Sure, here is...\'. Begin immediately with the structured output."',
              },
            ],
          },
          {
            id: 'aistudio-l2',
            toolId: 'ai-studio',
            moduleId: 'aistudio-m1',
            moduleTitle: 'Foundations of Gemini & AI Studio',
            title: 'Structured Outputs & JSON Schema Extraction',
            description: 'Learn how to instruct Gemini to return clean JSON objects for reliable downstream automations.',
            durationMinutes: 20,
            level: 'Beginner to Intermediate',
            concepts: [
              'What is JSON and why automations need it',
              'Using response schemas vs prompt-based JSON instructions',
              'Validating missing vs populated fields',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Define Field Names Clearly',
                instruction:
                  'Specify exact keys like "candidateName", "yearsExperience", "topSkills", "flaggedGaps".',
              },
              {
                stepNumber: 2,
                title: 'Provide a Few-Shot Example',
                instruction: 'Show the model an example input and the exact JSON output expected.',
              },
            ],
            samplePrompts: [
              {
                label: 'Resume Extraction Schema Prompt',
                prompt:
                  'Extract key qualifications from the provided synthetic resume snippet into valid JSON. Follow this exact schema: { "candidateRef": string, "yearsExperience": number, "primarySkills": string[], "education": string, "certifications": string[], "uncertainOrMissing": string[] }. If any item is not explicitly stated in the text, place it into "uncertainOrMissing" rather than guessing.',
                whyItWorks: 'Explicitly prevents hallucinations by providing an uncertainty bucket.',
              },
            ],
            expectedResult:
              'A valid JSON object ready to be sent to n8n, Notion, or a database without parsing errors.',
            exercise: {
              task: 'Add a "clearanceLevel" key and test with a text that mentions no security clearance.',
              hint: 'Verify that "clearanceLevel" is populated with "None stated" or flagged in uncertainOrMissing.',
              solution: 'Verify the JSON passes standard JSON.parse() in your browser console.',
            },
            troubleshooting: [
              {
                issue: 'The output is wrapped in ```markdown code blocks instead of raw JSON.',
                fix: 'In AI Studio settings, toggle Response Format to "application/json" or prompt: "Output ONLY raw JSON with no markdown formatting or backticks."',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'stitch',
    name: 'Google Stitch',
    tagline: 'AI-Assisted UI/UX Design & Prototyping',
    description:
      'Learn how to design clean, accessible, and user-centric web and mobile interfaces using AI guidance, design systems, typographic hierarchies, and component layouts.',
    badge: 'UI/UX Designer',
    iconName: 'Figma',
    accentColor: '#0EA5E9',
    freeTierDetails:
      'Google Stitch and companion AI UI design workflows are accessible directly in the browser. You can sketch, iterate on layouts, and produce design briefs without expensive licenses.',
    whatYouWillBuild: [
      'Modern recruitment pipeline operations dashboard',
      'Candidate detailed profile view screen',
      'Interactive interview scheduling interface',
      'Personal finance spending & budget tracker layout',
      'SaaS customer relationship management (CRM) view',
    ],
    modules: [
      {
        id: 'stitch-m1',
        toolId: 'stitch',
        title: 'Module 1: Principles of AI-Assisted UI Design',
        description: 'Understand visual hierarchy, typography, accessible color contrast, and component cards.',
        lessons: [
          {
            id: 'stitch-l1',
            toolId: 'stitch',
            moduleId: 'stitch-m1',
            moduleTitle: 'Principles of AI-Assisted UI Design',
            title: 'Visual Hierarchy & The "Zero-Pill" Discipline',
            description:
              'Master modern, professional UI layout principles that avoid messy, amateur designs and create calm, scannable interfaces.',
            durationMinutes: 20,
            level: 'Beginner',
            concepts: [
              'Typographic scale (H1, H2, body, micro-copy)',
              'Restrained color palettes: neutral surfaces with one primary accent',
              'Spacing rhythm (4px, 8px, 16px, 24px, 32px)',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Set the Canvas Surface & Background',
                instruction: 'Use soft off-white or neutral gray (#F8FAFC) instead of pure stark white backgrounds.',
                tip: 'Soft backgrounds give cards and containers depth without requiring harsh drop shadows.',
              },
              {
                stepNumber: 2,
                title: 'Establish Information Hierarchy',
                instruction:
                  'Place critical high-level stats at the top left, followed by primary data tables or workflow cards.',
              },
            ],
            samplePrompts: [
              {
                label: 'Dashboard Design Brief Prompt',
                prompt:
                  'Design a modern, light-theme Recruitment Operations Dashboard. The screen has: 1) Top app bar with workspace switcher and user avatar. 2) 4 key metric cards: Open Roles (14), Active Candidates (128), Interviews This Week (32), Offers Extended (6). 3) Main panel split 70/30: Left side is an upcoming interview schedule table; right side is an action-item checklist. Use slate neutral borders, indigo accent, and crisp readable typography.',
                whyItWorks:
                  'Specifies the exact layout split (70/30), exact data metrics, and strict visual design rules.',
              },
            ],
            expectedResult:
              'A well-proportioned wireframe layout with balanced white space, distinct sections, and high contrast text.',
            exercise: {
              task: 'Draft an accessibility review checklist for this screen (color contrast, text sizes, button tap targets).',
              hint: 'Verify that text contrast meets WCAG AA standards (4.5:1 ratio) and buttons are at least 40px tall.',
              solution: 'Include check items for contrast, keyboard focus rings, and mobile readability.',
            },
            troubleshooting: [
              {
                issue: 'The design feels cluttered with too many competing colors.',
                fix: 'Rule of thumb: 60% neutral background, 30% white/surface cards, 10% accent color for primary actions only.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'notion',
    name: 'Notion',
    tagline: 'Knowledge Management, Databases & Systems',
    description:
      'Build robust relational databases, task pipelines, candidate tracking workspaces, project documentation, and team SOPs using Notion formulas, rollups, and structured views.',
    badge: 'Systems Architect',
    iconName: 'BookOpen',
    accentColor: '#10B981',
    freeTierDetails:
      'Notion is free for individual users with unlimited pages and blocks, flexible database capabilities, and seamless template sharing.',
    whatYouWillBuild: [
      'Comprehensive Recruitment Candidate Tracking Database with 7 stage views',
      'Interview Question Bank with competency tags and seniority filters',
      'Personal AI Learning & Practice tracker with streak metrics',
      'Sales Pipeline CRM with deal stages and contact relations',
      'Standard Operating Procedure (SOP) library for business operations',
    ],
    modules: [
      {
        id: 'notion-m1',
        toolId: 'notion',
        title: 'Module 1: Notion Database Fundamentals',
        description: 'Understand properties, relations, filters, and multi-view configurations.',
        lessons: [
          {
            id: 'notion-l1',
            toolId: 'notion',
            moduleId: 'notion-m1',
            moduleTitle: 'Notion Database Fundamentals',
            title: 'Databases, Properties & Filtered Views',
            description:
              'Learn how Notion databases operate as structured relational tables with custom views for different workflows.',
            durationMinutes: 20,
            level: 'Beginner',
            concepts: [
              'Database Property types: Select, Multi-select, Date, Person, Relation',
              'Table vs Board (Kanban) vs Calendar vs List views',
              'Creating persistent filters and sorting rules',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Create an Inline Database',
                instruction: 'Type /database inline in Notion to instantiate a structured table.',
                tip: 'Always rename your database title clearly (e.g., "Talent Pipeline 2026").',
              },
              {
                stepNumber: 2,
                title: 'Configure Essential Recruitment Properties',
                instruction:
                  'Add properties: Candidate Ref (Title), Job Role (Select), Stage (Select: New, Screening, Interview, Offer, Rejected), Recruiter (Person), Applied Date (Date), Notes (Text).',
              },
              {
                stepNumber: 3,
                title: 'Add a Kanban Board View',
                instruction:
                  'Click + Add View -> Board. Group by the "Stage" property so candidates can be dragged between stages.',
              },
            ],
            samplePrompts: [
              {
                label: 'Notion Database Setup Prompt',
                prompt:
                  'Design a complete Notion Candidate Tracking Database schema. Include property names, property types, suggested options for select fields, and recommend 5 custom views with exact filter and sort rules.',
                whyItWorks: 'Directly yields actionable property tables and view configurations.',
              },
            ],
            expectedResult:
              'A functional Notion database with Table and Kanban views showing synthetic candidate records.',
            exercise: {
              task: 'Create a "Follow-up Due This Week" view filtered where "Follow-up Date" is within the next 7 days.',
              hint: 'In the view filters, choose: Follow-up Date -> is within -> next week.',
              solution: 'Check that only records with upcoming dates appear in this view.',
            },
            troubleshooting: [
              {
                issue: 'Candidates moved in Kanban disappear from the Table view.',
                fix: 'Check if your Table view has an active filter that excludes certain stages. Adjust the filter to "Stage is not empty".',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'n8n',
    name: 'n8n',
    tagline: 'Visual Workflow Automation & AI Integrations',
    description:
      'Automate repetitive business processes, connect webhooks, transform JSON payloads, send scheduled reminders, and integrate AI models using visual node-based workflows.',
    badge: 'Automation Engineer',
    iconName: 'Workflow',
    accentColor: '#F59E0B',
    freeTierDetails:
      'n8n offers a free, fair-code Community Edition that you can run locally via Docker/Desktop, as well as a cloud trial with free executions.',
    whatYouWillBuild: [
      'Automated interview confirmation and reminder notification flow',
      'Candidate intake workflow routing form submissions to Notion and Slack',
      'Automated daily study reminder sent via email or webhook',
      'Expense receipt notification and categorization pipeline',
      'Meeting action-item extractor and task creator',
    ],
    modules: [
      {
        id: 'n8n-m1',
        toolId: 'n8n',
        title: 'Module 1: Workflow Nodes & Data Flow',
        description: 'Understand triggers, actions, JSON structures, and visual execution flows.',
        lessons: [
          {
            id: 'n8n-l1',
            toolId: 'n8n',
            moduleId: 'n8n-m1',
            moduleTitle: 'Workflow Nodes & Data Flow',
            title: 'Triggers, Nodes & Understanding JSON Data',
            description:
              'Learn how n8n passes JSON data packets between nodes: Triggers start the flow, and Actions transform or send data.',
            durationMinutes: 25,
            level: 'Beginner',
            concepts: [
              'Triggers: Webhooks, Schedule (Cron), App events',
              'Action Nodes: IF conditions, Data Transform, HTTP Request, Email',
              'Inspecting Input and Output JSON tabs',
            ],
            tutorialSteps: [
              {
                stepNumber: 1,
                title: 'Add a Webhook Trigger Node',
                instruction: 'Drag a Webhook node onto the canvas. Set HTTP Method to POST and Path to candidate-apply.',
                tip: 'In n8n, every node output is a JSON array of items that the next node can reference via expressions like {{$json.candidateName}}.',
              },
              {
                stepNumber: 2,
                title: 'Test with a Sample Payload',
                instruction:
                  'Click "Listen for Test Event" and send a sample JSON: {"name": "Alex Taylor", "role": "Frontend Dev", "email": "alex@example.com"}.',
              },
              {
                stepNumber: 3,
                title: 'Connect an IF Validation Node',
                instruction:
                  'Connect an IF node checking that email contains "@" and name is not empty. Route true to notification and false to error log.',
              },
            ],
            samplePrompts: [
              {
                label: 'n8n Workflow Blueprint Prompt',
                prompt:
                  'Provide an n8n workflow diagram and node configuration specification for: When a candidate submits an interview availability form -> Validate required fields -> Save to Notion database -> Send calendar invite email to recruiter -> Post confirmation alert to team channel. Include node types and JSON expressions.',
                whyItWorks: 'Breaks the automation into discrete logical nodes with input/output contracts.',
              },
            ],
            expectedResult:
              'A verified visual workflow canvas with green checkmarks indicating successful execution across all nodes.',
            exercise: {
              task: 'Add a wait/delay node that waits 24 hours before sending a follow-up interview preparation checklist.',
              hint: 'Search for the "Wait" node in n8n, set amount to 24, unit to hours.',
              solution: 'Connect the Wait node between the initial confirmation and the prep checklist email.',
            },
            troubleshooting: [
              {
                issue: 'Workflow fails with "Expression parameter invalid".',
                fix: 'Ensure you are referencing variables with valid n8n syntax: {{$json.propertyName}} and that previous nodes executed successfully.',
              },
            ],
          },
        ],
      },
    ],
  },
];
