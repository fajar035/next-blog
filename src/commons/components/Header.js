import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from 'src/commons/styles/Header.module.css';

function Header() {
  const router = useRouter();
  const { route } = router;
  return (
    <header className="navbar navbar-expand-lg bg-light ps-lg-3 pe-lg-3">
      <div className="container-fluid">
        <Link href="/">
          <a className={`navbar-brand ${styles['title-header']}`}>Blog-Next</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse d-lg-flex justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/blog">
                <a
                  className={
                    route === '/blog'
                      ? `nav-link active ${styles['text-header']}`
                      : `nav-link ${styles['text-header']}`
                  }
                  aria-current="page"
                >
                  Blog
                </a>
              </Link>
            </li>
            <li>
              <Link href="/user">
                <a
                  className={
                    route === '/user'
                      ? `nav-link active ${styles['text-header']}`
                      : `nav-link ${styles['text-header']}`
                  }
                  aria-current="page"
                >
                  User
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
