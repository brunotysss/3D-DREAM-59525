import reviews from '../data/reviews.json';
import {
    useGetReviewsByProductQuery,
    usePostReviewMutation,
    useHasUserPurchasedProductQuery,
  } from "../services/reviewService";

const useProductRating = (productId) => {
    const { data: reviews = [] } = useGetReviewsByProductQuery(productId);
  
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;
  
    return [averageRating.toFixed(1), totalReviews]; // Promedio con 1 decimal y total
  };
export default useProductRating;