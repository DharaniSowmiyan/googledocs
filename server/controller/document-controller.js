// import Document from '../schema/documentSchema.js';
const Document = require("../schema/documentSchema.js")
 const getDocument = async (id) => {
    if (!id) return;

    let document = await Document.findById(id);

    if (document) {
        return document;
    }

    // Create a new document only if it doesn't exist
    try {
        document = await Document.create({ _id: id, data: "" });
        return document;
    } catch (error) {
        if (error.code === 11000) {
            console.error('Duplicate key error while creating document:', error);
            // Optionally, try to fetch the existing document
            return await Document.findById(id);
        } else {
            throw new Error('Error creating document: ' + error.message);
        }
    }
};
const updateDocument = async (id, data) => {
    if (!id) return;

    const updatedDocument = await Document.findByIdAndUpdate(id, { data }, { new: true });

    if (!updatedDocument) {
        throw new Error('Document not found for update');
    }

    return updatedDocument;
};

module.exports={getDocument,updateDocument}