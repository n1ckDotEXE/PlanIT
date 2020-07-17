const express = require('express');
const { check } = require('express-validator');

const gardenControllers = require('../Controllers/garden-controllers');
const router = express.Router();


router.get('/:gid', gardenControllers.getGardenById);

router.get('/user/:uid', gardenControllers.getGardensByUserID);

router.post('/',
    [check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()
    ],
    gardenControllers.createGarden
);

router.patch(
    '/:gid',
    [
        check('title')
        .not()
        .isEmpty(),
        check('description')
        .isLength({ min: 5 })
    ],
gardenControllers.updateGarden
);

router.delete('/:gid', gardenControllers.deleteGarden);


module.exports = router;