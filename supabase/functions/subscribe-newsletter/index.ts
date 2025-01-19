import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BEEHIIV_API_KEY = Deno.env.get('BEEHIIV_API_KEY');
const BEEHIIV_PUBLICATION_ID = "pub_c6c9f8f0-5c0a-4b0a-8b0a-5c0a4b0a8b0a"; // This needs to be replaced with your actual Beehiiv publication ID

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    console.log('Received subscription request for email:', email);

    if (!email) {
      console.error('Email is missing from request body');
      throw new Error('Email is required');
    }

    if (!BEEHIIV_API_KEY) {
      console.error('BEEHIIV_API_KEY is not set');
      throw new Error('API key configuration error');
    }

    console.log('Attempting to subscribe email to Beehiiv:', email);

    const response = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'website',
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Beehiiv API error:', responseData);
      throw new Error(responseData.message || 'Failed to subscribe to newsletter');
    }

    console.log('Successfully subscribed:', responseData);

    return new Response(
      JSON.stringify({ success: true, data: responseData }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in subscribe-newsletter function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: error.toString()
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});