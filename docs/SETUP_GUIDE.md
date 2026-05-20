# 🚀 TPD Lead Tracker - Setup Guide

## **Complete Setup in 5 Minutes**

### **Step 1: Create Your Google Sheet**

1. Go to **https://sheets.google.com**
2. Click **"+ Blank"** → New spreadsheet
3. Name it **"TPD Lead Tracker"**
4. **Save** (Ctrl+S or Cmd+S)

---

### **Step 2: Add the Apps Script**

1. Click **Extensions** (top menu)
2. Select **Apps Script**
3. A new tab opens → Delete all default code
4. Go to GitHub: `saraalz312/TPD_Lead_Tracker`
5. Open `tracker-script.gs`
6. **Copy ALL the code** (Ctrl+A → Ctrl+C)
7. Paste into Apps Script editor
8. Click **Save** 💾

---

### **Step 3: Run the Setup Function**

1. In Apps Script, find the dropdown that says **"Select function"**
2. Choose **`setupTracker`**
3. Click the **▶️ Run** button
4. **Authorize permissions** when prompted:
   - Google will ask for permission to access your Sheet
   - Click **"Allow"**
5. ✅ Done! Close Apps Script

---

### **Step 4: Check Your Sheet**

Go back to your Google Sheet. You should now see:

✅ **Header row** (blue) with 10 columns
✅ **Dashboard tab** (auto-created) with key metrics
✅ **Tracker tab** (your main sheet) ready for data entry

---

## **What Each Column Means**

| Column | What to Enter | Example |
|--------|---------------|---------|
| **Date** | When you got the lead | 2026-05-20 |
| **Lead Source** | Where they came from | Meta / Google / WhatsApp Direct |
| **Campaign** | Campaign name/ID | "Summer Promo" / "Google Search 1" |
| **Client Name** | Their name | "Ahmed Al Mansoori" |
| **WhatsApp Number** | Their number | +971501234567 |
| **Service Requested** | What they want | "Teeth Cleaning" / "Root Canal" |
| **Booked?** | Did they book? | Yes / No (dropdown) |
| **Invoice Amount** | How much they paid (AED) | 500 (leave blank if no booking) |
| **Platform Spend** | Your ad spend for this lead (AED) | 25 (how much you spent on ads to get them) |
| **Notes** | Any extra info | "Called twice" / "Interested but waiting" |

---

## **Daily Workflow**

### **Morning/Evening: Log Your Leads**

1. Open your **TPD Lead Tracker** sheet
2. Click the **Tracker** tab
3. Add each new lead as a new row:
   - Fill in the 10 columns
   - Use the **"Booked?"** dropdown to mark Yes/No
   - If they booked, add the invoice amount
4. Save (Ctrl+S)

### **Check Dashboard Anytime**

- Click the **Dashboard** tab
- See **real-time metrics**:
  - Total leads this month
  - How many booked
  - Booking rate (%)
  - Total revenue
  - Cost per booking
  - ROAS (return on ad spend)

---

## **Example: First 3 Leads**

| Date | Lead Source | Campaign | Client Name | WhatsApp | Service | Booked? | Invoice | Spend | Notes |
|------|-------------|----------|-------------|----------|---------|---------|---------|-------|-------|
| 2026-05-20 | Meta | Summer Promo | Ahmed | +971501234567 | Cleaning | Yes | 500 | 25 | Booked same day |
| 2026-05-20 | Google | Search - Teeth | Fatima | +971509876543 | Whitening | No | - | 40 | Asked for discount |
| 2026-05-21 | WhatsApp Direct | Referral | Ali | +971505555555 | Checkup | Yes | 300 | 0 | Referred by Ahmed |

**Dashboard shows:**
- 3 leads
- 2 bookings
- 67% booking rate
- 800 AED revenue
- 65 AED spend
- **ROAS = 12.3** ✅ (You earned 12.3x what you spent!)

---

## **Troubleshooting**

### ❌ "Script needs permission"
→ Click **"Authorize"** and log in with your Google account

### ❌ "Tracker sheet not found"
→ Make sure your sheet is named **"Tracker"** (not "Data" or "Sheet1")

### ❌ Formulas show errors
→ Go to Apps Script → Run `setupTracker()` again

### ❌ Dashboard not showing?
→ Close & reopen the sheet, or manually click the Dashboard tab

---

## **Monthly Review (First Friday of Month)**

Run this to see your best performers:

1. Open Apps Script (Extensions → Apps Script)
2. Select **`campaignROAS`** from dropdown
3. Click **Run**
4. Check the **Logs** (View → Logs)
5. You'll see which campaigns made the most profit

---

## **Next Steps After 2 Weeks**

Once you have 20-30 leads logged:

1. **Analyze patterns**:
   - Which campaign has best booking rate?
   - Which has lowest cost per booking?
   - Which services book most?

2. **Optimize**:
   - Spend more on high-ROI campaigns
   - Reduce spend on low-ROI campaigns
   - Focus on services people actually book

3. **Scale**: Double down on what works!

---

## **Questions?**

Check `COLUMN_GUIDE.md` or `FAQ.md` in the repo!

**Happy tracking!** 📊🎯
