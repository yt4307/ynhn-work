// src/app/about/page.tsx
"use client";

import styled from "@emotion/styled";
import {
  PageTitle,
  SectionTitle,
  Subtitle,
  Body,
  Muted,
  HighlightWord,
} from "@/components/typography";

/* 기존 스타일 코드는 그대로 유지 */

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

const Header = styled.section`
  margin-bottom: ${({ theme }) => theme.space(12)};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space(12)};
`;

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(6)};

  @media (min-width: ${({ theme }) => theme.breakpoint.tablet}px) {
    flex-direction: row;
  }
`;

const Column = styled.div<{ $grow?: boolean }>`
  flex: ${({ $grow }) => ($grow ? 2 : 1)};
`;

const List = styled.ul`
  margin: ${({ theme }) => theme.space(3)} 0 0;
  padding-left: ${({ theme }) => theme.space(4)};
`;

const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.color.neutral[800]};
`;

const Timeline = styled.ul`
  list-style: none;
  margin: ${({ theme }) => theme.space(4)} 0 0;
  padding: 0;
  border-left: 1px solid ${({ theme }) => theme.color.neutral[300]};
`;

const TimelineItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.space(4)};
  margin-bottom: ${({ theme }) => theme.space(5)};
`;

const TimelineDot = styled.span`
  position: absolute;
  left: -7px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color.brand[700]};
`;

const TimelineYear = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  color: ${({ theme }) => theme.color.neutral[600]};
  margin-bottom: ${({ theme }) => theme.space(1)};
`;

const TimelineTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.space(1)};
`;

const TimelineDesc = styled(Muted)``;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(1)};
  margin-top: ${({ theme }) => theme.space(3)};
`;

const Badge = styled.span`
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: 999px;
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  background: ${({ theme }) => theme.color.neutral[200]};
`;

const BrandBadge = styled(Badge)`
  background: ${({ theme }) => theme.color.brand[100]};
  color: ${({ theme }) => theme.color.brand[800]};
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(3)};
`;

const ContactItem = styled.div``;

const ContactLabel = styled.span`
  display: inline-block;
  min-width: 72px;
  color: ${({ theme }) => theme.color.neutral[600]};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.color.brand[700]};
`;

export default function AboutPage() {
  return (
    <Wrapper>
      {/* 헤더 ================== */}
      <Header>
        <PageTitle>
          About <HighlightWord>정연한</HighlightWord>
        </PageTitle>

        <Subtitle style={{ marginTop: 16 }}>
          프론트엔드에서 발생하는 구조적 제약을
          <br />
          <HighlightWord>아키텍처 설계로 해결하는 개발자</HighlightWord>입니다.
        </Subtitle>
      </Header>

      {/* 소개 ================== */}
      <Section>
        <TwoColumn>
          <Column $grow>
            <SectionTitle>소개</SectionTitle>
            <Body style={{ marginTop: 16 }}>
              저는 웹 개발에서{" "}
              <HighlightWord>
                문제의 구조를 파악하고 아키텍처로 해결하는 과정
              </HighlightWord>
              에 가장 큰 흥미를 느낍니다. 단순 기능 구현을 넘어, 서비스가
              장기적으로 유지될 수 있는 기반을 설계하는 것에 집중합니다.
            </Body>

            <Body style={{ marginTop: 12 }}>
              React · Next.js · TypeScript를 주력으로 사용하며, 데이터 모델링,
              화면 흐름 설계, 도메인 분리를 바탕으로 읽기 좋은 코드와 안정적인
              UX를 목표로 합니다.
            </Body>

            <Body style={{ marginTop: 12 }}>
              프로젝트 초기에 발생하는 기술적 제약을 우회하거나, 여러 데이터
              소스를 통합하는 문제처럼
              <HighlightWord>
                구조적 난제를 FE 관점에서 해결하는 역할
              </HighlightWord>
              을 즐깁니다.
            </Body>
          </Column>

          <Column>
            <SectionTitle>현재 하는 일</SectionTitle>
            <List>
              <ListItem>
                포트폴리오 프로젝트 <strong>ynhn-work</strong>의
                Frontend–Backend 전 구간 아키텍처 설계 및 개발
              </ListItem>
              <ListItem>
                FE 설계 역량 향상을 위해 폴더 구조·도메인 모델·컴포넌트 아키텍처
                등을 지속적으로 개선
              </ListItem>
              <ListItem>
                React Query / GraphQL 등 데이터 레이어 중심의 구조 설계 연습
              </ListItem>
            </List>
          </Column>
        </TwoColumn>
      </Section>

      {/* 타임라인 ================== */}
      <Section>
        <SectionTitle>타임라인</SectionTitle>
        <Muted style={{ marginTop: 8 }}>
          프로젝트와 학습을 통해 구조적 문제 해결 능력을 키워왔습니다.
        </Muted>

        <Timeline>
          <TimelineItem>
            <TimelineDot />
            <TimelineYear>2025</TimelineYear>
            <TimelineTitle>Art in Numbers — 전시용 출력 시스템</TimelineTitle>
            <TimelineDesc>
              브라우저·Pi·프린터 간 출력 파이프라인 설계 및 SSE 실시간 UI 구축
            </TimelineDesc>
          </TimelineItem>

          <TimelineItem>
            <TimelineDot />
            <TimelineYear>2024</TimelineYear>
            <TimelineTitle>PolitIQ — 국회 데이터 기반 챗봇</TimelineTitle>
            <TimelineDesc>
              공공데이터/API/LLM 구조 불일치를 FE 도메인 모델로 통합 · 국회
              경진대회 장려상
            </TimelineDesc>
          </TimelineItem>

          <TimelineItem>
            <TimelineDot />
            <TimelineYear>2023</TimelineYear>
            <TimelineTitle>TuTi — React Native 관광 추천 서비스</TimelineTitle>
            <TimelineDesc>
              RN의 KakaoMap 제약을 WebView 브릿지 아키텍처로 해결
            </TimelineDesc>
          </TimelineItem>

          <TimelineItem>
            <TimelineDot />
            <TimelineYear>2017</TimelineYear>
            <TimelineTitle>인하대학교 정보통신공학과</TimelineTitle>
            <TimelineDesc>
              CS 기반 학습 · 알고리즘 · 소모임 활동 & 리더십(인트아이 회장)
            </TimelineDesc>
          </TimelineItem>
        </Timeline>
      </Section>

      {/* 기술 스택 ================== */}
      <Section>
        <SectionTitle>기술 스택</SectionTitle>

        <TwoColumn style={{ marginTop: 16 }}>
          <Column>
            <Muted>Frontend</Muted>
            <BadgeRow>
              <BrandBadge>TypeScript</BrandBadge>
              <BrandBadge>React</BrandBadge>
              <BrandBadge>Next.js</BrandBadge>
              <BrandBadge>React Query</BrandBadge>
              <BrandBadge>Emotion</BrandBadge>
              <BrandBadge>Recoil</BrandBadge>
              <BrandBadge>Redux</BrandBadge>
            </BadgeRow>
          </Column>

          <Column>
            <Muted>Backend / Infra</Muted>
            <BadgeRow>
              <Badge>Node.js(Fastify)</Badge>
              <Badge>PHP(Slim)</Badge>
              <Badge>MySQL</Badge>
              <Badge>MongoDB</Badge>
              <Badge>Docker</Badge>
              <Badge>GitHub Actions</Badge>
              <Badge>Nginx</Badge>
            </BadgeRow>
          </Column>
        </TwoColumn>

        <Body style={{ marginTop: 24 }}>
          최근에는{" "}
          <HighlightWord>데이터 레이어 중심의 FE 아키텍처</HighlightWord>,
          <br />
          도메인 모델링, 실시간 시스템(UI ↔ 서버)의 구조 설계에 관심을 두고
          있습니다.
        </Body>
      </Section>

      {/* 연락처 ================== */}
      <Section>
        <SectionTitle>Contact</SectionTitle>
        <Muted style={{ marginTop: 8 }}>
          협업, 구직, 코드 리뷰 등 언제든 편하게 연락 주세요.
        </Muted>

        <ContactRow>
          <ContactItem>
            <ContactLabel>Email</ContactLabel>
            <ContactLink href="mailto:yt4307@gmail.com">
              yt4307@gmail.com
            </ContactLink>
          </ContactItem>

          <ContactItem>
            <ContactLabel>GitHub</ContactLabel>
            <ContactLink
              href="https://github.com/yt4307"
              target="_blank"
              rel="noreferrer"
            >
              github.com/yt4307
            </ContactLink>
          </ContactItem>

          <ContactItem>
            <ContactLabel>Phone</ContactLabel>
            <span>010-3041-4307</span>
          </ContactItem>
        </ContactRow>
      </Section>
    </Wrapper>
  );
}
