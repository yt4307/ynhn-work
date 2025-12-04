"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import {
  PageTitle,
  SectionTitle,
  Subtitle,
  Muted,
  HighlightWord,
  Body,
} from "@/components/typography";

import { useQuery } from "@tanstack/react-query";
import { fetchWorksForHome, Work, formatWorkPeriod } from "@/lib/works";

const Wrapper = styled.main`
  max-width: ${({ theme }) => theme.breakpoint.desktop}px;
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.space(20)} ${theme.space(4)} ${theme.space(24)}`};

  @media (min-width: ${({ theme }) => theme.breakpoint.tablet}px) {
    padding: ${({ theme }) =>
      `${theme.space(24)} ${theme.space(8)} ${theme.space(28)}`};
  }
`;

const Hero = styled.section`
  margin-bottom: ${({ theme }) => theme.space(20)};
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(4)};
  margin-bottom: ${({ theme }) => theme.space(4)};
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.body};
  color: ${({ theme }) => theme.color.neutral[600]};
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color.neutral[400]};
  display: inline-block;
  margin: 0 ${({ theme }) => theme.space(1)};
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(6)};
`;

const PrimaryButton = styled(Link)`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(4)}`};
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.color.brand[700]};
  color: ${({ theme }) => theme.color.neutral[100]};
  font-size: ${({ theme }) => theme.font.size.body}px;
  font-weight: 500;
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.subtitle};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};

  &:hover {
    background: ${({ theme }) => theme.color.brand[800]};
  }
`;

const GhostButton = styled(Link)`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(4)}`};
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.color.brand[700]};
  background: ${({ theme }) => theme.color.neutral[100]};
  color: ${({ theme }) => theme.color.brand[700]};
  font-size: ${({ theme }) => theme.font.size.body}px;
  font-weight: 500;
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.subtitle};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};

  &:hover {
    background: ${({ theme }) => theme.color.brand[100]};
  }
`;

const Arrow = styled.span`
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space(16)};
`;

const WorksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  margin-top: ${({ theme }) => theme.space(4)};
`;

const WorkCard = styled(Link)`
  padding: ${({ theme }) => theme.space(4)};
  border-radius: ${({ theme }) => theme.space(4)};
  border: 1px solid ${({ theme }) => theme.color.neutral[300]};
  background: ${({ theme }) => theme.color.neutral[100]};
  display: block;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.brand[300]};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
`;

const WorkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
  align-items: baseline;
  margin-bottom: ${({ theme }) => theme.space(1)};
`;

const WorkTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.h3}px;
  line-height: ${({ theme }) => theme.font.lineHeight.heading};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.heading};
  margin: 0;
  font-weight: 600;
`;

const WorkMeta = styled.span`
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.body};
  color: ${({ theme }) => theme.color.neutral[600]};
  white-space: nowrap;
`;

const WorkSummary = styled(Body)`
  margin-top: ${({ theme }) => theme.space(1)};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(1)};
  margin-top: ${({ theme }) => theme.space(3)};
`;

const Tag = styled.span`
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: 999px;
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.body};
  background: ${({ theme }) => theme.color.brand[100]};
  color: ${({ theme }) => theme.color.brand[800]};
`;

const SmallLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};
  margin-top: ${({ theme }) => theme.space(3)};
  font-size: ${({ theme }) => theme.font.size.body}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.subtitle};
  color: ${({ theme }) => theme.color.brand[700]};

  &:hover {
    text-decoration: underline;
  }
`;

export default function Home() {
  const {
    data: works,
    isLoading,
    isError,
  } = useQuery<Work[]>({
    queryKey: ["works", "home"],
    queryFn: fetchWorksForHome,
  });

  return (
    <Wrapper>
      {/* Hero */}
      <Hero>
        <PageTitle>
          정연한, <HighlightWord>Frontend Developer</HighlightWord>
        </PageTitle>

        <Subtitle style={{ marginTop: 16 }}>
          Next.js, TypeScript, GraphQL을 중심으로
          <br />
          안정적이고 읽기 좋은 인터페이스를 만드는 개발자입니다.
        </Subtitle>

        <HeroMeta>
          <span>기술 중심 포트폴리오</span>
          <Dot />
          <span>Web · Frontend · Backend</span>
          <Dot />
          <span>Inha Univ. 정보통신공학</span>
        </HeroMeta>

        <Buttons>
          <PrimaryButton href="/works">
            작업물 보기
            <Arrow>↗</Arrow>
          </PrimaryButton>
          <GhostButton href="/about">
            자기소개 읽기
            <Arrow>→</Arrow>
          </GhostButton>
        </Buttons>
      </Hero>

      {/* Selected Works */}
      <Section>
        <SectionTitle>Selected Works</SectionTitle>
        <Muted>
          포트폴리오에서 강조하고 싶은 프로젝트 몇 가지를 먼저 보여줍니다.
        </Muted>

        {/* 로딩 상태 */}
        {isLoading && (
          <WorksGrid>
            <Body>작업물을 불러오는 중입니다...</Body>
          </WorksGrid>
        )}

        {/* 에러 상태 */}
        {isError && (
          <WorksGrid>
            <Body>작업물을 불러오지 못했습니다. 나중에 다시 시도해주세요.</Body>
          </WorksGrid>
        )}

        {/* 실제 데이터 */}
        {works && works.length > 0 && (
          <>
            <WorksGrid>
              {works.map((work) => {
                const period = formatWorkPeriod(work);
                const metaPieces = [
                  period || null,
                  work.category || null,
                ].filter(Boolean);

                return (
                  <WorkCard key={work.id} href={`/works/${work.id}`}>
                    <WorkHeader>
                      <WorkTitle>{work.title}</WorkTitle>
                      {metaPieces.length > 0 && (
                        <WorkMeta>{metaPieces.join(" · ")}</WorkMeta>
                      )}
                    </WorkHeader>

                    {work.summary && <WorkSummary>{work.summary}</WorkSummary>}

                    {work.techs && work.techs.length > 0 && (
                      <TagRow>
                        {work.techs.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </TagRow>
                    )}
                  </WorkCard>
                );
              })}
            </WorksGrid>

            <SmallLink href="/works">
              모든 작업물 보기
              <Arrow>→</Arrow>
            </SmallLink>
          </>
        )}

        {/* 데이터가 아예 없을 때 */}
        {works && works.length === 0 && !isLoading && !isError && (
          <WorksGrid>
            <Body>아직 등록된 작업물이 없습니다.</Body>
          </WorksGrid>
        )}
      </Section>
    </Wrapper>
  );
}
