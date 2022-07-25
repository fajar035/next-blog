import Layout from 'src/commons/components/Layout';
import Header from 'src/commons/components/Header';
import styles from 'src/commons/styles/users.module.css';
import { getAllUserApi, deleteUserApi } from 'src/modules/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import NewUsers from 'src/commons/components/NewUser';
import { search } from 'src/commons/helpers/search';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function User() {
  const [isCreateUSer, setIsCreateUser] = useState(false);
  const [isUpdateUSer, setIsUpdateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const [isDelete, setIsDelete] = useState(false);
  const alert = withReactContent(Swal);

  useEffect(() => {
    setSearchUser(search(keyword, users));
  }, [keyword, users]);

  const handlerBtnCreateUser = () => {
    setIsCreateUser(false);
  };

  const handlerBtnUpdateUser = () => {
    setIsUpdateUser(false);
  };

  const handlerDeleteUser = () => {
    if (isDelete) {
      alert
        .fire({
          title: 'Are you sure ?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#ffcd61',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete',
        })
        .then(result => {
          if (result.isConfirmed) {
            deleteUserApi(token, idUser)
              .then(() => {
                alert.fire({
                  icon: 'success',
                  title: 'Successfully delete data ..',
                  showConfirmButton: false,
                  timer: 1500,
                  position: 'center',
                });
                setIsDelete(false);
              })
              .catch(() => {
                alert.fire({
                  icon: 'warning',
                  title: 'Something when wrong ..',
                  showConfirmButton: false,
                  timer: 1500,
                  position: 'center',
                });
              });
          }
          if (result.isDismissed) return setIsDelete(false);
        });
    }
  };

  useEffect(() => {
    if (isDelete) {
      handlerDeleteUser();
    }
    getAllUserApi(token, page)
      .then(res => {
        setUsers(res.data.data);
        setPagination(res.data.meta.pagination);
      })
      .catch(() => {
        alert.fire({
          icon: 'warning',
          title: 'Something when wrong ..',
          position: 'center',
        });
      });
  }, [page, isUpdateUSer, isCreateUSer, isDelete]);

  return (
    <Layout title="User">
      <Header />
      <section className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className={styles.user}>
              <h1>Users Management</h1>
              {isCreateUSer || isUpdateUSer ? (
                <NewUsers
                  handlerCreate={handlerBtnCreateUser}
                  handlerUpdate={handlerBtnUpdateUser}
                  isUpdate={isUpdateUSer}
                  isCreate={isCreateUSer}
                  idUser={idUser}
                />
              ) : null}

              <p
                className={styles['btn-adduser']}
                onClick={() => {
                  setIsCreateUser(true);
                }}
              >
                Add User
              </p>

              <div className={styles['page-search']}>
                <div className={styles['btn-page']}>
                  <p
                    onClick={() => {
                      setPage(page <= 1 ? 1 : page - 1);
                    }}
                  >
                    Previous
                  </p>
                  <p onClick={() => setPage(page + 1)}>Next</p>
                </div>
                <div className="info-page">
                  <p>Page : {pagination.page}</p>
                  <p>Total Page : {pagination.pages}</p>
                </div>
                <div className={styles['input-search']}>
                  <input
                    type="text"
                    placeholder="Search ... "
                    onChange={e => {
                      setKeyword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length !== 0 &&
                      searchUser.map((user, idx) => (
                        <tr key={idx}>
                          <th scope="row">{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.gender}</td>
                          <td>{user.status}</td>
                          <td className={styles['wrapper-actions']}>
                            <p
                              onClick={() => {
                                setIsUpdateUser(true);
                                setIdUser(user.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                width={20}
                                height={20}
                              />
                            </p>
                            <p
                              onClick={() => {
                                setIsDelete(true);
                                setIdUser(user.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                width={20}
                                height={20}
                              />
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default User;
