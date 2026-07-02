import { Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();

try {
    const input = await Actor.getInput();
    const { 
        keyword = 'plumber', 
        location = 'London', 
        maxLeads = 100,
        proxyConfiguration 
    } = input || {};

    const proxyConfig = await Actor.createProxyConfiguration(proxyConfiguration || { 
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
        apifyProxyCountry: 'GB' // Force UK proxies for better success rate on Yell
    });

    log.info(`Searching Yell UK for "${keyword}" in "${location}"`);
    await Actor.charge({ eventName: 'apify-actor-start', count: 1 });

    let extractedCount = 0;

    const crawler = new PlaywrightCrawler({
        proxyConfiguration: proxyConfig,
        maxConcurrency: 2,
        navigationTimeoutSecs: 90,
        browserPoolOptions: {
            useFingerprints: true,
        },
        async requestHandler({ page, request, log, enqueueLinks }) {
            log.info(`Parsing directory page: ${request.url}`);
            
            await page.waitForSelector('.businessCapsule, .listing, article', { timeout: 30000 }).catch(() => log.warning('Timeout waiting for DOM'));

            const title = await page.title();
            if (title.includes('Attention Required') || title.includes('Just a moment')) {
                throw new Error('Blocked by Cloudflare. Retrying with residential proxy...');
            }

            // Extract from standard HTML tags used in Yell
            const businessItems = await page.$$('.businessCapsule, .local-results-item, article');
            
            for (const item of businessItems) {
                if (extractedCount >= maxLeads) break;

                const nameElement = await item.$('h2, .businessCapsule--name, [itemprop="name"]');
                if (!nameElement) continue;
                const businessName = (await nameElement.innerText()).trim();

                const categoryElement = await item.$('.businessCapsule--classification, [itemprop="description"]');
                const category = categoryElement ? (await categoryElement.innerText()).trim() : keyword;

                const addressElement = await item.$('[itemprop="address"], .businessCapsule--address');
                const address = addressElement ? (await addressElement.innerText()).trim().replace(/\s+/g, ' ') : '';

                // Ratings (e.g. "4.8")
                const ratingElement = await item.$('.starRating--average, [itemprop="ratingValue"]');
                const rating = ratingElement ? (await ratingElement.innerText()).trim() : '';
                
                // Reviews count
                const reviewElement = await item.$('.starRating--total, [itemprop="reviewCount"]');
                const reviews = reviewElement ? (await reviewElement.innerText()).trim() : '';

                // Phones
                const phoneElement = await item.$('.business--telephoneNumber, [itemprop="telephone"], a[href^="tel:"]');
                let phone = phoneElement ? (await phoneElement.innerText()).trim() : '';
                
                // Website
                const websiteElement = await item.$('a.businessCapsule--ctaItem[href^="http"]:not([href*="yell.com"]), a[itemprop="url"]');
                const website = websiteElement ? await websiteElement.getAttribute('href') : '';
                
                const urlElement = await item.$('a.businessCapsule--title, h2 a');
                const listingUrl = urlElement ? await urlElement.getAttribute('href') : '';
                const fullListingUrl = listingUrl && !listingUrl.startsWith('http') ? new URL(listingUrl, 'https://www.yell.com').toString() : listingUrl;

                if (businessName && businessName.length > 2) {
                    const record = {
                        businessName,
                        category,
                        address,
                        phone,
                        website,
                        rating: `${rating} ${reviews}`.trim(),
                        listingUrl: fullListingUrl,
                        scrapedAt: new Date().toISOString()
                    };

                    await Actor.pushData(record);
                    await Actor.charge({ eventName: 'lead-extracted', count: 1 });
                    extractedCount++;
                    log.info(`✅ Extracted: ${businessName} (${extractedCount}/${maxLeads})`);
                }
            }

            // Pagination
            if (extractedCount < maxLeads) {
                const hasNextPage = await page.$('a.pagination--next, a[rel="next"]');
                if (hasNextPage) {
                    const nextUrl = await hasNextPage.getAttribute('href');
                    if (nextUrl) {
                        const absoluteUrl = new URL(nextUrl, 'https://www.yell.com').toString();
                        log.info(`Enqueuing next page: ${absoluteUrl}`);
                        await enqueueLinks({
                            urls: [absoluteUrl],
                        });
                    }
                }
            }
        },
        async failedRequestHandler({ request, log }) {
            log.error(`Failed request: ${request.url}`);
        }
    });

    const startUrl = `https://www.yell.com/ucs/UcsSearchAction.do?keywords=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`;
    
    await crawler.addRequests([{
        url: startUrl
    }]);

    await crawler.run();

    log.info(`🎉 Done! Extracted ${extractedCount} UK tradie leads.`);

} catch (error) {
    console.error('CRASH:', error);
    throw error;
} finally {
    await Actor.exit();
}
