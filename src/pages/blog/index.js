import Layout from 'src/commons/components/Layout';
import Card from 'src/commons/components/Card';
import Header from 'src/commons/components/Header';
import styles from 'src/commons/styles/Blog.module.css';
import axios from 'axios';
import ScrollButton from 'src/commons/components/BtnScrollTop';
import { useRouter } from 'next/router';

function Blog({ posts, page }) {
  const router = useRouter();
  const { data, meta } = posts;
  // const [dataPosts, setDataPosts] = useState([]);
  const { pagination } = meta;
  // const { links } = pagination;
  // current
  // next
  // previous

  return (
    <Layout title="Blog">
      <Header />
      <section className="container-fluid ">
        <h1 className="p-lg-5 ">Blog Post</h1>
        <div className="row d-lg-flex justify-content-center align-items-center mt-5 mb-5">
          <div className="col-lg-6">
            <div className="row mb-4 d-flex justify-content-between border align-items-center">
              <div className="col-4 d-flex justify-content-between bg-danger">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    router.push(`/blog?page=${page - 1}`);
                  }}
                  disabled={page <= 1}
                >
                  previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    router.push(`/blog?page=${page + 1}`);
                  }}
                >
                  next
                </button>
              </div>
              <div className="col-4 d-flex justify-content-between align-items-center">
                <p className={styles['text-page']}>{`Page : ${page}`}</p>
                <p
                  className={styles['text-page']}
                >{`Total Page : ${pagination.pages}`}</p>
              </div>
            </div>
            {data.length !== 0 &&
              data.map((post, idx) => <Card key={idx} post={post} />)}
          </div>
        </div>
        <ScrollButton />
      </section>
    </Layout>
  );
}

export default Blog;

export async function getServerSideProps({ query: { page = 1 } }) {
  const urlUsers = `https://gorest.co.in/public/v1/users?page=${page}`;

  const urlPosts = `https://gorest.co.in/public/v1/posts?page=${page}`;
  const urlComments = 'https://gorest.co.in/public/v1/comments';

  const resUsers = await axios.get(urlUsers);
  const resPosts = await axios.get(urlPosts);
  const resComments = await axios.get(urlComments);
  const users = resUsers.data;
  const posts = resPosts.data;
  const comments = resComments.data;

  return {
    props: { users, posts, comments, page: parseInt(page, 10) },
  };
}
