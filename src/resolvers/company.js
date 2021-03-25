module.exports = {
    Query: {
        company: async (_, args, { prisma }) => {
            const company = await prisma.company.findMany();
            return company;
        }
    },
    Mutation: {
        addCompany: async (_, { name, email }, { prisma }) => {
            const newCompany = await prisma.company.create({
                data: {
                    name,
                    email
                }
            });

            return newCompany;
        }
    }
}