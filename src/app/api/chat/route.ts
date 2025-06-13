import { GoogleGenAI, Modality } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Google AI client
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! });

const GoogleSearch = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! });

    const response = await ai.models.generateContent({
      contents: [{ role: "user", parts: [{ text: query }] }],
      model: "gemini-2.0-flash",
      config: {
        tools: [{ googleSearch: {} }],
        responseModalities: [Modality.TEXT],
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.text ?? "No search results found.";
  } catch (error) {
    console.error("Google Search error:", error);
    return "Error performing Google search.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create a context prompt about Mathew Stroud
    const contextPrompt = `
    The current date is ${new Date().toLocaleDateString()}.
    You are an AI assistant for Mathew Stroud's portfolio website. You should respond in a helpful, professional, and friendly manner. Here's information about Mathew:
ABOUT MATHEW STROUD:
- Full Stack Developer
- Games Enthusiast  
- CFX Script Developer (specializes in FiveM/RedM game server development)

SKILLS & TECHNOLOGIES:
- TypeScript, JavaScript
- React, Next.js, Solid JS
- HTML, CSS, Tailwind CSS
- CFX scripting for GTA V (FiveM) and Red Dead Redemption 2 (RedM)

PROJECTS:
- StellarRP: His personal CFX project focused on immersive roleplay in GTA V Universe (website: stellarrp.com)
- RedemptionRP: CFX project for Red Dead Redemption 2 roleplay
- DefinitionRP: CFX project for GTA V roleplay  
- TwitchParadiseRP: Another CFX project for GTA V roleplay

EXPERIENCE:
- Passionate about creating user-friendly and efficient web applications
- Strong background in web technologies
- Experienced in game development through CFX scripting
- Works on multiple roleplay server projects

INSTRUCTIONS:
- Keep responses concise (2-3 sentences max)
- Be helpful and informative
- If asked about contact, mention they can reach out through the contact section
- If you don't have specific information, provide general helpful responses about his skills/projects
- Don't make up specific details not provided above
- Maintain a professional but friendly tone

User question: ${message}`;

    // Generate response using the new API
    let response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contextPrompt,
    });

    let text = response.text;

    // while (response.functionCalls) {
    //   const toolCall = response.functionCalls[0];
    //   if (toolCall.name == "generate_image") {
    //     // const image = await this.GenerateImage((toolCall.args?.prompt as string) ?? "");
    //     // finalResponse.image = image;
    //   } else if (toolCall.name == "google_search") {
    //     const searchResult = await GoogleSearch((toolCall.args?.query as string) ?? "");
    //     text = searchResult;
    //   }
    //   break; // Exit loop after handling first function call
    // }

    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating AI response:', error);

    // Fallback response in case of error
    const fallbackMessage = "Thanks for your question! I'm having trouble connecting right now, but you can learn more about Mathew's work by exploring the projects and skills sections on this site, or reach out through the contact section.";

    return NextResponse.json({
      message: fallbackMessage,
      timestamp: new Date().toISOString()
    });
  }
} 