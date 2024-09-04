import {body} from 'express-validator'


export const createCardValidator = () => {
    return [        
    body('name')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('bankId')
        .isInt()
        .withMessage('Bank ID must be an integer'),
    body('enabled')
        .isBoolean()
        .withMessage('Enabled must be a boolean'),
    ]
};


export const updateCardValidator = () => {
    return [        
    body('name')
        .optional()
        .isString()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('bankId')
        .optional()
        .isInt()
        .withMessage('Bank ID must be an integer'),
    body('enabled')
        .optional()
        .isBoolean()
        .withMessage('Enabled must be a boolean'),
    ]
};