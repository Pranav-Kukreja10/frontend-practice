export const NAV_CONFIG = {
    products: {
        label: "Products",
        hasDropdown: true,
        columns: [
            {
                title: "Agent Stack",
                links: [
                    "AI SDK",
                    "AI Gateway",
                    "Sandbox",
                    "Passport",
                    "Connect",
                    "eve",
                ],
            },
            {
                title: "Core Platform",
                links: [
                    "Security",
                    "Content Delivery",
                    "Fluid Compute",
                    "Observality",
                    "Workflows",
                    "CI/CD",
                ],
            },
            {
                title: "Tools",
                links: [
                    "Next.js",
                    "Vercel Agent",
                    "Vercel Plugin",
                    "Open Source",
                    "Domains ↗",
                    "V0 ↗",
                ],
            },
        ],
    },
    resources: {
        label: 'Resources', 
        hasDropdown: true, 
        columns: [
            {
                title: 'Learn', 
                links: ['Docs', 'About', 'Blog', 'Changelog', 'Knowledge Base']
            },
            {
                title: 'Build', 
                links: ['AI Apps', 'Web Apps', 'Marketing Sites', 'Platforms', 'Commerce']
            },
            {
                title: 'Explore', 
                links: ['Cuatomers', 'Marketplace', 'Partner Finder', 'Aws', 'Community ↗']
            }
        ]
    },
    enterprise: {
        label: 'Enterprise', 
        hasDropdown: false,
        href: '/enterprise'
    },
    pricing: {
        label: 'Pricing', 
        hasDropdown: false, 
        href: '/pricing'
    }
};
