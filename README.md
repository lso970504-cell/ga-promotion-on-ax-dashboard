# GA 프로모션 ON AX 대시보드

GA 프로모션 ON AX 대시보드는 대리점별 프로모션 협의현황, 관리자 업로드, 안내장 생성 및 승인, 자료 다운로드를 한 화면에서 관리하는 운영용 대시보드입니다.

## 배포 주소

- Vercel: [https://ga-promotion-on-ax-dashboard.vercel.app](https://ga-promotion-on-ax-dashboard.vercel.app)
- GitHub: [https://github.com/lso970504-cell/ga-promotion-on-ax-dashboard](https://github.com/lso970504-cell/ga-promotion-on-ax-dashboard)

## 주요 기능

- 사번 5자리 기반 로그인 화면
- 대리점별 프로모션 협의현황 조회
- 지역단명, 지점명, GA지사 기준 검색 및 정렬
- 관리자 엑셀 업로드 반영
- 표준안내장 생성 및 미리보기
- 전체 승인 후 확정건 다운로드
- 기타자료실 다운로드 관리

## 주요 파일

- `index.html`
  - 현재 배포 메인 진입 파일
- `20260617.html`
  - 최종 작업 기준 원본 화면 파일
- `template-package/promo-template.html`
  - 안내장 템플릿 화면
- `promo-template-data.browser.js`
  - 템플릿 데이터 매핑 스크립트
- `outputs/`
  - 샘플 엑셀, 이미지, 테스트 산출물 보관 폴더

## 사용 방법

1. 로그인 페이지에서 사번 5자리와 동일한 비밀번호 5자리를 입력합니다.
2. 프로모션 현황 화면에서 지역단, 지점, GA지사 기준으로 조회합니다.
3. 관리자 권한 사용자는 엑셀 업로드, 안내장 생성, 전체 승인 작업을 수행합니다.
4. 확정건은 안내장 미리보기 및 다운로드가 가능합니다.

## 로컬 작업

주요 작업 파일:

- `C:\Users\user\Documents\코덱스_day6\index.html`
- `C:\Users\user\Documents\코덱스_day6\20260617.html`

로컬에서 브라우저로 직접 열어 확인할 수 있습니다.

## 배포 방법

현재 프로젝트는 Vercel로 배포합니다.

기본 흐름:

1. 로컬 파일 수정
2. `git add`
3. `git commit`
4. `git push`
5. `vercel --prod --yes`

## 참고

- `.env` 파일은 현재 저장소에 포함되어 있지 않습니다.
- `node_modules`와 임시 점검 파일은 `.gitignore`로 제외합니다.
