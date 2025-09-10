# Supabase Event Check-In Setup

## Step 1: Set up Supabase Table

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL from `supabase-checkins.sql` to create the `event_checkins` table
4. This creates a table with:
   - First name, last name, phone, email fields
   - Automatic timestamps
   - Row Level Security that allows anyone to check in, but only authenticated users can view data

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy:
   - Project URL (looks like: https://xxxxx.supabase.co)
   - Anon/Public key (safe to use in frontend)

## Step 3: Add Environment Variables

### For Local Development:
Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### For Vercel Deployment:
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key

## Step 4: Test It

1. Click the "Event Check-In" button
2. Fill out the form
3. Submit
4. Check your Supabase dashboard - go to Table Editor > event_checkins

## Viewing Check-In Data

You can view check-ins in multiple ways:

1. **Supabase Dashboard**: Table Editor > event_checkins
2. **Export to CSV**: Use the Export button in Supabase
3. **Build an Admin Page**: Create a protected route that queries the data

## Security Notes

- The anon key is safe to expose - it only allows inserting check-ins
- Row Level Security ensures only authenticated users can view data
- Each check-in is timestamped automatically
- Email field is indexed for fast duplicate checking if needed

## No OAuth Needed!

Unlike Google Sheets, this approach:
- Doesn't require any OAuth setup
- Data goes directly to YOUR Supabase project
- Works immediately after adding environment variables
- Scales better and is more secure