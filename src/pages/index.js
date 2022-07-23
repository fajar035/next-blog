import Layout from 'src/commons/components/Layout';
import styles from 'src/commons/styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const onClickUser = () => router.push('/user');
  const onClickBlog = () => router.push('/blog');

  return (
    <Layout title="Home">
      <section className={`container-fluid ${styles.parrent}`}>
        <div className="row">
          <div className="col-lg-12 vh-100  d-flex justify-content-center align-items-center">
            <div className={styles['wrapper-card']}>
              <p className={styles.blog} onClick={onClickUser}>
                USERS
              </p>
              <p className={styles.user} onClick={onClickBlog}>
                POSTS
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
