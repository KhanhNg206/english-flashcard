// =============================================
// components/Navbar.tsx
// Sidebar navigation - hiển thị ở bên trái
// =============================================

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

// Các mục menu trong sidebar
const navItems = [
  { to: '/',           icon: '🏠', label: 'Trang chủ' },
  { to: '/theory',     icon: '📖', label: 'Lý thuyết' },
  { to: '/vocabulary', icon: '📚', label: 'Từ vựng' },
  { to: '/progress',   icon: '📊', label: 'Tiến độ' },
];

export default function Navbar() {
  // State để mở/đóng menu trên mobile
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Header hiển thị trên mobile */}
      <div className={styles['mobile-header']}>
        <h1>📖 English Flashcard</h1>
        <button
          className={styles['hamburger-btn']}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Mở menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay khi mở menu trên mobile */}
      <div
        className={`${styles['navbar-overlay']} ${isOpen ? styles.open : ''}`}
        onClick={closeMenu}
      />

      {/* Sidebar */}
      <nav className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
        {/* Logo */}
        <div className={styles['navbar-logo']}>
          <h1>
            <span>📖</span>
            English Flashcard
          </h1>
          <p>Học từ vựng mỗi ngày</p>
        </div>

        {/* Các link điều hướng */}
        <div className={styles['navbar-nav']}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles['nav-item']} ${isActive ? styles.active : ''}`
              }
              onClick={closeMenu}
            >
              <span className={styles['nav-icon']}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className={styles['navbar-footer']}>
          <p>English Flashcard v1.0</p>
        </div>
      </nav>
    </>
  );
}
