# Event Data Management

## 📝 How to Update Events

1. **Edit the CSV file**: Open `events.csv` in this folder
2. **Save your changes**: The website will automatically use the updated data
3. **Refresh the website** to see your changes

## 📊 CSV Format

The CSV file supports these columns:

| Column | Description | Example |
|--------|-------------|---------|
| Title | Event name | "AI Workshop" |
| Description | Full event details | "Join us for..." |
| Date | Event date (YYYY-MM-DD) | "2025-04-15" |
| Time | Event time | "2:00 PM" or "2:00 PM - 4:00 PM" |
| Location | Where it happens | "The Generator Space" |
| Event Type | Category | "Workshop", "Talk", "Buildathon" |
| Audience | Who can attend (semicolon-separated) | "Students;Associates" |
| Registration URL | Link to register | "https://..." |
| Speaker Name | Guest speaker | "John Doe" |
| Speaker Title | Speaker's role | "CEO of TechCo" |
| Contact Name | Event contact | "Jane Smith" |
| Contact Email | Contact email | "jane@babson.edu" |
| Food | Food provided | "Pizza and drinks" |
| Prize | Any prizes | "$1000 prize pool" |
| Short Blurb | Brief description | "Learn AI basics" |

## 💡 Tips

- Use semicolons (;) to separate multiple audiences: "Students;Associates;Everyone"
- Dates must be in YYYY-MM-DD format
- Leave fields empty if not applicable (just use empty quotes: "")
- You can edit this file in Excel, Google Sheets, or any text editor

## 🔄 Import from Google Sheets

1. Open your Google Sheet
2. File → Download → Comma Separated Values (.csv)
3. Replace this events.csv file with your download
4. Done! The website will use your new data