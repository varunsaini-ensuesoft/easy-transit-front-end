import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://dcnjxyuhmbpueccuyzgb.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbmp4eXVobWJwdWVjY3V5emdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjI1MzcsImV4cCI6MjAzMDY5ODUzN30.EYP06yRzrm_FqwUKRHHauQh9US42K6FbwE7iX-rJV6o"

export const supabase = createClient(PROJECT_URL, API_KEY);