/* eslint-disable no-nested-ternary */
import Header from 'src/commons/components/Header';
import Layout from 'src/commons/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCommentsIdApi } from 'src/modules/comment';
import { getPostIdApi } from 'src/modules/post';
import { getUserIdApi } from 'src/modules/user';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from 'src/commons/styles/BlogId.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'src/commons/components/Spinner';

function BlogId() {
  const router = useRouter();
  const { blogId } = router.query;
  const alert = withReactContent(Swal);
  const [idUser, setIdUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState([]);
  const [noDataComment, setNoDataComment] = useState(false);

  useEffect(() => {
    if (comments.length === 0) return setNoDataComment(true);
    if (comments.length !== 0) return setNoDataComment(false);
  }, [comments]);

  const getComments = () => {
    getCommentsIdApi(blogId).then(res => {
      if (Object.keys(res).length !== 0) return setComments(res.data);
    });
  };

  const getBlogById = () => {
    getPostIdApi(blogId)
      .then(res => {
        if (Object.keys(res).length !== 0) {
          setBlog(res.data);
          setIdUser(res.data.data.user_id);
        }
      })
      .catch(() =>
        alert
          .fire({
            title: 'Something went wrong',
            icon: 'warning',
          })
          .then(() => router.push('/blog'))
      );
  };

  const getUserById = () => {
    if (idUser !== null) {
      getUserIdApi(idUser).then(res => {
        if (Object.keys(res).length !== 0) return setUser(res.data);
      });
    }
  };

  useEffect(() => {
    getComments();
    getBlogById();
    getUserById();
  }, [idUser]);

  return (
    <Layout title={`Blog | ${blogId}`}>
      <Header />
      <section className="container-fluid">
        <div className="row">
          <div className="col-lg-7 d-flex justify-content-center align-items-center">
            <div className={styles['wrapper-card-id']}>
              {blog.length === 0 ? (
                <div className={styles['wrapper-spinner']}>
                  <Spinner />
                </div>
              ) : (
                <>
                  <p className={styles['title-blogid']}>
                    {blog.length !== 0 && blog.data.title}
                  </p>
                  <p className={styles['body-blogid']}>
                    {blog.length !== 0 && blog.data.body}
                  </p>
                  <hr />
                  <p>
                    {' '}
                    <FontAwesomeIcon
                      icon={faPencil}
                      width={30}
                      height={30}
                    />{' '}
                    Author
                  </p>
                  <div className={styles.author}>
                    <p>
                      <FontAwesomeIcon icon={faUser} width={20} height={20} />{' '}
                      {user.length !== 0 && user.data.name}
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        width={20}
                        height={20}
                      />{' '}
                      {user.length !== 0 && user.data.email}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-5 d-flex justify-content-center ">
            <div className={styles['wrapper-comment']}>
              {comments.length !== 0 ? (
                <>
                  <p className={styles['title-comment']}>Comments</p>
                  {comments.map((comment, idx) => (
                    <div className={styles['card-comment']} key={idx}>
                      <blockquote className="blockquote mb-0">
                        <p>{comment.body}</p>
                        <footer className="blockquote-footer mt-3">
                          {comment.name}{' '}
                          <cite title="Source Title">{comment.email}</cite>
                        </footer>
                      </blockquote>
                    </div>
                  ))}
                </>
              ) : noDataComment ? (
                <p>No Data</p>
              ) : (
                <div className="wrapper-spinner">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BlogId;
