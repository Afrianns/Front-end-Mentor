module.exports = {
	purge: ["./*.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				barlow: ["Barlow", "sans-serif"],
				barlowCon: ["Barlow Condensed", "sans-serif"],
			},
			borderRadius: {
				xxl: "10rem",
			},
			backgroundColor: {
				lightWhite: "#eef3f6",
				OrangeRed: "#ff5c5c",
				lightGrayBlue: "#eef3f6",
			},
			zIndex: {
				2: "-2",
			},

			textColor: {
				grayish: "#a0a1ac",
				grayishBlue: "#5b5f71",
				darkGrayBlue: "#242942",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
