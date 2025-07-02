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
          <TourText>{match?.stadium?.name}</TourText>
        </TeamsContainer>

        <TeamsRow $isTwoLines={isTwoLines}>
          <TeameBox color={match?.team_1?.color}>
            <TeamLogo src={match?.team_1?.img} />
            <TeamName>{match?.team_1?.name}</TeamName>
          </TeameBox>

          <TeameBox color={match?.team_2?.color}>
            <TeamLogo src={match?.team_2?.img} />
            <TeamName>{match?.team_2?.name}</TeamName>
          </TeameBox>
        </TeamsRow>

        <Row>
          <TimeBox side="left">
            <InnerBox side="left">
              <TeamNameForData>31.07.2025</TeamNameForData>
            </InnerBox>
          </TimeBox>

          <Divider />

          <TimeBox side="right">
            <InnerBox side="right">
              <TeamNameForData>03:00</TeamNameForData>
            </InnerBox>
          </TimeBox>

          <Trapezoid>
            <TrapezoidText>1 тур</TrapezoidText>
          </Trapezoid>
        </Row>
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
  width: 1042px;
  padding: 38px 35px;
  border-radius: 0 0 24px 24px;
  background: linear-gradient(to right, #d7001a, #71000e);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;
  position: relative;
`;

const TitleLine = styled.div`
  font-weight: 600;
  font-size: 56px;
  line-height: 70px;
  letter-spacing: -2%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`;

const TeamsContainer = styled.div`
  width: 388px;
  height: 98px;
  display: flex;
  padding-top: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -55px; /* Заходим под TitleContainer */
  z-index: 5;
  background: url("midsubtitle.png") no-repeat center center / cover;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  position: relative;
`;

const TourText = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 37px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

const TeamsRow = styled.div<{ $isTwoLines: boolean }>`
  margin-top: ${({ $isTwoLines }) => ($isTwoLines ? "-65px" : "10px")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 168px;
  z-index: 5;
  margin-right: 40px;
`;

const TeameBox = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Divider = styled.div`
  width: 5px;
  height: 56px;
  background: #fff;
  z-index: 3;
`;

const TeamName = styled.div`
  width: 100%;
  font-weight: 600;
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
  font-weight: 600;
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
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  color: #0e173f;
`;
