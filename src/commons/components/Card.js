import Link from 'next/link';
import styles from 'src/commons/styles/Card.module.css';

function Card({ post }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className={styles['title-card']}>{post.title}</h5>

        <Link href={`/blog/${post.id}`}>
          <a className={styles['link-card']}>Detail</a>
        </Link>
      </div>
    </div>
  );
}

export default Card;
