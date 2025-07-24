import { Box } from "@mui/material";

export default function CutoutButton() {
  return (
    <Box
      sx={{
        width: 200,
        height: 60,
        position: "relative",
        display: "inline-block",
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <mask id="text-mask" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="bold"
              fill="black"
              fontFamily="sans-serif"
            >
              Кнопка
            </text>
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          rx="8"
          fill="white"
          stroke="rgba(161, 161, 161, 0.6)"
          mask="url(#text-mask)"
        />
      </svg>
    </Box>
  );
}
