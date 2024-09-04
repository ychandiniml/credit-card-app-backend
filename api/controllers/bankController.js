import prisma from "../../lib/prisma.js";

const bankController = {
  createBank: async (req, res) => {
    const { name } = req.body;
    try {
        const newBank = await prisma.bank.create({
            data: {
                name
            },
        });

        return res.status(201).json({ message: "Bank created successfully", bank: newBank });
    } catch (error) {
        if (error.code === 'P2002') { // Unique constraint violation error
            return res.status(400).json({ message: "Bank Name already exists" });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  getBanks: async (req, res) => {
    try {
      const banks = await prisma.bank.findMany();
      return res.status(200).json({banks});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  getBankById: async (req, res) => {
    try {
      const bank = await prisma.bank.findUnique({
        where: { bankId: parseInt(req.params.id) },
      });
      if (!bank) return res.status(404).json({ message: 'Bank not found' });
      return res.status(200).json({bank});
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  updateBank: async (req, res) => {
    const { name } = req.body;
    try {
      const updatedBank = await prisma.bank.update({
        where: { bankId: parseInt(req.params.id) },
        data: {
            name
        },
      });
      return res.status(200).json({message: "Bank updated successfully", bank: updatedBank});
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Bank not found' });
      }
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  deleteBank: async (req, res) => {
    try {
      await prisma.bank.delete({
        where: { bankId: parseInt(req.params.id) },
      });
      return res.status(200).json({ message: 'Bank deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Bank not found' });
      }
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};

export default bankController;