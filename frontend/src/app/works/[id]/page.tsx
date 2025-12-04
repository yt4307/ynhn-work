import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchWork, fetchWorks, formatWorkPeriod, Work } from "@/lib/works";
import styles from "./page.module.css";

// 정적 export를 위한 경로 생성
export async function generateStaticParams() {
  const works = await fetchWorks();

  return works.map((work) => ({
    id: String(work.id),
  }));
}

// SEO 메타데이터 (params가 Promise라는 점 주의)
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const numId = Number(id);
  if (Number.isNaN(numId)) return {};

  try {
    const work = await fetchWork(numId);
    return {
      title: `${work.title} · Works`,
      description: work.summary,
    };
  } catch {
    return {};
  }
}

// 서버 컴포넌트 페이지
export default async function WorkDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const numId = Number(id);

  if (Number.isNaN(numId)) {
    notFound();
  }

  let work: Work;
  try {
    work = await fetchWork(numId);
  } catch {
    notFound();
  }

  const period = formatWorkPeriod(work);
  const descriptionParagraphs = work.description
    ? work.description.split(/\r?\n\r?\n/)
    : [];

  return (
    <main className={styles.wrapper}>
      {/* 뒤로가기 */}
      <Link href="/works" className={styles.backLink}>
        ← 작업물 목록으로 돌아가기
      </Link>

      {/* 헤더 영역 */}
      <header className={styles.header}>
        <h1 className={styles.title}>{work.title}</h1>

        {work.summary && <p className={styles.summary}>{work.summary}</p>}

        {/* 상단 메타 한 줄 */}
        <div className={styles.metaRow}>
          {period && <span>{period}</span>}
          {work.category && (
            <>
              <span className={styles.metaDot} />
              <span>{work.category}</span>
            </>
          )}
          <>
            <span className={styles.metaDot} />
            <span>{work.isOngoing ? "진행 중" : "완료"}</span>
          </>
        </div>

        {/* 배지들 */}
        <div className={styles.badgesRow}>
          {work.category && (
            <span className={styles.categoryBadge}>{work.category}</span>
          )}
          <span className={styles.statusBadge}>
            {work.isOngoing ? "진행 중" : "완료"}
          </span>
        </div>

        {/* 외부 링크 버튼들 (GitHub, Demo 등) */}
        {work.links && work.links.length > 0 && (
          <div className={styles.linksRow}>
            {work.links
              .slice()
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkButton}
                >
                  {link.label} ↗
                </a>
              ))}
          </div>
        )}
      </header>

      {/* 본문 2열 레이아웃 */}
      <div className={styles.layout}>
        {/* 메인 컬럼 */}
        <section className={styles.mainCol}>
          {/* 설명 섹션 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>설명</h2>
            {descriptionParagraphs.length > 0 ? (
              descriptionParagraphs.map((para, idx) => (
                <p key={idx} className={styles.bodyText}>
                  {para}
                </p>
              ))
            ) : (
              <p className={styles.bodyText}>
                설명이 아직 준비되지 않았습니다.
              </p>
            )}
          </section>

          {/* 이미지 섹션 */}
          {work.images && work.images.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Screenshots</h2>
              <div className={styles.imageGrid}>
                {work.images.map((src, idx) => (
                  <div key={src ?? idx} className={styles.imageItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${work.title} screenshot ${idx + 1}`}
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* 사이드 컬럼 */}
        <aside className={styles.asideCol}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Info</h2>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>기간</p>
              <p className={styles.infoValue}>{period || "기간 정보 없음"}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>카테고리</p>
              <p className={styles.infoValue}>{work.category || "미분류"}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>상태</p>
              <p className={styles.infoValue}>
                {work.isOngoing ? "진행 중" : "완료"}
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>기술 스택</h2>

            {work.techs && work.techs.length > 0 ? (
              <div className={styles.techBadges}>
                {work.techs.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className={styles.bodyText}>등록된 기술 스택이 없습니다.</p>
            )}

            {work.tags && work.tags.length > 0 && (
              <>
                <p className={`${styles.infoLabel}`} style={{ marginTop: 16 }}>
                  태그
                </p>
                <div className={styles.tagsRow}>
                  {work.tags.map((tag) => (
                    <span key={tag} className={styles.tagBadge}>
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
