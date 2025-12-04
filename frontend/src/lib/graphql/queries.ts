import { gql } from "graphql-request";

// 홈에서 쓸 대표 작업물 쿼리
export const QUERY_WORKS_FOR_HOME = gql`
  query GetWorksForHome {
    works {
      id
      title
      summary
      category
      techs
      tags
      startedAt
      endedAt
      isOngoing
    }
  }
`;

// 나중에 전체 리스트/상세 페이지를 위해 미리 잡아두는 것도 가능
export const QUERY_WORKS = gql`
  query GetWorks {
    works {
      id
      title
      summary
      category
      techs
      tags
      startedAt
      endedAt
      isOngoing
    }
  }
`;

export const QUERY_WORK_DETAIL = gql`
  query GetWork($id: ID!) {
    work(id: $id) {
      id
      title
      summary
      description
      thumbnail
      images
      category
      tags
      techs
      startedAt
      endedAt
      isOngoing
      # workLinks 같은 필드가 있으면 여기에 추가
    }
  }
`;