import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      sectionLight: string;
      sectionDark: string;
      sectionLightCard: string;
      sectionButtonHover: string;
      sectionHeader: string;
    };
    customText: {
      onDark: string;
      dimmed: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      sectionLight: string;
      sectionLightCard: string;
      sectionDark: string;
      sectionButtonHover: string;
      sectionHeader: string;
    };
    customText?: {
      onDark: string;
      dimmed: string;
    };
  }

  interface Components {
    MuiPickersOutlinedInput?: Components["MuiOutlinedInput"];
    MuiPickersInputBase?: Components["MuiInputBase"];
  }
}
