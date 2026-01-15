# IQ Spark 🧠⚡

모던한 비언어적 IQ 테스트 웹 애플리케이션. 일회성 결제 ($14.99)로 상세 리포트를 잠금 해제합니다.

**구독 없음. 반복 청구 없음. 한 번 결제.**

## 특징

- 🧩 **24개 오리지널 문제**: SVG 기반 비언어적 추론 테스트
- ⏱️ **18분 제한 시간**: 빠르고 효율적인 테스트
- 📊 **상세 리포트**: IQ 범위, 백분위, 인지 강점 분석
- 💳 **일회성 결제**: $14.99, 구독 없음
- 📱 **모바일 우선**: 모든 기기에서 완벽하게 작동

## 기술 스택

- **프론트엔드**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **UI**: shadcn/ui 스타일 컴포넌트
- **결제**: Stripe Checkout
- **데이터베이스**: Supabase (PostgreSQL)
- **배포**: Vercel (권장)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 `.env.local`로 복사하고 값을 채웁니다:

```bash
cp .env.example .env.local
```

필수 환경 변수:
- `NEXT_PUBLIC_SITE_URL`: 사이트 URL
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 익명 키
- `STRIPE_SECRET_KEY`: Stripe 비밀 키
- `STRIPE_WEBHOOK_SECRET`: Stripe 웹훅 시크릿

### 3. 데이터베이스 설정

Supabase SQL 에디터에서 `supabase/schema.sql`을 실행합니다.

### 4. Stripe 설정

1. Stripe 대시보드에서 제품 생성 ($14.99, 일회성)
2. 웹훅 엔드포인트 등록: `your-domain.com/api/webhook`
3. 이벤트 선택: `checkout.session.completed`, `payment_intent.succeeded`, `charge.refunded`

### 5. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 랜딩 페이지
│   ├── age-gate/           # 연령 확인
│   ├── test/               # 테스트 페이지
│   ├── paywall/            # 결제 유도 페이지
│   ├── payment/            # 결제 성공/취소
│   ├── results/            # 결과 페이지
│   ├── faq/                # FAQ
│   ├── support/            # 지원/환불
│   ├── legal/              # 법적 페이지
│   └── api/                # API 라우트
├── components/             # UI 컴포넌트
│   ├── ui/                 # 기본 UI 컴포넌트
│   ├── layout/             # Header, Footer
│   └── question/           # 문제 표시 컴포넌트
└── lib/                    # 유틸리티 및 로직
    ├── questions/          # SVG 문제 엔진
    ├── supabase/           # Supabase 클라이언트
    └── utils.ts            # 유틸리티 함수
```

## 문제 엔진

4가지 문제 유형:
1. **행렬 추론** (Matrix Reasoning): 3x3 그리드의 패턴 완성
2. **순서 완성** (Sequence): 시각적 순서의 다음 항목 예측
3. **시각적 유추** (Analogy): A:B :: C:? 관계 파악
4. **이질 항목 찾기** (Odd One Out): 나머지와 다른 것 찾기

모든 문제는 결정론적 시드를 사용해 재현 가능합니다.

## 법적 고지

⚠️ **중요**: 이 테스트는 오락 및 교육 목적으로만 제공됩니다. 의료, 심리, 임상 진단이 아닙니다. 고용, 학업, 이민, 법률, 의료 결정에 사용하지 마세요.

## 라이선스

MIT

---

**IQ Spark** - 일회성 결제 $14.99, 구독 없음, 반복 청구 없음.
