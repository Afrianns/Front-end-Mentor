module.exports = {
  content: ['*.html','src/*.js'],
  theme: {
    
    extend: {
      fontFamily: {
      'epi' : "Epilogue"
      },
      colors: {
        "alWhite": "#fafafa",
        "alBlack": "#141414",
        "medGrey": "#696969"

      },
      maxWidth: {
        "4.5xl": "58rem"
      },
      screens:{
        "mdm" : "785px"
      }
    }
  },
  plugins: [],
}
