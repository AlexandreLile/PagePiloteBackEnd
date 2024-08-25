const express = require("express");
const router = express.Router();
const PageBuilder = require("../models/PageBuilder");

router.get("/page/:pageId", async (req, res) => {
  try {
    const pageId = req.params.pageId;

    // Récupérez les composants depuis la base de données
    const pageBuilder = await PageBuilder.findOne({ pageId });

    if (!pageBuilder) {
      return res.status(404).send("Page not found");
    }

    // Passez les composants à la vue Pug
    res.render("landingPage", {
      components: pageBuilder.components,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
