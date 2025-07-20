import { useTranslation } from "react-i18next";

export function ScrollingBanner() {
  const { t } = useTranslation();

  const items = [
    t('scrolling.monadTestnet'),
    t('scrolling.kardiumExchange'),
    t('scrolling.comingSoon'),
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-r from-silver/20 to-silver-light/20 py-3 border-y border-silver/30">
      <div className="flex whitespace-nowrap animate-scroll-left">
        {/* Repeat items multiple times for continuous scroll */}
        {Array.from({ length: 6 }).map((_, groupIndex) => (
          <div key={groupIndex} className="flex">
            {items.map((item, index) => (
              <div
                key={`${groupIndex}-${index}`}
                className={`mx-8 px-6 py-2 rounded-full border-2 border-silver ${
                  index === 0 ? 'bg-silver/10 text-foreground font-semibold' :
                  index === 1 ? 'bg-silver/10 text-foreground font-bold text-lg border-l-4 border-r-4 border-l-silver border-r-silver' :
                  'text-white bg-muted/20'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}