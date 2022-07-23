import Layout from 'src/commons/components/Layout';
import Header from 'src/commons/components/Header';
import styles from 'src/commons/styles/users.module.css';

function User() {
  return (
    <Layout title="User">
      <Header />
      <section className="container-fluid">
        <div className="row">
          <div className="col-lg-12 vh-100 d-flex justify-content-center align-items-center">
            <div className={styles.user}>Users</div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default User;
