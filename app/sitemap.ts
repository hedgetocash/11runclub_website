import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.11runclub.ch'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${BASE_URL}/team`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/partner`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		// /enter-hillclimb (The Maze) ist aktuell per notFound() ausgeblendet,
		// da das Event noch nicht final bestätigt ist — siehe app/enter-hillclimb/page.tsx.
		// Sobald die Seite wieder aktiv ist, hier ergänzen:
		// {
		// 	url: `${BASE_URL}/enter-hillclimb`,
		// 	lastModified: new Date(),
		// 	changeFrequency: 'monthly',
		// 	priority: 0.7,
		// },
	]
}
