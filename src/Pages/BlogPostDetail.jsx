import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

function BlogPostDetail() {
  const { id } = useParams();

  const post = blogPosts.find(post => String(post.id) === id);

  if (!post) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">¡Artículo no encontrado!</h4>
          <p>Lo sentimos, el artículo que estás buscando no existe o ha sido removido.</p>
          <hr />
          <Link to="/blog" className="btn btn-success">Volver al Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <Link to="/blog" className="btn btn-outline-success btn-sm mb-4">
            <i className="bi bi-arrow-left me-2"></i> Volver al Blog
          </Link>

          <img 
            src={post.image} 
            className="img-fluid rounded-4 mb-4 shadow-sm w-100" 
            alt={post.title} 
            style={{ objectFit: 'cover', maxHeight: '500px' }}
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://placehold.co/1000x500/28a745/ffffff?text=Imagen+Principal+Blog';
            }}
          />

          <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
            <span className="badge bg-success fs-6">{post.category}</span>
            <small>{post.date}</small>
          </div>

          <h1 className="fw-bold display-5 mb-4 text-success">{post.title}</h1>
          
          <div className="lead mb-4 text-muted">
            {post.summary}
          </div>

          <div className="blog-content fs-5 text-dark">
            <div dangerouslySetInnerHTML={{ __html: post.fullContent || "<p>Contenido completo no disponible.</p>" }} />
          </div>

          <hr className="my-5" />

          <Link to="/blog" className="btn btn-success">
            <i className="bi bi-newspaper me-2"></i> Explorar más artículos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPostDetail;
