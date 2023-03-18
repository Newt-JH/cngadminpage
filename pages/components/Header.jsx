import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Router, { useRouter } from 'next/router'; // 추가

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const tabItems = [
    {
      id: 0,
      label: '실시간 제품 현황 관리',
      link: '/main/realease'
    },
    {
      id: 1,
      label: '제품 관리',
      link: '/main/product'
    },
    {
      id: 2,
      label: 'FAQ 관리',
      link: '/main/faq'
    },
    {
      id: 3,
      label: '견적 문의 관리',
      link: '/main/contact'
    },
    {
      id: 4,
      label: '고객사 관리',
      link: '/main/partner'
    },
    {
      id: 5,
      label: '통계',
      link: '/#'
    },
  ];

  const handleTabClick = (index, link) => {
    setActiveTab(index);
    if (link !== '/') {
      router.push(link);
    }
  };
 
  console.log(router.pathname);
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabItems.map((tab, index) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.link.includes(router.pathname) ? styles.active : ''}`}
            onClick={() => handleTabClick(index, tab.link)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Header;