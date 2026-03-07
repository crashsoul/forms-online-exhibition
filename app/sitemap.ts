import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Use a relative or derived base URL for the true deployment domain once known.
    // We'll return the root path as the primary entry point for crawlers.
    return [
        {
            url: 'https://your-deployment-domain.com', // Replace with actual production domain when deployed
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
