import reviews from '../data/reviews.json';


const useProductRating = (productId) =>{
    const productReviews = reviews.find(review => review.productId === productId);
        if(!productReviews || productReviews.reviews.length === 0) return [0, 0];


        const totalRating = productReviews.reviews.reduce((sum,review) => sum + review.rating , 0 );
        const ratingPromedio = totalRating / productReviews.reviews.length;

        return [ratingPromedio, totalRating];
};

export default useProductRating;