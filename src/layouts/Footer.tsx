import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";

export default function Footer() {
  const socials = [
    // { name: "Telegram", href: "", icon: "/telegram.svg" },
    { name: "X", href: "https://x.com/purrlend?s=21", icon: "/x.svg" },
    { name: "Discord", href: "https://discord.com/invite/8WD2AH3Cbj", icon: "/discord.svg" },
    { name: "GitHub", href: "https://github.com/orgs/Purrlend/repositories", icon: "/github.svg" },
    { name: "Gitbook", href: "https://purrlends.gitbook.io/purrlend/", icon: "/gitbook.svg" },
    // { name: "Medium", href: "", icon: "/medium.svg" },
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
          © {new Date().getFullYear()} Purrlend |<Box component="span" mx={1} sx={{
            target: "_blank",
            cursor: "pointer",
            // textDecoration: "underline",
          }}
          onClick={() => window.open("https://github.com/Purrlend/Terms/blob/main/Purrlend%20Terms%20of%20Use.pdf", "_blank")}
           >Terms</Box> 
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
