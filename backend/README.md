# 📁 ynhn-work Backend

Slim + GraphQL + MySQL + Eloquent 기반 포트폴리오 백엔드

이 프로젝트는 제 개인 포트폴리오 웹사이트의 백엔드 서버로,  
작업물(Work)과 관련 링크(WorkLink)를 GraphQL API로 제공하는 경량 서버입니다.

- **Slim Framework 4**
- **GraphQL (webonyx/graphql-php)**
- **Eloquent ORM (illuminate/database)**
- **MySQL**
- **PHP 8.3**

---

## 📦 프로젝트 구조

```
backend
|-- README.md
|-- bootstrap.php
|-- composer.json
|-- composer.lock
|-- config
|   |-- app.php
|   `-- database.php
|-- database
|   |-- data.sql
|   `-- schema.sql
|-- public
|   |-- assets
|   |   `-- { 빌드 된 frontend 파일들 }
|   `-- index.php
`-- src
    |-- App.php
    |-- GraphQL
    |   |-- Resolvers
    |   |   |-- WorkMutationResolver.php
    |   |   `-- WorkResolver.php
    |   |-- Schema.php
    |   |-- TypeRegistry.php
    |   `-- Types
    |       |-- WorkLinkType.php
    |       `-- WorkType.php
    |-- Models
    |   |-- Work.php
    |   `-- WorkLink.php
    `-- routes.php
```

---

## ⚙️ 기능 개요

### ✔ Works (작업물)

- 작업물 목록 조회
- ID로 단일 조회
- 생성(Create)
- 수정(Update)
- 삭제(Delete)

### ✔ WorkLinks (링크)

- 작업물에 링크 추가
- 링크 수정 / 삭제

---

## 🚀 개발 환경 설정

### 1) 의존성 설치

```bash
cd backend
composer install
```

### 2) 환경 변수 설정

`backend/.env` 파일 생성:

```env
APP_ENV=development
APP_DEBUG=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ynhn_work
DB_USERNAME=root
DB_PASSWORD=
```

### 3) DB 스키마 생성

```bash
mysql -u root -p ynhn_work < backend/database/schema.sql
mysql -u root -p ynhn_work < backend/database/data.sql  # 선택
```

### 4) 로컬 서버 실행

```bash
cd backend
composer start
```

서버는 기본적으로:

```
http://localhost:8080/api/graphql
```

로 동작합니다.

---

## 🔌 GraphQL API

### ✔ 쿼리 예시

#### 전체 작업물 조회

```graphql
query {
  works {
    id
    title
    summary
  }
}
```

#### 특정 작업물 조회

```graphql
query {
  work(id: 1) {
    id
    title
  }
}
```

---

## ✏️ Mutation 예시

### 작업물 생성

```graphql
mutation Create($input: WorkInput!) {
  createWork(input: $input) {
    id
    title
  }
}
```

```json
{
  "input": {
    "title": "포트폴리오 백엔드",
    "summary": "Slim + GraphQL + MySQL 기반 백엔드",
    "description": "# 설명...",
    "category": "backend",
    "techs": ["PHP", "Slim", "MySQL"],
    "tags": ["portfolio"],
    "isOngoing": false
  }
}
```

---

## 📡 엔드포인트

| 메서드 | URL            | 설명                      |
| ------ | -------------- | ------------------------- |
| POST   | `/api/graphql` | GraphQL API               |
| GET    | `/`            | 정적 파일 (public/assets) |

---

## 🧩 서버에서 주의할 점

- **PDO + pdo_mysql 확장 필수**
- `public/index.php`가 entry point
- PHP 8.1 이상 권장

---

## 🛠 기술 스택

- PHP 8.3
- Slim 4
- webonyx/graphql-php
- Eloquent ORM
- MySQL 8
- dotenv

---

## 📜 라이선스

MIT License.
