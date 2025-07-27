// import { supabase } from "@/supabase/client";

// export const insertTailoredResult = async (data: {
//   email: string;
//   job_title: string;
//   original_resume: string;
//   improved_summary: string;
//   updated_points: string[];
//   suggested_skills: string[];
// }) => {
//   console.log("Trying to insert:", data);

//   const { error } = await supabase.from("grand-project-summaries").insert([data]);

//   if (error) {
//     console.error("Insert error:", error.message || error);
//     return { success: false, error };
//   }

//   return { success: true };
// };
import  supabase  from "@/utils/supabase/client";

export const insertTailoredResult = async (data: {
  email: string;
  job_title: string;
  original_resume: string;
  improved_summary: string;
  updated_points: string[];
  suggested_skills: string[];
}) => {
  console.log("Trying to insert:", data);

  const { error } = await supabase.from("grand-project-summaries").insert([data]);

  if (error) {
    console.error("Insert error:", error.message || error);
    return { success: false, error };
  }

  return { success: true };
};
