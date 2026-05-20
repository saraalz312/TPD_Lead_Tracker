# FAQ & Troubleshooting

## 🤔 Frequently Asked Questions

### Q: How often should I check the dashboard?
**A**: Once per week (e.g., every Friday). This gives you enough data to spot trends without obsessing over daily fluctuations.

### Q: What if a lead books after 30 days?
**A**: Still update the "Booked?" column to "Yes" and add the invoice. This is more accurate than missing it. The date they booked might be different from when they became a lead, but that's okay—you'll still get useful data.

### Q: Should I include leads that are still in follow-up?
**A**: Yes. Log them as "No" (not booked) first. Then update to "Yes" if they convert. This is critical for calculating true conversion rate.

### Q: What if a client books multiple times?
**A**: Log each booking separately with the same phone number. This is actually good—shows repeat customers.

### Q: What if I got the lead from an unclear source?
**A**: Put "Other" in the Lead Source column, and add details in Notes. You can refine this later.

### Q: How do I calculate cost per lead if campaigns overlap?
**A**: Divide weekly campaign spend by the number of leads that came from that specific campaign this week. Or use the Apps Script's `campaignROAS()` function.

### Q: Should I track impressions and clicks?
**A**: No. Not in this tracker. Those are vanity metrics. Track only: leads, bookings, and revenue. That's what matters.

### Q: What's a good ROAS?
**A**: 
- 2:1 or higher = healthy
- 3:1+ = great
- Below 2:1 = consider pausing or optimizing

### Q: What if I have $100 to spend, where should I put it?
**A**: Put it on the campaign with the highest booking rate, not the one with the most leads. A campaign with 100 leads but 0 bookings is worthless.

### Q: Can I delete old leads from the sheet?
**A**: I recommend keeping all data for analysis, but if you must delete, just select rows and right-click → Delete rows. The Dashboard will auto-update.

### Q: Should I add more columns?
**A**: Keep it simple for now. Add columns only after you've tracked for a month and realize you need something specific.

---

## 🔧 Troubleshooting

### Problem: Dashboard shows "0" for all metrics
**Solution 1**: Make sure your sheet is named **"Tracker"** (exactly, with capital T)
```
❌ Wrong: tracker, Leads, Data
✅ Right: Tracker
```

**Solution 2**: Make sure you have data in rows 2 and below (row 1 is headers)

**Solution 3**: Run `setupTracker()` again:
- Extensions → Apps Script
- Select `setupTracker` from dropdown
- Click Run

### Problem: Date column shows weird numbers instead of dates
**Solution**: 
1. Select column A (click the "A" header)
2. Right-click → Format cells
3. Choose **Date** → **YYYY-MM-DD**
4. Click Apply

### Problem: "Booked?" column doesn't have a dropdown
**Solution**:
1. Click column G header
2. Go to **Data** → **Data validation**
3. Under "Criteria", choose **List of items**
4. Type: `Yes, No`
5. Click Save

### Problem: Apps Script won't run / gives error
**Solution 1**: Refresh the page (Ctrl+R or Cmd+R)

**Solution 2**: Check that you have **Edit** permission on the sheet (not just View)

**Solution 3**: Delete the script and paste the entire code from `tracker-script.gs` again

**Solution 4**: Try a different browser

### Problem: Formulas in dashboard are showing errors like "#REF!"
**Solution**: 
1. Make sure your data sheet is named **"Tracker"**
2. Run `setupTracker()` to regenerate dashboard

### Problem: I accidentally deleted the Dashboard
**Solution**:
1. Go to **Extensions → Apps Script**
2. Select **`createDashboard`** from dropdown
3. Click **Run**
4. Dashboard will be recreated

### Problem: Some numbers look wrong (too high or too low)
**Solution**: 
1. Check that data is in the right columns:
   - Column H = Invoice (revenue only if they booked)
   - Column I = Platform Spend (ad costs)
2. Make sure "Booked?" is exactly "Yes" or "No" (not "yes", "YES", "Y", etc.)
3. Make sure dates are in YYYY-MM-DD format

### Problem: I see "#DIV/0!" error in dashboard
**Solution**: You probably have 0 leads. This is normal in the first few days. Once you have 5+ leads, error will disappear.

---

## 📱 Using on Mobile

Yes, you can access and edit on mobile:
1. Open Google Sheets app
2. Open "TPD Lead Tracker"
3. Fill in data from your phone
4. Go to "Dashboard" tab to check metrics

**Pro tip**: Log leads while talking to the client on WhatsApp. Do it immediately before you forget.

---

## 🔐 Sharing with Your Team

If you want your team to see the tracker:

1. Click **Share** button (top right)
2. Add their email
3. Choose **Editor** (so they can add data)
4. Send invite

**Tip**: Make them **Viewers** if you don't want them editing, just viewing.

---

## 📈 Data Privacy

This is **your personal Google Sheet**. Data isn't shared anywhere unless you explicitly share the link.

**Important**: Don't share client phone numbers with anyone who shouldn't have them (GDPR/local privacy laws).

---

## 🚀 When to Upgrade Beyond Google Sheets

After 3 months, if you have:
- ✅ 200+ leads tracked
- ✅ Clear winning campaigns
- ✅ Want to automate data entry

Then consider:
1. **n8n** (free self-hosted) - Auto-pull WhatsApp messages
2. **Zapier** (paid) - Auto-sync Meta/Google spending
3. **Custom CRM** - Full platform integration

But honestly? Google Sheets works great for 6-12 months if you're disciplined about data entry.

---

## ✉️ Still Have Questions?

Add more issues or questions to the GitHub repo, or refer to:
- **Setup Guide**: `docs/SETUP_GUIDE.md`
- **Column Guide**: `docs/COLUMN_GUIDE.md`
- **Script Comments**: Open `tracker-script.gs` to see inline documentation

---

**Good luck with your tracking! 🎯**
