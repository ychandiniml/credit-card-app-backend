import {body} from 'express-validator'


export const createBankValidator = () => {
    return [        
    body('name')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long')
    ]
};