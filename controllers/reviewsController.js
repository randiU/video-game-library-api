const mongoose = require('mongoose');
const Review = require('../models/review');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'displayName email')
      .populate('gameId', 'title');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get reviews',
      error: error.message
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        message: 'Invalid review ID format'
      });
    }

    const review = await Review.findById(reviewId)
      .populate('userId', 'displayName email')
      .populate('gameId', 'title');

    if (!review) {
      return res.status(404).json({
        message: 'Review not found'
      });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get review',
      error: error.message
    });
  }
};

const createReview = async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create review',
      error: error.message
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        message: 'Invalid review ID format'
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      req.body,
      {
        runValidators: true,
        new: true
      }
    );

    if (!updatedReview) {
      return res.status(404).json({
        message: 'Review not found'
      });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Review validation failed',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Failed to update review',
      error: error.message
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        message: 'Invalid review ID format'
      });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({
        message: 'Review not found'
      });
    }

    res.status(200).json({
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete review',
      error: error.message
    });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};