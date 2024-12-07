import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets";

// Estilos con styled-components
const HeroSection = styled.div`
  height: 100vh;
  width: 100vw; /* Asegura que cubra todo el ancho */
  display: flex;
  background-color: ${({ isScrolled }) => (isScrolled ? "transparent" : "black")};
  color: ${({ isScrolled }) => (isScrolled ? "black" : "white")};
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const LogoContainer = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 275px;
  height: auto;
  margin-bottom: 20px;
`;

const ProjectName = styled.h1`
  font-size: 5rem;
  margin: 0;
`;

const ProjectDescription = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  margin-top: 40px;
`;

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeroSection isScrolled={isScrolled}>
        <LogoContainer>
          <Logo src={ assets.zolkin_icon } alt="Zolkin Logo" />
          <ProjectName>Zolkin</ProjectName>
          <ProjectDescription>Controla más con menos</ProjectDescription>
        </LogoContainer>
      </HeroSection>
    </>
  );
};

export default Hero;