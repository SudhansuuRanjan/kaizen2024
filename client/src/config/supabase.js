import { createClient } from '@supabase/supabase-js'

export const PROJECT_ID = import.meta.env.VITE_APP_SUPABASE_ID;
export const PROJECT_KEY = import.meta.env.VITE_APP_SUPABASE_KEY;

const supabase = createClient(PROJECT_ID, PROJECT_KEY)

export default supabase;