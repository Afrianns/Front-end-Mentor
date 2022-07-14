module.exports = {
	purge: ["./*.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundColor: {
				blue: "#3829e0",
				greyBlue: "#e0e8ff",
				paleBlue: "#f5f7ff",
			},
			textColor: {
				darkBlue: "#1f2f56",
				lightBlue: "#7280a7",
			},
			fontFamily: {
				RedHat: ["Red Hat Display", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
