import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";

export default function Footer() {
  const socials = [
    { name: "Telegram", href: "https://telegram.com/in/AtharvSan", icon: "/telegram.svg" },
    { name: "X", href: "https://x.com/AtharvSan", icon: "/x.svg" },
    { name: "GitHub", href: "https://github.com/AtharvSan", icon: "/github.svg" },
    { name: "Medium", href: "https://medium.com/AtharvSan", icon: "/medium.svg" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.default",
        color: "text.secondary",
        pb: {xs: 9, md: 3},
        pt: {xs: 0,md: 16},
        mt: "auto",
        // backgroundColor: 'red',
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "96%",
          mx: 'auto',
          pb: 1,
          pl: 3,
        }}
      >
        {/* Left side - Text */}
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Purrlend
        </Typography>

        {/* Right side - Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography> Follow Us : </Typography>
          {socials.map((s) => (
            <IconButton
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                p: 1,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-2px)", opacity: 0.8 },
              }}
            >
              <Box
                component="img"
                src={s.icon}
                alt={s.name}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
