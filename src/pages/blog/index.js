import Layout from 'src/commons/components/Layout';
import Card from 'src/commons/components/Card';
import Header from 'src/commons/components/Header';
import styles from 'src/commons/styles/Blog.module.css';
import ScrollButton from 'src/commons/components/BtnScrollTop';
import { useRouter } from 'next/router';
import axios from 'axios';

function Blog({ posts, page }) {
  const router = useRouter();
  const { data, meta } = posts;
  const { pagination } = meta;

  return (
    <Layout title="Blog">
      <Header />
      <section className="container-fluid ">
        <h1 className={styles['text-title-blog']}>Blog Post</h1>
        <div className="row d-lg-flex justify-content-center align-items-center mt-5 mb-5">
          <div className="col-lg-6 col-md-8">
            <div className="row mb-4 d-flex justify-content-between align-items-center">
              <div className="col-lg-4 col-md-6  d-flex justify-content-between mb-sm-5 m-lg-0 m-md-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    router.push(`/blog?page=${page - 1}`);
                  }}
                  disabled={page <= 1}
                >
                  <p className={styles['text-page']}>Previous</p>
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    router.push(`/blog?page=${page + 1}`);
                  }}
                  disabled={page >= pagination.pages}
                >
                  <p className={styles['text-page']}>Next</p>
                </button>
              </div>
              <div className="col-lg-4 col-md-6 d-flex justify-content-between align-items-center">
                <p className={styles['text-page']}>{`Page : ${page}`}</p>
                <p
                  className={styles['text-page']}
                >{`Total Page : ${pagination.pages}`}</p>
              </div>
            </div>
            {data.length !== 0 ? (
              data.map((post, idx) => <Card key={idx} post={post} />)
            ) : (
              <p className={styles['text-no-data']}>No data</p>
            )}
          </div>
        </div>
        <ScrollButton />
      </section>
    </Layout>
  );
}

export default Blog;

export async function getServerSideProps({ query: { page = 1 } }) {
  const urlPosts = `https://gorest.co.in/public/v1/posts?page=${page}`;
  const resPosts = await axios.get(urlPosts);
  const posts = resPosts.data;

  return {
    props: { posts, page: parseInt(page, 10) },
  };
}
