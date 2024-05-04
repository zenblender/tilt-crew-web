import chroma from "chroma-js";

// Colors from https://colorkit.co/palette/ff595e-ff924c-ffca3a-c5ca30-8ac926-52a675-1982c4-4267ac-6a4c93/

const PALETTE_BLUE_COLOR = "#1982c4";

export const RATING_TEXT_COLOR = chroma(PALETTE_BLUE_COLOR).brighten(1.5).hex();

export const PLAYER_ROW_BACKGROUND_COLOR = chroma("#58508d").darken(0.7).hex();
