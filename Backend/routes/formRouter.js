const express = require('express')
const router = express.Router()
const formController = require("../controller/formController")

router.post('/forms', formController.createForm);
router.post('/get-form-by-id', formController.getFormById);
router.get('/all-forms', formController.getAllForms);
router.post('/update-form', formController.updateFormById);
router.post("/delete-form",formController.deleteForm)

router.delete('/form/:id/input/:inputId', formController.deleteInputFromForm);




module.exports = router
