insert into public.promo_service_state (
  id,
  selected_month,
  period,
  excel_updated_at,
  generated_at,
  approved_at,
  selected_upload_file_name
)
values (
  1,
  '2026.06',
  '직전 6개월',
  '2026-06-16 09:20',
  '',
  '',
  '6월 프로모션 총괄판(260529)_공지4.xlsx'
)
on conflict (id) do update
set
  selected_month = excluded.selected_month,
  period = excluded.period,
  excel_updated_at = excluded.excel_updated_at,
  generated_at = excluded.generated_at,
  approved_at = excluded.approved_at,
  selected_upload_file_name = excluded.selected_upload_file_name,
  updated_at = now();

delete from public.promo_promotions;

insert into public.promo_promotions (
  id,
  code,
  agency,
  region,
  branch,
  rm,
  product,
  happy_type,
  month,
  status,
  error_reason,
  generated,
  notice_file,
  updated_at
)
values
  (1, '', '더블유에셋', '서울', '강남지점', '정RM', '기본가동', '', '2026.06', '확정', '', false, 'Wasset_기본가동_0616.png', '2026-06-16 09:10'),
  (2, '', '더블유에셋', '서울', '강남지점', '정RM', '5~6월 브릿지', '', '2026.06', '미확정', '', false, 'Wasset_브릿지_0616.png', '2026-06-16 08:40'),
  (3, '', '피플라이프', '경기', '수원지점', '윤RM', '6~7월 브릿지', '', '2026.06', '오류', '조직 매핑 없음', false, 'Peoplelife_브릿지_0615.png', '2026-06-15 17:20'),
  (4, '', '인카금융서비스', '대전', '대전지점', '강RM', '기본가동', '', '2026.06', '확정', '', false, 'Incar_기본가동_0615.png', '2026-06-15 15:50'),
  (5, '', '글로벌금융판매', '부산', '부산지점', '송RM', '기본가동', '', '2026.06', '미확정', '', false, 'Global_기본가동_0614.png', '2026-06-14 16:15'),
  (6, '', '에이플러스에셋', '대구', '대구지점', '한RM', '5~6월 브릿지', '', '2026.06', '오류', '필수 수치 누락', false, 'Aplus_브릿지_0614.png', '2026-06-14 13:30');
