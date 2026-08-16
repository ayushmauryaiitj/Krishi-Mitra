import sys

file_path = 'c:/Users/2069a/Downloads/404-main/404-main/frontend/src/features/market/MarketView.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useLanguage import
content = content.replace('import React, { useEffect, useState } from "react";', 'import React, { useEffect, useState } from "react";\nimport { useLanguage } from "../../i18n/LanguageContext";')

# Add const { t } = useLanguage()
content = content.replace('const [marketData, setMarketData] = useState([]);', 'const { t } = useLanguage();\n  const [marketData, setMarketData] = useState([]);')

# Replacements
reps = [
    ('`Failed to load market data: ${err.message}`', '`${t("market.failed_load")}${err.message}`'),
    ('"No trend summary available."', 't("market.no_trend")'),
    ('"Error: Unexpected API response format."', 't("market.api_error")'),
    ('`Could not fetch trend data: ${err.message}`', '`${t("market.fetch_error")}${err.message}`'),
    ('Market Price Dashboard', '{t("market.title")}'),
    ('Track real-time crop prices, analyze market trends, and make\n            informed selling decisions.', '{t("market.subtitle")}'),
    ('Data Loading Error', '{t("market.data_error")}'),
    ('Current Market Prices', '{t("market.current_prices")}'),
    ('<span>Sort {', '<span>{t("market.sort")} {'),
    ('<span>Export</span>', '<span>{t("market.export")}</span>'),
    ('placeholder="Filter by crop name..."', 'placeholder={t("market.filter_placeholder")}'),
    ('Detailed Price Data', '{t("market.detailed_data")}'),
    (' per page<', ' {t("market.per_page")}<'),
    ('>Crop<', '>{t("market.crop")}<'),
    ('name="Price per Quintal"', 'name={t("market.price")}'),
    ('name="Price per Tonne"', 'name={t("market.price")}'),
    ('>Price<', '>{t("market.price")}<'),
    ('>Change<', '>{t("market.change")}<'),
    ('>Location<', '>{t("market.location")}<'),
    ('>Date<', '>{t("market.date")}<'),
    ('Showing {', '{t("market.showing")} {'),
    ('} of {', '} {t("market.of")} {'),
    ('} items<', '} {t("market.items")}<'),
    ('>Previous<', '>{t("market.previous")}<'),
    ('>Next<', '>{t("market.next")}<'),
    ('Market Trend Analysis', '{t("market.trend_analysis")}'),
    (' Trend Summary<', ' {t("market.trend_summary")}<'),
    ('>Loading trend data...<', '>{t("market.loading_trend")}<'),
    ('Price Trend (Last 30 Days)', '{t("market.price_trend")}'),
    ('Market Intelligence', '{t("market.market_intelligence")}'),
    ('Projected Price (30 Days)', '{t("market.projected_price")}'),
    ('Projected using ML/AI trend analysis', '{t("market.projected_desc")}'),
    ('Best Time to Sell', '{t("market.best_time_sell")}'),
    ('Based on seasonal trends', '{t("market.based_seasonal")}'),
    ('Market Alerts', '{t("market.market_alerts")}'),
    ('Set Price Alert', '{t("market.set_price_alert")}'),
    ('Price for <', '{t("market.price_for")} <'),
    ('> has\n                              fluctuated by', '> {t("market.has_fluctuated_by")}'),
    ('fluctuated by\n                              {', 'fluctuated by {'),
    ('}% in the last week.', '}% {t("market.in_last_week")}'),
    ('Market Recommendations', '{t("market.recommendations")}'),
    ('Best Market Performer', '{t("market.best_performer")}'),
    ('Soybean is showing consistent price growth in\n                          Maharashtra markets.', '{t("market.soybean_desc")}'),
    ('Rising Demand', '{t("market.rising_demand")}'),
    ('Turmeric prices are expected to rise due to increased\n                          export demand.', '{t("market.turmeric_desc")}'),
    ('Seasonal Insight', '{t("market.seasonal_insight")}'),
    ('Now is the optimal time to plan for rabi crops\n                          according to market trends.', '{t("market.rabi_desc")}')
]

for old, new in reps:
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("MarketView modified")
