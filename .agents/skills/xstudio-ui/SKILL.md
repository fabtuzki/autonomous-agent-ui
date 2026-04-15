---
name: ai-studio-ui-vibe
description: >-
  Applies AI Studio web UI visual language—Tailwind CSS variables, shadcn/Radix
  patterns, Ant Design overrides, typography, and light/dark themes. Use when
  building or restyling React UI in ai-studio-ui, matching existing screens,
  or importing design consistency into Antigravity / vibe-style generation.
---

# AI Studio UI — Vibe giao diện thống nhất

Skill này gom **nguồn sự thật** từ repo: token trong `tailwind.css`, map màu trong `tailwind.config.js`, override Ant Design trong `global.less`, và ngoại lệ landing.

## Nguồn chuẩn (đọc khi cần chi tiết)

| Chủ đề | File |
|--------|------|
| Token CSS toàn app, `:root` / `.dark`, heading scale, scrollbar | `tailwind.css` |
| Tên class Tailwind → biến CSS | `tailwind.config.js` |
| Font load (Inter qua tên stack SF Pro…) | `src/inter.less` |
| Font stack body toàn cục | `src/global.less` |
| Theme class `light` / `dark` trên `<html>` | `src/components/theme-provider.tsx` |
| Nút / shadcn variants | `src/components/ui/button.tsx` |
| `cn()` = clsx + tailwind-merge | `src/lib/utils.ts` |
| Landing / marketing (palette khác, Tailwind v4-style) | `src/external-pages/landing-page/globals.css`, `App.tsx` |

## Stack giao diện

- **Tailwind CSS 3** + **tailwindcss-animate**, **@tailwindcss/line-clamp**, **tailwind-scrollbar**
- **shadcn-style** components: Radix UI, **class-variance-authority**, **lucide-react**
- **Ant Design 5** + **@ant-design/pro-*** — nhiều màn dùng `antd`; style được chỉnh trong `global.less` (không chỉ token)
- **Icons**: `lucide-react` (Radix/shadcn), `@ant-design/icons` (Ant)
- **Dark mode**: `darkMode: ['selector']` — lớp `.dark` trên ancestor (thường là `html`)

## Chế độ sáng / tối

- Body nền/chữ mặc định: `background-color: var(--bg-base)`, `color: var(--text-primary)` (`tailwind.css`).
- Token semantic (ví dụ `--colors-text-neutral-strong`, `--colors-background-*`) được định nghĩa lại trong `.dark { ... }` cùng file.
- Màn Ant Design dark: nền card/modal/input thường theo tông **slate** (#0f172a, #1e293b, #334155, chữ #e2e8f0) trong `global.less` — **cần giữ nhất quán** khi thêm selector `.dark .ant-*` mới.

## Bảng màu cốt lõi (app chính)

**Brand & CTA**

- Tím chủ đạo (sentiment / core): `--colors-background-sentiment-solid-primary`, `--colors-background-core-standard`, `--colors-text-core-standard` (light: khoảng `rgba(127,105,255)` / `rgb(90,75,254)`; dark: tím sáng hơn một chút).
- Xanh nút/link kiểu Ant: `--button-blue-text`: `rgb(22,119,255)`.
- **Accent kỹ thuật** (regulator, switch, biến): `--accent-primary`: `#00beb4`.

**Nền & bề mặt (design layer)**

- `--bg-base`, `--bg-card`, `--bg-component`, `--bg-input`, `--bg-title`
- Viền: `--border-default`, `--border-accent`, `--border-button`

**Chữ**

- `--text-primary`, `--text-secondary`, `--text-disabled`, `--text-input-tip`
- Semantic: `--colors-text-neutral-strong|standard|weak`, `--colors-text-functional-danger`, inverse tương ứng trong dark

**Trạng thái**

- `--state-success`, `--state-warning`, `--state-error`
- Team tags: `--team-group|member|department` + `--bg-group|member|department`

**shadcn HSL (popover, destructive, ring, …)**

- Trong `:root` dùng chuỗi HSL không có `hsl()`; trong component thường `hsl(var(--primary))` — giữ đúng pattern hiện có.

**Gradient có sẵn**

- `bg-metallic-gradient` → `linear-gradient` dùng `--text-primary` và `--metallic` (light `#46464a`, dark `#fafafa`).

## Bo góc & motion

- `--radius`: `0.5rem` (light default); Tailwind `rounded-lg` → `var(--radius)`, `md`/`sm` = bớt 2px/4px.
- Accordion / caret: keyframes `accordion-down`/`up`, `caret-blink` trong `tailwind.config.js`.

## Typography

- **Toàn app (global.less)**: stack `SF Pro Display, SF Pro Text, Helvetica Neue, Helvetica, Arial` — file font thực tế là **Inter** (`inter.less` map vào cùng `font-family` string đó).
- **tailwind.css `@layer base`**: `h1` → `text-2xl font-bold`, `h2` → `text-xl font-semibold`, `h3` → `text-lg font-medium`, `h4` → `text-base font-normal`.
- `body`: `font-feature-settings: 'rlig' 1, 'calt' 1`.

## Pattern code

- Gộp class Tailwind: `import { cn } from '@/lib/utils'` rồi `cn('base', condition && 'conditional', className)`.
- Nút shadcn: dùng `Button` từ `@/components/ui/button` — variants gồm `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `tertiary`, `icon` (xem `button.tsx` để khớp gradient/border).
- Ưu tiên **token** (`bg-background-card`, `text-colors-text-neutral-strong`, …) thay vì mã hex lẻ trừ khi tái tạo đúng một màn đặc thù.

## Ant Design (không chỉ token)

- Nút mặc định (không primary/text/link/dangerous): light nền `#f8f8f8`, viền `#e5e5e5`; dark nền `#1e293b`, viền `#334155`.
- Radio checked / một số CTA: màu đỏ brand `#d82121` (và biến thể hover) trong `global.less`.
- Text button: light `#d82121`, dark `#f87171`.
- Link button: light `green`, dark `#4ade80`.
- Scrollbar global: 10px, track/hover khác nhau light vs `.dark`.

Khi thêm màn Ant mới: lặp lại **cùng hệ màu slate** cho dark hoặc map sang CSS variables nếu refactor được.

## Ngoại lệ: Landing / marketing

- Nền tối: ví dụ `bg-[#060A15]`, `bg-[#040710]` trong `external-pages/landing-page/App.tsx`.
- `globals.css` landing dùng **primary xanh** `#3b82f6`, radius `0.75rem`, nền sáng `#FAFAFA` — **không** trộn palette này vào app chính trừ khi đang sửa đúng thư mục landing.
- Font khai báo: Inter trong `@theme` / `:root` của landing `globals.css`.

## Checklist khi tạo / chỉnh UI

1. Theme: có cần `.dark` không — test cả hai.
2. Ưu tiên class map từ `tailwind.config.js` + biến trong `tailwind.css`.
3. Component Ant: kiểm tra đã có override trong `global.less` chưa; tránh màu lệch slate ở dark.
4. Heading dùng `h1`–`h4` hoặc utility tương đương để đồng bộ scale.
5. Icon: đúng thư viện (lucide vs ant-design) theo vùng màn (shadcn vs antd).
6. Scrollbar: dùng utility dự án (`scrollbar-auto`, `hide-scrollbar`, hoặc style global) thống nhất khu vực.

## Ghi chú nhập Antigravity / vibe

- Copy **bảng token** và **quy tắc Ant vs shadcn** vào prompt hoặc import skill này để sinh layout đồng bộ.
- Nếu tool chỉ hỗ trợ hex: map từ bảng trên; với dark mode luôn thêm cặp giá trị light/dark hoặc tham chiếu biến CSS.
