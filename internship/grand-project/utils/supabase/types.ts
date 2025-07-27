export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      job_results: {
        Row: {
          id: string;
          user_id: string;
          input_text: string;
          result_summary: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          input_text: string;
          result_summary: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          input_text?: string;
          result_summary?: string;
          created_at?: string;
        };
      };
    };
  };
};
