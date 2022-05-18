/**
 * Get list
 */
exports.list = async (req, res) => {
  try {
    const list = [1, 2, 3];
    res.json(list);
  } catch (err) {
    res.send(`List fetching failed: ${err}`);
  }
};
