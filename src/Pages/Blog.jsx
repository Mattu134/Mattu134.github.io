import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogPostCard = ({ post, isFeatured = false }) => {
  if (!post || !post.id) return null; 

  const cardClasses = isFeatured 
    ? "card h-100 border-0 shadow-lg"
    : "card h-100 border-0 shadow-sm";
  
  return (
    <div className={cardClasses}>
      <img 
        src={post.image} 
        className={`card-img-top ${isFeatured ? '' : 'h-50'}`} 
        alt={post.title} 
        style={{ objectFit: 'cover', maxHeight: isFeatured ? '350px' : '250px' }} 
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = isFeatured 
            ? 'https://placehold.co/600x350/28a745/ffffff?text=Imagen+Destacada' 
            : 'https://placehold.co/400x250/6c757d/ffffff?text=Imagen+Normal';
        }}
      />
      <div className="card-body d-flex flex-column">
        <span className={`badge mb-2 ${isFeatured ? 'bg-danger' : 'bg-success'}`}>{post.category}</span>
        
        <h5 className={`card-title ${isFeatured ? 'fw-bold fs-4' : 'fw-semibold'}`}>{post.title}</h5>
        
        <p className="card-text text-muted flex-grow-1">{post.summary}</p>
        
        <p className="card-text">
          <small className="text-muted">{post.date}</small>
        </p>
        
        <Link 
          to={`/blog/${post.id}`} 
          className="btn btn-sm btn-outline-success mt-2"
        >
            Leer más <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold text-success mb-5 display-4">Blog de EcoMarket</h1>
      
      {featuredPost && (
        <div className="row mb-5 pb-4"> 
          <div className="col-12">
            <h2 className="text-success border-bottom pb-2 mb-4">Artículo Destacado</h2>
            <BlogPostCard post={featuredPost} isFeatured={true} />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
            <h2 className="text-success border-bottom pb-2 mb-4">Últimos Artículos</h2>
        </div>
        {otherPosts.map(post => (
          <div key={post.id} className="col-lg-4 col-md-6 mb-4">
            <BlogPostCard post={post} />
          </div>
        ))}
      </div>
      
      <nav aria-label="Paginación de blog" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled"><a className="page-link" href="#">Anterior</a></li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
        </ul>
      </nav>
      
    </div>
  );
}

export default Blog;
