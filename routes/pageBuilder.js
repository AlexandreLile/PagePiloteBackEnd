const express = require("express");
const PageBuilder = require("../models/PageBuilder");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Route pour récupérer les composants d'une page
router.get("/:pageId", auth, async (req, res) => {
  try {
    const pageBuilder = await PageBuilder.findOne({
      pageId: req.params.pageId,
    });

    if (!pageBuilder) {
      return res.status(404).json({ msg: "PageBuilder non trouvé" });
    }

    res.json(pageBuilder.components);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour créer une nouvelle page (si elle n'existe pas)
router.post("/:pageId", auth, async (req, res) => {
  const { components } = req.body;

  try {
    let pageBuilder = await PageBuilder.findOne({ pageId: req.params.pageId });

    if (pageBuilder) {
      return res.status(400).json({ msg: "PageBuilder déjà existante" });
    }

    pageBuilder = new PageBuilder({
      pageId: req.params.pageId,
      components: components || [],
    });

    await pageBuilder.save();
    res.status(201).json(pageBuilder.components);
  } catch (err) {
    console.error("Erreur lors de la création du PageBuilder :", err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour sauvegarder ou mettre à jour les composants d'une page
router.put("/:pageId", auth, async (req, res) => {
  const { components } = req.body;

  try {
    let pageBuilder = await PageBuilder.findOne({ pageId: req.params.pageId });

    if (!pageBuilder) {
      pageBuilder = new PageBuilder({
        pageId: req.params.pageId,
        components: components || [],
      });
    } else {
      pageBuilder.components = components;
    }

    await pageBuilder.save();
    res.json(pageBuilder.components);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour supprimer un composant d'une page
router.delete("/:pageId/:componentId", auth, async (req, res) => {
  try {
    let pageBuilder = await PageBuilder.findOne({ pageId: req.params.pageId });

    if (!pageBuilder) {
      return res.status(404).json({ msg: "PageBuilder non trouvé" });
    }

    pageBuilder.components = pageBuilder.components.filter(
      (component) => component.id !== req.params.componentId
    );

    await pageBuilder.save();
    res.json(pageBuilder.components);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
