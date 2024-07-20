const { createClient } = require('@supabase/supabase-js');

const PROJECT_ID = process.env.VITE_APP_SUPABASE_ID;
const PROJECT_KEY = process.env.VITE_APP_SUPABASE_KEY;

const supabase = createClient(PROJECT_ID, PROJECT_KEY)

module.exports = supabase;