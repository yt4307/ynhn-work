// src/app/works/page.tsx
"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import {
  PageTitle,
  SectionTitle,
  Subtitle,
  Muted,
  Body,
} from "@/components/typography";
import { fetchWorks, Work, formatWorkPeriod } from "@/lib/works";

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

const HeaderTitle = styled(PageTitle)`
  /* Works 페이지에서도 인터랙션 유지 */
`;

const HeaderDesc = styled(Subtitle)`
  margin-top: ${({ theme }) => theme.space(4)};
`;

const WorksSection = styled.section`
  margin-bottom: ${({ theme }) => theme.space(16)};
`;

const ListMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: ${({ theme }) => theme.space(4)};
  margin-bottom: ${({ theme }) => theme.space(4)};
`;

const CountText = styled(Muted)`
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
`;

const WorksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
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
  text-align: right;
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

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(1)};
  margin-top: ${({ theme }) => theme.space(2)};
`;

const CategoryBadge = styled.span`
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: 999px;
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.body};
  background: ${({ theme }) => theme.color.secondary[100]};
  color: ${({ theme }) => theme.color.secondary[800]};
`;

const StatusBadge = styled.span`
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: 999px;
  font-size: ${({ theme }) => theme.font.size.bodySm}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.body};
  background: ${({ theme }) => theme.color.neutral[200]};
  color: ${({ theme }) => theme.color.neutral[800]};
`;

export default function WorksPage() {
  const {
    data: works,
    isLoading,
    isError,
  } = useQuery<Work[]>({
    queryKey: ["works", "list"],
    queryFn: fetchWorks,
  });

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>Works</HeaderTitle>
        <HeaderDesc>
          실제 문제를 해결하기 위해 진행했던 프로젝트들을 정리했습니다.
          <br />각 프로젝트마다 역할, 사용 기술, 기간을 함께 정리해 두었습니다.
        </HeaderDesc>
      </Header>

      <WorksSection>
        <ListMeta>
          <SectionTitle>모든 작업물</SectionTitle>
          {works && <CountText>총 {works.length}개의 프로젝트</CountText>}
        </ListMeta>

        {isLoading && (
          <WorksGrid>
            <Body>작업물을 불러오는 중입니다...</Body>
          </WorksGrid>
        )}

        {isError && (
          <WorksGrid>
            <Body>작업물을 불러오지 못했습니다. 나중에 다시 시도해주세요.</Body>
          </WorksGrid>
        )}

        {works && works.length > 0 && (
          <WorksGrid>
            {works.map((work) => {
              const period = formatWorkPeriod(work);
              const metaPieces = [period || null].filter(Boolean);

              return (
                <WorkCard key={work.id} href={`/works/${work.id}`}>
                  <WorkHeader>
                    <WorkTitle>{work.title}</WorkTitle>
                    <WorkMeta>
                      {metaPieces.length > 0 && metaPieces.join(" · ")}
                    </WorkMeta>
                  </WorkHeader>

                  <WorkSummary>{work.summary}</WorkSummary>

                  <BadgeRow>
                    {work.category && (
                      <CategoryBadge>{work.category}</CategoryBadge>
                    )}
                    <StatusBadge>
                      {work.isOngoing ? "진행 중" : "완료"}
                    </StatusBadge>
                  </BadgeRow>

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
        )}

        {works && works.length === 0 && !isLoading && !isError && (
          <WorksGrid>
            <Body>아직 등록된 작업물이 없습니다.</Body>
          </WorksGrid>
        )}
      </WorksSection>
    </Wrapper>
  );
}
