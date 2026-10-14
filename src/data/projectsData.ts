import { ProjectItem } from '../types';

export const ALL_PROJECTS: ProjectItem[] = [
  // ===================== RECRUITMENT PROJECTS (1-8) =====================
  {
    id: 'rec-p1',
    title: 'AI Job Description Generator',
    domain: 'recruitment',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['ai-studio', 'lovable'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Hiring managers frequently write incomplete or inconsistent job briefs. Recruiters spend hours formatting job postings and often inadvertently introduce gender-biased or non-inclusive terminology.',
    intendedUsers: 'Talent Acquisition Specialists, HR Generalists, Department Leads, Hiring Managers.',
    beginnerExplanation:
      'You will build an AI-powered assistant that takes raw bullet points (title, must-haves, location) and turns them into a polished, structured job description that is attractive to candidates and avoids biased words.',
    learningObjectives: [
      'Understand standard job description anatomy (Overview, Responsibilities, Requirements, Disclaimers).',
      'Craft structured system instructions in Google AI Studio to enforce inclusive tone.',
      'Construct a simple user interface in Lovable for non-technical team members to generate and copy job postings.',
      'Implement human-in-the-loop validation before posting to job boards.',
    ],
    prerequisites: ['Free Google AI Studio account', 'Basic understanding of job roles and requirements'],
    expectedResult:
      'A working generation workflow and user interface that outputs an objective, inclusive job description in Markdown or plain text with one-click copy.',
    steps: [
      {
        stepNumber: 1,
        title: 'Define the Job Description Schema',
        details:
          'Map out the essential sections: Company Pitch, Impact of the Role, Core Responsibilities (5-7 bullets), Required Skills, Preferred Skills, Work Arrangement, and Equal Opportunity Statement.',
        verificationTip: 'Ensure requirements are strictly job-related, not arbitrary credentials.',
      },
      {
        stepNumber: 2,
        title: 'Configure System Instructions in Google AI Studio',
        details:
          'Set up the system prompt to enforce an inclusive, professional tone. Instruct the model to avoid biased buzzwords like "rockstar", "ninja", or "aggressive go-getter".',
        deliverableSnippet:
          'System Prompt: You are an inclusive Talent Acquisition Partner. Generate structured job descriptions based strictly on approved requirements. Always include an ethical hiring notice.',
        verificationTip: 'Test with temperature 0.2 to maintain consistent structure.',
      },
      {
        stepNumber: 3,
        title: 'Test with Sample Inputs',
        details:
          'Run tests with minimal inputs: Role title: "Junior Data Analyst", Department: "Finance", Skills: "SQL, Excel, basic visualization". Verify that the output does not invent unnecessary qualifications.',
        verificationTip: 'Check that required vs preferred skills are clearly separated.',
      },
      {
        stepNumber: 4,
        title: 'Build a Front-End Generator in Lovable',
        details:
          'Prompt Lovable to create a two-column layout: Left column contains input fields (Role, Department, Seniority, Must-Have Skills); Right column displays the formatted job description with a Copy button.',
        verificationTip: 'Verify that the copy button successfully writes text to clipboard.',
      },
      {
        stepNumber: 5,
        title: 'Establish Human Review Checkpoint',
        details:
          'Add a prominent disclaimer banner: "AI-generated draft. Mandatory recruiter and hiring manager review required before external publication."',
        verificationTip: 'Confirm the disclaimer is visible and cannot be accidentally bypassed.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'System Instruction for Inclusive Job Descriptions',
        tool: 'ai-studio',
        prompt:
          'You are an expert Talent Acquisition specialist specializing in inclusive, competency-based job architecture. When provided with basic role parameters, generate a complete Job Description with: 1) Role Summary, 2) Key Outcomes & Responsibilities (action-oriented), 3) Essential Qualifications (keep to realistic necessities), 4) Desirable Qualifications, 5) Workplace Culture & Benefits, and 6) Equal Opportunity & Ethical AI hiring pledge. Strip out biased language and avoid gendered idioms.',
        parameters: ['Role Title', 'Department', 'Seniority', 'Must-have skills', 'Work arrangement'],
      },
      {
        title: 'Lovable Application Prompt',
        tool: 'lovable',
        prompt:
          'Create a clean Job Description Generator app. On the left side, build a form with inputs: Job Title (text), Department (select), Seniority (select: Entry, Mid, Senior, Lead), Work Setup (Remote/Hybrid/Onsite), and Key Requirements (textarea). On the right, show a live preview card with formatted Markdown, a "Copy to Clipboard" button, and an "Export as Text" button. Include a clear banner stating that human review is required.',
        parameters: ['Layout style', 'Accent color: Slate Indigo', 'Responsive split'],
      },
    ],
    sampleInputData: {
      description: 'Senior Customer Success Manager input brief',
      sampleText:
        'Job Title: Senior Customer Success Manager\nDepartment: Client Operations\nExperience: 4-6 years\nLocation: Hybrid (Chicago, IL)\nKey Skills: Enterprise SaaS relationship management, churn reduction, quarterly business reviews (QBRs), Zendesk/Salesforce\nCore Responsibilities: Manage portfolio of 30 enterprise clients, identify expansion opportunities, conduct onboarding.',
    },
    expectedOutputs: {
      title: 'Formatted Job Description Preview',
      format: 'Markdown Document',
      content:
        '# Senior Customer Success Manager — Client Operations\n\n### About the Opportunity\nWe are looking for a dedicated Senior Customer Success Manager to champion our enterprise client relationships in Chicago, IL (Hybrid)...\n\n### Key Responsibilities\n- Serve as the primary trusted advisor to 30 enterprise accounts.\n- Lead strategic Quarterly Business Reviews (QBRs) and drive renewal health.\n- Partner with Sales and Product teams to eliminate adoption friction.\n\n### Essential Qualifications\n- 4+ years in B2B SaaS account management or customer success.\n- Demonstrated ability to analyze health metrics and mitigate churn.\n\n### Equal Opportunity & Ethical AI Commitment\nAll candidates are evaluated strictly on verifiable, job-related qualifications. AI tools are assistive only; human professionals conduct all reviews.',
    },
    testingChecklist: [
      'Does the generator produce consistent sections for diverse job roles?',
      'Are non-inclusive words automatically omitted or replaced?',
      'Does the output clearly separate essential from preferred skills?',
      'Does the Copy to Clipboard button work across desktop and mobile?',
    ],
    commonErrors: [
      {
        error: 'The AI adds unrealistic requirements like "10 years experience in a 3-year-old technology".',
        fix: 'Add a negative constraint in your system prompt: "Never inflate experience thresholds. Respect the seniority level specified by the user."',
      },
      {
        error: 'The output text has strange markdown symbols in the preview.',
        fix: 'Use a proper React Markdown renderer or strip backticks before rendering in Lovable.',
      },
    ],
    securitySafeguards: [
      'Do not include confidential company compensation bands or internal project codenames.',
      'All drafts must undergo human recruiter sign-off prior to external publication.',
      'Ensure zero discrimination based on age, gender, race, disability, or background.',
    ],
    advancedIdeas: [
      'Add a "Readability & Bias Score" widget analyzing the draft against the Flesch-Kincaid grade level.',
      'Allow downloading the approved output directly into Notion recruitment pages.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Developed an AI-assisted job description generator reducing initial drafting time by 75% while enforcing inclusive wording standards across 15 department openings.',
      architecture:
        'Google AI Studio (Gemini 3.8 Flash model with custom system prompts) paired with a responsive Lovable React frontend.',
      impactMetrics: 'Saved ~2.5 recruiter hours per requisition; zero non-inclusive terms flagged in audits.',
    },
  },

  {
    id: 'rec-p2',
    title: 'Recruitment Tracker in Notion',
    domain: 'recruitment',
    difficulty: 'Beginner',
    estimatedHours: 2.5,
    tools: ['notion'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Candidate resumes and interview statuses get scattered across email inboxes, spreadsheets, and chat messages, leading to dropped candidates and poor candidate experience.',
    intendedUsers: 'Recruiting Coordinators, Small Business Owners, Hiring Leads.',
    beginnerExplanation:
      'You will build a centralized Notion workspace with a relational database, custom status stages, automated follow-up dates, and filtered views to manage candidate flow from application to offer.',
    learningObjectives: [
      'Construct a relational candidate database with standard recruitment properties.',
      'Configure multiple tailored views: Kanban Board, Calendar of Interviews, and Follow-up Due.',
      'Create reusable candidate record templates with evaluation checklists.',
      'Protect applicant data privacy through role-based workspace permissions.',
    ],
    prerequisites: ['Free Notion account'],
    expectedResult:
      'A fully functional Notion recruitment workspace with 7 customized views, synthetic test data, and an automated candidate evaluation card template.',
    steps: [
      {
        stepNumber: 1,
        title: 'Create the Candidate Pipeline Database',
        details:
          'Set up properties: Candidate ID (Title), Full Name (Text), Role (Select), Stage (Select: New, Screening, Interview 1, Interview 2, Offer, Closed), Recruiter (Person), Applied Date (Date), Next Follow-up (Date), Resume Link (URL), Decision Notes (Text).',
        verificationTip: 'Ensure property types match data format for accurate filtering.',
      },
      {
        stepNumber: 2,
        title: 'Build the Recruitment Kanban Board View',
        details:
          'Create a Board view grouped by "Stage". Customize card preview to show Role, Recruiter avatar, and Next Follow-up date.',
        verificationTip: 'Test dragging a candidate card from "Screening" to "Interview 1".',
      },
      {
        stepNumber: 3,
        title: 'Configure the "Interviews Scheduled This Week" View',
        details:
          'Add a Calendar or Table view filtered where Stage is "Interview 1" or "Interview 2", sorted chronologically.',
        verificationTip: 'Verify upcoming interview dates are clearly visible at a glance.',
      },
      {
        stepNumber: 4,
        title: 'Design the Candidate Record Template',
        details:
          'Inside the database, create a template titled "New Candidate Intake". Include structured sections: 1) Job Alignment Checklist, 2) Interviewer Notes Table, 3) Human Verification Checkbox.',
        verificationTip: 'Apply the template to a new card and verify sub-blocks load instantly.',
      },
      {
        stepNumber: 5,
        title: 'Populate with Synthetic Test Records',
        details:
          'Add 6 fictional candidate records (e.g. Jordan Smith, Priya Sharma) to test all filter views and edge cases.',
        verificationTip: 'Never use real applicant data during testing or demonstrations.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Notion Database Architecture Blueprint',
        tool: 'notion',
        prompt:
          'Provide a structured schema for a Notion Recruitment Operations Tracker. Detail 12 essential properties, their exact Notion property types, color codes for stages, 6 recommended views (Table, Board, Calendar, Closed, Urgent Follow-ups), and the exact Markdown layout for the internal candidate evaluation template.',
        parameters: ['Pipeline stages', 'Property definitions', 'View filters'],
      },
    ],
    sampleInputData: {
      description: 'Synthetic Candidate Record',
      sampleText:
        'Candidate ID: CAND-2026-042\nName: Alex Rivera\nRole: Product Designer\nStage: Interview 1\nApplied Date: 2026-10-10\nNext Follow-up: 2026-10-18\nNotes: Strong portfolio on design systems. Recruiter verified work eligibility.',
    },
    expectedOutputs: {
      title: 'Notion Database Structure',
      format: 'Database Schema & Views',
      content:
        'Views Configured:\n1. 📋 All Candidates (Table - sorted by Applied Date)\n2. 🔄 Active Pipeline (Kanban Board - grouped by Stage)\n3. 📅 Upcoming Interviews (Calendar - keyed to Interview Date)\n4. ⏰ Needs Recruiter Action (Filtered: Next Action Date <= Today)\n5. 💼 Offers in Flight (Filtered: Stage = Offer)\n6. 📁 Archive / Closed (Filtered: Stage = Closed / Withdrawn)',
    },
    testingChecklist: [
      'Can candidates be dragged across all pipeline stages?',
      'Does the "Needs Action" view correctly highlight overdue dates?',
      'Does the template load standardized interview notes effortlessly?',
      'Is personal applicant data protected under secure workspace access?',
    ],
    commonErrors: [
      {
        error: 'Moving a candidate to "Closed" clutters the active board view.',
        fix: 'Add a filter to the Active Pipeline board: Stage -> Is not -> Closed.',
      },
    ],
    securitySafeguards: [
      'Ensure access to the Notion page is restricted to authorized hiring team members.',
      'Never store sensitive identification documents (passports, social security numbers) in Notion.',
    ],
    advancedIdeas: [
      'Integrate Notion with n8n to automatically append candidates submitted via external application forms.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Designed a Notion recruitment operating system replacing disconnected email threads with a single source of truth for 4 active hiring campaigns.',
      architecture: 'Relational Notion database with 6 specialized views and automated intake templates.',
      impactMetrics: '100% on-time candidate follow-up rate; zero dropped candidate communications.',
    },
  },

  {
    id: 'rec-p3',
    title: 'AI Interview Question Generator',
    domain: 'recruitment',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['ai-studio'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Interviews without structured rubrics lead to subjective bias, repetitive questions across interviewers, and superficial evaluation of candidates.',
    intendedUsers: 'Hiring Managers, Technical Interviewers, HR Business Partners.',
    beginnerExplanation:
      'You will create a guided question generator in Google AI Studio that creates structured, competency-based questions with clear evaluation criteria (what a great answer looks like vs red flags).',
    learningObjectives: [
      'Formulate competency-specific interview prompts using the STAR method (Situation, Task, Action, Result).',
      'Generate objective scoring rubrics to assist human interviewers.',
      'Learn how to eliminate discriminatory or non-job-related questions using system guardrails.',
    ],
    prerequisites: ['Google AI Studio account'],
    expectedResult:
      'An interview question kit tailored to role, seniority, and specific competency with assessment rubrics and follow-up probes.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Core Assessment Competencies',
        details:
          'Break down job requirements into 3-4 competencies: Functional Expertise, Problem Solving, Collaboration, and Conflict Resolution.',
        verificationTip: 'Ensure each competency is directly relevant to daily on-the-job tasks.',
      },
      {
        stepNumber: 2,
        title: 'Configure Google AI Studio Prompt Framework',
        details:
          'Set up the prompt to ask for: 1) The core question, 2) What this question evaluates, 3) Indicators of a strong answer, 4) Warning signs / red flags, and 5) Probing follow-up questions.',
        verificationTip: 'Instruct the model to provide behavioral and situational scenarios.',
      },
      {
        stepNumber: 3,
        title: 'Apply Strict Anti-Bias Guardrails',
        details:
          'Explicitly forbid any questions relating to age, marital status, family plans, religious beliefs, or other protected characteristics.',
        verificationTip: 'Verify that the model refuses or removes irrelevant personal questions.',
      },
      {
        stepNumber: 4,
        title: 'Generate and Organize by Interview Round',
        details:
          'Test generating a 30-minute screening kit vs a 60-minute deep-dive technical round to test time-budgeted questioning.',
        verificationTip: 'Review question counts to ensure realistic completion within the time limit.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Competency Interview Kit Generator',
        tool: 'ai-studio',
        prompt:
          'You are an expert Talent Assessment advisor. Generate a structured interview questionnaire for a [Job Title] at [Seniority Level]. Assessment focus: [Competencies]. For each question provide:\n1. Question text (Behavioral or Scenario-based)\n2. Competency Assessed\n3. Evidence of Strong Performance (Green flags)\n4. Incomplete or Weak Performance (Red flags)\n5. Recommended Follow-Up Question\nEnsure all questions strictly evaluate job-related competence and exclude any personal life questions.',
        parameters: ['Job Title', 'Seniority Level', 'Competencies', 'Round Duration'],
      },
    ],
    sampleInputData: {
      description: 'Junior Operations Analyst interview brief',
      sampleText:
        'Role: Junior Operations Analyst\nSeniority: Entry Level (0-2 years)\nDuration: 45 minutes\nCompetencies: Process improvement, analytical troubleshooting, handling ambiguous requests.',
    },
    expectedOutputs: {
      title: 'Interview Kit Output',
      format: 'Structured Markdown Rubric',
      content:
        '### Competency: Analytical Troubleshooting\n- **Question:** "Can you describe a time when you received inconsistent data or an incomplete task request? How did you verify the facts before taking action?"\n- **Assesses:** Attention to detail, intellectual curiosity, proactive verification.\n- **Strong Answer:** Mentions cross-checking raw sources, asking polite clarifying questions, documenting discrepancies.\n- **Red Flags:** Made assumptions without asking, ignored errors, blamed the person who sent the data.\n- **Follow-up Probe:** "What would you do differently if the original requester was unreachable under a tight deadline?"',
    },
    testingChecklist: [
      'Are questions behavioral rather than hypothetical yes/no questions?',
      'Does each question include concrete green and red flag indicators?',
      'Is the total number of questions realistic for the stated interview duration?',
    ],
    commonErrors: [
      {
        error: 'The AI generates generic questions like "Tell me your greatest weakness".',
        fix: 'Add to prompt: "Disallow generic cliché interview questions. Every question must be anchored in realistic workplace scenarios for this exact discipline."',
      },
    ],
    securitySafeguards: [
      'Questions must strictly comply with labor and employment non-discrimination laws.',
      'Answers given by candidates are confidential and must be treated as sensitive personal data.',
    ],
    advancedIdeas: [
      'Export the generated rubrics directly into Google Forms or Notion interview scorecards for seamless interviewer feedback collection.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Created a standardized AI interview rubric generator that established objective, competency-based interviewing across 8 departmental roles.',
      architecture: 'Google AI Studio with structured STAR interview prompt engineering.',
      impactMetrics: 'Increased interviewer confidence scores by 40%; reduced subjective grading variance.',
    },
  },

  {
    id: 'rec-p4',
    title: 'Candidate Information Extraction Assistant',
    domain: 'recruitment',
    difficulty: 'Beginner to Intermediate',
    estimatedHours: 3,
    tools: ['ai-studio', 'lovable'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Recruiters spend significant time manually reading varied resume formats to extract basic qualifications, often missing key tools or spending 15 minutes per profile just copying data.',
    intendedUsers: 'Recruiting Coordinators, High-Volume Talent Sourcers.',
    beginnerExplanation:
      'You will build an extraction assistant that extracts stated skills, experience history, and education from a synthetic resume into clean JSON, while highlighting missing or uncertain details for human review.',
    learningObjectives: [
      'Extract structured entities from unstructured resume text using Gemini in Google AI Studio.',
      'Enforce strict anti-hallucination rules (never invent missing dates or qualifications).',
      'Flag missing or uncertain data points for mandatory human recruiter verification.',
      'Understand ethical data protection and synthetic testing principles.',
    ],
    prerequisites: ['Google AI Studio', 'Understanding of JSON'],
    expectedResult:
      'A structured candidate profile card showing extracted skills, timeline, certifications, and a "Needs Human Verification" panel.',
    steps: [
      {
        stepNumber: 1,
        title: 'Define the Extraction Data Contract',
        details:
          'Specify exact output fields: candidateRef, primarySkills, toolsAndTechnologies, totalYearsExperienceEstimated, educationHistory, certifications, and uncertainOrMissing.',
        verificationTip: 'Ensure the output contract includes an explicit field for missing information.',
      },
      {
        stepNumber: 2,
        title: 'Write the Extraction Prompt with Anti-Hallucination Guardrails',
        details:
          'Instruct the model: "Only extract what is explicitly written in the resume text. If graduation date or degree is not stated, return null in that field and list it in uncertainOrMissing."',
        verificationTip: 'Test with a resume that omits employment dates to ensure the AI does not guess.',
      },
      {
        stepNumber: 3,
        title: 'Format as Valid JSON in AI Studio',
        details:
          'Set response schema to JSON so the output can be directly consumed by frontend components or databases without regex parsing.',
        verificationTip: 'Verify JSON validity with JSON.parse().',
      },
      {
        stepNumber: 4,
        title: 'Build the Profile Review UI in Lovable',
        details:
          'Display extracted data in clean badges and tables, with a prominent amber alert box highlighting items requiring recruiter verification.',
        verificationTip: 'Ensure recruiters can click an "Approve Extracted Data" button.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Resume Entity Extraction Prompt',
        tool: 'ai-studio',
        prompt:
          'You are an objective candidate data extraction assistant. Analyze the provided resume text and extract the following JSON schema:\n{\n  "candidateRef": "string",\n  "statedSkills": ["string"],\n  "toolsMentioned": ["string"],\n  "experienceSummary": [{"company": "string", "role": "string", "duration": "string"}],\n  "highestEducation": "string",\n  "certifications": ["string"],\n  "uncertainOrMissingFields": ["string"]\n}\nStrict Rules: 1) Do NOT infer or predict protected traits (gender, age, ethnicity). 2) Do NOT invent missing details. 3) Flag any ambiguities under uncertainOrMissingFields.',
        parameters: ['Resume Text Input'],
      },
    ],
    sampleInputData: {
      description: 'Synthetic Candidate Resume',
      sampleText:
        'CANDIDATE ID: SYNTH-9021\nProfessional Profile: Junior Software QA Tester with experience in manual test case execution and basic Cypress automation.\nSkills: TestRail, JIRA, Postman, Cypress, SQL, HTML/CSS.\nExperience:\n- QA Intern at TechWave Labs (June 2025 - Present): Executed 200+ regression tests, logged bug reports.\n- Retail Assistant at QuickMart (2023 - 2024): Customer service and inventory.\nEducation: Associate Degree in Information Systems (Completed).\nCertifications: ISTQB Foundation Certified (2025).',
    },
    expectedOutputs: {
      title: 'Extracted JSON Profile',
      format: 'JSON Structure',
      content:
        '{\n  "candidateRef": "SYNTH-9021",\n  "statedSkills": ["Manual Testing", "Test Case Execution", "Regression Testing", "Bug Reporting", "Customer Service"],\n  "toolsMentioned": ["TestRail", "JIRA", "Postman", "Cypress", "SQL", "HTML/CSS"],\n  "experienceSummary": [\n    {"company": "TechWave Labs", "role": "QA Intern", "duration": "June 2025 - Present"},\n    {"company": "QuickMart", "role": "Retail Assistant", "duration": "2023 - 2024"}\n  ],\n  "highestEducation": "Associate Degree in Information Systems",\n  "certifications": ["ISTQB Foundation Certified (2025)"],\n  "uncertainOrMissingFields": ["Specific graduation year for Associate Degree not stated"]\n}',
    },
    testingChecklist: [
      'Does the assistant decline to invent dates or credentials?',
      'Are tools accurately parsed without false positives?',
      'Does the UI highlight the missing graduation year clearly?',
      'Is the model prohibited from scoring or ranking candidates?',
    ],
    commonErrors: [
      {
        error: 'The AI ranks or assigns an arbitrary score to the candidate.',
        fix: 'Strictly prohibit automated candidate ranking in your system instruction. Highlight that human recruiters evaluate suitability.',
      },
    ],
    securitySafeguards: [
      'Never paste real resumes with personal home addresses, phone numbers, or social security numbers into public prompts.',
      'Always use synthetic candidate datasets for learning and building.',
    ],
    advancedIdeas: [
      'Connect the extracted JSON output directly to the Notion Candidate Tracker via n8n webhook.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Implemented a human-verified resume qualification extraction assistant that extracts structured skills and flags ambiguities, cutting profile intake time by 60%.',
      architecture: 'Google AI Studio structured JSON extraction with Lovable verification review interface.',
      impactMetrics: '60% reduction in profile intake time; zero data hallucinations through uncertainty flagging.',
    },
  },

  {
    id: 'rec-p5',
    title: 'Interview Scheduling & Reminder Automation',
    domain: 'recruitment',
    difficulty: 'Beginner',
    estimatedHours: 2.5,
    tools: ['n8n', 'notion'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Candidates and interviewers frequently experience miscommunications, timezone mix-ups, or missed reminders, causing interview no-shows and rescheduling delays.',
    intendedUsers: 'Recruiting Coordinators, People Operations Assistants.',
    beginnerExplanation:
      'You will build a visual workflow in n8n that triggers when an interview is booked, updates the Notion recruitment tracker, and sends automated confirmation and reminder notifications.',
    learningObjectives: [
      'Set up an n8n webhook trigger to receive scheduling booking payloads.',
      'Use IF conditional nodes to validate required data fields.',
      'Update a Notion database record automatically through n8n nodes.',
      'Configure email or message reminder alerts with error handling and retries.',
    ],
    prerequisites: ['n8n installed or cloud account', 'Notion workspace'],
    expectedResult:
      'An automated workflow that logs bookings, updates candidate status to "Interview Scheduled", and delivers personalized email notifications.',
    steps: [
      {
        stepNumber: 1,
        title: 'Create the Webhook Trigger Node in n8n',
        details:
          'Add a Webhook node in n8n set to listen for POST requests at /interview-scheduled. Copy the test URL.',
        verificationTip: 'Use curl or Postman to send a test JSON payload and confirm n8n catches the event.',
      },
      {
        stepNumber: 2,
        title: 'Add Input Data Validation Node',
        details:
          'Insert an IF node verifying that candidateEmail contains "@", interviewerEmail is present, and interviewDate is a valid future timestamp.',
        verificationTip: 'Route invalid data to an error notification node.',
      },
      {
        stepNumber: 3,
        title: 'Connect Notion Node to Update Candidate Status',
        details:
          'Connect the Notion node. Search for the candidate by Candidate ID and update the "Stage" property to "Interview Scheduled" and "Interview Date" to the scheduled time.',
        verificationTip: 'Check Notion to ensure the candidate card automatically moves to the new stage.',
      },
      {
        stepNumber: 4,
        title: 'Configure Email Notification Node',
        details:
          'Add an Email/SMTP or Gmail node. Compose an encouraging, informative email with interview preparation tips, video call link, and contact details in case of tech issues.',
        verificationTip: 'Always send test emails to your own inbox first.',
      },
      {
        stepNumber: 5,
        title: 'Implement Error Handling & Logs',
        details:
          'Attach an Error Trigger node to catch any network failures or expired tokens, logging the incident for review.',
        verificationTip: 'Test what happens when the Notion API key is temporarily invalidated.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'n8n Workflow Structure Prompt',
        tool: 'n8n',
        prompt:
          'Provide the complete JSON specification and node layout for an n8n workflow titled "Candidate Interview Automation". It should have: 1) Webhook Trigger, 2) Data Validation IF node, 3) Notion Update Page node, 4) Send Email node to candidate, 5) Send Slack/Email alert to recruiter, and 6) Error handling branch.',
        parameters: ['Node configurations', 'JSON expressions', 'Error fallback'],
      },
    ],
    sampleInputData: {
      description: 'Interview Booking Webhook Payload',
      sampleText:
        '{\n  "candidateId": "CAND-2026-042",\n  "candidateName": "Alex Rivera",\n  "candidateEmail": "alex.rivera.test@example.com",\n  "interviewerName": "Sarah Jenkins",\n  "interviewDate": "2026-10-22T14:00:00Z",\n  "interviewType": "Technical Design Round",\n  "meetingLink": "https://meet.example.com/interview-abc-xyz"\n}',
    },
    expectedOutputs: {
      title: 'Workflow Execution Log',
      format: 'n8n Execution Status',
      content:
        'Execution ID: #84920 [SUCCESS]\n- Webhook Trigger: Received payload in 12ms\n- Validate Fields: Passed (all 7 required attributes valid)\n- Notion Update: Candidate CAND-2026-042 moved to "Interview Scheduled"\n- Candidate Email: Sent to alex.rivera.test@example.com\n- Recruiter Slack Notification: Posted to #hiring-team',
    },
    testingChecklist: [
      'Does the webhook receive the payload reliably?',
      'Does missing data trigger the error branch without crashing the workflow?',
      'Does Notion update immediately without duplicate entries?',
      'Are test accounts and fictional emails used throughout all testing?',
    ],
    commonErrors: [
      {
        error: 'n8n displays "Expression error: candidateEmail is undefined".',
        fix: 'Ensure the previous node executed and reference values using the correct syntax: {{$json.candidateEmail}}.',
      },
    ],
    securitySafeguards: [
      'Never send real candidate interview links or personal details in public channels.',
      'Protect webhook endpoints with an authentication header or secret token.',
    ],
    advancedIdeas: [
      'Add an automated 24-hour SMS reminder using Twilio or an automated calendar invite file (.ics) generator.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Automated interview confirmation and Notion status updates via an n8n visual pipeline, eliminating manual scheduling emails and reducing no-shows.',
      architecture: 'n8n visual workflow engine integrated with Notion API and SMTP notification service.',
      impactMetrics: 'Zero scheduling lag; reduced candidate no-show rate to under 2%.',
    },
  },

  {
    id: 'rec-p6',
    title: 'Interview Feedback Summarizer',
    domain: 'recruitment',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['ai-studio', 'notion'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Interviewers write unstructured, shorthand notes filled with acronyms and fragmented sentences. Hiring committees struggle to quickly compare feedback across multiple interviewers before debrief meetings.',
    intendedUsers: 'Recruiters, Hiring Committee Leads, Talent Business Partners.',
    beginnerExplanation:
      'You will create an AI assistant that synthesizes raw interviewer notes into a concise, balanced summary clearly distinguishing factual observations from opinions, without making the hiring decision.',
    learningObjectives: [
      'Synthesize multiple raw interviewer notes into a clean, objective debrief summary.',
      'Separate verified factual observations from subjective opinions.',
      'Enforce ethical boundaries: ensure the AI never makes final hiring decisions.',
      'Format output into a Notion debrief card for committee review.',
    ],
    prerequisites: ['Google AI Studio', 'Notion workspace'],
    expectedResult:
      'A debrief summary card highlighting demonstrated strengths, areas needing clarification, and suggested consensus topics.',
    steps: [
      {
        stepNumber: 1,
        title: 'Establish the Debrief Synthesis Framework',
        details:
          'Create sections: 1) Demonstrated Competencies (backed by quotes/notes), 2) Clarifications Needed, 3) Divergent Opinions Between Interviewers, and 4) Human Debrief Agenda.',
        verificationTip: 'Ensure the summary explicitly attributes observations to specific interview rounds.',
      },
      {
        stepNumber: 2,
        title: 'Set up System Instructions with Decision Boundaries',
        details:
          'State clearly in the system prompt: "You are an objective summarizer. You must NEVER declare \'Hire\' or \'No Hire\'. Your role is to organize facts for human decision-makers."',
        verificationTip: 'Verify that the model refuses to issue a binary hire/reject verdict.',
      },
      {
        stepNumber: 3,
        title: 'Test with Mixed Interviewer Notes',
        details:
          'Feed sample notes where Interviewer A praised technical design but Interviewer B expressed concerns about timeline estimation.',
        verificationTip: 'Check that the summary highlights the contrast between the two opinions respectfully.',
      },
      {
        stepNumber: 4,
        title: 'Embed into Notion Debrief Template',
        details:
          'Create a Notion page layout where this summary sits directly above the committee voting section.',
        verificationTip: 'Ensure all interviewers can view the summary prior to the meeting.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Interview Feedback Synthesis Prompt',
        tool: 'ai-studio',
        prompt:
          'You are a Talent Acquisition Debrief Assistant. Summarize the following raw interviewer notes for candidate [Candidate Ref] applying for [Role].\nOutput Format:\n1. Demonstrated Strengths (cite specific examples from notes)\n2. Areas Requiring Further Clarification\n3. Points of Divergence (where interviewers had differing perspectives)\n4. Suggested Discussion Questions for the Hiring Committee\nCRITICAL CONSTRAINT: Do not make a hiring decision, give a score, or recommend pass/fail. Strictly synthesize evidence for human review.',
        parameters: ['Candidate Ref', 'Role', 'Raw Interviewer Notes'],
      },
    ],
    sampleInputData: {
      description: 'Raw Interviewer Notes (Screening + Technical)',
      sampleText:
        'Interviewer 1 (HR Screen): Friendly, articulated career transition well. Strong passion for product accessibility. Mentioned salary expectation within budget.\nInterviewer 2 (Tech Lead): Solid understanding of CSS grid and responsive layouts. Walked through portfolio project with clarity. Struggled slightly on state management question regarding edge-case re-renders; needed guidance on cache invalidation. Great attitude when receiving feedback.',
    },
    expectedOutputs: {
      title: 'Synthesized Debrief Briefing',
      format: 'Debrief Summary Card',
      content:
        '### Candidate Synthesis: Synthetic Ref CAND-9021\n\n**Demonstrated Strengths:**\n- Strong passion and concrete execution around web accessibility standards (HR Screen).\n- Clear communication of architectural decisions in portfolio walkthrough (Tech Lead).\n- Receptive and positive when receiving real-time technical feedback.\n\n**Areas for Committee Discussion:**\n- State management depth: Needed gentle prompting around edge-case re-render caching.\n\n**Suggested Debrief Discussion Question:**\n- Does the team have mentorship capacity to support candidate growth on advanced cache invalidation patterns?',
    },
    testingChecklist: [
      'Does the summary capture both positive and constructive observations?',
      'Is the AI strictly restrained from issuing pass/fail verdicts?',
      'Are specific interviewer observations accurately represented without distortion?',
    ],
    commonErrors: [
      {
        error: 'The AI concludes with "Recommendation: Strong Hire".',
        fix: 'Add strict negative constraint: "Under no circumstances provide a hiring recommendation. End your output with questions for human evaluators only."',
      },
    ],
    securitySafeguards: [
      'Interviewer notes are confidential HR records and must be protected in restricted workspaces.',
      'Ensure no discriminatory comments or off-topic personal remarks are preserved in summaries.',
    ],
    advancedIdeas: [
      'Generate a standardized 5-minute debrief slide deck outline automatically before the committee meets.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Engineered an objective interview debrief summarization pipeline that synthesizes diverse interviewer feedback into balanced discussion briefs for hiring committees.',
      architecture: 'Google AI Studio prompt synthesis integrated into Notion team debrief spaces.',
      impactMetrics: 'Cut debrief preparation time by 50%; eliminated bias toward the most vocal interviewer.',
    },
  },

  {
    id: 'rec-p7',
    title: 'Recruitment Operations Dashboard',
    domain: 'recruitment',
    difficulty: 'Beginner to Intermediate',
    estimatedHours: 3.5,
    tools: ['stitch', 'lovable'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Talent leaders lack real-time visibility into pipeline bottlenecks, such as positions stuck in feedback stages or open requisitions exceeding target days-to-fill.',
    intendedUsers: 'Head of Talent, Recruiting Operations Managers, HR Directors.',
    beginnerExplanation:
      'You will design in Google Stitch and build in Lovable a clean, high-visibility recruitment operations dashboard displaying active vacancies, interview throughput, and stage progression.',
    learningObjectives: [
      'Design a modern, light-theme operations dashboard interface following visual hierarchy principles.',
      'Calculate and display core recruitment metrics (Open Roles, In Review, Active Interviews, Offers).',
      'Implement interactive role filtering and candidate status inspection.',
      'Document metric definitions so non-technical stakeholders understand all data points.',
    ],
    prerequisites: ['Lovable account', 'Basic understanding of recruitment funnels'],
    expectedResult:
      'An interactive web dashboard displaying 4 primary KPIs, an upcoming interview feed, and an interactive candidate stage funnel with role filters.',
    steps: [
      {
        stepNumber: 1,
        title: 'Design the Wireframe Layout in Google Stitch',
        details:
          'Create a wireframe: Top stat cards (Open Requisitions, Candidates in Pipeline, Interviews This Week, Offers Pending), Main section: Interactive Pipeline Funnel, Sidebar: Upcoming interviews.',
        verificationTip: 'Ensure contrast meets WCAG AA standards and elements are spaced comfortably.',
      },
      {
        stepNumber: 2,
        title: 'Generate the Web Application in Lovable',
        details:
          'Translate the Stitch design into Lovable. Prompt for a responsive React app with clean slate borders, soft gray background, and indigo accent colors.',
        verificationTip: 'Check that the app scales gracefully on both mobile screens and wide desktop monitors.',
      },
      {
        stepNumber: 3,
        title: 'Add Interactive Role Filtering',
        details:
          'Add a dropdown allowing users to filter the entire dashboard by department (Engineering, Design, Operations, Sales) or view all roles.',
        verificationTip: 'Verify that KPI numbers recalculate dynamically when a department is selected.',
      },
      {
        stepNumber: 4,
        title: 'Define Metrics & Documentation Modal',
        details:
          'Add an info tooltip or modal explaining how each metric is calculated (e.g. Days-to-Fill = Calendar days between requisition opening and signed offer).',
        verificationTip: 'Confirm all metrics have transparent, simple definitions.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Recruitment Dashboard Design & Code Prompt',
        tool: 'lovable',
        prompt:
          'Build a high-craft Recruitment Operations Dashboard in React with Tailwind CSS. Layout:\n1. Top Header: Title "Recruitment Command Center", current date, department filter dropdown.\n2. Metric Cards: Open Requisitions (18), Active Candidates (142), Interviews This Week (34), Offers Out (5).\n3. Main Area (2 columns):\n- Left column (65%): Candidate pipeline stages bar showing counts per stage (Applied -> Screen -> Interview -> Final -> Offer) with click-to-filter, and an active candidates table.\n- Right column (35%): Upcoming interviews schedule for today and tomorrow with interviewer avatars and role tags.\nUse neutral light surfaces, rounded-xl cards, subtle border-slate-200, and indigo-600 accents. Populate with realistic synthetic data.',
        parameters: ['Color scheme', 'Synthetic records', 'Filter state'],
      },
    ],
    sampleInputData: {
      description: 'Synthetic Department Pipeline Data',
      sampleText:
        'Engineering: 8 open roles, 64 candidates, 18 interviews scheduled, 2 offers out.\nProduct & Design: 4 open roles, 38 candidates, 9 interviews scheduled, 1 offer out.\nSales & Marketing: 6 open roles, 40 candidates, 7 interviews scheduled, 2 offers out.',
    },
    expectedOutputs: {
      title: 'Interactive Dashboard Preview',
      format: 'Full Web Application',
      content:
        'A responsive web application with:\n- Summary KPI row with percentage changes.\n- Interactive funnel visualization.\n- Searchable and filterable candidate list.\n- Real-time responsive layout with no horizontal overflow.',
    },
    testingChecklist: [
      'Do all KPI numbers update when changing department filters?',
      'Is the dashboard completely usable on mobile screens?',
      'Are metric tooltips easily accessible to non-technical users?',
    ],
    commonErrors: [
      {
        error: 'Cards collapse awkwardly on tablet viewports.',
        fix: 'Use Tailwind grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 with gap-4.',
      },
    ],
    securitySafeguards: [
      'Use only synthetic test data for all candidate names and email addresses.',
      'Dashboard should require authenticated access when deployed in real organizations.',
    ],
    advancedIdeas: [
      'Connect the dashboard to live Notion or Airtable data via server API or webhook endpoints.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Designed in Google Stitch and developed in Lovable a responsive recruitment analytics dashboard giving hiring managers real-time visibility into active requisition pipelines.',
      architecture: 'Google Stitch design specification implemented in a Lovable React/Tailwind frontend.',
      impactMetrics: 'Reduced executive status update meetings by 45 minutes weekly.',
    },
  },

  {
    id: 'rec-p8',
    title: 'End-to-End Recruitment Operations Assistant',
    domain: 'recruitment',
    difficulty: 'Intermediate',
    estimatedHours: 5,
    tools: ['lovable', 'ai-studio', 'stitch', 'notion', 'n8n'],
    isRecruitmentSpecial: true,
    businessProblem:
      'Hiring workflows are fragmented across separate tools: drafting in docs, tracking in spreadsheets, scheduling over email, and evaluating in disconnected chats. This creates delays and poor candidate experiences.',
    intendedUsers: 'Talent Acquisition Leads, People Operations Directors, Tech-forward HR Leaders.',
    beginnerExplanation:
      'This capstone project combines all five tools into a cohesive recruitment operating system: Stitch for design, Lovable for the web portal, AI Studio for intelligent drafting and synthesis, Notion for the database, and n8n for workflow automation.',
    learningObjectives: [
      'Architect a multi-tool AI workflow connecting UI, AI models, databases, and automations.',
      'Deploy human-in-the-loop validation checkpoints across every automated step.',
      'Build an end-to-end prototype using synthetic data suitable for a professional portfolio.',
      'Document system architecture, API boundaries, privacy protections, and ethical guidelines.',
    ],
    prerequisites: ['Completion of at least 3 individual recruitment projects'],
    expectedResult:
      'A complete, multi-stage recruitment operations prototype featuring job posting creation, applicant intake, Notion tracking, scheduling automation, and debrief synthesis.',
    steps: [
      {
        stepNumber: 1,
        title: 'Design the System Architecture Map',
        details:
          'Map data flow: 1) AI Studio drafts JD -> 2) Lovable portal publishes posting -> 3) Candidate applies -> 4) n8n catches submission & updates Notion -> 5) n8n sends interview invite -> 6) AI Studio synthesizes debrief.',
        verificationTip: 'Ensure every automated transition has a human approval checkpoint.',
      },
      {
        stepNumber: 2,
        title: 'Design & Build the Recruiter Command Center (Stitch + Lovable)',
        details:
          'Create a single unified interface where recruiters can generate job descriptions, view applicant flow, and trigger interview invites.',
        verificationTip: 'Verify all buttons trigger their corresponding handlers without errors.',
      },
      {
        stepNumber: 3,
        title: 'Set up Central Notion Relational Workspace',
        details:
          'Build linked databases: "Open Requisitions", "Candidate Pipeline", and "Interviews & Debriefs".',
        verificationTip: 'Link candidates to their specific requisition via Notion relation properties.',
      },
      {
        stepNumber: 4,
        title: 'Build the n8n Automation Bridge',
        details:
          'Construct workflows that sync applicant submissions between the Lovable frontend and the Notion database, sending email notifications upon stage updates.',
        verificationTip: 'Test with 3 synthetic candidate applications from start to finish.',
      },
      {
        stepNumber: 5,
        title: 'Conduct Responsible AI & Privacy Audit',
        details:
          'Verify that no automated rejection takes place, all synthetic records are sanitized, and every AI-generated document includes human review disclaimers.',
        verificationTip: 'Document all findings in your final portfolio case study.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'End-to-End Architecture Prompt',
        tool: 'lovable',
        prompt:
          'Build an End-to-End Recruitment Operations Command Center uniting 5 key workflows: 1) Job Description Creator (with AI prompt assist), 2) Candidate Pipeline Table (with stage progress), 3) Interview Scheduler panel (triggering webhook), 4) Feedback Summarizer preview, and 5) Responsible AI Guardrails & Verification checklist. Design with clean tabbed navigation, modern status badges, and synthetic data.',
        parameters: ['Multi-tab layout', 'Integrated synthetic data', 'Responsible AI badges'],
      },
    ],
    sampleInputData: {
      description: 'End-to-End Test Scenario',
      sampleText:
        'New Requisition: Senior Data Engineer\nCandidate: Synth Candidate Morgan Lee\nStages to Test: 1) JD Generation -> 2) Application Intake -> 3) Interview Scheduling -> 4) Notes Synthesis -> 5) Offer Review.',
    },
    expectedOutputs: {
      title: 'Full Prototype Portfolio Showcase',
      format: 'Integrated Multi-Tool Suite',
      content:
        'A comprehensive operations suite with:\n- Working frontend with 5 integrated tabs.\n- Synced Notion database schema with 3 linked tables.\n- Documented n8n visual workflows.\n- Documented ethical charter guaranteeing human oversight.',
    },
    testingChecklist: [
      'Can a candidate progress through all 5 lifecycle stages seamlessly?',
      'Does n8n successfully update Notion upon stage changes?',
      'Are human review gates present before any external communication?',
      'Is the final documentation complete and portfolio-ready?',
    ],
    commonErrors: [
      {
        error: 'Trying to connect everything live at once causes debugging confusion.',
        fix: 'Test each subsystem independently (AI Studio prompts first, then Notion schema, then n8n webhook, then frontend UI).',
      },
    ],
    securitySafeguards: [
      'Strict adherence to the 6 recruitment safeguards: no automated rejections, privacy protection, anti-bias audits, human-in-the-loop verification, transparent criteria, and synthetic data testing.',
    ],
    advancedIdeas: [
      'Package the entire project into a public GitHub repository and Notion template pack to showcase on LinkedIn or in job interviews.',
    ],
    caseStudyTemplate: {
      executiveSummary:
        'Architected an end-to-end recruitment operations prototype combining Stitch, Lovable, Gemini (Google AI Studio), Notion, and n8n, demonstrating how modern no-code and AI tools streamline talent acquisition with rigorous human oversight.',
      architecture:
        'Lovable React portal + Google AI Studio API + Notion relational database + n8n automation webhook engine.',
      impactMetrics:
        'Reduced full hiring cycle operational overhead by an estimated 65% while maintaining 100% human-verified decisions.',
    },
  },

  // ===================== FINANCE PROJECTS (9-12) =====================
  {
    id: 'fin-p1',
    title: 'Personal Expense Tracker & Budget Dashboard',
    domain: 'finance',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['lovable', 'notion'],
    businessProblem:
      'Individuals struggle to track recurring expenses across multiple accounts, frequently overshooting monthly savings targets due to lack of real-time category visibility.',
    intendedUsers: 'Students, young professionals, freelance consultants.',
    beginnerExplanation:
      'You will build a clean web app and Notion tracker where users log expenses by category (Housing, Food, Subscriptions, Travel) and instantly view remaining monthly budgets.',
    learningObjectives: [
      'Design an expense intake form with input validation and instant calculation.',
      'Display dynamic category breakdown bars and remaining budget alerts.',
      'Build a companion Notion monthly budget database with rollups and formula properties.',
    ],
    prerequisites: ['Basic familiarity with web forms'],
    expectedResult:
      'A working expense tracker calculating monthly totals, category percentages, and budget health warnings.',
    steps: [
      {
        stepNumber: 1,
        title: 'Define Expense Categories & Monthly Limits',
        details: 'Establish categories: Housing ($1200), Food ($400), Utilities ($150), Leisure ($200), Savings ($500).',
        verificationTip: 'Ensure sum of category limits matches total monthly income target.',
      },
      {
        stepNumber: 2,
        title: 'Build the Intake Form in Lovable',
        details: 'Prompt Lovable to create fields: Title, Amount ($), Category, Date, and Payment Method.',
        verificationTip: 'Verify that amount input only accepts positive numbers.',
      },
      {
        stepNumber: 3,
        title: 'Render Budget Progress Bars',
        details: 'Show visual progress meters for each category that turn amber at 80% and red at 100% spent.',
        verificationTip: 'Test with a $350 food expense to confirm the progress bar updates.',
      },
      {
        stepNumber: 4,
        title: 'Construct the Notion Budget Workspace',
        details: 'Create a Notion database linking monthly expenses to a Master Budget page with sum rollups.',
        verificationTip: 'Verify rollup accurately calculates total monthly spend.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Lovable Budget Tracker Prompt',
        tool: 'lovable',
        prompt:
          'Create a modern Personal Expense Tracker. At the top, show 3 summary cards: Total Income ($4,000), Total Spent ($2,150), Remaining Budget ($1,850). Below, provide an "Add Expense" form and an interactive expense table with category filter tabs (All, Housing, Food, Utilities, Fun). For each category, display a visual budget meter that changes color if spending exceeds 85% of limit. Style in clean emerald and slate tones.',
        parameters: ['Category limits', 'Color thresholds'],
      },
    ],
    sampleInputData: {
      description: 'Sample Monthly Expense Records',
      sampleText:
        'Date: 2026-10-02 | Grocery Store | $84.20 | Food\nDate: 2026-10-05 | Internet Fiber | $65.00 | Utilities\nDate: 2026-10-08 | Cloud Hosting | $20.00 | Work',
    },
    expectedOutputs: {
      title: 'Expense Tracker UI',
      format: 'Interactive Web Dashboard',
      content: 'A clean web dashboard displaying live budget metrics, category meters, and search filters.',
    },
    testingChecklist: ['Do progress bars update instantly when an expense is added?', 'Does local storage retain added records?'],
    commonErrors: [{ error: 'Amounts add up as strings instead of numbers.', fix: 'Ensure parseFloat(amount) is used before summing.' }],
    securitySafeguards: ['Never use real bank account numbers or financial credentials in test applications.'],
    advancedIdeas: ['Export monthly summary directly as a CSV or PDF report.'],
    caseStudyTemplate: {
      executiveSummary: 'Built a lightweight personal finance dashboard helping learners visualize monthly cash flow.',
      architecture: 'Lovable React dashboard linked to a Notion relational budget template.',
      impactMetrics: 'Helped pilot users identify an average of $180 in unused monthly recurring subscriptions.',
    },
  },

  {
    id: 'fin-p2',
    title: 'Invoice Information Extraction Assistant',
    domain: 'finance',
    difficulty: 'Beginner to Intermediate',
    estimatedHours: 2.5,
    tools: ['ai-studio'],
    businessProblem:
      'Accounts payable teams manually key in invoice numbers, line items, tax amounts, and due dates from PDF invoices, spending minutes per invoice and risking typos.',
    intendedUsers: 'Bookkeepers, finance assistants, small business owners.',
    beginnerExplanation:
      'You will create a Google AI Studio prompt that extracts structured invoice data (vendor name, invoice number, line items, subtotal, tax, total, due date) into clean JSON with mandatory human verification flags.',
    learningObjectives: [
      'Extract nested line items and totals from invoice text using Gemini.',
      'Perform automated mathematical consistency checks (subtotal + tax = total).',
      'Format outputs into accounting-ready JSON.',
    ],
    prerequisites: ['Google AI Studio account'],
    expectedResult: 'A structured JSON extraction parser that verifies line item math and flags discrepancies.',
    steps: [
      {
        stepNumber: 1,
        title: 'Define Invoice Data Contract',
        details: 'Keys: invoiceNumber, vendorName, vendorTaxId, invoiceDate, dueDate, lineItems: [{description, qty, unitPrice, lineTotal}], subtotal, taxAmount, grandTotal, mathCheckPassed.',
        verificationTip: 'Ensure currency symbols are stripped from numeric fields for calculations.',
      },
      {
        stepNumber: 2,
        title: 'Construct the AI Studio Extraction Prompt',
        details: 'Instruct the model to parse the raw text and calculate whether line items sum up to subtotal.',
        verificationTip: 'Test with an invoice containing a deliberate 10-cent rounding mismatch to test the math check.',
      },
      {
        stepNumber: 3,
        title: 'Review Output & Flag Discrepancies',
        details: 'Instruct the model to flag any missing due dates or unreadable terms.',
        verificationTip: 'Ensure flagged items appear in an "attentionRequired" list.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Invoice JSON Extraction Prompt',
        tool: 'ai-studio',
        prompt:
          'Extract structured accounting data from this invoice text into valid JSON. Include: invoiceNumber, vendorName, invoiceDate, dueDate, currency, lineItems (array of {item, quantity, unitPrice, amount}), subtotal, taxRate, taxAmount, grandTotal, and validationNotes. If the numbers do not add up mathematically, flag mathMismatch: true and explain why.',
        parameters: ['Raw invoice text'],
      },
    ],
    sampleInputData: {
      description: 'Synthetic Vendor Invoice',
      sampleText:
        'INVOICE #INV-2026-881\nFrom: Apex Cloud Solutions LLC\nDate: October 10, 2026 | Due: November 09, 2026\nBill To: Horizon Media Group\n\nItems:\n1. Cloud Server Hosting (Oct 2026) - 1 x $120.00 = $120.00\n2. Database Backup Storage - 2 x $25.00 = $50.00\n3. Security Firewall Monitoring - 1 x $80.00 = $80.00\n\nSubtotal: $250.00\nTax (8%): $20.00\nTotal Due: $270.00\nPayment terms: Net 30 via ACH transfer.',
    },
    expectedOutputs: {
      title: 'Extracted Invoice JSON',
      format: 'JSON Structure',
      content:
        '{\n  "invoiceNumber": "INV-2026-881",\n  "vendorName": "Apex Cloud Solutions LLC",\n  "invoiceDate": "2026-10-10",\n  "dueDate": "2026-11-09",\n  "subtotal": 250.00,\n  "taxAmount": 20.00,\n  "grandTotal": 270.00,\n  "mathCheckPassed": true,\n  "validationNotes": "Line items match subtotal ($250.00); 8% tax verified ($20.00)."\n}',
    },
    testingChecklist: ['Does the model extract all line items accurately?', 'Are currency signs converted to clean numbers?'],
    commonErrors: [{ error: 'Due date is formatted inconsistently.', fix: 'Specify ISO 8601 format: YYYY-MM-DD in prompt rules.' }],
    securitySafeguards: ['Never use real corporate financial tax IDs or banking accounts during tutorials.'],
    advancedIdeas: ['Forward extracted invoice JSON directly into QuickBooks or Xero via n8n webhook.'],
    caseStudyTemplate: {
      executiveSummary: 'Automated invoice data extraction with built-in mathematical verification for finance teams.',
      architecture: 'Google AI Studio Gemini 3.8 Flash structured JSON extraction.',
      impactMetrics: 'Cut invoice data entry time from 8 minutes to under 20 seconds per bill.',
    },
  },

  // ===================== SALES PROJECTS (13-16) =====================
  {
    id: 'sales-p1',
    title: 'Sales Lead Pipeline & Deal Tracker',
    domain: 'sales',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['notion'],
    businessProblem:
      'Early-stage founders and sales reps lose track of inbound prospects, fail to follow up within 24 hours, and lack visibility into deal pipeline value.',
    intendedUsers: 'Account Executives, SDRs, agency owners, freelancers.',
    beginnerExplanation:
      'You will construct a Notion CRM database with stages (Lead In, Qualified, Demo Completed, Proposal Sent, Won, Lost), expected deal value formulas, and automated follow-up filters.',
    learningObjectives: [
      'Create a CRM pipeline database with weighted deal values.',
      'Configure a visual deal board showing deal sizes on cards.',
      'Set up a "Follow-up Due Today" priority view.',
    ],
    prerequisites: ['Notion account'],
    expectedResult: 'A complete Notion Sales CRM workspace with 5 custom views and automated deal sum calculations.',
    steps: [
      {
        stepNumber: 1,
        title: 'Configure Deal Database Properties',
        details: 'Properties: Company (Title), Contact Name (Text), Deal Stage (Select), Estimated Value ($ Number), Probability (% Number), Expected Close Date (Date), Last Contacted (Date).',
        verificationTip: 'Test creating a formula property for Weighted Value: Value * Probability.',
      },
      {
        stepNumber: 2,
        title: 'Create Kanban Deal Flow Board',
        details: 'Group by Deal Stage. Configure column footers to display the Sum of Estimated Value in each stage.',
        verificationTip: 'Verify stage total dynamically sums up all cards in that column.',
      },
      {
        stepNumber: 3,
        title: 'Add Urgent Follow-up View',
        details: 'Filter where Deal Stage is not Won/Lost, and Last Contacted is more than 3 days ago.',
        verificationTip: 'Confirm stale leads surface immediately at the top of the list.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Notion Sales CRM Schema',
        tool: 'notion',
        prompt:
          'Design an intuitive Notion Sales CRM database schema for a B2B consultancy. Include 10 essential properties, stage definitions with probabilities (Lead: 10%, Qualified: 25%, Demo: 50%, Proposal: 75%, Closed-Won: 100%), formula calculations for weighted pipeline, and layout for an account record template.',
        parameters: ['Deal stages', 'Formula expressions'],
      },
    ],
    sampleInputData: {
      description: 'Synthetic Sales Lead',
      sampleText: 'Company: BrightSolar Innovations | Contact: Marcus Chen | Value: $14,000 | Stage: Proposal Sent | Close Date: 2026-10-30',
    },
    expectedOutputs: {
      title: 'Notion Sales CRM Board',
      format: 'Database Pipeline',
      content: 'A Kanban board tracking deals by stage with automated weighted pipeline calculation footers.',
    },
    testingChecklist: ['Does moving cards update column totals?', 'Does the follow-up view flag neglected prospects?'],
    commonErrors: [{ error: 'Probabilities formatted as integers instead of decimals break math.', fix: 'Divide percentage by 100 in Notion formula: prop("Value") * (prop("Probability") / 100).' }],
    securitySafeguards: ['Customer contact details must be stored in access-controlled databases complying with privacy standards.'],
    advancedIdeas: ['Connect n8n to send a Slack alert whenever a deal moves to "Closed-Won".'],
    caseStudyTemplate: {
      executiveSummary: 'Designed a lightweight Notion B2B sales pipeline CRM tracking $250k in active proposals.',
      architecture: 'Relational Notion database with weighted pipeline formulas and activity views.',
      impactMetrics: 'Zero leads missed for 60 consecutive days; average response time cut by 65%.',
    },
  },

  {
    id: 'sales-p2',
    title: 'AI Sales Email Draft Generator',
    domain: 'sales',
    difficulty: 'Beginner',
    estimatedHours: 1.5,
    tools: ['ai-studio'],
    businessProblem:
      'Sales outreach often sounds generic, robotic, and spammy. Reps either send mass un-personalized blasts that get marked as spam or spend 45 minutes researching each prospect.',
    intendedUsers: 'Sales Development Representatives, founders, business developers.',
    beginnerExplanation:
      'You will craft an AI Studio prompt that takes 3 bullet points about a prospective company and generates a personalized, value-first 4-sentence outreach email that respects the reader’s time.',
    learningObjectives: [
      'Write system prompts enforcing concise, value-oriented sales outreach.',
      'Eliminate high-pressure, manipulative sales jargon.',
      'Establish strict human approval requirements before any email is dispatched.',
    ],
    prerequisites: ['Google AI Studio account'],
    expectedResult: 'A customized sales email template with personalized opening hook, value proposition, and soft call to action.',
    steps: [
      {
        stepNumber: 1,
        title: 'Establish the 4-Sentence Email Framework',
        details: 'Sentence 1: Context/Hook. Sentence 2: Concrete Problem Observed. Sentence 3: Value/Metric Solved. Sentence 4: Low-friction Call to Action (e.g. "Worth a 5-minute chat?").',
        verificationTip: 'Ensure total word count is kept under 90 words.',
      },
      {
        stepNumber: 2,
        title: 'Configure System Instructions in AI Studio',
        details: 'Forbid clichés like "I hope this email finds you well" or "I wanted to bump this to the top of your inbox".',
        verificationTip: 'Verify that drafts jump straight into business context.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Concise Value-First Sales Email Prompt',
        tool: 'ai-studio',
        prompt:
          'You are an executive B2B sales copywriter. Write a personalized, 4-sentence outreach email based on:\n- Prospect: [Name], [Title] at [Company]\n- Observation: [Recent company news or pain point]\n- Our Value Proposition: [Brief summary]\nRules: Keep total words under 85. No fluff preamble ("Hope all is well"). Soft, non-pushy call to action asking for interest rather than booking a 30-min call. Always include a disclaimer that a human must review before sending.',
        parameters: ['Prospect info', 'Pain point', 'Value prop'],
      },
    ],
    sampleInputData: {
      description: 'Prospect Brief',
      sampleText: 'Prospect: Elena Vance, VP of Logistics at QuickFreight\nObservation: QuickFreight recently expanded to 4 new regional fulfillment hubs.\nValue Prop: Our routing automation reduces dispatch coordination delay by 30%.',
    },
    expectedOutputs: {
      title: 'Personalized Email Draft',
      format: 'Email Text',
      content:
        'Hi Elena,\n\nSaw QuickFreight’s recent launch of four new regional hubs — congratulations on the rapid expansion.\n\nAs fulfillment networks scale, dispatch coordination across new teams often introduces routing delays.\n\nWe helped Apex Freight cut dispatch lag by 30% through automated routing handoffs without changing their core WMS.\n\nWould you be open to a 5-minute idea exchange next Tuesday if this is on your radar?\n\nBest,\n[Your Name]\n\n[Human Review Checklist: Verify recipient name, confirm hub expansion news is accurate.]',
    },
    testingChecklist: ['Is the email under 90 words?', 'Is there zero spammy or aggressive phrasing?'],
    commonErrors: [{ error: 'The email includes generic praise that sounds automated.', fix: 'Ground the first sentence in a verified factual event from the prompt input.' }],
    securitySafeguards: ['Always obtain recipient consent and comply with anti-spam laws (CAN-SPAM / GDPR). Never send automated cold emails without human review.'],
    advancedIdeas: ['Create 3 variations: Soft Curiosity, Data/Metric Driven, and Follow-up Bump.'],
    caseStudyTemplate: {
      executiveSummary: 'Engineered a personalized B2B outreach prompt producing concise value-focused drafts.',
      architecture: 'Google AI Studio with 4-sentence framework constraints.',
      impactMetrics: 'Increased prospect reply rate by 22% compared to generic marketing templates.',
    },
  },

  // ===================== MARKETING & CONTENT (17-19) =====================
  {
    id: 'mkt-p1',
    title: 'Content Calendar & Social Campaign Planner',
    domain: 'marketing',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['notion', 'ai-studio'],
    businessProblem:
      'Content marketers and creators struggle to maintain consistency across social channels, frequently rushing to create posts on the day of publication without strategic alignment.',
    intendedUsers: 'Social Media Managers, marketing generalists, content creators.',
    beginnerExplanation:
      'You will build a structured Notion content calendar with channel views (LinkedIn, X, Newsletter) and an AI Studio prompt to repurpose one core article into multi-channel posts.',
    learningObjectives: [
      'Create a visual content calendar database in Notion.',
      'Repurpose long-form themes into platform-specific social copy using Gemini.',
      'Track content status: Idea, Drafting, Review, Scheduled, Published.',
    ],
    prerequisites: ['Notion and Google AI Studio'],
    expectedResult: 'A Notion publishing schedule populated with 10 platform-specific content drafts.',
    steps: [
      {
        stepNumber: 1,
        title: 'Build the Notion Content Calendar',
        details: 'Properties: Post Title, Channel (Multi-select), Status, Scheduled Date, Asset URL, Engagement Notes.',
        verificationTip: 'Toggle Calendar view to verify dates render chronologically.',
      },
      {
        stepNumber: 2,
        title: 'Create the AI Studio Repurposing Prompt',
        details: 'Instruct the model to take a 300-word topic and generate: 1 LinkedIn thought leadership post, 1 newsletter teaser, and 1 short-form tip.',
        verificationTip: 'Ensure each output adheres to platform formatting (e.g. hashtags and whitespace for LinkedIn).',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Content Repurposing Suite Prompt',
        tool: 'ai-studio',
        prompt:
          'Take the following core topic and produce 2 tailored drafts:\n1. LinkedIn Professional Post: 150 words, hook in line 1, bulleted insights, concluding question to stimulate discussion.\n2. Newsletter Snippet: 80 words, punchy actionable takeaway.\nTopic: [Insert Topic]\nConstraint: Avoid hype words ("game changer", "revolutionary"). Focus on practical application.',
        parameters: ['Core Topic', 'Target Audience'],
      },
    ],
    sampleInputData: {
      description: 'Topic Brief',
      sampleText: 'Topic: Why non-technical teams should learn visual workflow tools like n8n to automate recurring spreadsheet updates.',
    },
    expectedOutputs: {
      title: 'Repurposed Content Package',
      format: 'Multi-Channel Drafts',
      content: 'Formatted LinkedIn post with clean spacing and a newsletter summary ready to paste into Notion.',
    },
    testingChecklist: ['Are posts tailored to platform conventions?', 'Does the Notion calendar clearly show publishing gaps?'],
    commonErrors: [{ error: 'AI generates too many emojis.', fix: 'Add constraint: "Maximum 1-2 subtle emojis per post."' }],
    securitySafeguards: ['Do not publish proprietary company data or unreleased product features in social copy.'],
    advancedIdeas: ['Use n8n to automatically notify the design team when a post moves to "Needs Visual Asset".'],
    caseStudyTemplate: {
      executiveSummary: 'Built an integrated content calendar and AI repurposing engine for cross-channel marketing.',
      architecture: 'Notion editorial calendar combined with Google AI Studio content synthesis.',
      impactMetrics: 'Doubled monthly post output while reducing brainstorming time by 4 hours weekly.',
    },
  },

  // ===================== EDUCATION & STUDY (20-21) =====================
  {
    id: 'edu-p1',
    title: 'AI Study Planner & Learning Tracker',
    domain: 'education',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['lovable', 'notion'],
    businessProblem:
      'Learners enrolled in online courses often drop out after 2 weeks because they lack structured daily milestones and a clear view of their weekly study momentum.',
    intendedUsers: 'Students, certification candidates, career transitioners.',
    beginnerExplanation:
      'You will build an interactive Study Planner app in Lovable and a companion Notion syllabus database that breaks any course into daily 25-minute study bites with streak tracking.',
    learningObjectives: [
      'Deconstruct complex certification syllabi into digestible daily tasks.',
      'Build a habit-forming streak counter and study timer in Lovable.',
      'Track course completion percentages across multiple subjects.',
    ],
    prerequisites: ['Lovable and Notion accounts'],
    expectedResult: 'A study companion app with daily checklists, study timer, and visual completion badges.',
    steps: [
      {
        stepNumber: 1,
        title: 'Design the Study Dashboard in Lovable',
        details: 'Include: Current Course Banner, Weekly Study Goal (e.g. 5 hours), Daily Checklist, and 25-minute Pomodoro timer.',
        verificationTip: 'Verify timer counts down and rings a chime or alert on zero.',
      },
      {
        stepNumber: 2,
        title: 'Implement Interactive Task Check-off',
        details: 'Store completed study sessions in local storage so learners preserve their study streaks.',
        verificationTip: 'Check off 3 tasks and refresh the page to confirm persistence.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Study Planner Web App Prompt',
        tool: 'lovable',
        prompt:
          'Build an AI Study Planner web application. Top bar: Daily Streak counter (e.g. 7 Days 🔥) and Total Hours Studied this week. Main section: 1) Interactive Pomodoro Focus Timer (25 min / 5 min break) with Start/Pause controls. 2) Today’s Study Agenda with checkboxes that strike through completed items and increment a daily progress bar. 3) Resource Quick Links card. Use calm indigo and white styling with clean typography.',
        parameters: ['Timer settings', 'Checklist items'],
      },
    ],
    sampleInputData: {
      description: 'Study Syllabus',
      sampleText: 'Topic: Generative AI Fundamentals | 5 Modules | Target: 30 mins per day for 2 weeks.',
    },
    expectedOutputs: {
      title: 'Study Planner UI',
      format: 'Interactive App',
      content: 'A complete single-page study dashboard with working timer and task tracker.',
    },
    testingChecklist: ['Does the timer work accurately?', 'Does completing tasks update the progress ring?'],
    commonErrors: [{ error: 'Timer resets if user navigates tabs.', fix: 'Store timer end timestamp in state or local storage.' }],
    securitySafeguards: ['No personal data required for study trackers.'],
    advancedIdeas: ['Generate automated flashcards for difficult module concepts using Google AI Studio.'],
    caseStudyTemplate: {
      executiveSummary: 'Created a personal study tracker application boosting study consistency and milestone tracking.',
      architecture: 'Lovable React application with browser-persisted study analytics.',
      impactMetrics: 'Maintained an 85% course completion rate across pilot learners.',
    },
  },

  {
    id: 'edu-p2',
    title: 'Quiz & Flashcard Generator for Exam Prep',
    domain: 'education',
    difficulty: 'Beginner',
    estimatedHours: 1.5,
    tools: ['ai-studio'],
    businessProblem:
      'Students spend hours passively re-reading textbooks rather than practicing active recall, leading to poor retention and exam anxiety.',
    intendedUsers: 'Students, boot camp attendees, corporate trainees.',
    beginnerExplanation:
      'You will create a Google AI Studio prompt that transforms raw lesson notes or textbook chapters into interactive multiple-choice questions with detailed explanation rubrics for both right and wrong answers.',
    learningObjectives: [
      'Apply active recall and spaced repetition principles through AI prompting.',
      'Generate high-quality multiple choice quizzes with plausible distractors.',
      'Provide educational feedback for incorrect choices to deepen understanding.',
    ],
    prerequisites: ['Google AI Studio'],
    expectedResult: 'A 5-question multiple choice quiz with answer keys, concept explanations, and study hints.',
    steps: [
      {
        stepNumber: 1,
        title: 'Structure the Quiz Output Schema',
        details: 'For each question: questionText, options (A, B, C, D), correctOption, explanationWhyCorrect, whyOtherOptionsIncorrect.',
        verificationTip: 'Ensure distractors are plausible misconceptions rather than silly choices.',
      },
      {
        stepNumber: 2,
        title: 'Run with Chapter Text',
        details: 'Feed a 200-word explanation of AI Tokens and evaluate the generated questions for conceptual depth.',
        verificationTip: 'Verify that questions test understanding rather than verbatim memorization.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Active Recall Quiz Generator Prompt',
        tool: 'ai-studio',
        prompt:
          'You are an expert instructional designer. Based on the provided study material, generate 5 challenging multiple-choice questions testing conceptual understanding. For each question:\n1. Question stem\n2. 4 choices (A, B, C, D)\n3. Correct answer\n4. Detailed explanation of why the correct choice is accurate\n5. Quick explanation of the specific misconception in each wrong option.\nStudy Material: [Insert Text]',
        parameters: ['Study Material', 'Target Grade / Level'],
      },
    ],
    sampleInputData: {
      description: 'Study Notes on LLM Tokens',
      sampleText: 'Tokens are the basic units of text that language models process. A token can be as short as one character or as long as one word (approximately 4 characters or 0.75 words in English). Models have a maximum context window of tokens they can read at one time.',
    },
    expectedOutputs: {
      title: 'Formatted Quiz Kit',
      format: 'Quiz with Explanations',
      content: '5 well-crafted questions with clear pedagogical explanations for every option.',
    },
    testingChecklist: ['Are all 4 choices distinct?', 'Do explanations clearly correct misconceptions?'],
    commonErrors: [{ error: 'The correct answer is always option C.', fix: 'Instruct the model to randomize the position of the correct answer evenly across A, B, C, and D.' }],
    securitySafeguards: ['Ensure study materials used do not violate copyright or institutional honor codes.'],
    advancedIdeas: ['Export the quiz directly into Anki flashcard format or Google Forms.'],
    caseStudyTemplate: {
      executiveSummary: 'Engineered an automated active recall quiz generator producing conceptual practice questions.',
      architecture: 'Google AI Studio with distractor analysis prompt engineering.',
      impactMetrics: 'Reduced practice test creation time by 80% while enhancing student self-testing scores.',
    },
  },

  // ===================== BUSINESS OPERATIONS (22-24) =====================
  {
    id: 'ops-p1',
    title: 'Standard Operating Procedure (SOP) Assistant',
    domain: 'operations',
    difficulty: 'Beginner',
    estimatedHours: 2,
    tools: ['notion', 'ai-studio'],
    businessProblem:
      'Internal team knowledge lives in heads or fragmented Slack messages. When someone leaves, critical processes break because nobody documented how things work.',
    intendedUsers: 'Operations Managers, Team Leads, Office Administrators.',
    beginnerExplanation:
      'You will create a structured SOP documentation workspace in Notion and an AI Studio prompt that transforms messy voice memos or bullet notes into crisp, step-by-step company procedures.',
    learningObjectives: [
      'Design a searchable SOP Knowledge Base in Notion with department tags.',
      'Format raw operational instructions into standard industry SOP formats (Purpose, Scope, Prerequisites, Steps, Exceptions).',
      'Maintain version control and review dates.',
    ],
    prerequisites: ['Notion and Google AI Studio'],
    expectedResult: 'A standardized SOP document with clear steps, troubleshooting guides, and review cadences.',
    steps: [
      {
        stepNumber: 1,
        title: 'Define the SOP Template in Notion',
        details: 'Include sections: Purpose, Responsible Roles, Tools Required, Step-by-Step Procedure, Quality Verification, Escalation Path.',
        verificationTip: 'Create as a reusable database template in Notion.',
      },
      {
        stepNumber: 2,
        title: 'Configure the AI Studio SOP Structuring Prompt',
        details: 'Instruct the model to convert conversational descriptions into imperative, action-oriented instructions.',
        verificationTip: 'Ensure sentences begin with action verbs: "Open...", "Verify...", "Click...".',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Process to Standard SOP Prompt',
        tool: 'ai-studio',
        prompt:
          'You are a Business Operations Consultant. Convert this raw process description into a professional Standard Operating Procedure (SOP). Structure:\n1. Purpose & Business Objective\n2. Scope & Target Roles\n3. Prerequisites & Required Access\n4. Step-by-Step Action Plan (numbered, concise, beginning with action verbs)\n5. Quality Assurance Checklist\n6. Common Exceptions & Troubleshooting.\nRaw Input: [Insert notes]',
        parameters: ['Raw process notes'],
      },
    ],
    sampleInputData: {
      description: 'Raw Process Notes on Laptop Handover',
      sampleText: 'When a new hire starts, IT needs to wipe an existing M2 MacBook or order new. Install Chrome, Slack, 1Password, and Zoom. Set up the company email. Hand it over on Day 1 morning and have them sign the asset receipt form.',
    },
    expectedOutputs: {
      title: 'Standardized SOP Document',
      format: 'Markdown Procedure',
      content: '# SOP-IT-004: New Hire Hardware Provisioning & Handover\n\n### 1. Purpose\nEnsure seamless, secure laptop provisioning for all incoming team members on or before Day 1...\n\n### 4. Step-by-Step Procedure\n1. Verify hardware allocation in Asset Inventory 7 days prior to start date.\n2. Execute factory reset and install standard image (Chrome, Slack, 1Password, Zoom).\n3. Provision temporary single sign-on credentials.\n4. Collect physical signature on Asset Receipt Form upon handover.',
    },
    testingChecklist: ['Can a new employee follow the steps without asking for clarification?', 'Is the escalation path clearly defined?'],
    commonErrors: [{ error: 'Steps are too vague (e.g. "set up the computer").', fix: 'Prompt the model to ask clarifying questions if key specifics are omitted.' }],
    securitySafeguards: ['Never include master passwords or security tokens in written documentation.'],
    advancedIdeas: ['Add automated quarterly review reminder triggers in n8n.'],
    caseStudyTemplate: {
      executiveSummary: 'Standardized 12 core operational workflows into an accessible Notion SOP repository.',
      architecture: 'Notion database template combined with Google AI Studio process documentation prompts.',
      impactMetrics: 'Cut new employee IT onboarding time by 3 business days.',
    },
  },

  {
    id: 'ops-p2',
    title: 'Meeting Action-Item Tracker & Follow-up Workflow',
    domain: 'operations',
    difficulty: 'Beginner to Intermediate',
    estimatedHours: 2.5,
    tools: ['ai-studio', 'notion', 'n8n'],
    businessProblem:
      'Meetings often end with great discussions but zero accountability. Action items get forgotten in chat channels and deadlines slip.',
    intendedUsers: 'Project Managers, Scrum Masters, Executive Assistants.',
    beginnerExplanation:
      'You will build an automation pipeline where raw meeting transcripts or notes are summarized into actionable tasks (Owner, Task, Due Date) and automatically synced into Notion and team alerts.',
    learningObjectives: [
      'Extract discrete action items and owners from conversational meeting notes.',
      'Filter out non-actionable chatter.',
      'Sync tasks into a Notion team task board with n8n.',
    ],
    prerequisites: ['Google AI Studio', 'Notion', 'n8n'],
    expectedResult: 'An automated workflow converting raw meeting notes into structured tasks with assigned owners.',
    steps: [
      {
        stepNumber: 1,
        title: 'Configure AI Studio Task Extraction Prompt',
        details: 'Instruct Gemini to output JSON array of tasks: [{task: string, owner: string, dueDate: string, priority: string}].',
        verificationTip: 'Ensure unassigned tasks are explicitly tagged as "Unassigned - Needs Owner".',
      },
      {
        stepNumber: 2,
        title: 'Connect n8n Workflow',
        details: 'Trigger n8n with the meeting notes JSON -> Iterate over each item -> Create new page in Notion Tasks database.',
        verificationTip: 'Verify all tasks appear in Notion with appropriate tags.',
      },
    ],
    copyReadyPrompts: [
      {
        title: 'Meeting Action-Item Extractor Prompt',
        tool: 'ai-studio',
        prompt:
          'Analyze the following raw meeting transcript. Extract strictly the actionable commitments made. Return a JSON array:\n[\n  {\n    "task": "clear action description beginning with verb",\n    "owner": "name of person responsible or Unassigned",\n    "dueDate": "explicit deadline or By Next Meeting",\n    "priority": "High / Medium / Low"\n  }\n]\nDo not include general opinions or status updates that do not require action.',
        parameters: ['Meeting Notes Transcript'],
      },
    ],
    sampleInputData: {
      description: 'Raw Meeting Notes Excerpt',
      sampleText: 'Jordan: I will update the pitch deck by Thursday afternoon. Priya: Can you also check the financial charts? Jordan: Yes, I can do that. Marcus: We need to book the conference venue before Friday or we lose the deposit. I will handle that today.',
    },
    expectedOutputs: {
      title: 'Extracted Action Items',
      format: 'JSON Task Array',
      content:
        '[\n  {"task": "Update pitch deck with revised financial charts", "owner": "Jordan", "dueDate": "Thursday Afternoon", "priority": "High"},\n  {"task": "Confirm and book conference venue to secure deposit", "owner": "Marcus", "dueDate": "Today", "priority": "High"}\n]',
    },
    testingChecklist: ['Are all commitments accurately attributed to the speaker?', 'Are passive remarks ignored?'],
    commonErrors: [{ error: 'The AI extracts discussion points as tasks.', fix: 'In prompt rules: "Only extract items where a person explicitly commits to performing work."' }],
    securitySafeguards: ['Ensure internal meeting recordings or transcripts comply with company recording consent policies.'],
    advancedIdeas: ['Send automated individual Slack DMs to task owners summarizing their commitments.'],
    caseStudyTemplate: {
      executiveSummary: 'Automated meeting action item extraction and Notion task board population via AI Studio and n8n.',
      architecture: 'Google AI Studio extraction -> n8n workflow engine -> Notion Task Database.',
      impactMetrics: '100% accountability on meeting follow-ups; zero missed venue deadlines.',
    },
  },
];
