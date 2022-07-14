module.exports = {
	purge: ["*.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			gradientColorStops: {
				magenta: "#e942ff",
				violet: "#8838ff",
			},

			fontFamily: {
				rubik: ["Rubik", "sans serif"],
			},

			spacing: {
				xxl: "32.5rem",
				xxxl: "42rem",
			},

			fontSize: {
				ss: "9px",
				xxs: "10px",
			},
			textColor: {
				darkViolet: "#3e2753",
				greyPink: "#d89eff",
				moderateViolet: "#9241c8",
				veryDisaturate: "#3e2753",
				darkGreyBlue: "#a39daa",
				disturateViolet: "#6e5d7e",
			},

			backgroundColor: {
				greyDark: "#f7f5fa",
				greyWhite: "#fafafa",
				greyBlue: "#ede4f5",
				lightGrey: "#f5f3f7",
			},
			borderColor: {
				magentaGrey: "#e570ff",
			},
			zIndex: {
				"-1": "-1",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
