import type { Metadata } from "next";
import WorkDetailClient from "./WorkDetailClient";

// 실제 works 테이블에서 확인한 ID로 교체하면 됨
const STATIC_WORK_IDS = ["2", "3", "4", "5"];

export function generateStaticParams() {
  return STATIC_WORK_IDS.map((id) => ({ id }));
}

export const metadata: Metadata = {
  title: "Works · 정연한",
  description: "프로젝트 상세 보기",
};

// 여기서 params가 Promise라 async + await으로 한 번 풀어줌
export default async function WorkDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return <WorkDetailClient id={id} />;
}
