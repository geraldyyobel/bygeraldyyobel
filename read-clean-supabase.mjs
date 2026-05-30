import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env file
const envFile = fs.readFileSync(path.resolve('.env'), 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  line = line.trim();
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1);
    }
    envVars[key] = val;
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: hero, error: heroErr } = await supabase.from('hero_content').select('*').single();
  const { data: about, error: aboutErr } = await supabase.from('about_content').select('*').single();
  const { data: contact, error: contactErr } = await supabase.from('contact_content').select('*').single();

  console.log("=== HERO ===");
  if (heroErr) console.log("Hero Error:", heroErr.message);
  else console.log(JSON.stringify(hero, null, 2));

  console.log("\n=== ABOUT ===");
  if (aboutErr) console.log("About Error:", aboutErr.message);
  else {
    const cleanAbout = { ...about };
    if (cleanAbout.imageUrl && cleanAbout.imageUrl.length > 100) {
      cleanAbout.imageUrl = cleanAbout.imageUrl.substring(0, 50) + "... [TRUNCATED BASE64, LENGTH: " + cleanAbout.imageUrl.length + "]";
    }
    console.log(JSON.stringify(cleanAbout, null, 2));
  }

  console.log("\n=== CONTACT ===");
  if (contactErr) console.log("Contact Error:", contactErr.message);
  else console.log(JSON.stringify(contact, null, 2));
}

main().catch(console.error);
