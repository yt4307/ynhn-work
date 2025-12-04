"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchWork, formatWorkPeriod, Work } from "@/lib/works";
import styles from "./page.module.css";

interface Props {
  id: string;
}

export default function WorkDetailClient({ id }: Props) {
  const numId = Number(id);
  const isValidId = !!id && !Number.isNaN(numId);

  const {
    data: work,
    isLoading,
    isError,
  } = useQuery<Work>({
    queryKey: ["work", id],
    queryFn: () => fetchWork(numId),
    enabled: isValidId,
  });

  // 잘못된 id
  if (!isValidId) {
    return (
      <main className={styles.wrapper}>
        <p className={styles.bodyText}>잘못된 작업물 ID입니다.</p>
        <Link href="/works" className={styles.backLink}>
          ← 작업물 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <main className={styles.wrapper}>
        <p className={styles.bodyText}>작업물을 불러오는 중입니다...</p>
      </main>
    );
  }

  // 에러 또는 데이터 없음
  if (isError || !work) {
    return (
      <main className={styles.wrapper}>
        <p className={styles.bodyText}>작업물을 불러오지 못했습니다.</p>
        <Link href="/works" className={styles.backLink}>
          ← 작업물 목록으로 돌아가기
        </Link>
      </main>
    );
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
                <p className={styles.infoLabel} style={{ marginTop: 16 }}>
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
