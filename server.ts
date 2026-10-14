import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!apiKey,
      model: 'gemini-3.8-flash',
    });
  });

  // AI Mentor endpoint
  app.post('/api/gemini/mentor', async (req, res) => {
    const { prompt, mode = 'teach', context = '', history = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const modeInstructions: Record<string, string> = {
      teach:
        'Mode: Teach Me. Explain concepts in simple, jargon-free English for beginners. Use relatable everyday analogies, clear bullet points, and real-world examples. Highlight what is free vs paid and emphasize responsible AI.',
      guide:
        'Mode: Guide Me Step-by-Step. Break the task down into a numbered checklist with concrete, actionable steps. For each step, explain what button to click or what to type, and what expected output to verify.',
      hint:
        'Mode: Give Me a Hint. Do not reveal the full answer or complete prompt immediately. Instead, give a guiding clue, explain the underlying logic, and ask a reflective question to help the learner solve it themselves.',
      review:
        'Mode: Review My Work. Constructively evaluate the user’s prompt, workflow logic, or project idea. Highlight strengths, spot potential errors (like hallucination risks, missing constraints, privacy issues), and provide an improved revised version.',
    };

    const systemInstruction = `You are the friendly, expert AI Mentor at "GenAI Launchpad — Learn AI Tools by Building Real Projects".
Your target audience is beginners, career switchers, non-engineers, recruiters, analysts, and students.
You teach five core tools:
1. Lovable (no-code / AI app builder)
2. Google AI Studio (Gemini prompting & prototypes)
3. Google Stitch (AI UI/UX design)
4. Notion (knowledge management & databases)
5. n8n (visual workflow automation)

Guidelines:
- Never assume coding knowledge or paid subscriptions.
- Explain technical terms (like tokens, system prompts, webhooks, JSON, API, temperature) in plain words.
- Emphasize ethical AI, human review, and data privacy (never input real personal data/PII into prompts).
- ${modeInstructions[mode] || modeInstructions.teach}
${context ? `Context about current learner activity: ${context}` : ''}`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
          },
        });

        return res.json({
          reply: response.text || 'I have analyzed your request. Here are my thoughts.',
          source: 'gemini-3.8-flash',
        });
      } catch (err: any) {
        console.error('Gemini API call failed:', err?.message || err);
        // Fall through to fallback engine if API key rate limits or fails
      }
    }

    // Fallback response generator if API key is not yet set or throttled
    const fallbackReply = generateFallbackMentorResponse(prompt, mode, context);
    return res.json({
      reply: fallbackReply,
      source: 'built-in-instructional-engine',
      note: apiKey ? 'Generated via learning mentor engine' : 'Tip: Set GEMINI_API_KEY in Secrets for live Gemini model streaming.',
    });
  });

  // Dedicated generator endpoint for project tools (Job descriptions, interview questions, resume parser simulation)
  app.post('/api/gemini/generate', async (req, res) => {
    const { type, payload } = req.body;

    if (ai) {
      try {
        let systemInstruction = 'You are a helpful GenAI assistant producing structured, practical business deliverables.';
        let userPrompt = '';

        if (type === 'job-description') {
          systemInstruction = `You are an expert HR and recruitment prompt engineer. Generate a professional, inclusive, structured Job Description. Include:
1. Executive Summary & About the Role
2. Key Responsibilities (action-oriented bullets)
3. Required Qualifications & Skills (strictly job-related)
4. Preferred / Nice-to-Have Skills
5. Work Environment & Benefits
6. Ethical hiring disclaimer.
Always avoid biased language.`;
          userPrompt = `Generate a job description for:\nRole: ${payload.title}\nDepartment: ${payload.department}\nExperience Level: ${payload.experience}\nWork Setup: ${payload.workSetup}\nLocation: ${payload.location}\nKey Skills: ${payload.skills}\nCore Responsibilities: ${payload.responsibilities}`;
        } else if (type === 'interview-questions') {
          systemInstruction = `You are a talent acquisition interview specialist. Create structured, competency-based interview questions with evaluation rubrics.
Categorize into:
1. Technical / Functional Competency
2. Behavioral (STAR method)
3. Scenario / Problem-Solving
For each question, provide: Assess Objective, Strong Answer Indicators, and Red Flags.
Ensure no discriminatory or protected-attribute questions.`;
          userPrompt = `Generate interview questions for:\nRole: ${payload.title}\nSeniority: ${payload.seniority}\nInterview Stage: ${payload.stage}\nDuration: ${payload.duration} mins\nKey Competencies to Assess: ${payload.competencies}`;
        } else if (type === 'prompt-improve') {
          systemInstruction = `You are a prompt engineering mentor. Given a user's rough prompt, output:
1. Analysis of weaknesses in original prompt
2. Optimized Prompt Template (with role, context, task, format, constraints, and variables in [BRACKETS])
3. Sample test inputs and expected results
4. Why this new prompt performs better.`;
          userPrompt = `Improve this prompt intended for tool "${payload.tool}":\n"${payload.rawPrompt}"\nGoal: ${payload.goal}`;
        } else {
          userPrompt = JSON.stringify(payload);
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: { systemInstruction },
        });

        return res.json({
          result: response.text,
          source: 'gemini-3.8-flash',
        });
      } catch (err: any) {
        console.error('Gemini generate error:', err);
      }
    }

    // High quality offline fallback for project tools
    return res.json({
      result: generateProjectToolFallback(type, payload),
      source: 'launchpad-template-engine',
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GenAI Launchpad server running at http://localhost:${PORT}`);
  });
}

function generateFallbackMentorResponse(prompt: string, mode: string, context: string): string {
  const p = prompt.toLowerCase();

  if (p.includes('system prompt') || p.includes('system instruction')) {
    if (mode === 'hint') {
      return `💡 **Mentor Hint**: Think of a system prompt as the "job description and ground rules" you give an actor before they step on stage. It sets boundaries that persist throughout the entire conversation!`;
    }
    return `### 🎓 What is a System Prompt?

A **system prompt** (or system instruction) is the foundational set of rules you give an AI before the user begins typing.

**Analogy:**
- **Regular Prompt:** Asking a barista, "Can I get a coffee with oat milk?"
- **System Prompt:** Giving the barista employee training: *"You are an upbeat barista at Green Cafe. Always greet customers with a smile, confirm allergy requirements, and suggest our pastry of the day."*

**Key Elements of a Great System Prompt:**
1. **Role & Persona:** e.g., "You are a senior HR recruitment specialist."
2. **Target Audience:** e.g., "Explain concepts for non-technical learners."
3. **Tone & Constraints:** e.g., "Keep answers under 200 words. Never invent missing resume qualifications."
4. **Output Format:** e.g., "Respond in bullet points with bold keywords."

**Try this in Google AI Studio:**
Paste your persona in the "System Instructions" box on the left, then run simple questions on the right to see how consistently it behaves!`;
  }

  if (p.includes('webhook') || p.includes('n8n')) {
    return `### ⚡ Understanding Webhooks in n8n

A **webhook** is a digital doorbell for web services!

- **Traditional API polling:** You repeatedly knock on the door every 5 minutes: *"Is there new data yet? Is there new data yet?"* (Wastes computer resources).
- **Webhook:** You say: *"Here is my address (Webhook URL). Ring my bell whenever someone submits the form!"*

**In n8n:**
1. Add a **Webhook Trigger Node**.
2. Copy the "Test Webhook URL".
3. When external tools (like Typeform, Google Forms, or Lovable) send an HTTP POST request to that URL, n8n immediately catches the JSON data and begins running your workflow!

**Security Tip:** Always keep production webhook credentials secure and validate headers or secrets so random internet traffic cannot trigger your automation.`;
  }

  if (p.includes('hallucination') || p.includes('hallucinating')) {
    return `### 🛡️ How to Stop AI Hallucinations

Hallucinations happen when an LLM predicts likely-sounding words instead of verifying actual ground-truth facts.

**4 Proven Techniques to Fix It:**
1. **Provide Grounding Context:** Feed the raw text (e.g., job requirements or resume snippet) and state: *"Rely strictly on the provided text above. If information is not explicitly stated, write 'Not specified' — do not infer or make assumptions."*
2. **Lower Temperature:** Set temperature to \`0.0\` or \`0.2\` in Google AI Studio for deterministic extraction.
3. **Ask for Evidence:** Require the model to quote exact sentence lines as justification.
4. **Human-in-the-Loop:** Never let an AI make final hiring, medical, or financial decisions automatically!`;
  }

  return `### 🚀 GenAI Mentor Guidance

Thank you for your question about **"${prompt.slice(0, 60)}${prompt.length > 60 ? '...' : ''}"**!

**Key Recommendation for Beginners:**
1. **Define the Desired Outcome First:** Specify exactly what format you need (e.g., Markdown table, bulleted list, JSON object).
2. **Break Big Problems into Smaller Steps:** Instead of asking an AI to "build an entire recruitment app", first prompt it to outline the database fields, then generate the form components, and then script the confirmation email.
3. **Test with Synthetic Data:** When experimenting with Notion, n8n, or AI Studio, always use fictional names and mock figures to protect privacy.

Select any of the 4 modes above (Teach, Guide, Hint, or Review) to tailor my assistance to your learning style!`;
}

function generateProjectToolFallback(type: string, payload: any): string {
  if (type === 'job-description') {
    return `# ${payload.title || 'Senior Talent Acquisition Partner'}

## Company Overview & Role Summary
We are seeking an enthusiastic **${payload.title || 'Professional'}** to join our **${payload.department || 'Operations'}** team. This role operates under a **${payload.workSetup || 'Hybrid'}** arrangement based in **${payload.location || 'Remote / Flexible'}**. In this position, you will drive impactful outcomes while collaborating across modern workflows.

## Key Responsibilities
${(payload.responsibilities || 'Lead daily project coordination\nCollaborate with cross-functional partners\nMaintain high quality documentation and metric reporting')
  .split('\n')
  .map((r: string) => `- ${r.trim()}`)
  .filter((r: string) => r.length > 2)
  .join('\n')}

## Required Qualifications
${(payload.skills || 'Demonstrated domain expertise\nStrong written and verbal communication\nProven problem-solving capabilities')
  .split('\n')
  .map((s: string) => `- ${s.trim()}`)
  .filter((s: string) => s.length > 2)
  .join('\n')}

## Preferred Qualifications
- Experience utilizing generative AI and no-code tools (Lovable, Notion, n8n) to streamline workflows.
- Strong organizational agility and data-informed decision making.

## Equal Opportunity & Responsible AI Hiring Commitment
Our organization evaluates all applicants solely on verified, job-related criteria. Artificial intelligence tools utilized in our talent pipeline are assistive only; every evaluation and final hiring decision is conducted by human professionals.`;
  }

  if (type === 'interview-questions') {
    return `### Structured Competency Interview Guide: ${payload.title || 'Candidate Assessment'}
**Stage:** ${payload.stage || 'First Round Screening'} | **Target Time:** ${payload.duration || 45} minutes

---

#### 1. Core Competency & Functional Depth
- **Question:** "Can you walk through a recent real-world project where you had to apply ${payload.competencies || 'your core domain skills'} under tight deadlines?"
- **What to Look For (Green Flags):** Specific metric-backed examples, clear articulation of technical trade-offs, ownership of both successes and setbacks.
- **Red Flags:** Vague generalizations, claiming sole credit for large team efforts, inability to explain the 'why' behind choices.

#### 2. Behavioral Assessment (STAR Framework)
- **Question:** "Describe a situation where unexpected requirements forced you to pivot your approach mid-way. How did you realign stakeholders?"
- **Evaluation Criteria:** Adaptability, empathetic communication, structured problem deconstruction.

#### 3. Ethical & Scenario-Based Exercise
- **Question:** "If you noticed an automated tool producing biased or inaccurate summaries for your team's workflow, what exact steps would you take to escalate and rectify it?"
- **Evaluation Criteria:** High integrity, understanding of human-in-the-loop validation, bias awareness.

#### 4. Candidate Question Time & Next Steps
- Allocate 10-15 minutes for the candidate's questions about culture, team dynamics, and growth roadmap.`;
  }

  return `Deliverable generated successfully. Review the structured output and verify all data points before integrating into your production workspace.`;
}

startServer();
