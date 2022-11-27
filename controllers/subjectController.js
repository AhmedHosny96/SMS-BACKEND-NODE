const model = require('../models/modelConfig')


const Subject = model.subjects;


const createSubject = async (req, res) => {

    const { name, code, description } = req.body;

    let subject = await Subject.findOne({
        where: {
            name: name,
        }
    })

    if (subject)
        return res.status(400).send("Subject with the same name exists")


    let payload = {
        name, code, description
    }

    await Subject.create(payload);

    res.send(payload);

}

const getSubjects = async (req, res) => {


    const subjects = await Subject.findAll({});

    res.send(subjects);

}

const getSubjectById = async (req, res) => {


    let id = req.params.id;

    const subject = await Subject.findOne({ where: { id: id } });

    if (subject === null)
        return res.status(404).send(`subject with id ${id} not found`)

    res.send(subject);

}

const updateSubject = async (req, res) => {

    let id = req.params.id;

    const subject = await Subject.update(req.body, { where: { id: id } })

    if (subject === null)
        return res.status(404).send(`subject with id ${id} not found`)

    res.status(200).send(subject);

}

const deleteSubject = async (req, res) => {

    let id = req.params.id;

    const subject = await Subject.destroy({ where: { id: id } })

    if (subject === null)
        return res.status(404).send(`subject with id ${id} not found`)

    res.send('deleted subject')

}



module.exports = {

    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
}