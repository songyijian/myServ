import file from '../models/file';

exports.builder = (req, res, next) => {
    res.render("builder", {
        "albumname": albumName,
        "images": imagesArray
    });
}