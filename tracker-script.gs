/**
 * TPD Lead Tracker - Google Apps Script
 * 
 * This script automates calculations and formatting for your lead tracking sheet.
 * 
 * Setup:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire code
 * 4. Save and run setupTracker()
 * 5. Authorize permissions when prompted
 */

// ========== SETUP FUNCTION ==========
function setupTracker() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Create headers if they don't exist
  const headers = [
    "Date",
    "Lead Source",
    "Campaign",
    "Client Name",
    "WhatsApp Number",
    "Service Requested",
    "Booked?",
    "Invoice Amount",
    "Platform Spend",
    "Notes"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#4285F4")
    .setFontColor("white")
    .setFontWeight("bold")
    .setFontSize(11);
  
  // Set column widths
  sheet.setColumnWidth(1, 100);  // Date
  sheet.setColumnWidth(2, 120);  // Lead Source
  sheet.setColumnWidth(3, 140);  // Campaign
  sheet.setColumnWidth(4, 150);  // Client Name
  sheet.setColumnWidth(5, 140);  // WhatsApp Number
  sheet.setColumnWidth(6, 140);  // Service Requested
  sheet.setColumnWidth(7, 80);   // Booked?
  sheet.setColumnWidth(8, 110);  // Invoice Amount
  sheet.setColumnWidth(9, 110);  // Platform Spend
  sheet.setColumnWidth(10, 150); // Notes
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Add data validation for "Booked?" column
  const dataValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Yes", "No"])
    .setAllowInvalid(false)
    .build();
  
  sheet.getRange("G2:G1000").setDataValidation(dataValidation);
  
  // Create Dashboard tab
  createDashboard();
  
  Logger.log("✅ Lead Tracker setup complete!");
}

// ========== DASHBOARD CREATION ==========
function createDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let dashboardSheet = ss.getSheetByName("Dashboard");
  
  // Delete existing dashboard if it exists
  if (dashboardSheet) {
    ss.deleteSheet(dashboardSheet);
  }
  
  // Create new dashboard
  dashboardSheet = ss.insertSheet("Dashboard", 0);
  
  // Title
  dashboardSheet.getRange("A1").setValue("📊 Lead Tracker Dashboard")
    .setFontSize(16)
    .setFontWeight("bold")
    .setBackground("#4285F4")
    .setFontColor("white");
  
  // Merge cells for title
  dashboardSheet.mergeColumns(1, 4);
  
  // Current Month Section
  dashboardSheet.getRange("A3").setValue("This Month's Performance")
    .setFontWeight("bold")
    .setFontSize(12);
  
  const metrics = [
    { label: "Total Leads", row: 4, formula: '=COUNTA(Tracker!D2:D1000)' },
    { label: "Total Bookings", row: 5, formula: '=COUNTIF(Tracker!G2:G1000,"Yes")' },
    { label: "Booking Rate (%)", row: 6, formula: '=IF(COUNTA(Tracker!D2:D1000)=0,0,ROUND(COUNTIF(Tracker!G2:G1000,"Yes")/COUNTA(Tracker!D2:D1000)*100,1))' },
    { label: "Total Revenue (AED)", row: 7, formula: '=SUM(Tracker!H2:H1000)' },
    { label: "Total Ad Spend (AED)", row: 8, formula: '=SUM(Tracker!I2:I1000)' },
    { label: "ROAS", row: 9, formula: '=IF(SUM(Tracker!I2:I1000)=0,0,ROUND(SUM(Tracker!H2:H1000)/SUM(Tracker!I2:I1000),2))' },
    { label: "Cost per Lead (AED)", row: 10, formula: '=IF(COUNTA(Tracker!D2:D1000)=0,0,ROUND(SUM(Tracker!I2:I1000)/COUNTA(Tracker!D2:D1000),2))' },
    { label: "Cost per Booking (AED)", row: 11, formula: '=IF(COUNTIF(Tracker!G2:G1000,"Yes")=0,0,ROUND(SUM(Tracker!I2:I1000)/COUNTIF(Tracker!G2:G1000,"Yes"),2))' }
  ];
  
  metrics.forEach(metric => {
    dashboardSheet.getRange(`A${metric.row}`).setValue(metric.label).setFontWeight("bold");
    dashboardSheet.getRange(`B${metric.row}`).setFormula(metric.formula).setFontSize(12);
  });
  
  // Format metric cells
  dashboardSheet.getRange("B4:B11").setBackground("#E8F0FE").setFontWeight("bold");
  
  // Campaign Performance Section
  dashboardSheet.getRange("A14").setValue("Campaign Performance")
    .setFontWeight("bold")
    .setFontSize(12);
  
  dashboardSheet.getRange("A15").setValue("Campaign")
    .setFontWeight("bold")
    .setBackground("#CCCCCC");
  dashboardSheet.getRange("B15").setValue("Leads")
    .setFontWeight("bold")
    .setBackground("#CCCCCC");
  dashboardSheet.getRange("C15").setValue("Bookings")
    .setFontWeight("bold")
    .setBackground("#CCCCCC");
  dashboardSheet.getRange("D15").setValue("Spend (AED)")
    .setFontWeight("bold")
    .setBackground("#CCCCCC");
  dashboardSheet.getRange("E15").setValue("Cost/Booking")
    .setFontWeight("bold")
    .setBackground("#CCCCCC");
  
  // Set column widths for dashboard
  dashboardSheet.setColumnWidth(1, 180);
  dashboardSheet.setColumnWidth(2, 100);
  dashboardSheet.setColumnWidth(3, 100);
  dashboardSheet.setColumnWidth(4, 120);
  dashboardSheet.setColumnWidth(5, 140);
  
  Logger.log("✅ Dashboard created!");
}

// ========== AUTO-FORMATTING ON EDIT ==========
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // Only process the Tracker sheet
  if (sheet.getName() !== "Tracker") return;
  
  // Format date column
  if (range.getColumn() === 1 && range.getRow() > 1) {
    range.setNumberFormat("yyyy-mm-dd");
  }
  
  // Format currency columns
  if ((range.getColumn() === 8 || range.getColumn() === 9) && range.getRow() > 1) {
    range.setNumberFormat("0.00");
  }
}

// ========== MONTHLY SUMMARY ==========
function createMonthlySummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const trackerSheet = ss.getSheetByName("Tracker");
  
  if (!trackerSheet) {
    Logger.log("❌ Tracker sheet not found!");
    return;
  }
  
  const data = trackerSheet.getDataRange().getValues();
  const summary = {};
  
  // Group by month
  data.forEach((row, index) => {
    if (index === 0) return; // Skip header
    
    const date = row[0];
    if (!date) return;
    
    const monthKey = Utilities.formatDate(new Date(date), "GMT", "yyyy-MM");
    
    if (!summary[monthKey]) {
      summary[monthKey] = {
        leads: 0,
        bookings: 0,
        revenue: 0,
        spend: 0
      };
    }
    
    summary[monthKey].leads++;
    if (row[6] === "Yes") summary[monthKey].bookings++;
    summary[monthKey].revenue += parseFloat(row[7]) || 0;
    summary[monthKey].spend += parseFloat(row[8]) || 0;
  });
  
  Logger.log("Monthly Summary:");
  for (let month in summary) {
    const s = summary[month];
    Logger.log(`${month}: ${s.leads} leads, ${s.bookings} bookings, ${s.revenue} AED revenue, ${s.spend} AED spend`);
  }
}

// ========== UTILITY: Calculate ROAS by Campaign ==========
function campaignROAS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const trackerSheet = ss.getSheetByName("Tracker");
  
  if (!trackerSheet) {
    Logger.log("❌ Tracker sheet not found!");
    return;
  }
  
  const data = trackerSheet.getDataRange().getValues();
  const campaigns = {};
  
  data.forEach((row, index) => {
    if (index === 0) return; // Skip header
    
    const campaign = row[2]; // Column C
    const revenue = parseFloat(row[7]) || 0; // Column H
    const spend = parseFloat(row[8]) || 0; // Column I
    
    if (!campaigns[campaign]) {
      campaigns[campaign] = { revenue: 0, spend: 0 };
    }
    
    campaigns[campaign].revenue += revenue;
    campaigns[campaign].spend += spend;
  });
  
  Logger.log("📊 Campaign ROAS Analysis:");
  for (let campaign in campaigns) {
    const roas = campaigns[campaign].spend > 0 ? campaigns[campaign].revenue / campaigns[campaign].spend : 0;
    Logger.log(`${campaign}: ROAS = ${roas.toFixed(2)} | Spend: ${campaigns[campaign].spend} AED | Revenue: ${campaigns[campaign].revenue} AED`);
  }
}

// ========== INSTRUCTIONS ==========
/*
HOW TO USE:
1. Rename your current sheet to "Tracker"
2. Open Extensions → Apps Script
3. Paste this entire code
4. Click Save
5. Run setupTracker() from the dropdown
6. Authorize permissions
7. Start logging leads!

COLUMNS (Auto-created):
A - Date (format: YYYY-MM-DD)
B - Lead Source (Meta/Google/WhatsApp Direct)
C - Campaign Name
D - Client Name
E - WhatsApp Number
F - Service Requested
G - Booked? (Yes/No dropdown)
H - Invoice Amount (AED)
I - Platform Spend (AED)
J - Notes

DASHBOARD:
- Automatically calculates key metrics
- Updates in real-time as you add data
- Shows ROAS, cost per booking, booking rate

MONTHLY SUMMARY:
- Run createMonthlySummary() to see monthly breakdown in logs

CAMPAIGN ANALYSIS:
- Run campaignROAS() to see which campaigns are most profitable
*/
