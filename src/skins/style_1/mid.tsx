"use client";

import { useMatch } from "@/hooks";
import { RefObject, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export const Mid = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const titleWords = match?.tournament?.full_name;

  const titleRef = useRef<HTMLDivElement>(null);
  const [isTwoLines, setIsTwoLines] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    const checkHeight = () => {
      const height = titleRef.current!.offsetHeight;
      setIsTwoLines(height > 75); // 75 — на случай чуть большего line-height
    };

    checkHeight();

    // На всякий случай — если шрифт/размеры могут поменяться
    const resizeObserver = new ResizeObserver(checkHeight);
    resizeObserver.observe(titleRef.current);

    return () => resizeObserver.disconnect();
  }, [titleWords]);

  return (
    <Container>
      <Wrapper style={{ display: show ? "flex" : "none" }}>
        <BackgroundImage />
        <TitleContainer>
          <TitleLine ref={titleRef}>{titleWords}</TitleLine>
        </TitleContainer>

        <TeamsContainer>
          <TourText side="left">{match?.stadium?.name}</TourText>
          <TeamImg src='molia.png' />
          <TourText side="right">1 тур</TourText>
        </TeamsContainer>

        <TeamsRow $isTwoLines={isTwoLines}>
          <TeameBox color={match?.team_1?.color}>
            <TeamLogo src={match?.team_1?.img} />
            <TeamName>{match?.team_1?.name}</TeamName>
          </TeameBox>

          <CenterBox>
            <TeamNameForData>{/* дата отсюда */}31.07.2025</TeamNameForData>
            <CenterImage src="/VS.png" alt="center image" />
            <TeamNameForData>{/* время отсюда */}03:00</TeamNameForData>
          </CenterBox>

          <TeameBox color={match?.team_2?.color}>
            <TeamLogo src={match?.team_2?.img} />
            <TeamName>{match?.team_2?.name}</TeamName>
          </TeameBox>
        </TeamsRow>
      </Wrapper>
    </Container>
  );
};

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const lightningStrike = keyframes`
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
    transform: translateX(0);
    opacity: 1;
  }
  10% {
    filter: brightness(3) drop-shadow(0 0 10px #fff);
    opacity: 1;
    transform: translateX(2px);
  }
  20% {
    filter: brightness(1.5) drop-shadow(0 0 5px #f0f8ff);
    opacity: 0.8;
    transform: translateX(-2px);
  }
  30% {
    filter: brightness(2.5) drop-shadow(0 0 12px #aaf);
    opacity: 1;
    transform: translateX(1px);
  }
  50% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
    opacity: 0.7;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  border-radius: 64px;
  width: 1280px;
  height: 730px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  // background: url("/Group.png") no-repeat center center / cover;

  animation: ${slideDown} 0.5s ease forwards;

  padding-bottom: 20px;
  z-index: 2;
`;

const animatedGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/Group.png") no-repeat center center / cover;
  background-size: 200% 200%;
  animation: ${animatedGradient} 20s linear infinite;
  z-index: 4;
`;

const TitleContainer = styled.div`
  margin-top: 50px;
  width: 1087px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 58px;
`;

const TitleLine = styled.div`
  font-weight: 400;
  font-size: 56px;
  line-height: 70px;
  letter-spacing: -2%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  z-index: 10; // ← добавь это
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 5;
  position: relative;

  // Убери gap, он не работает с отрицательными значениями
`;

const TourText = styled.div<{ side: "left" | "right" }>`
  height: 145px;
  padding-right: ${({ side }) => (side === "left" ? "10px" : "0")};
  width: ${({ side }) => (side === "left" ? "820px" : "288.5px")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: 700;
  color: #fff;
  background: ${({ side }) =>
    side === "left" ? "url('/midleft.png')" : "url('/midrigth.png')"};
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);

  // Добавим отрицательный отступ
  margin-left: ${({ side }) => (side === "right" ? "-60px" : "0")};
  margin-right: ${({ side }) => (side === "left" ? "-29px" : "0")};
`;

const TeamsRow = styled.div<{ $isTwoLines: boolean }>`
  margin-top: ${({ $isTwoLines }) => ($isTwoLines ? "40px" : "30px")};
  display: flex;
  font-weight: 400;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px; // уменьшу gap, чтобы был место для центра
  z-index: 5;
`;

const TeamImg = styled.img`
  width: 68px;
  height: 182px;
  position: absolute;
  z-index: 10;
  left: 71.2%;
  animation: ${lightningStrike} 2.5s ease-in-out infinite;
  transform: translate(-50%, -50%);
   transform: translate(-50%, -50%) rotate(1deg); // поворот вправо на 1 градус

  object-fit: contain;
`;


const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px; /* расстояние между датой, изображением и временем */
`;

const CenterImage = styled.img`
  width: 175px; // подбери нужный размер
  height: 109px;
  object-fit: contain;
`;

const TeameBox = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamName = styled.div`
  width: 100%;
  font-size: 40px;
  color: #fff;
  padding: 0 24px;
  text-transform: uppercase;
  text-align: center;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TeamNameForData = styled.div`
  width: 224px;
  font-size: 37px;
  color: #fff;
  padding: 0 24px;
  text-transform: uppercase;
  text-align: center;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TeamLogo = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const Row = styled.div`
  width: 452px;
  margin-top: 47px;
  height: 56px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const Trapezoid = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 60px;
  background: url("/Trapezoid.png") no-repeat center center / cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

const TimeBox = styled.div<{ side: "left" | "right" }>`
  width: 223px;
  background: linear-gradient(to top, #010920, #0e173f);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  position: relative;
  border-radius: ${({ side }) =>
    side === "right" ? "0 16px 16px 0" : "16px 0 0 16px"};
`;

const InnerBox = styled.div<{ side: "left" | "right" }>`
  display: flex;
  flex-direction: ${({ side }) => (side === "right" ? "row-reverse" : "row")};
  align-items: center;
  justify-content: center;
  padding: ${({ side }) => (side === "right" ? "0 20px" : "0 20px")};
  width: 100%;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
  z-index: 5;
`;

const TrapezoidText = styled.div`
  padding-top: 17px;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  color: #0e173f;
`;
