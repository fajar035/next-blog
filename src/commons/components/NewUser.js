import { useEffect, useState } from 'react';
import styles from 'src/commons/styles/NewUser.module.css';
import { addUserApi, updateUserApi, getUserIdApi } from 'src/modules/user';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function NewUsers(props) {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const { handlerCreate, handlerUpdate, isUpdate, isCreate, idUser } = props;
  const alert = withReactContent(Swal);
  const [user, setUser] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStatus, setSelecetedStatus] = useState('');

  useEffect(() => {
    if (isUpdate && !isCreate) {
      setSelectedGender(user.gender);
      setSelecetedStatus(user.status);
    }
  }, [user]);

  const handlerGender = e => {
    setSelectedGender(e.target.value);
  };

  const handlerStatus = e => {
    setSelecetedStatus(e.target.value);
  };

  const getUserById = () => {
    getUserIdApi(idUser, token)
      .then(res => {
        setUser(res.data.data);
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
  };

  useEffect(() => {
    if (isUpdate) return getUserById();
  }, []);

  const handlerSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const gender = selectedGender;
    const status = selectedStatus;
    const body = new FormData();
    body.append('name', name);
    body.append('email', email);
    body.append('gender', gender);
    body.append('status', status);

    if (isCreate)
      return addUserApi(token, body)
        .then(() => {
          alert.fire({
            icon: 'success',
            title: 'Successfully added data ..',
            showConfirmButton: false,
            timer: 1500,
            position: 'center',
          });
          handlerCreate();
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

    if (isUpdate)
      return updateUserApi(token, idUser, body)
        .then(() => {
          alert.fire({
            icon: 'success',
            title: 'Successfully changed data ..',
            showConfirmButton: false,
            timer: 1500,
            position: 'center',
          });
          handlerUpdate();
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
  };

  return (
    <div className={styles['wrapper-new-user']}>
      <p>{isCreate ? 'New User' : 'Update User'}</p>
      <form onSubmit={handlerSubmit}>
        <div className={styles['wrapper-input-user']}>
          <div className={styles['wrapper-input']}>
            <input
              type="text"
              name="name"
              defaultValue={isUpdate ? user.name : ''}
              placeholder="Name"
              className={styles['input-user']}
              required
            />
            <span className={styles['border-bottom']} />
          </div>

          <div className={styles['wrapper-input']}>
            <input
              type="email"
              name="email"
              defaultValue={isUpdate ? user.email : ''}
              placeholder="Email"
              className={styles['input-user']}
              required
            />
            <span className={styles['border-bottom']} />
          </div>

          <div className={styles['wrapper-input']}>
            <p>Gender</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={isUpdate ? selectedGender === 'male' : null}
                onChange={handlerGender}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={isUpdate ? selectedGender === 'female' : null}
                onChange={handlerGender}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          <div className={styles['wrapper-input']}>
            <p>Status</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="active"
                name="status"
                value="active"
                checked={isUpdate ? selectedStatus === 'active' : null}
                onChange={handlerStatus}
              />
              <label className="form-check-label" htmlFor="active">
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="inactive"
                name="status"
                value="inactive"
                checked={isUpdate ? selectedStatus === 'inactive' : null}
                onChange={handlerStatus}
              />
              <label className="form-check-label" htmlFor="inactive">
                Inactive
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className={styles['btn-submit']}>
          {isCreate ? 'Create User' : 'Update User'}
        </button>

        <button
          type="button"
          className={styles['btn-cansel']}
          onClick={() => {
            handlerCreate();
            handlerUpdate();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewUsers;

export async function getServerSideProps() {
  const token = process.env.TOKEN;

  return {
    props: { token },
  };
}
