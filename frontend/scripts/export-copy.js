import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("out"); // Next 정적 빌드 결과
const DEST = path.resolve("../backend/public"); // Slim이 요구하는 public 디렉터리

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // 정적 파일은 그냥 덮어쓰기 (index.html, works/index.html, _next/** 등)
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(
      "❌ out/ 디렉토리가 없습니다. 먼저 `pnpm build`를 실행했는지 확인하세요."
    );
    process.exit(1);
  }

  if (!fs.existsSync(DEST)) {
    console.error(
      "❌ ../backend/public 디렉토리를 찾을 수 없습니다. 경로를 확인하세요."
    );
    process.exit(1);
  }

  // 예전 번들 정리: public/_next 만 삭제
  const nextDir = path.join(DEST, "_next");
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  copyDir(SRC, DEST);

  console.log(
    "✔ out/ → ../backend/public 복사 완료 (index.php, .htaccess는 건드리지 않음)"
  );
}

main();
