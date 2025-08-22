import { useEffect } from 'react';

export const usePageTitle = (title) => {
  // 마운트 된 이후 페이지 타이틀 업데이트
  useEffect(() => {
    // $title = DOM 요소를 저장하는 변수
    const $title = document.getElementsByTagName('title')[0];
    $title.innerText = title;
  }, [title]);
};
export default usePageTitle;
