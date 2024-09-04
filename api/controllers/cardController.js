import prisma from "../../lib/prisma.js";

const cardController = {
    createCard: async (req, res) => {
        try {
            const { name, bankId, enabled } = req.body;

            // add validation for bankId    
            const bank = await prisma.bank.findUnique({
                where: { bankId }
            });
            if (!bank) return res.status(404).json({ message: 'Bank not found' });

            
            const newCard = await prisma.card.create({
                data: { name, bankId, enabled }
            });
            return res.status(201).json({ message: "Card created successfully", card: newCard });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    getCards: async (req, res) => {
        try {
            const cards = await prisma.card.findMany({
                include: {
                    bank: true, // This includes the related bank details for each card
                },
            });        
            return res.status(200).json({cards});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    getCardById: async (req, res) => {
        try {
            const card = await prisma.card.findUnique({ 
                where: { cardId: parseInt(req.params.id) }, 
            });
            if (!card) return res.status(404).json({ message: 'Card not found' });
            return res.status(200).json({card});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    updateCard: async (req, res) => {
        try {
            const { name, bankId, enabled } = req.body;

            const updateData = {};
            if (name !== undefined) updateData.name = name;
            if (bankId !== undefined) updateData.bankId = bankId;
            if (enabled !== undefined) updateData.enabled = enabled;

            if (updateData.bankId) {
                const bank = await prisma.bank.findUnique({
                    where: { bankId },
                });
                if (!bank) return res.status(404).json({ message: 'Bank not found' });
            }

            // Check if there are any fields to update
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: 'No valid fields provided for update' });
            }
    
            const updateCard = await prisma.card.update({
                where: { cardId: parseInt(req.params.id) },
                data: updateData,
            });
            return res.status(200).json({message: "Card updated successfully", card: updateCard});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    deleteCard: async (req, res) => {
        try {
            await prisma.card.delete({ 
                where: { cardId: parseInt(req.params.id) } 
            });
            return res.status(200).json({ message: 'Card deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
};

export default cardController;