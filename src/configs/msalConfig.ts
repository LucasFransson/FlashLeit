export const msalConfig = {
	auth: {
		clientId: "24fdaf11-b4f2-467d-af76-2a8596c9c0ab", // This is the ONLY mandatory field that you need to supply.
		authority: "https://flashleit.b2clogin.com/flashleit.onmicrosoft.com/B2C_1_SUSI", // Choose SUSI as your default authority.
		knownAuthorities: ["flashleit.b2clogin.com"], // Mark your B2C tenant's domain as trusted.
		redirectUri: "http://localhost:3000/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
		postLogoutRedirectUri: "http://localhost:3000/", // Indicates the page to navigate after logout.
		navigateToLoginRequestUrl: false, // If 'true', will navigate back to the original request location before processing the auth code response.
	},
	cache: {
		cacheLocation: "sessionStorage", // Configures cache location. 'sessionStorage' is more secure, but 'localStorage' gives you SSO between tabs.
		storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
	},
}
