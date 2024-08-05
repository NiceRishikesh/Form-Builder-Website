const Form = require('../models/FormModel'); // Adjust the path as necessary

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    // Create a new form instance
    const newForm = new Form({
      title,
      inputs,
    });

    // Save the form to the database
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific form by ID
exports.getFormById = async (req, res) => {
  try {
    const { id } = req.body;
    
    // Find the form by ID
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllForms = async (req, res) => {
    try {
  
      // Find the form by ID
      const form = await Form.find();
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
      res.json(form);
    } catch (error) {
      console.error('Error fetching form:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Update an existing form by ID
exports.updateFormById = async (req, res) => {
  try {
    const { id,title, inputs } = req.body;

    // Find and update the form by ID
    const updatedForm = await Form.findByIdAndUpdate(id, { title, inputs }, { new: true });

    res.json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an input from a form by ID and input ID
exports.deleteInputFromForm = async (req, res) => {
  try {
    const { id, inputId } = req.params;

    // Find the form by ID
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Remove the input from the form
    form.inputs.id(inputId).remove();
    await form.save();

    res.json(form);
  } catch (error) {
    console.error('Error deleting input from form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteForm = async(req,res)=>{
    try {
        const { id } = req.body;
        // Find the form by ID
        const form = await Form.findByIdAndDelete(id);
        res.sendStatus(200);
      } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}