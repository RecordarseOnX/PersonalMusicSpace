import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://tdnyawrsgbtejywuysft.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbnlhd3JzZ2J0ZWp5d3V5c2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODQ2ODIsImV4cCI6MjA2NDQ2MDY4Mn0.cFjrw3HlEkeWTr764Ff_9hJMw8jaUfOKldcH_O9zoAQ'
);
