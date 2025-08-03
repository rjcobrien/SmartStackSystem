import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-center">
          <div className="lg:col-span-2 mb-6 lg:mb-0">
            <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
              Featured
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 font-serif">
              {post.title}
            </h3>
            <p className="text-warm-gray mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center text-sm text-warm-gray mb-4 space-x-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min read
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt || new Date())}
              </span>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Read Full Article
            </Button>
          </div>
          <div className="lg:col-span-1">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="rounded-xl shadow-lg w-full h-auto"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium mr-2">
            {post.category}
          </span>
          <span className="text-xs text-warm-gray flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime} min read
          </span>
        </div>
        <h3 className="text-lg font-semibold text-charcoal mb-3 font-serif">
          {post.title}
        </h3>
        <p className="text-warm-gray text-sm mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-warm-gray">
            {formatDate(post.publishedAt || new Date())}
          </span>
          <Button variant="link" className="text-primary font-medium text-sm p-0">
            Read More
          </Button>
        </div>
      </div>
    </article>
  );
}