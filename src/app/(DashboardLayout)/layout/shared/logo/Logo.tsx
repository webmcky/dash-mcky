'use client'
import { useSelector } from "@/store/hooks";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { AppState } from "@/store/store";
import Image from "next/image";

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        <h2 className="text-white">MCKY!</h2>
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
             <h2 className="text-white">MCKY!</h2>
    </LinkStyled>
  );
};

export default Logo;
