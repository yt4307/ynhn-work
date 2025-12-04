/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql/graphqlClient";

async function fetchWorks() {
  const query = /* GraphQL */ `
    query {
      works {
        id
        title
        summary
      }
    }
  `;
  return graphqlClient.request(query).then((r) => r.works);
}

export default function WorksPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["works"],
    queryFn: fetchWorks,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (error) {
    console.error("GraphQL error:", error);
    return (
      <div>
        에러가 발생했습니다.
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
          {String((error as any).message ?? error)}
        </pre>
      </div>
    );
  }

  if (!data) return <div>데이터 없음</div>;

  return (
    <main>
      <h1>Works</h1>
      <ul>
        {data.map((w: any) => (
          <li key={w.id}>{w.title}</li>
        ))}
      </ul>
    </main>
  );
}
