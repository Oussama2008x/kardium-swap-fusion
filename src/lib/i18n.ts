import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        swap: "Swap",
        pool: "Pool",
        stake: "Stake",
        tasks: "Tasks",
        faq: "FAQ",
        privacy: "Privacy"
      },
      home: {
        title: "Kardium Finance",
        subtitle: "The Future of DeFi Trading",
        description: "Experience seamless cryptocurrency trading on the Monad testnet with our advanced exchange platform.",
        ceoTitle: "CEO",
        ceoName: "Oussama Kerd",
        aboutButton: "About Kardium"
      },
      swap: {
        title: "Swap Tokens",
        selectToken: "Select a token to swap",
        verified: "Verified"
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: "What is Kardium Finance?",
        a1: "Kardium Finance is a revolutionary decentralized exchange platform built on the Monad testnet, designed to provide users with seamless, secure, and efficient cryptocurrency trading experiences. Our platform combines cutting-edge blockchain technology with user-friendly interfaces to make DeFi trading accessible to everyone, from beginners to advanced traders.",
        q2: "How do I connect my wallet?",
        a2: "Connecting your wallet to Kardium Finance is simple and secure. Click the 'Connect Wallet' button in the top right corner of the interface, and select from our supported wallet providers including MetaMask, Coinbase Wallet, Rainbow, Rabby, OKX Wallet, WalletConnect, Bitget, and Phantom. Our platform uses industry-standard security protocols to ensure your assets remain safe throughout the connection process.",
        q3: "What tokens can I trade?",
        a3: "Kardium Finance supports a wide range of verified cryptocurrencies including MONAD, KARDIUM, YAKI, GMON, SHMON, WMON, USDC, USDT, USDM, CHOG, DAK, MOON, BEAN, WETH, and WBTC. All tokens on our platform undergo rigorous verification processes to ensure authenticity and security. Each verified token displays a purple verification badge for easy identification.",
        q4: "Is the platform secure?",
        a4: "Security is our top priority at Kardium Finance. We implement multiple layers of protection including smart contract audits, secure wallet integrations, encrypted data transmission, and real-time monitoring systems. Our platform operates on the Monad testnet, which provides additional security features and allows users to test trading strategies without risking mainnet assets.",
        q5: "What are the trading fees?",
        a5: "Kardium Finance offers competitive trading fees designed to maximize value for our users. Our fee structure is transparent and includes standard swap fees, liquidity provider rewards, and platform maintenance costs. Detailed fee information is available in your trading interface, and we regularly review our fee structure to ensure we remain competitive in the DeFi space.",
        q6: "How do I provide liquidity?",
        a6: "Liquidity provision on Kardium Finance allows users to earn rewards by contributing to our trading pools. To become a liquidity provider, navigate to our Pool section, select your preferred trading pair, and deposit equal amounts of both tokens. You'll receive LP tokens representing your share of the pool and earn fees from trades proportional to your contribution."
      },
      privacy: {
        title: "Privacy Policy",
        content: "At Kardium Finance, we are committed to protecting your privacy and ensuring the security of your personal information. This comprehensive privacy policy outlines how we collect, use, store, and protect your data when you interact with our decentralized exchange platform. We believe in transparency and want you to understand exactly how your information is handled.\n\nInformation Collection: We collect various types of information to provide and improve our services. This includes technical information such as your wallet address, transaction history, trading preferences, and device information. We also collect usage data including pages visited, features used, time spent on the platform, and interaction patterns. This information helps us optimize our platform performance and user experience.\n\nData Usage: The information we collect is used primarily to facilitate your trading activities, ensure platform security, improve our services, provide customer support, and comply with legal requirements. We analyze usage patterns to identify potential improvements and develop new features that better serve our community. Your trading data helps us maintain accurate records and provide you with detailed transaction histories.\n\nData Protection: We implement industry-leading security measures to protect your information. This includes encryption of sensitive data both in transit and at rest, secure server infrastructure, regular security audits, access controls, and multi-factor authentication systems. We continuously monitor our systems for potential vulnerabilities and update our security protocols to address emerging threats.\n\nData Sharing: We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share anonymized, aggregated data for research and analytics purposes. In certain circumstances, we may share information with service providers, legal authorities when required by law, or in connection with business transactions such as mergers or acquisitions.\n\nUser Rights: You have several rights regarding your personal information. You can access your data at any time through your account dashboard, request corrections to inaccurate information, delete your account and associated data, export your transaction history, and opt-out of certain data collection practices. We respect your right to privacy and will honor these requests within applicable legal frameworks.\n\nCookies and Tracking: Our platform uses cookies and similar technologies to enhance your user experience. These help us remember your preferences, maintain your session, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser, though disabling certain cookies may affect platform functionality.\n\nThird-Party Services: We integrate with various third-party services including wallet providers, blockchain networks, analytics tools, and security services. Each of these services has their own privacy policies, and we encourage you to review them. We carefully select partners who maintain high privacy standards and limit data sharing to what is necessary for service provision.\n\nData Retention: We retain your personal information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Transaction data may be retained longer for regulatory compliance and audit purposes. When data is no longer needed, we securely delete or anonymize it.\n\nInternational Transfers: As a global platform, your information may be transferred to and processed in countries outside your residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information during international transfers.\n\nUpdates to This Policy: We may update this privacy policy periodically to reflect changes in our practices, technology, legal requirements, or business operations. We will notify users of significant changes through our platform notifications or email. Continued use of our platform after policy updates constitutes acceptance of the revised terms.\n\nContact Information: If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact our privacy team. We are committed to addressing your inquiries promptly and transparently. Your privacy matters to us, and we continuously work to maintain the highest standards of data protection in the DeFi space."
      },
      about: {
        title: "About Kardium Finance",
        content: "Kardium Finance represents a revolutionary step forward in the world of decentralized finance, built with the vision of creating the most comprehensive and user-friendly cryptocurrency exchange platform on the Monad testnet. Our platform embodies the principles of transparency, security, innovation, and community-driven development that are fundamental to the DeFi ecosystem.\n\nOur founder and CEO, Oussama Kerd, brings years of experience in blockchain technology, financial markets, and software development to Kardium Finance. His vision for the platform stems from a deep understanding of the challenges facing traditional financial systems and the immense potential of blockchain technology to create more inclusive and efficient financial services. Under his leadership, our team has developed a platform that bridges the gap between complex DeFi protocols and everyday users.\n\nThe mission of Kardium Finance extends far beyond simple token swapping. We are building a comprehensive ecosystem that will eventually include advanced trading features, yield farming opportunities, governance mechanisms, and educational resources. Our goal is to democratize access to sophisticated financial tools while maintaining the security and decentralization that make DeFi revolutionary.\n\nAt the heart of our platform lies a commitment to fostering a vibrant trading community. We believe that the future of finance is collaborative, where users not only trade but also participate in governance decisions, contribute to platform development, and share in the success of the ecosystem. Our community-first approach ensures that every feature we develop serves the real needs of our users.\n\nTechnology and Innovation drive everything we do at Kardium Finance. We leverage the latest advancements in blockchain technology, smart contract development, and user interface design to create an platform that is both powerful and intuitive. Our integration with the Monad testnet allows us to offer fast, low-cost transactions while maintaining the security and reliability that our users expect.\n\nSecurity is paramount in everything we build. We implement multiple layers of protection including rigorous smart contract audits, secure wallet integrations, real-time monitoring systems, and emergency response protocols. Our security-first approach ensures that users can trade with confidence, knowing their assets are protected by industry-leading safeguards.\n\nTransparency and Trust are core values that guide our operations. We believe users deserve complete visibility into how our platform operates, how decisions are made, and how their assets are protected. Our open communication policy ensures that users are always informed about platform updates, security measures, and future developments.\n\nOur Roadmap includes exciting developments such as advanced order types, cross-chain compatibility, mobile applications, educational academies, and governance token launch. We are committed to continuous innovation and regularly seek community feedback to guide our development priorities.\n\nThe Kardium Finance ecosystem is designed to reward active participation. Through various incentive programs, trading competitions, referral systems, and community governance opportunities, we ensure that our most engaged users benefit from the platform's growth and success.\n\nAs we continue to grow and evolve, Kardium Finance remains committed to our founding principles of accessibility, security, innovation, and community. We are not just building a trading platform; we are creating the foundation for the future of decentralized finance, where everyone has access to the tools and opportunities they need to achieve financial freedom and prosperity."
      },
      scrolling: {
        monadTestnet: "MONAD TESTNET",
        kardiumExchange: "KARDIUM EXCHANGE",
        comingSoon: "Coming Soon"
      },
      theme: {
        light: "Light",
        dark: "Dark"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        swap: "Échanger",
        pool: "Pool",
        stake: "Mise",
        tasks: "Tâches",
        faq: "FAQ",
        privacy: "Confidentialité"
      },
      home: {
        title: "Kardium Finance",
        subtitle: "L'Avenir du Trading DeFi",
        description: "Découvrez le trading de cryptomonnaies fluide sur le testnet Monad avec notre plateforme d'échange avancée.",
        ceoTitle: "PDG",
        ceoName: "Oussama Kerd",
        aboutButton: "À propos de Kardium"
      },
      swap: {
        title: "Échanger des Tokens",
        selectToken: "Sélectionner un token à échanger",
        verified: "Vérifié"
      },
      scrolling: {
        monadTestnet: "TESTNET MONAD",
        kardiumExchange: "ÉCHANGE KARDIUM",
        comingSoon: "Bientôt Disponible"
      },
      theme: {
        light: "Clair",
        dark: "Sombre"
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: "首页",
        swap: "交换",
        pool: "资金池",
        stake: "质押",
        tasks: "任务",
        faq: "常见问题",
        privacy: "隐私"
      },
      home: {
        title: "Kardium Finance",
        subtitle: "DeFi交易的未来",
        description: "在Monad测试网上体验我们先进交易平台的无缝加密货币交易。",
        ceoTitle: "首席执行官",
        ceoName: "Oussama Kerd",
        aboutButton: "关于Kardium"
      },
      swap: {
        title: "交换代币",
        selectToken: "选择要交换的代币",
        verified: "已验证"
      },
      scrolling: {
        monadTestnet: "MONAD 测试网",
        kardiumExchange: "KARDIUM 交易所",
        comingSoon: "即将推出"
      },
      theme: {
        light: "浅色",
        dark: "深色"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        swap: "Intercambiar",
        pool: "Pool",
        stake: "Apostar",
        tasks: "Tareas",
        faq: "Preguntas Frecuentes",
        privacy: "Privacidad"
      },
      home: {
        title: "Kardium Finance",
        subtitle: "El Futuro del Trading DeFi",
        description: "Experimenta el trading de criptomonedas sin problemas en la testnet de Monad con nuestra plataforma de intercambio avanzada.",
        ceoTitle: "CEO",
        ceoName: "Oussama Kerd",
        aboutButton: "Acerca de Kardium"
      },
      swap: {
        title: "Intercambiar Tokens",
        selectToken: "Selecciona un token para intercambiar",
        verified: "Verificado"
      },
      scrolling: {
        monadTestnet: "TESTNET MONAD",
        kardiumExchange: "INTERCAMBIO KARDIUM",
        comingSoon: "Próximamente"
      },
      theme: {
        light: "Claro",
        dark: "Oscuro"
      }
    }
  },
  et: {
    translation: {
      nav: {
        home: "Avaleht",
        swap: "Vahetus",
        pool: "Pool",
        stake: "Panustamine",
        tasks: "Ülesanded",
        faq: "KKK",
        privacy: "Privaatsus"
      },
      home: {
        title: "Kardium Finance",
        subtitle: "DeFi Kauplemise Tulevik",
        description: "Koge sujuvat krüptovaluuta kauplemist Monad testvõrgus meie edasijõudnud vahetusplatvormiga.",
        ceoTitle: "Tegevjuht",
        ceoName: "Oussama Kerd",
        aboutButton: "Kardium Kohta"
      },
      swap: {
        title: "Vaheta Tokene",
        selectToken: "Vali vahetatav token",
        verified: "Kinnitatud"
      },
      scrolling: {
        monadTestnet: "MONAD TESTVÕRK",
        kardiumExchange: "KARDIUM VAHETUS",
        comingSoon: "Tuleb Varsti"
      },
      theme: {
        light: "Hele",
        dark: "Tume"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;