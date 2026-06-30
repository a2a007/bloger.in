const newblogmodel = require('../schema/newblog');

const update = {
    updateBlog: async (req, res) => {
        try {
            const blogId = parseInt(req.params.id);
            const { topic, catogary, description, content, file } = req.body;
            console.log("SERVER: Updating blog with ID:", blogId);

            const updatedBlog = await newblogmodel.findOneAndUpdate(
                { id: blogId },
                { topic, catogary, description, content, file },
                { new: true }
            );

            if (!updatedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            res.status(200).json({ data: true, blog: updatedBlog });
        } catch (err) {
            console.error("Error updating blog:", err);
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = update;
