import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcysnjzlhejoyjaoiuwv.supabase.co';
const supabaseKey = 'sb_publishable_xKfoCxeD30I2a-qGD6I98Q_UX1gaT5F';

export const supabase = createClient(supabaseUrl, supabaseKey);