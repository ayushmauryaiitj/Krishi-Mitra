import sys

file_path = 'c:/Users/2069a/Downloads/404-main/404-main/frontend/src/features/microfarm/Microfarm.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useLanguage import
content = content.replace('import { useState } from "react"', 'import { useState } from "react"\nimport { useLanguage } from "../../i18n/LanguageContext"')

# Add const { t } = useLanguage()
content = content.replace('const [loading, setLoading] = useState(false)', 'const { t } = useLanguage()\n  const [loading, setLoading] = useState(false)')

# Replacements
reps = [
    ('"Fill out your farm profile and click \'Get Recommendations\' to see which micro-farming systems are best for your plot."', 't("microfarm.initial_message")'),
    ('"Here are your recommendations:"', 't("microfarm.success_message")'),
    ('"No suitable systems found for your inputs."', 't("microfarm.no_systems_message")'),
    ('"Failed to fetch recommendations. Please try again."', 't("microfarm.error_message")'),
    ('Micro Farm Maximizer', '{t("microfarm.title")}'),
    ('Optimize your small plot with AI-powered farming recommendations and personalized system suggestions.', '{t("microfarm.subtitle")}'),
    ('Enter Farm Details', '{t("microfarm.enter_details")}'),
    ('Reset Form', '{t("microfarm.reset_form")}'),
    ('Plot Size (sq ft)', '{t("microfarm.plot_size")}'),
    ('Budget (₹)', '{t("microfarm.budget")}'),
    ('State</label>', '{t("microfarm.state")}</label>'),
    ('District</label>', '{t("microfarm.district")}</label>'),
    ('Soil Type</label>', '{t("microfarm.soil_type")}</label>'),
    ('Soil pH (if known)', '{t("microfarm.soil_ph")}'),
    ('Water Source</label>', '{t("microfarm.water_source")}</label>'),
    ('Sunlight Hours (per day)', '{t("microfarm.sunlight_hours")}'),
    ('Preferred Crops</label>', '{t("microfarm.preferred_crops")}</label>'),
    ('placeholder="Tomatoes, Lettuce, etc."', 'placeholder={t("microfarm.preferred_crops_placeholder")}'),
    ('Risk Appetite (1-10)', '{t("microfarm.risk_appetite")}'),
    ('Labor Availability (1-10)', '{t("microfarm.labor_availability")}'),
    ('>Low<', '>{t("microfarm.low")}<'),
    ('>High<', '>{t("microfarm.high")}<'),
    ('Processing...', '{t("microfarm.processing")}'),
    ('"Get Recommendations"', 't("microfarm.get_recommendations")'),
    ('Farm System Recommendations', '{t("microfarm.system_recommendations")}'),
    ('Recommendations Await', '{t("microfarm.recommendations_await")}'),
    ('% Match', '% {t("microfarm.match")}'),
    ('Setup Cost:', '{t("microfarm.setup_cost")}'),
    ('Monthly Cost:', '{t("microfarm.monthly_cost")}'),
    ('Expected ROI:', '{t("microfarm.expected_roi")}'),
    ('Payback Period:', '{t("microfarm.payback_period")}'),
    (' months<', ' {t("microfarm.months")}<'),
    ('Water Usage:', '{t("microfarm.water_usage")}'),
    ('Electricity Usage:', '{t("microfarm.electricity_usage")}'),
    ('Suitable Crops:', '{t("microfarm.suitable_crops")}'),
    ('Market Prices (Nearby Mandis):', '{t("microfarm.market_prices")}'),
    ('No market price data available', '{t("microfarm.no_market_data")}'),
    ('Government Subsidies:', '{t("microfarm.subsidies")}'),
    ('Cap: ₹', '{t("microfarm.cap")}'),
    ('Apply Online →', '{t("microfarm.apply_online")}'),
    ('No subsidy information available', '{t("microfarm.no_subsidy_info")}')
]

for old, new in reps:
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Microfarm modified")
