# UK Trades Directory Scraper

**Extract verified UK businesses, tradesmen, and local services from Scoot.co.uk.**

The UK Trades Directory Scraper is your gateway to extracting premium B2B data from the United Kingdom. Source highly valuable business leads effortlessly.

## What can UK Trades Directory Scraper do?

- ✅ **Extract UK B2B Leads** - Get business names, physical addresses, and direct contact numbers.
- ✅ **Target specific Industries** - Focus your search on plumbers, tradesmen, accountants, or local services.
- ✅ **Identify Local Footprint** - Target major economic hubs like London, Manchester, Birmingham, or Glasgow.
- ✅ **Export formats** - Download data in JSON, CSV, Excel, or HTML formats.
- ✅ **Integrations** - Connect seamlessly with API, webhooks, Make, or Zapier.
- ✅ **No coding required** - Use our simple interface to start scraping immediately.

## Why scrape UK Trades?

UK trades directories contain valuable data for:

- 🎯 **B2B Suppliers** - Target businesses that need construction materials or tools.
- 📊 **Lead Generation Agencies** - Generate local service leads.
- 📍 **Local Marketing** - Connect with tradesmen to offer marketing or software services.

## What data can you extract?

| Data Field | Description | Example |
|------------|-------------|---------|
| **businessName** | The name of the business | "London Plumbers Ltd" |
| **category** | The specific trade | "Plumber" |
| **address** | The full address | "45 High St, London" |
| **phone** | Direct contact number | "020 1234 5678" |
| **rating** | User rating and review count | "4.8 (120 Reviews)" |
| **website** | Business website | "https://www.example.com" |
| **listingUrl** | Link to the directory listing | "https://www.scoot.co.uk/..." |

## How to scrape UK Trades data

1. **Click "Try for free"** to start using the actor.
2. **Enter your input** - Provide a keyword (e.g., "plumber") and location (e.g., "London").
3. **Configure options** - Set the maximum number of leads you want to extract.
4. **Start the scraper** - Click Start and let the actor do the work.
5. **Download results** - Export your leads as JSON, CSV, or Excel.

## Input

Configure the scraper with these key settings:
- **Keyword** - The specific trade (e.g., 'plumber', 'builder', 'electrician').
- **Location** - The UK city or postcode (e.g., 'London', 'Manchester').
- **Maximum Leads** - The total number of records to extract.
- **Proxy Configuration** - Apify Residential Proxy (UK targeted) is highly recommended.

## Output

You can download data in multiple formats:
- **JSON** - For developers and programmatic access
- **CSV** - For easy import into Excel or CRM systems
- **Excel** - Ready-to-use spreadsheet

### Output example

```json
{
    "businessName": "London Plumbers Ltd",
    "category": "Plumber",
    "address": "45 High St, London",
    "phone": "02012345678",
    "website": "https://www.example.com",
    "rating": "4.8 120 Reviews",
    "listingUrl": "https://www.scoot.co.uk/...",
    "scrapedAt": "2026-07-02T15:00:00Z"
}
```

## How much does it cost?

This actor uses a Pay-Per-Event (PPE) pricing model:
- **Base Fee**: $0.25 per start
- **Lead Fee**: $2.50 per 1,000 leads extracted ($0.0025 per lead)

**Free tier**: Apify provides $5 in free monthly credits, allowing you to extract nearly 2,000 leads for free!

## Is it legal to scrape?

Yes, scraping publicly available data is generally legal. This Actor only extracts public information.

**Best practices**:
- Use the data ethically for B2B outreach.
- Respect the target site's Terms of Service.
- Ensure compliance with GDPR when handling contact information.

## Integrations

Connect with 1000+ apps:
- **Google Sheets** - Auto-update spreadsheets with new leads.
- **Slack** - Get notifications when scraping finishes.
- **Webhooks** - Send data directly to your CRM.
- **API** - Programmatic access for developers.

---

**License**: Apache-2.0 | **Version**: 1.0.0
