import { graphqlClient } from "./graphql/graphqlClient";
import { QUERY_WORKS, QUERY_WORKS_FOR_HOME } from "./graphql/queries";

export interface Work {
  id: number;
  title: string;
  summary: string;
  description: string;
  thumbnail?: string | null;
  images?: string[] | null;
  category?: string | null;
  tags?: string[] | null;
  techs?: string[] | null;
  startedAt?: string | null;
  endedAt?: string | null;
  isOngoing: boolean;
}

export async function fetchWorksForHome(): Promise<Work[]> {
  const data = await graphqlClient.request<{ works: Work[] }>(
    QUERY_WORKS_FOR_HOME
  );
  // 우선 2개만 사용 (필요하면 slice 개수 조정)
  return data.works.slice(0, 2);
}

// /works 리스트 전체
export async function fetchWorks(): Promise<Work[]> {
  const data = await graphqlClient.request<{ works: Work[] }>(QUERY_WORKS);
  return data.works;
}

// 기간 표시: "2024.01 - 진행 중" 등
export function formatWorkPeriod(work: Work): string {
  const fmt = (iso?: string | null) => {
    if (!iso) return "";
    const [y, m] = iso.split("-");
    return `${y}.${m}`;
  };

  const start = fmt(work.startedAt);
  const end = work.isOngoing ? "진행 중" : fmt(work.endedAt);

  if (!start && !end) return "";
  if (!start && end) return end;
  if (start && !end) return start;
  return `${start} - ${end}`;
}
