const mongoose = require("mongoose");
const Platform = require("../models/platform");

const getAllPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find();

    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get platforms",
      error: error.message,
    });
  }
};

const getPlatformById = async (req, res) => {
  try {
    const platformId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(platformId)) {
      return res.status(400).json({
        message: "Invalid platform ID format",
      });
    }

    const platform = await Platform.findById(platformId);

    if (!platform) {
      return res.status(404).json({
        message: "Platform not found",
      });
    }

    res.status(200).json(platform);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get platform",
      error: error.message,
    });
  }
};

const createPlatform = async (req, res) => {
  try {
    const newPlatform = await Platform.create(req.body);

    res.status(201).json(newPlatform);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create platform",
      error: error.message,
    });
  }
};

const updatePlatform = async (req, res) => {
  try {
    const platformId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(platformId)) {
      return res.status(400).json({
        message: "Invalid platform ID format",
      });
    }

    const updatedPlatform = await Platform.findByIdAndUpdate(
      platformId,
      req.body,
      {
        runValidators: true,
        new: true,
      },
    );

    if (!updatedPlatform) {
      return res.status(404).json({
        message: "Platform not found",
      });
    }

    res.status(200).json(updatedPlatform);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Platform validation failed",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update platform",
      error: error.message,
    });
  }
};

const deletePlatform = async (req, res) => {
  try {
    const platformId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(platformId)) {
      return res.status(400).json({
        message: "Invalid platform ID format",
      });
    }

    const deletedPlatform = await Platform.findByIdAndDelete(platformId);

    if (!deletedPlatform) {
      return res.status(404).json({
        message: "Platform not found",
      });
    }

    res.status(200).json({
      message: "Platform deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete platform",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
