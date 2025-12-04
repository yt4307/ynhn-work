import { graphqlClient } from "./graphql/graphqlClient";
import { QUERY_WORK_DETAIL, QUERY_WORKS, QUERY_WORKS_FOR_HOME } from "./graphql/queries";

export interface WorkLink {
  id: number;
  label: string;
  url: string;
  sortOrder: number;
}

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
  links?: WorkLink[] | null;
}

// 홈용
export async function fetchWorksForHome(): Promise<Work[]> {
  const data = await graphqlClient.request<{ works: Work[] }>(
    QUERY_WORKS_FOR_HOME
  );
  return data.works.slice(0, 2);
}

// 리스트용
export async function fetchWorks(): Promise<Work[]> {
  const data = await graphqlClient.request<{ works: Work[] }>(QUERY_WORKS);
  return data.works;
}

// 상세용
export async function fetchWork(id: number | string): Promise<Work> {
  const numId = typeof id === "string" ? Number(id) : id;
  const data = await graphqlClient.request<{ work: Work }>(
    QUERY_WORK_DETAIL,
    { id: numId }
  );
  return data.work;
}

// 기간 포맷
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
