const express = require("express");
const Page = require("../models/LandingPage");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Route pour créer une page
router.post("/", auth, async (req, res) => {
  const { title, metaTitle, metaDescription } = req.body;

  try {
    const newPage = new Page({
      title,
      metaTitle,
      metaDescription,
      user: req.user.id,
    });

    await newPage.save();
    res.json(newPage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour obtenir toutes les pages d'un utilisateur
router.get("/", auth, async (req, res) => {
  try {
    const pages = await Page.find({ user: req.user.id });
    res.json(pages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour obtenir une page spécifique
router.get("/:id", auth, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: "Page non trouvée" });
    }
    if (page.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Accès non autorisé" });
    }
    res.json(page);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour mettre à jour une page spécifique
router.put("/:id", auth, async (req, res) => {
  const { title, metaTitle, metaDescription } = req.body;

  try {
    let page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: "Page non trouvée" });
    }
    if (page.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Accès non autorisé" });
    }

    page.title = title || page.title;
    page.metaTitle = metaTitle || page.metaTitle;
    page.metaDescription = metaDescription || page.metaDescription;

    await page.save();
    res.json(page);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour supprimer une page spécifique
router.delete("/:id", auth, async (req, res) => {
  try {
    let page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: "Page non trouvée" });
    }
    if (page.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Accès non autorisé" });
    }

    await page.deleteOne();
    res.json({ msg: "Page supprimée" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
