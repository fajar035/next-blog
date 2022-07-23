import Link from 'next/link';

function Card({ post }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>

        <Link href="/#">
          <a className="card-link">Detail</a>
        </Link>
      </div>
    </div>
  );
}

export default Card;
