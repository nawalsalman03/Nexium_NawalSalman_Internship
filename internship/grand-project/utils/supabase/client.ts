// // utils/supabase/client.ts
// 'use client'

// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// export const supabase = createClientComponentClient()
// utils/supabase/client.ts

// import { createBrowserClient } from '@supabase/ssr';
// import { type Database } from './types';

// const supabase = createBrowserClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default supabase;
import { createBrowserClient } from '@supabase/ssr';
import { type Database } from './types';

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

const supabase = createClient();
export default supabase;
