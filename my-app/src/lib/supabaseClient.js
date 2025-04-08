import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zywtyuoljywyiuvkftvp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5d3R5dW9sanl3eWl1dmtmdHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTQyOTUsImV4cCI6MjA1OTU3MDI5NX0.I1JCN9X-x-YxsQnj2clGomrCTc6fBbVilscxLjvxzEg';

export const supabase = createClient(supabaseUrl, supabaseKey);