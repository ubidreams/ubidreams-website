const path = require('path')
const withSass = require('@zeit/next-sass')
const nextTranslate = require('next-translate')
const allRedirection = require('./redirection')

module.exports = nextTranslate()
module.exports = withSass({
	/* bydefault config  option Read For More Optios
	here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
	cssModules: true
})
const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on'
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block'
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN'
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin'
	},
	{
		key: 'Content-Security-Policy',
		value: 'default-src self'
	}
]
module.exports = {
	productionBrowserSourceMaps: true,
	i18n: {
		locales: ['en', 'fr'],
		defaultLocale: 'fr'
	},
	images: {
		domains: ['www.datocms-assets.com']
	},
	reactStrictMode: false,
	/* Add Your Scss File Folder Path Here */
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	async redirects() {
		return allRedirection
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/(.*)',
				headers: securityHeaders
			}
		]
	}
}
