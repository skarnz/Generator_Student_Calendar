# Raffle System Setup Guide

## Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to https://app.supabase.io
2. Create a new project (or use existing)
3. Once created, go to Settings > API

### 2. Get Your Credentials
Copy these values:
- Project URL: `https://[your-project-id].supabase.co`
- Anon Public Key: `eyJ...` (the long public key)

### 3. Update .env File
Add your credentials to `.env`:
```
VITE_SUPABASE_URL=https://[your-project-id].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key...
```

### 4. Create Database Table
1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste the contents of `supabase-setup.sql`
3. Click "Run"

### 5. Test It Out
1. Start the dev server: `npm run dev`
2. Visit `/raffle` to see the entry form
3. Visit `/raffle-admin` to see admin panel
   - Password: `GeneratorRaffle2025`

## Features
- ✅ Auto-fill support for iPhone/Safari
- ✅ Duplicate prevention (phone, email)
- ✅ Babson email validation
- ✅ Beautiful UI with IMG_5464 background
- ✅ Admin panel with random winner selection
- ✅ Animated winner selection
- ✅ Local storage to prevent re-entry

## URLs
- Entry Form: `https://yourdomain.com/raffle`
- Admin Panel: `https://yourdomain.com/raffle-admin`

## Future Enhancements (commented out for now)
- WhatsApp API integration for auto-entry
- Spinning wheel animation
- Real-time entry counter
- QR code for easy mobile access