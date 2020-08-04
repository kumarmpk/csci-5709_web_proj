/*author :Japnoor Kaur */

const express = require("express");
const documentController = require("../controllers/document-controller");
const router = express.Router();

const user = 1;

router.get("/getprojectdocs/:uId", documentController.getAllProjects);
router.get("/managedocs/:projectId", documentController.getAllDocuments);
router.get("/updatedocs/:documentID", documentController.getDocumentContent);
router.delete("/deletedoc/:id", documentController.deleteDoc);

//post api to create document
router.post("/createdoc", (req, res) => {
  try {
    let userData = req.body.documentName;
    let userData2 = req.body.documentText;

    documentController.addNewDoc(userData, userData2, (response) => {
      return res.status(200).send("Document created successfully!");
    });
  } catch (err) {
    console.log("err", err);
    return res.status(406).send("Document creation failed");
  }
});

//put api to update document
router.put("/updatedocs/:documentID", (req, res) => {
  try {
    let userData = req.body.documentName;
    let userData2 = req.body.documentText;
    let docParam = req.params.documentID;
    documentController.updateDocContent(
      userData,
      userData2,
      docParam,
      (response) => {
        return res.status(200).send("Document updated successfully!");
      }
    );
  } catch (err) {
    console.log("err", err);
    return res.status(406).send("Document updation failed");
  }
});

router.put("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

router.delete("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = router;
