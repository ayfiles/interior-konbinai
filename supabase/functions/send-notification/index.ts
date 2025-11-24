import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.5.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProjectInquiryRequest {
  type: "project_inquiry";
  name: string;
  email: string;
  brand: string;
  projectType: string;
  details: string;
  timeline: string;
  budget: string;
  uploadedFiles?: Array<{ name: string; url: string }>;
}

interface InterestRequest {
  type: "interest";
  name: string;
  email: string;
  interest: string;
  package?: string;
}

type NotificationRequest = ProjectInquiryRequest | InterestRequest;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();

    let emailHtml = "";
    let subject = "";

    if (data.type === "project_inquiry") {
      subject = `New Project Inquiry from ${data.name}`;
      
      const filesHtml = data.uploadedFiles && data.uploadedFiles.length > 0
        ? `
          <p><strong>Uploaded References (${data.uploadedFiles.length}):</strong></p>
          <ul>
            ${data.uploadedFiles.map(file => `<li><a href="${file.url}">${file.name}</a></li>`).join('')}
          </ul>
        `
        : '';
      
      emailHtml = `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Brand:</strong> ${data.brand}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Details:</strong></p>
        <p>${data.details}</p>
        ${filesHtml}
      `;
    } else {
      subject = `New Interest Submission from ${data.name}`;
      const packageHtml = data.package
        ? `<p><strong>Package:</strong> ${data.package === 'project-based' ? 'Project Based' : 'Creative Partnership'}</p>`
        : '';
      emailHtml = `
        <h2>Someone is Interested!</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Interest:</strong> ${data.interest}</p>
        ${packageHtml}
      `;
    }

    console.log(`Sending notification email: ${subject}`);

    const emailResponse = await resend.emails.send({
      from: "Konbinai Notifications <onboarding@resend.dev>",
      to: ["konbinai.visual@gmail.com"],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
