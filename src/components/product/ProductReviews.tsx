'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ReviewData {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const mockReviews: ReviewData[] = [
  {
    id: 'r1',
    name: 'Marcus J.',
    rating: 5,
    date: '2026-01-15',
    comment:
      'These are hands down the most comfortable sneakers I have ever worn. The cushioning is incredible and they look even better in person. Would absolutely buy another pair.',
  },
  {
    id: 'r2',
    name: 'Sarah C.',
    rating: 5,
    date: '2026-01-10',
    comment:
      'The quality of the materials is premium. You can really feel the difference compared to other brands in this price range. Highly recommend.',
  },
  {
    id: 'r3',
    name: 'David P.',
    rating: 4,
    date: '2025-12-28',
    comment:
      'Great shoe overall. Runs slightly narrow if you have wide feet, so I would recommend going half a size up. Other than that, the design and comfort are top-notch.',
  },
  {
    id: 'r4',
    name: 'Elena R.',
    rating: 5,
    date: '2025-12-20',
    comment:
      'Absolutely love the colorway. Gets compliments every time I wear them. The build quality is excellent and they have held up great after daily wear.',
  },
  {
    id: 'r5',
    name: 'James W.',
    rating: 4,
    date: '2025-12-15',
    comment:
      'Solid sneakers with a clean look. Took about a day to break in but after that they feel amazing. The sole has great grip too.',
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 6 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 1 },
];

const averageRating = 4.7;
const totalReviews = 128;

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5';
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClass,
              i < Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-white/10 text-white/10'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="flex flex-col gap-8 sm:flex-row">
        {/* Average */}
        <div className="flex flex-col items-center justify-center gap-2 sm:min-w-[160px]">
          <span className="text-5xl font-bold text-white">{averageRating}</span>
          {renderStars(averageRating, 'md')}
          <span className="text-sm text-zinc-500">{totalReviews} reviews</span>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-8 text-right text-sm text-white/50">
                {row.stars}
              </span>
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
              </div>
              <span className="w-10 text-right text-xs text-zinc-500">
                {row.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review */}
      <div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowWriteReview(!showWriteReview)}
        >
          Write a Review
        </Button>

        {showWriteReview && (
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                Rating
              </label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} className="group">
                    <Star className="h-6 w-6 fill-white/10 text-white/10 transition-colors group-hover:fill-amber-400 group-hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                Review
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder-white/20 outline-none transition-colors focus:border-white/20"
                placeholder="Share your experience..."
              />
            </div>
            <Button size="sm">Submit Review</Button>
          </div>
        )}
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-white/[0.04] pb-6 last:border-0"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-xs font-bold text-white/60">
                  {review.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white/80">
                  {review.name}
                </span>
              </div>
              <span className="text-xs text-zinc-500">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="mb-2">{renderStars(review.rating)}</div>
            <p className="text-sm leading-relaxed text-white/50">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
