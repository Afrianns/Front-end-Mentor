module.exports = {
	purge: ["./**.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			ubuntu: ["Ubuntu", "sans-serif"],
			Overpass: ["Overpass", "sans-serif"],
		},
		fontWeight: {
			"Ubuntu-md": 300,
			"Ubuntu-lg": 600,
			"Overpass-sm": 400,
			"Overpass-md": 500,
			"Overpass-xl": 700,
		},
		gradientColorStops: {
			lowred: "#ff8f70",
			veryred: "#ff3d54",
		},
		extend: {
			spacing: {
				98: "30rem",
				99: "40rem",
				100: "100rem",
			},

			borderRadius: {
				Lleft: "5.5rem",
			},
			backgroundColor: {
				veryLightRed: "#ff7a85",
			},
			zIndex: {
				1: -1,
				2: -2,
			},
			textColor: {
				greydark: "#4b5862",
				darkblue: "#2c2d3f",
				disatureteBlue: "#3f4164",
				lightRed: "#ff525d",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
