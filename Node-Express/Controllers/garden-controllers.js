const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../Models/http-errors');
const getCoordsForAddress = require('../util/location');

let DUMMY_GARDEN = [
    {
        id: '',
        title: '',
        description: '',
        location: {
            lat: '',
            lng: ''
        },
        address: '',
        creator: '',
    }
];

const getGardenById = (req, res, next) => {
    const gardenId = req.params.gid;

    const garden = DUMMY_GARDEN.find(g => {
        return g.id === gardenId;
    });

    if (!garden) {
        throw new HttpError('Could not find a garden for the provided id.', 404);
    }

    res.json({ garden });
};

const getGardensByUserID = (req, res, next) => {
    const userId = req.params.uid;

    const gardens = DUMMY_GARDEN.filter(g => {
        return g.creator === userId;
    });

    if (!gardens || gardens.length === 0) {
        return next(
            new HttpError('Could not find gardens for the provided user Id.', 404)
        );
    }

    res.json({ gardens });
};

const createGarden = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }


    const createdGarden = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_GARDEN.push(createGarden);

    res.status(201).json({ garden: createdGarden });
};

const updateGarden = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description } = req.body;
    const gardenId = req.params.gid;

    const updatedPlace = { ...DUMMY_GARDEN.find(g => g.id === gardenId) };
    const gardenIndex = DUMMY_GARDEN.findIndex(g => g.id === gardenId);
    updatedGarden.title = title;
    updatedGarden.description = description;

    DUMMY_GARDEN[gardenIndex] = updatedGarden;

    res.status(200).json({ garden: updateGarden });
};


const deleteGarden = (req, res, next) => {
    const gardenId = req.params.gid;
    if (!DUMMY_GARDEN.find(g => g.id === gardenId)) {
        throw new HttpError('Could not find a garden for that id.', 404);
    }
    DUMMY_GARDEN = DUMMY_GARDEN.filter(g => g.id !== gardenId);
    res.status(200).json({ message: 'Deleted Garden.' });
};


//Alternative options
//function getPlaceById() {...}
//const getPlaceById = function() 

exports.getGardenById = getGardenById;
exports.getGardensByUserID = getGardensByUserID;
exports.createGarden = createGarden;
exports.updateGarden = updateGarden;
exports.deleteGarden = deleteGarden;
